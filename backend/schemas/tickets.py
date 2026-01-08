"""Support ticket models and schemas."""

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from enum import Enum
from bson import ObjectId


class TicketStatus(str, Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    WAITING = "WAITING"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"


class TicketPriority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    URGENT = "URGENT"


class TicketMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    sender_id: str
    sender_name: str
    is_staff: bool = False
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Ticket(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    user_id: str
    
    subject: str
    description: str
    status: TicketStatus = TicketStatus.OPEN
    priority: TicketPriority = TicketPriority.MEDIUM
    
    messages: List[TicketMessage] = Field(default_factory=list)
    
    assigned_to: Optional[str] = None  # Staff user ID
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    resolved_at: Optional[datetime] = None
    
    class Config:
        populate_by_name = True


class TicketCreate(BaseModel):
    subject: str
    description: str


class MessageCreate(BaseModel):
    content: str