from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Resident(Base):
    __tablename__ = "residents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    house_number = Column(String)
    contact_number = Column(String)
    email = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

class Visitor(Base):
    __tablename__ = "visitors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    contact_number = Column(String)
    vehicle_number = Column(String, nullable=True)
    purpose = Column(String, nullable=True)
    
    logs = relationship("Log", back_populates="visitor")

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    visitor_id = Column(Integer, ForeignKey("visitors.id"))
    resident_id = Column(Integer, ForeignKey("residents.id"), nullable=True) # Optional: if visiting a specific resident
    entry_time = Column(DateTime, default=datetime.now)
    exit_time = Column(DateTime, nullable=True)
    
    visitor = relationship("Visitor", back_populates="logs")
    resident = relationship("Resident")

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    resident_id = Column(Integer, ForeignKey("residents.id"))
    title = Column(String)
    description = Column(String)
    status = Column(String, default="Pending") # Pending, In Progress, Resolved
    created_at = Column(DateTime, default=datetime.now)
    
    resident = relationship("Resident")
