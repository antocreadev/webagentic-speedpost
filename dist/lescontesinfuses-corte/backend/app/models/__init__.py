from .catalog import Book, Genre, Event, Boisson, Artisan, Product
from .customer import Customer, Address
from .orders import Order, OrderItem, OrderEvent, CafeOrder, EventRegistration
from .communication import NewsletterSubscriber, ContactRequest
from .loyalty import LoyaltyAccount
from .giftcard import GiftCard
from .consent import Consent, DataExportRequest, AccountDeletionRequest
from .otp import OneTimeCode

__all__ = [
    "Book", "Genre", "Event", "Boisson", "Artisan", "Product",
    "Customer", "Address",
    "Order", "OrderItem", "OrderEvent", "CafeOrder", "EventRegistration",
    "NewsletterSubscriber", "ContactRequest",
    "LoyaltyAccount", "GiftCard",
    "Consent", "DataExportRequest", "AccountDeletionRequest",
    "OneTimeCode",
]
