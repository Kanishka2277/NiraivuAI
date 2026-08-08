from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class UserRole(str, PyEnum):
    citizen = 'citizen'
    officer = 'officer'
    admin = 'admin'

class Department(str, PyEnum):
    highways = 'Highways Department'
    water_board = 'Water Board'
    electricity = 'Electricity Department'
    municipal = 'Municipal Department'

class PriorityLevel(str, PyEnum):
    low = 'Low'
    medium = 'Medium'
    high = 'High'
    critical = 'Critical'

class ComplaintStatus(str, PyEnum):
    submitted = 'Submitted'
    analysis = 'AI Analysis'
    assigned = 'Assigned'
    in_progress = 'In Progress'
    resolved = 'Resolved'

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(180), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(200), nullable=False)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), nullable=False)
    active: Mapped[bool] = mapped_column(Boolean, default=True)

class Complaint(Base):
    __tablename__ = 'complaints'

    id: Mapped[int] = mapped_column(primary_key=True)
    reference_id: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    location: Mapped[str] = mapped_column(String(180), nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    department: Mapped[Department] = mapped_column(Enum(Department), nullable=False)
    priority: Mapped[PriorityLevel] = mapped_column(Enum(PriorityLevel), nullable=False)
    duplicate_of: Mapped[int | None] = mapped_column(ForeignKey('complaints.id'), nullable=True)
    ai_summary: Mapped[str] = mapped_column(Text, nullable=False)
    confidence_score: Mapped[str] = mapped_column(String(12), nullable=False)
    status: Mapped[ComplaintStatus] = mapped_column(Enum(ComplaintStatus), default=ComplaintStatus.submitted, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    duplicate_source: Mapped['Complaint'] = relationship('Complaint', remote_side=[id], uselist=False)
