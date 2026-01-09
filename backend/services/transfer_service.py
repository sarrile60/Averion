"""Transfer service for P2P transfers."""

from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi import HTTPException
import uuid

from services.ledger_service import LedgerEngine
from core.ledger import EntryDirection


class TransferService:
    def __init__(self, db: AsyncIOMotorDatabase, ledger_engine: LedgerEngine):
        self.db = db
        self.ledger = ledger_engine
    
    async def p2p_transfer(
        self,
        from_user_id: str,
        to_email: str,
        amount: int,
        reason: str = "P2P Transfer"
    ):
        """Transfer money between two customers."""
        # Find recipient by email
        from bson import ObjectId
        from bson.errors import InvalidId
        
        to_user = await self.db.users.find_one({"email": to_email.lower()})
        if not to_user:
            raise HTTPException(status_code=404, detail="Recipient not found")
        
        to_user_id = str(to_user["_id"])
        
        if to_user_id == from_user_id:
            raise HTTPException(status_code=400, detail="Cannot transfer to yourself")
        
        # Get sender's account
        from_account = await self.db.bank_accounts.find_one({"user_id": from_user_id})
        if not from_account:
            raise HTTPException(status_code=404, detail="Your account not found")
        
        # Get recipient's account
        to_account = await self.db.bank_accounts.find_one({"user_id": to_user_id})
        if not to_account:
            raise HTTPException(status_code=404, detail="Recipient account not found")
        
        # Check balance
        sender_balance = await self.ledger.get_balance(from_account["ledger_account_id"])
        if sender_balance < amount:
            raise HTTPException(status_code=400, detail="Insufficient funds")
        
        # Execute transfer
        txn = await self.ledger.post_transaction(
            transaction_type="P2P_TRANSFER",
            entries=[
                (from_account["ledger_account_id"], amount, EntryDirection.DEBIT),
                (to_account["ledger_account_id"], amount, EntryDirection.CREDIT)
            ],
            external_id=f"p2p_{uuid.uuid4()}",
            reason=reason,
            performed_by=from_user_id,
            metadata={
                "from_user": from_user_id,
                "to_user": to_user_id,
                "to_email": to_email
            }
        )
        
        return {
            "transaction_id": txn.id,
            "amount": amount,
            "recipient": f"{to_user['first_name']} {to_user['last_name']}",
            "status": "POSTED"
        }
