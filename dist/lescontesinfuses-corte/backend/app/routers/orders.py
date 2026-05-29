from __future__ import annotations
import secrets
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from ..deps import get_db
from ..models.orders import Order, OrderItem, OrderEvent
from ..models.catalog import Book, Product, Boisson
from ..schemas.orders import (
    OrderCreate, OrderCreateResponse, OrderOut, OrderItemOut,
    ConfirmPaymentIn, OrderLookupIn, OtpVerifyIn,
)
from ..services.tax import compute_tva_for_line, tax_rate_for
from ..services.stripe_mock import create_payment_intent, confirm_payment_intent
from ..services.email import send_email
from ..services.otp import generate_and_send_otp, verify_otp
from ..services.mondial_relay import track as mr_track
from ..security import create_jwt
from ..config import settings

router = APIRouter(prefix="/orders", tags=["orders"])


def _order_ref() -> str:
    return f"CI-{datetime.now().year}-{secrets.token_hex(3).upper()}"


async def _resolve_item(db: AsyncSession, kind: str, item_id: int):
    if kind == "book":
        res = await db.execute(select(Book).where(Book.id == item_id))
        b = res.scalar_one_or_none()
        if not b:
            raise HTTPException(400, f"Book {item_id} not found")
        return {"name": b.title, "price_cents": b.price_cents, "stock": b.stock, "obj": b}
    if kind == "product":
        res = await db.execute(select(Product).where(Product.id == item_id))
        p = res.scalar_one_or_none()
        if not p:
            raise HTTPException(400, f"Product {item_id} not found")
        return {"name": p.name, "price_cents": p.price_cents, "stock": p.stock, "obj": p}
    if kind == "boisson":
        res = await db.execute(select(Boisson).where(Boisson.id == item_id))
        bo = res.scalar_one_or_none()
        if not bo:
            raise HTTPException(400, f"Boisson {item_id} not found")
        return {"name": bo.name, "price_cents": bo.price_cents, "stock": 9999, "obj": bo}
    raise HTTPException(400, f"Unknown kind {kind}")


async def _build_order_out(order: Order, db: AsyncSession) -> OrderOut:
    res = await db.execute(select(OrderItem).where(OrderItem.order_id == order.id))
    items = list(res.scalars().all())
    return OrderOut(
        **{k: getattr(order, k) for k in [
            "id", "public_token", "reference", "status", "customer_email", "customer_phone",
            "customer_first_name", "customer_last_name", "shipping_method", "shipping_address",
            "mondial_relay_point_id", "payment_method", "payment_status", "subtotal_cents",
            "shipping_cents", "tax_cents", "total_cents", "currency", "tracking_number", "created_at",
        ]},
        items=[OrderItemOut.model_validate(i) for i in items],
    )


@router.post("", response_model=OrderCreateResponse)
async def create_order(payload: OrderCreate, db: AsyncSession = Depends(get_db)):
    if not payload.terms_accepted:
        raise HTTPException(400, "Terms must be accepted")
    if not payload.items:
        raise HTTPException(400, "Empty cart")

    # Build items
    subtotal = 0
    tax_total = 0
    items_records = []
    for ci in payload.items:
        info = await _resolve_item(db, ci.kind, ci.item_id)
        if info["stock"] < ci.qty:
            raise HTTPException(400, f"Stock insuffisant pour {info['name']}")
        line_total = info["price_cents"] * ci.qty
        rate = tax_rate_for(ci.kind)
        tax = compute_tva_for_line(line_total, ci.kind)
        subtotal += line_total
        tax_total += tax
        items_records.append({
            "kind": ci.kind, "item_id": ci.item_id, "name": info["name"],
            "unit_price_cents": info["price_cents"], "qty": ci.qty,
            "line_total_cents": line_total, "tax_rate": rate,
        })

    # Shipping
    if payload.shipping.method == "mondial_relay":
        shipping = settings.SHIPPING_MONDIAL_RELAY_PRICE_CENTS
    elif payload.shipping.method == "domicile":
        shipping = settings.SHIPPING_HOME_PRICE_CENTS
    else:
        shipping = 0

    total = subtotal + shipping

    # Create payment intent
    intent = create_payment_intent(total, metadata={"customer_email": payload.customer.email})

    order = Order(
        reference=_order_ref(),
        status="pending",
        customer_email=payload.customer.email,
        customer_phone=payload.customer.phone,
        customer_first_name=payload.customer.first_name,
        customer_last_name=payload.customer.last_name,
        shipping_method=payload.shipping.method,
        shipping_address=payload.shipping.address,
        mondial_relay_point_id=payload.shipping.mondial_relay_point_id,
        pickup_slot_at=payload.shipping.pickup_slot_at,
        payment_method=payload.payment.method,
        payment_intent_id=intent["id"],
        payment_status="pending",
        subtotal_cents=subtotal,
        shipping_cents=shipping,
        tax_cents=tax_total,
        total_cents=total,
        notes=payload.notes,
    )
    db.add(order)
    await db.flush()

    for r in items_records:
        db.add(OrderItem(order_id=order.id, **r))
    db.add(OrderEvent(order_id=order.id, type="created", payload={"reference": order.reference}))
    await db.commit()

    return OrderCreateResponse(
        order_id=order.id, public_token=order.public_token, reference=order.reference,
        total_cents=order.total_cents,
        payment_action={"provider": "stripe_mock", "intent": intent},
    )


