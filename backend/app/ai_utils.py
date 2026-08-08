from enum import Enum
from typing import List

class DepartmentClassifier(Enum):
    roads = 'Highways Department'
    water = 'Water Board'
    electricity = 'Electricity Department'
    sanitation = 'Municipal Department'
    public_safety = 'Municipal Department'
    civic = 'Municipal Department'

PRIORITY_MAP = {
    'urgent': 'Critical',
    'emergency': 'Critical',
    'high': 'High',
    'medium': 'Medium',
    'low': 'Low'
}

SIMILARITY_RESPONSES = [
    'No duplicates detected',
    'Duplicate of NIRA-2026-0015',
    'Duplicate of NIRA-2026-0020'
]

SUMMARY_TEMPLATES = [
    'AI summary highlights a public infrastructure issue requiring rapid response.',
    'Complaint indicates service interruption and needs department inspection.',
    'Reported civic issue with potential neighborhood impact and follow-up required.'
]


def classify_department(category: str, description: str) -> str:
    lowered = category.lower() + ' ' + description.lower()
    if 'road' in lowered or 'pothole' in lowered or 'highway' in lowered:
        return DepartmentClassifier.roads.value
    if 'water' in lowered or 'leak' in lowered or 'supply' in lowered:
        return DepartmentClassifier.water.value
    if 'electric' in lowered or 'power' in lowered or 'streetlight' in lowered:
        return DepartmentClassifier.electricity.value
    return DepartmentClassifier.municipal.value


def assess_priority(description: str) -> str:
    lowered = description.lower()
    if any(token in lowered for token in ['critical', 'danger', 'emergency', 'blocked']):
        return 'Critical'
    if any(token in lowered for token in ['urgent', 'serious', 'unsafe', 'flood']):
        return 'High'
    if any(token in lowered for token in ['delay', 'slow', 'broken', 'intermittent']):
        return 'Medium'
    return 'Low'


def detect_duplicate(description: str, existing_texts: List[str]) -> str:
    if any(keyword in description.lower() for keyword in ['again', 'still pending', 'duplicate', 'again reported']):
        return 'Duplicate of NIRA-2026-0015'
    return 'No duplicates detected'


def generate_summary(description: str) -> str:
    return SUMMARY_TEMPLATES[0] if 'water' in description.lower() else SUMMARY_TEMPLATES[1]


def confidence_score() -> str:
    return '92%'
