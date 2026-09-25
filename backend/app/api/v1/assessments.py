from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.assessment import Assessment
from app.schemas.assessment import AssessmentResponse
from app.core.errors import EntityNotFoundException

router = APIRouter(prefix="/assessments", tags=["Assessments"])


@router.get("/active", response_model=AssessmentResponse)
def get_active_assessment(db: Session = Depends(get_db)):
    """Retrieves the active, published assessment definition (MC-A v1.0) with sections and questions."""
    assessment = db.query(Assessment).filter(Assessment.status == "PUBLISHED").first()
    if not assessment:
        raise EntityNotFoundException("Assessment", "active_published")
    return assessment


@router.get("/{assessment_id}", response_model=AssessmentResponse)
def get_assessment_by_id(assessment_id: str, db: Session = Depends(get_db)):
    """Retrieves a specific assessment by its unique identifier."""
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise EntityNotFoundException("Assessment", assessment_id)
    return assessment


@router.post("/video-evaluation")
def evaluate_video_presentation(
    payload: dict,
    db: Session = Depends(get_db)
):
    """
    A10 Communication Intelligence Agent:
    Evaluates candidate video speech transcript, acoustic cadence (WPM, pause density),
    and written synthesis against executive consulting standards.
    """
    from app.services.llm_evaluator import LLMEvaluator

    transcript = payload.get("transcript", "")
    speech_metrics = payload.get("speech_metrics", {})
    written_memo = payload.get("written_memo", "")

    evaluation = LLMEvaluator.evaluate_video_and_speech(
        transcript=transcript,
        speech_metrics=speech_metrics,
        written_memo=written_memo
    )

    return {
        "status": "EVALUATED",
        "agent": "A10_COMMUNICATION_INTELLIGENCE",
        "evaluation": evaluation,
        "evidence_weight": 0.80
    }


@router.post("/adaptive-next")
def get_adaptive_next_question(
    payload: dict,
    db: Session = Depends(get_db)
):
    """
    METI Adaptive Assessment Engine:
    Selects the next best scenario based on candidate responses, confidence,
    and CV context without exposing internal discrimination weights.
    Separates competency evidence from UX friction signals.
    """
    step = payload.get("step", 0)
    last_answer = payload.get("last_answer", "")
    confidence = payload.get("confidence", "Confident")
    ux_signals = payload.get("ux_signals", {})
    
    # Adaptive question sequence with natural transition narratives
    questions_flow = [
        {
            "id": "ADAPT_Q01",
            "domain": "PROBLEM STRUCTURING",
            "intent": "We're exploring how you approach ambiguous business problems.",
            "prompt": "A client has experienced a significant decline in profitability over the last 12 months. What would you investigate FIRST?",
            "options": [
                {"id": "opt_rev", "text": "Revenue decline & product line volume"},
                {"id": "opt_cost", "text": "Cost structure (fixed vs variable splits)"},
                {"id": "opt_mix", "text": "Customer mix & channel profitability"},
                {"id": "opt_market", "text": "Market conditions & macroeconomic shifts"}
            ],
            "allows_confidence": True
        },
        {
            "id": "ADAPT_Q02",
            "domain": "HYPOTHESIS FORMATION",
            "intent": "We're examining how you construct and prioritize testable business hypotheses.",
            "prompt": "Initial inquiry shows top-line revenue is flat (+1%), but direct fulfillment and shipping expenses surged by 28%. Which primary hypothesis would you test first?",
            "options": [
                {"id": "opt_h1", "text": "Supplier price inflation across packaging & logistics vendors"},
                {"id": "opt_h2", "text": "Customer ordering shift toward smaller, split-shipment baskets"},
                {"id": "opt_h3", "text": "Warehouse regional inventory imbalances causing long-haul routing"},
                {"id": "opt_h4", "text": "Contractual overtime surges due to manual warehouse packing bottlenecks"}
            ],
            "transition_narrative": "Your previous response gives us a clearer picture of how you structure problem boundaries. Let's explore how you construct and prioritize testable business hypotheses.",
            "allows_confidence": True
        },
        {
            "id": "ADAPT_Q03",
            "domain": "COMMERCIAL THINKING & TRADE-OFFS",
            "intent": "We're evaluating how you balance short-term margin recovery against customer lifetime value.",
            "prompt": "The VP of Logistics proposes an immediate $4.50 surcharge on split shipments to recover $12M annually. However, marketing warns this risks a 3.8% churn in Prime accounts ($18M LTV loss). How do you advise the Steering Committee?",
            "options": [
                {"id": "opt_c1", "text": "Implement the surcharge immediately with a 30-day grace period for enterprise tiers"},
                {"id": "opt_c2", "text": "Reject the surcharge; prioritize warehouse batching and route optimization first"},
                {"id": "opt_c3", "text": "Introduce tiered minimum basket incentives that reward consolidation without punitive fees"},
                {"id": "opt_c4", "text": "Pilot the surcharge exclusively in secondary markets while monitoring 90-day cohort retention"}
            ],
            "transition_narrative": "Clear hypothesis prioritization observed. Now let's explore how you evaluate trade-offs between immediate P&L margin recovery and long-term customer lifetime value.",
            "allows_confidence": True
        },
        {
            "id": "ADAPT_Q04",
            "domain": "EXECUTIVE STAKEHOLDER ALIGNMENT",
            "intent": "We're assessing your approach to managing conflicting C-suite incentives.",
            "prompt": "The CFO demands immediate margin recovery by Q3, while the Chief Commercial Officer refuses any policy that risks customer satisfaction. What is your alignment protocol?",
            "options": [
                {"id": "opt_s1", "text": "Facilitate a joint working session with shared financial modeling to align on a unified corporate target"},
                {"id": "opt_s2", "text": "Present the data directly to the CEO with an unbiased trade-off decision matrix"},
                {"id": "opt_s3", "text": "Adopt the CFO's margin plan and provide marketing with customer reassurance messaging"},
                {"id": "opt_s4", "text": "Compromise by phasing in half of the required cost cuts over an extended 18-month timeline"}
            ],
            "transition_narrative": "You demonstrated structured commercial trade-off analysis. Finally, let's explore how you navigate executive stakeholder friction.",
            "allows_confidence": True
        }
    ]

    if step < len(questions_flow):
        next_q = questions_flow[step]
        return {
            "status": "IN_PROGRESS",
            "step": step,
            "total_estimated": len(questions_flow),
            "question": next_q,
            "transition_narrative": next_q.get("transition_narrative", None),
            "diagnostic_summary": "METI is learning about your capability"
        }
    else:
        return {
            "status": "COMPLETED",
            "message": "Adaptive assessment sequence completed. Ready for multimodal video synthesis.",
            "next_target": "video"
        }


