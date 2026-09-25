from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.candidate import Candidate, CandidateProfile
from app.models.attempt import Attempt
from app.models.case import CaseAttempt
from app.models.score import ScoreRecord, Roadmap
from app.schemas.candidate import CandidateResponse, CandidateDashboardResponse, CandidateProfileUpdateRequest
from app.core.errors import EntityNotFoundException

router = APIRouter(prefix="/candidates", tags=["Candidates"])


@router.get("/me", response_model=CandidateResponse)
def get_current_candidate(db: Session = Depends(get_db)):
    """Retrieves active demo candidate profile (Sarah Jenkins)."""
    candidate = db.query(Candidate).first()
    if not candidate:
        raise EntityNotFoundException("Candidate", "active")
    return candidate


@router.put("/me/profile", response_model=CandidateResponse)
def update_candidate_profile(
    payload: CandidateProfileUpdateRequest,
    db: Session = Depends(get_db)
):
    """Updates candidate profile details, target role, and resume inputs."""
    candidate = db.query(Candidate).first()
    if not candidate:
        candidate = Candidate(
            id="cand_custom_candidate",
            email=payload.email or "candidate@modus-demo.com",
            display_name=payload.display_name or "Enterprise Consultant",
            status="ACTIVE",
            target_role=payload.target_role or "Enterprise Transformation Consultant"
        )
        db.add(candidate)
        db.flush()

    if payload.display_name:
        candidate.display_name = payload.display_name
    if payload.email:
        candidate.email = payload.email
    if payload.target_role:
        candidate.target_role = payload.target_role

    profile = candidate.profile
    if not profile:
        profile = CandidateProfile(candidate_id=candidate.id)
        db.add(profile)
        db.flush()

    if payload.current_role:
        profile.current_role = payload.current_role
    if payload.target_level:
        profile.target_level = payload.target_level
    if payload.experience_years is not None:
        profile.experience_years = payload.experience_years
    if payload.education:
        profile.education = payload.education
    if payload.location:
        profile.location = payload.location
    if payload.linkedin_url:
        profile.linkedin_url = payload.linkedin_url
    if payload.skills is not None:
        profile.skills = payload.skills
    elif payload.resume_text:
        # Extract keywords or store resume text snippet
        extracted = [s.strip() for s in payload.resume_text.replace("\n", ",").split(",") if len(s.strip()) > 3][:6]
        profile.skills = extracted or ["Management Consulting", "Target Operating Model"]

    db.commit()
    db.refresh(candidate)
    return candidate


@router.get("/me/dashboard", response_model=CandidateDashboardResponse)
def get_candidate_dashboard(db: Session = Depends(get_db)):
    """Retrieves aggregated candidate dashboard status, active attempt, and latest scores."""
    candidate = db.query(Candidate).first()
    if not candidate:
        raise EntityNotFoundException("Candidate", "active")

    active_attempt = db.query(Attempt).filter(
        Attempt.candidate_id == candidate.id,
        Attempt.status.in_(["IN_PROGRESS", "SUBMITTED"])
    ).order_by(Attempt.created_at.desc()).first()

    case_attempt = db.query(CaseAttempt).filter(
        CaseAttempt.candidate_id == candidate.id
    ).order_by(CaseAttempt.created_at.desc()).first()

    latest_score = db.query(ScoreRecord).filter(
        ScoreRecord.candidate_id == candidate.id
    ).order_by(ScoreRecord.created_at.desc()).first()

    latest_score_summary = None
    if latest_score:
        latest_score_summary = {
            "cci": latest_score.cci,
            "cpi": latest_score.cpi,
            "cri": latest_score.cri,
            "role_match": latest_score.role_match_score,
            "is_client_ready": latest_score.is_client_ready
        }

    roadmap = db.query(Roadmap).filter(Roadmap.candidate_id == candidate.id).first()
    roadmap_summary = {"phases_count": len(roadmap.phases)} if roadmap else None

    return CandidateDashboardResponse(
        candidate=candidate,
        active_attempt_id=active_attempt.id if active_attempt else None,
        attempt_status=active_attempt.status if active_attempt else None,
        case_attempt_id=case_attempt.id if case_attempt else None,
        case_status=case_attempt.status if case_attempt else None,
        latest_score_summary=latest_score_summary,
        roadmap_summary=roadmap_summary
    )


@router.post("/me/parse-resume")
def parse_candidate_resume(
    payload: dict,
    db: Session = Depends(get_db)
):
    """
    A03 Resume Intelligence Agent:
    Parses resume text and LinkedIn URL, extracts career timeline, education,
    and maps initial evidence claims to the METI Competency Ontology (C01-C20).
    """
    from app.services.llm_evaluator import LLMEvaluator

    resume_text = payload.get("resume_text", "")
    linkedin_url = payload.get("linkedin_url", "")

    extracted = LLMEvaluator.parse_resume_and_linkedin(resume_text=resume_text, linkedin_url=linkedin_url)

    # Sync into database candidate profile
    candidate = db.query(Candidate).first()
    if candidate:
        if extracted.get("target_role"):
            candidate.target_role = extracted["target_role"]
        if extracted.get("display_name"):
            candidate.display_name = extracted["display_name"]

        profile = candidate.profile
        if not profile:
            profile = CandidateProfile(candidate_id=candidate.id)
            db.add(profile)
            db.flush()

        if extracted.get("current_role"):
            profile.current_role = extracted["current_role"]
        if extracted.get("experience_years"):
            profile.experience_years = extracted["experience_years"]
        if extracted.get("education"):
            profile.education = extracted["education"]
        if extracted.get("location"):
            profile.location = extracted["location"]
        if extracted.get("skills"):
            profile.skills = extracted["skills"]
        if linkedin_url:
            profile.linkedin_url = linkedin_url

        db.commit()
        db.refresh(candidate)

    return {
        "status": "PARSED_AND_SYNCED",
        "agent": "A03_RESUME_INTELLIGENCE",
        "extracted_profile": extracted,
        "evidence_weight": 0.25,
        "candidate": candidate
    }
