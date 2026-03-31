from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime

# Resident CRUD
def get_resident(db: Session, resident_id: int):
    return db.query(models.Resident).filter(models.Resident.id == resident_id).first()

def get_resident_by_contact_number(db: Session, contact_number: str):
    return db.query(models.Resident).filter(models.Resident.contact_number == contact_number).first()

def get_residents(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Resident).offset(skip).limit(limit).all()

def create_resident(db: Session, resident: schemas.ResidentCreate):
    db_resident = models.Resident(**resident.dict())
    db.add(db_resident)
    db.commit()
    db.refresh(db_resident)
    return db_resident

def delete_resident(db: Session, resident_id: int):
    db_resident = get_resident(db, resident_id)
    if db_resident:
        db.delete(db_resident)
        db.commit()
    return db_resident

# Visitor CRUD
def get_visitor(db: Session, visitor_id: int):
    return db.query(models.Visitor).filter(models.Visitor.id == visitor_id).first()

def get_visitors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Visitor).offset(skip).limit(limit).all()

def create_visitor(db: Session, visitor: schemas.VisitorCreate):
    db_visitor = models.Visitor(**visitor.dict())
    db.add(db_visitor)
    db.commit()
    db.refresh(db_visitor)
    return db_visitor

def delete_visitor(db: Session, visitor_id: int):
    db_visitor = get_visitor(db, visitor_id)
    if db_visitor:
        db.delete(db_visitor)
        db.commit()
    return db_visitor

# Log CRUD
def create_log(db: Session, log: schemas.LogCreate):
    db_log = models.Log(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

def get_active_logs(db: Session):
    return db.query(models.Log).filter(models.Log.exit_time == None).all()

def checkout_visitor(db: Session, log_id: int):
    db_log = db.query(models.Log).filter(models.Log.id == log_id).first()
    if db_log:
        db_log.exit_time = datetime.now()
        db.commit()
        db.refresh(db_log)
    return db_log

# Complaint CRUD
def create_complaint(db: Session, complaint: schemas.ComplaintCreate):
    db_complaint = models.Complaint(**complaint.dict())
    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)
    return db_complaint

def get_complaints(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Complaint).offset(skip).limit(limit).all()

def delete_complaint(db: Session, complaint_id: int):
    db_complaint = db.query(models.Complaint).filter(models.Complaint.id == complaint_id).first()
    if db_complaint:
        db.delete(db_complaint)
        db.commit()
    return db_complaint
