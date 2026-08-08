import os
import uuid
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .database import async_session, engine
from .models import Base, Complaint, ComplaintStatus, Department, PriorityLevel
from .schemas import ComplaintCreate, ComplaintResponse, ComplaintAnalysis, TrackingRequest, TrackingResponse, MetricsResponse, AnalyticsResponse, DepartmentAnalytics, DistrictAnalytics
from .ai_utils import classify_department, assess_priority, detect_duplicate, generate_summary, confidence_score

app = FastAPI(title='NiraivuAI API', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.on_event('startup')
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post('/api/complaints', response_model=ComplaintResponse)
async def create_complaint(payload: ComplaintCreate):
    department = classify_department(payload.category, payload.description)
    priority = assess_priority(payload.description)
    duplicate_status = detect_duplicate(payload.description, [])
    summary = generate_summary(payload.description)
    confidence = confidence_score()
    reference_id = f'NIRA-{datetime.utcnow().year}-{str(uuid.uuid4()).split("-")[0].upper()}'

    complaint = Complaint(
        reference_id=reference_id,
        name=payload.name,
        location=payload.location,
        category=payload.category,
        description=payload.description,
        department=Department(department),
        priority=PriorityLevel(priority),
        duplicate_of=None,
        ai_summary=summary,
        confidence_score=confidence,
        status=ComplaintStatus.analysis
    )

    async with async_session() as session:
        session.add(complaint)
        await session.commit()
        await session.refresh(complaint)

    return ComplaintResponse(
        reference_id=complaint.reference_id,
        status=complaint.status,
        analysis=ComplaintAnalysis(
            department=complaint.department,
            priority=complaint.priority,
            duplicate_status=duplicate_status,
            summary=complaint.ai_summary,
            confidence_score=complaint.confidence_score
        ),
        created_at=complaint.created_at,
        updated_at=complaint.updated_at
    )

@app.post('/api/track', response_model=TrackingResponse)
async def track_complaint(payload: TrackingRequest):
    async with async_session() as session:
        result = await session.execute(select(Complaint).where(Complaint.reference_id == payload.reference_id))
        complaint = result.scalar_one_or_none()
        if not complaint:
            raise HTTPException(status_code=404, detail='Complaint not found')

    timeline = [
        'Submitted',
        'AI Analysis',
        'Assigned',
        'In Progress',
        'Resolved'
    ]
    progress_map = {'Submitted': 10, 'AI Analysis': 30, 'Assigned': 50, 'In Progress': 70, 'Resolved': 100}
    return TrackingResponse(
        reference_id=complaint.reference_id,
        status=complaint.status,
        timeline=timeline,
        progress=progress_map.get(complaint.status.value, 30),
        last_update=complaint.updated_at
    )

@app.get('/api/officer/metrics', response_model=MetricsResponse)
async def officer_metrics():
    async with async_session() as session:
        result = await session.execute(select(Complaint))
        complaints = result.scalars().all()

    total = len(complaints)
    pending = len([c for c in complaints if c.status != ComplaintStatus.resolved])
    resolved = len([c for c in complaints if c.status == ComplaintStatus.resolved])
    high_priority = len([c for c in complaints if c.priority == PriorityLevel.high or c.priority == PriorityLevel.critical])

    return MetricsResponse(total=total, pending=pending, resolved=resolved, high_priority=high_priority)

@app.get('/api/admin/analytics', response_model=AnalyticsResponse)
async def admin_analytics():
    return AnalyticsResponse(
        department_analytics=[
            DepartmentAnalytics(department='Roads', complaints=240),
            DepartmentAnalytics(department='Water Board', complaints=190),
            DepartmentAnalytics(department='Electricity Department', complaints=150),
            DepartmentAnalytics(department='Municipal Department', complaints=120)
        ],
        district_distribution=[
            DistrictAnalytics(district='North', count=92),
            DistrictAnalytics(district='East', count=74),
            DistrictAnalytics(district='South', count=120),
            DistrictAnalytics(district='West', count=58)
        ],
        priority_heatmap={'Critical': 18, 'High': 46, 'Medium': 92, 'Low': 68},
        predictions={'hotspot': 'Sector 12 East', 'trending_issue': 'Water leakage', 'duplicate_cluster': 'Road damage along Main Avenue'}
    )
