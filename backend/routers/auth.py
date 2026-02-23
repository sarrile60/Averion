"""
Auth Router - Authentication endpoints.

Handles all authentication operations including:
- User signup/registration
- Login/logout
- Email verification
- Password management
- MFA setup/enable

Routes: /api/v1/auth/*

IMPORTANT: This is a live banking application. Any changes must preserve
100% behavior parity with the original implementation.
"""

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
import logging
import uuid

from database import get_database
from config import settings
from services.auth_service import AuthService
from services.email_service import EmailService
from core.auth import hash_password, verify_password
from schemas.users import (
    UserCreate, UserLogin, TokenResponse, UserResponse, 
    MFASetupResponse, MFAVerifyRequest, ResendVerificationRequest, VerifyEmailRequest,
    SignupRequest, PasswordChangeRequest, VerifyPasswordRequest,
    ForgotPasswordRequest, ResetPasswordRequest
)

from .dependencies import get_current_user, require_admin, create_audit_log

logger = logging.getLogger(__name__)

# Router definition - NO prefix here, we'll add it when including
router = APIRouter(prefix="/api/v1/auth", tags=["auth"])

# NOTE: Endpoints will be moved here incrementally in subsequent phases
