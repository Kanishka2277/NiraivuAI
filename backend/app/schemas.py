from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field

class UserRole(str, Enum):
    citizen = 'citizen'
    officer = 'officer'
    admin = 'admin'

class Department(str, Enum):
    highways = 'Highways Department'
    water_board = 'Water Board'
    electricity = 'Electricity Department'
    municipal = 'Municipal Department'

class PriorityLevel(str, Enum):
    low = 'Low'
    medium = 'Medium'
    high = 'High'
    critical = 'Critical'

class ComplaintStatus(str, Enum):
    submitted = 'Submitted'
    analysis = 'AI Analysis'
    assigned = 'Assigned'
    in_progress = 'In Progress'
    resolved = 'Resolved'

class ComplaintCreate(BaseModel):
    name: str = Field(..., min_length=2)
    location: str = Field(..., min_length=4)
    category: str
    description: str = Field(..., min_length=10)
    image_url: str | None = None

class ComplaintAnalysis(BaseModel):
    department: Department
    priority: PriorityLevel
    duplicate_status: str
    summary: str
    confidence_score: str

class ComplaintResponse(BaseModel):
    reference_id: str
    status: ComplaintStatus
    analysis: ComplaintAnalysis
    created_at: datetime
    updated_at: datetime

class TrackingRequest(BaseModel):
    reference_id: str

class TrackingResponse(BaseModel):
    reference_id: str
    status: ComplaintStatus
    timeline: list[str]
    progress: int
    last_update: datetime

class MetricsResponse(BaseModel):
    total: int
    pending: int
    resolved: int
    high_priority: int

class DepartmentAnalytics(BaseModel):
    department: str
    complaints: int

class DistrictAnalytics(BaseModel):
    district: str
    count: int

class AnalyticsResponse(BaseModel):
    department_analytics: list[DepartmentAnalytics]
    district_distribution: list[DistrictAnalytics]
    priority_heatmap: dict[str, int]
    predictions: dict[str, str]
