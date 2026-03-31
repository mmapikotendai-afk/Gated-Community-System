from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Resident Schemas
class ResidentBase(BaseModel):
    name: str
    house_number: str
    contact_number: str
    email: Optional[str] = None

class ResidentCreate(ResidentBase):
    pass

class Resident(ResidentBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# Visitor Schemas
class VisitorBase(BaseModel):
    name: str
    contact_number: str
    vehicle_number: Optional[str] = None
    purpose: Optional[str] = None

class VisitorCreate(VisitorBase):
    pass

class Visitor(VisitorBase):
    id: int

    class Config:
        from_attributes = True

# Log Schemas
class LogBase(BaseModel):
    visitor_id: int
    resident_id: Optional[int] = None

class LogCreate(LogBase):
    pass

class Log(LogBase):
    id: int
    entry_time: datetime
    exit_time: Optional[datetime] = None
    visitor: Visitor # Nested visitor details

    class Config:
        from_attributes = True

# Complaint Schemas
class ComplaintBase(BaseModel):
    title: str
    description: str
    resident_id: int

class ComplaintCreate(ComplaintBase):
    pass

class Complaint(ComplaintBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