@router.post("/{order_id}/confirm-payment", response_model=OrderOut)
async def confirm_payment(order_id: str, payload: ConfirmPaymentIn, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.id == order_id))
    order = res.scalar_one_or_none()
    if not order:
        raise HTTPException(404, "Order not found")
    if order.payment_intent_id != payload.payment_intent_id:
        raise HTTPException(400, "Payment intent mismatch")

    order.payment_status = payload.status
    if payload.status == "succeeded":
        order.status = "paid"
        order.paid_at = datetime.now(timezone.utc)
        # decrement stock
        ires = await db.execute(select(OrderItem).where(OrderItem.order_id == order.id))
        for it in ires.scalars().all():
            if it.kind == "book":
                bres = await db.execute(select(Book).where(Book.id == it.item_id))
                b = bres.scalar_one_or_none()
                if b:
                    b.stock = max(0, b.stock - it.qty)
            elif it.kind == "product":
                pres = await db.execute(select(Product).where(Product.id == it.item_id))
                p = pres.scalar_one_or_none()
                if p:
                    p.stock = max(0, p.stock - it.qty)
        db.add(OrderEvent(order_id=order.id, type="payment_succeeded", payload={"intent": payload.payment_intent_id}))
        send_email(order.customer_email, f"Confirmation commande {order.reference}",
                   f"Merci pour votre commande {order.reference}.\nMontant : {order.total_cents/100:.2f} EUR.\nNous vous tiendrons informe.\n\nLes Contes Infuses")
    else:
        order.status = "cancelled"
        db.add(OrderEvent(order_id=order.id, type="payment_failed"))
    await db.commit()
    await db.refresh(order)
    return await _build_order_out(order, db)


@router.get("/{order_id}", response_model=OrderOut)
async def get_order(order_id: str, token: str = Query(...), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.id == order_id))
    order = res.scalar_one_or_none()
    if not order or order.public_token != token:
        raise HTTPException(404, "Order not found")
    return await _build_order_out(order, db)


@router.post("/lookup")
async def lookup_orders(payload: OrderLookupIn, db: AsyncSession = Depends(get_db)):
    if not payload.email and not payload.phone:
        raise HTTPException(400, "Email or phone required")
    info = await generate_and_send_otp(
        db, purpose="order_lookup",
        email=payload.email, phone=payload.phone,
        payload={"email": payload.email, "phone": payload.phone},
    )
    return info


@router.post("/lookup/verify")
async def lookup_verify(payload: OtpVerifyIn, db: AsyncSession = Depends(get_db)):
    try:
        otp = await verify_otp(db, payload.otp_id, payload.code)
    except ValueError as e:
        raise HTTPException(400, str(e))
    if otp.purpose != "order_lookup":
        raise HTTPException(400, "Wrong OTP purpose")

    stmt = select(Order)
    if otp.email:
        stmt = stmt.where(Order.customer_email == otp.email)
    elif otp.phone:
        stmt = stmt.where(Order.customer_phone == otp.phone)
    res = await db.execute(stmt.order_by(Order.created_at.desc()))
    orders = list(res.scalars().all())

    short_token = create_jwt(
        subject=otp.email or otp.phone or "guest",
        scopes=["order_read"],
        expires_minutes=15,
        extra={"lookup_email": otp.email, "lookup_phone": otp.phone},
    )

    return {
        "access_token": short_token,
        "expires_in": 900,
        "orders": [
            {
                "id": o.id, "reference": o.reference, "public_token": o.public_token,
                "status": o.status, "total_cents": o.total_cents,
                "created_at": o.created_at.isoformat(),
            } for o in orders
        ],
    }


@router.get("/{order_id}/tracking")
async def get_tracking(order_id: str, token: str = Query(...), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Order).where(Order.id == order_id))
    order = res.scalar_one_or_none()
    if not order or order.public_token != token:
        raise HTTPException(404, "Order not found")
    timeline = [
        {"key": "validated", "ts": order.created_at.isoformat(), "done": order.status != "pending"},
        {"key": "preparing", "ts": order.paid_at.isoformat() if order.paid_at else None, "done": order.status in ("preparing", "shipped", "delivered")},
        {"key": "shipped", "ts": order.shipped_at.isoformat() if order.shipped_at else None, "done": order.status in ("shipped", "delivered")},
        {"key": "delivered", "ts": order.delivered_at.isoformat() if order.delivered_at else None, "done": order.status == "delivered"},
    ]
    tracking = None
    if order.tracking_number:
        tracking = mr_track(order.tracking_number, order.shipped_at or order.created_at)
    return {"order_id": order.id, "status": order.status, "timeline": timeline, "tracking": tracking}
