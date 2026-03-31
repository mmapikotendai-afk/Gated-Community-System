from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware

import models, schemas, crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Setup
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to Gated Community Management System API"}

# Residents
@app.post("/residents/", response_model=schemas.Resident)
def create_resident(resident: schemas.ResidentCreate, db: Session = Depends(get_db)):
    return crud.create_resident(db=db, resident=resident)

@app.get("/residents/", response_model=List[schemas.Resident])
def read_residents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    residents = crud.get_residents(db, skip=skip, limit=limit)
    return residents

@app.delete("/residents/{resident_id}", response_model=schemas.Resident)
def delete_resident(resident_id: int, db: Session = Depends(get_db)):
    db_resident = crud.delete_resident(db, resident_id)
    if db_resident is None:
        raise HTTPException(status_code=404, detail="Resident not found")
    return db_resident

# Visitors
@app.post("/visitors/", response_model=schemas.Visitor)
def create_visitor(visitor: schemas.VisitorCreate, db: Session = Depends(get_db)):
    return crud.create_visitor(db=db, visitor=visitor)

@app.get("/visitors/", response_model=List[schemas.Visitor])
def read_visitors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_visitors(db, skip=skip, limit=limit)

@app.delete("/visitors/{visitor_id}", response_model=schemas.Visitor)
def delete_visitor(visitor_id: int, db: Session = Depends(get_db)):
    db_visitor = crud.delete_visitor(db, visitor_id)
    if db_visitor is None:
        raise HTTPException(status_code=404, detail="Visitor not found")
    return db_visitor

# Logs (Check-in/Check-out)
@app.post("/logs/checkin", response_model=schemas.Log)
def check_in(log: schemas.LogCreate, db: Session = Depends(get_db)):
    return crud.create_log(db=db, log=log)

@app.put("/logs/checkout/{log_id}", response_model=schemas.Log)
def check_out(log_id: int, db: Session = Depends(get_db)):
    return crud.checkout_visitor(db=db, log_id=log_id)

@app.get("/logs/active", response_model=List[schemas.Log])
def get_active_logs(db: Session = Depends(get_db)):
    return crud.get_active_logs(db)

# Complaints
@app.post("/complaints/", response_model=schemas.Complaint)
def create_complaint(complaint: schemas.ComplaintCreate, db: Session = Depends(get_db)):
    return crud.create_complaint(db=db, complaint=complaint)

@app.get("/complaints/", response_model=List[schemas.Complaint])
def read_complaints(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_complaints(db, skip=skip, limit=limit)

@app.delete("/complaints/{complaint_id}", response_model=schemas.Complaint)
def delete_complaint(complaint_id: int, db: Session = Depends(get_db)):
    db_complaint = crud.delete_complaint(db, complaint_id)
    if db_complaint is None:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return db_complaint

# WhatsApp Webhook
from pydantic import BaseModel

class WhatsAppMessage(BaseModel):
    phone: str
    message: str

@app.post("/webhook/whatsapp")
def whatsapp_webhook(data: WhatsAppMessage, db: Session = Depends(get_db)):
    # 1. Find resident by phone number
    resident = crud.get_resident_by_contact_number(db, contact_number=data.phone)
    
    if not resident:
        raise HTTPException(status_code=404, detail="Resident not found with this phone number")
    
    # 2. Create Complaint
    complaint_data = schemas.ComplaintCreate(
        title="WhatsApp Complaint",
        description=data.message,
        resident_id=resident.id
    )
    
    return crud.create_complaint(db=db, complaint=complaint_data)
