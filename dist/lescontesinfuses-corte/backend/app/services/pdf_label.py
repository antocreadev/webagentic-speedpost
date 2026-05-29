from __future__ import annotations
import io
from datetime import datetime


def generate_label_pdf(*, tracking_number: str, recipient: dict, point_id: str | None = None) -> bytes:
    try:
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import A6
        from reportlab.lib.units import mm
        from reportlab.graphics.barcode import code128
        from reportlab.graphics.barcode.qr import QrCodeWidget
        from reportlab.graphics.shapes import Drawing
        from reportlab.graphics import renderPDF
    except ImportError:
        # Fallback minimal PDF
        return b"%PDF-1.4\n%mock label\n"

    buf = io.BytesIO()
    width, height = A6  # ~105 x 148 mm
    c = canvas.Canvas(buf, pagesize=A6)

    # Header MR red box
    c.setFillColorRGB(0.85, 0.1, 0.1)
    c.rect(0, height - 18 * mm, width, 18 * mm, fill=1, stroke=0)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(8 * mm, height - 12 * mm, "MR  MONDIAL RELAY")

    c.setFillColorRGB(0, 0, 0)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(6 * mm, height - 24 * mm, "Expediteur :")
    c.setFont("Helvetica", 8)
    c.drawString(6 * mm, height - 28 * mm, "Les Contes Infuses")
    c.drawString(6 * mm, height - 32 * mm, "Place Paoli")
    c.drawString(6 * mm, height - 36 * mm, "20250 Corte")
    c.drawString(6 * mm, height - 40 * mm, "Tel : 04 95 XX XX XX")

    c.setFont("Helvetica-Bold", 9)
    c.drawString(6 * mm, height - 48 * mm, "Destinataire :")
    c.setFont("Helvetica", 9)
    y = height - 53 * mm
    name = f"{recipient.get('first_name', '')} {recipient.get('last_name', '')}".strip()
    c.drawString(6 * mm, y, name or recipient.get("email", "Client"))
    y -= 4 * mm
    addr = recipient.get("address", {}) or {}
    if addr.get("line1"):
        c.drawString(6 * mm, y, addr["line1"][:50]); y -= 4 * mm
    if addr.get("line2"):
        c.drawString(6 * mm, y, addr["line2"][:50]); y -= 4 * mm
    if addr.get("zip") or addr.get("city"):
        c.drawString(6 * mm, y, f"{addr.get('zip','')} {addr.get('city','')}"); y -= 4 * mm

    if point_id:
        c.setFont("Helvetica-Bold", 9)
        c.drawString(6 * mm, y, f"Point Relais : {point_id}"); y -= 5 * mm

    # Barcode
    barcode = code128.Code128(tracking_number, barHeight=14 * mm, barWidth=0.4 * mm)
    barcode.drawOn(c, 6 * mm, 25 * mm)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(6 * mm, 22 * mm, tracking_number)

    # QR
    qr = QrCodeWidget(tracking_number)
    b = qr.getBounds()
    qrw, qrh = b[2] - b[0], b[3] - b[1]
    d = Drawing(22 * mm, 22 * mm, transform=[22 * mm / qrw, 0, 0, 22 * mm / qrh, 0, 0])
    d.add(qr)
    renderPDF.draw(d, c, width - 30 * mm, 4 * mm)

    c.setFont("Helvetica", 7)
    c.drawString(6 * mm, 6 * mm, f"Edite le {datetime.now().strftime('%Y-%m-%d %H:%M')}")

    c.showPage()
    c.save()
    return buf.getvalue()
