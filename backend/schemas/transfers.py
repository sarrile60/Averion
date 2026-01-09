"""Transfer schemas."""

from pydantic import BaseModel
from typing import Optional


class P2PTransferRequest(BaseModel):
    to_email: str
    amount: int  # In cents
    reason: Optional[str] = "P2P Transfer"
