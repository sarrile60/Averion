"""Banking models and schemas."""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from enum import Enum
from bson import ObjectId


class AccountStatus(str, Enum):
    ACTIVE = "ACTIVE"
    FROZEN = "FROZEN"
    CLOSED = "CLOSED"


class BankAccount(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    user_id: str
    
    account_number: str  # Internal account number
    iban: Optional[str] = None  # Sandbox IBAN
    bic: Optional[str] = None
    
    currency: str = "EUR"
    status: AccountStatus = AccountStatus.ACTIVE
    
    ledger_account_id: str  # Link to ledger account
    
    opened_at: datetime = Field(default_factory=datetime.utcnow)
    closed_at: Optional[datetime] = None
    
    class Config:
        populate_by_name = True


class AccountResponse(BaseModel):
    id: str
    account_number: str
    iban: Optional[str] = None
    currency: str
    status: AccountStatus
    balance: int  # Derived from ledger
    opened_at: datetime