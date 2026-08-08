<<<<<<< HEAD
# NiraivuAI – Grievance Intelligence Platform

A modern AI-powered web application for automating citizen complaint handling across government departments.

## Features

- Landing page with SaaS-style government-tech UI
- Citizen complaint portal with AI analysis
- Complaint tracking page with timeline and progress
- Officer dashboard with complaint metrics and filters
- Admin analytics dashboard with department, district, priority reports
- AI analytics page for trends, hotspot prediction, and duplicate clusters
- FastAPI backend with PostgreSQL-ready schema
- AI utility stubs for classification, priority, duplicate detection, and summarization

## Technology Stack

- Frontend: React + TypeScript + Tailwind CSS + Vite
- Backend: FastAPI + Python + SQLAlchemy
- Database: PostgreSQL (configurable via env)
- Maps: OpenStreetMap styling support
- Charts: Recharts
- Auth: JWT role-based stubbed flows

## Getting Started

### Backend

1. Create a virtual environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
```

2. Configure environment variables

```powershell
$env:DATABASE_URL = "postgresql+psycopg2://user:password@localhost:5432/niraivuai"
$env:AI_API_PROVIDER = "gemini"
```

3. Run the backend

```powershell
python backend\app\main.py
```

### Frontend

```powershell
cd "frontend"
npm install
npm run dev
```

## Notes

This repository includes sample datasets, a production-ready folder structure, and modern UIs designed for responsive desktop/mobile usage.
=======
# NiraivuAI
>>>>>>> 6a3086d6dc043776c8ac2fd1528d78a85318265d
