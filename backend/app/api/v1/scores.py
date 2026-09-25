from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.candidate import Candidate
from app.models.score import ScoreRecord, Roadmap
from app.schemas.score import ScoreRecordResponse, RoadmapResponse
from app.core.errors import EntityNotFoundException

router = APIRouter(prefix="/candidates/me", tags=["Scores & Development"])


@router.get("/scores", response_model=ScoreRecordResponse)
def get_candidate_scores(db: Session = Depends(get_db)):
    """Retrieves authoritative multi-index scores (CCI, CPI, CRI, evidence confidence, radar breakdown)."""
    candidate = db.query(Candidate).first()
    if not candidate:
        raise EntityNotFoundException("Candidate", "active")

    score_record = db.query(ScoreRecord).filter(
        ScoreRecord.candidate_id == candidate.id
    ).order_by(ScoreRecord.computed_at.desc()).first()

    if not score_record:
        raise EntityNotFoundException("ScoreRecord for Candidate", candidate.id)

    return score_record


@router.get("/roadmap", response_model=RoadmapResponse)
def get_candidate_roadmap(db: Session = Depends(get_db)):
    """Retrieves personalized 3-phase development roadmap tailored to evaluated competency gaps."""
    candidate = db.query(Candidate).first()
    if not candidate:
        raise EntityNotFoundException("Candidate", "active")

    roadmap = db.query(Roadmap).filter(Roadmap.candidate_id == candidate.id).first()
    if not roadmap:
        raise EntityNotFoundException("Roadmap for Candidate", candidate.id)

    return roadmap
