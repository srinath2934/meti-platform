import datetime
import logging
from sqlalchemy.orm import Session
from app.models.candidate import Candidate, CandidateProfile, Consent
from app.models.assessment import Assessment, Section, Question
from app.models.case import CaseStudy
from app.models.score import Roadmap

logger = logging.getLogger(__name__)


def seed_database(db: Session):
    """Preloads deterministic synthetic demo data for out-of-the-box MVP execution."""
    logger.info("Starting deterministic database seeding...")

    # 1. Candidate: Sarah Jenkins
    candidate = db.query(Candidate).filter(Candidate.email == "sarah.jenkins@modus-demo.com").first()
    if not candidate:
        candidate = Candidate(
            id="cand_sarah_jenkins",
            email="sarah.jenkins@modus-demo.com",
            display_name="Sarah Jenkins",
            status="ACTIVE",
            target_role="Enterprise Transformation Consultant"
        )
        db.add(candidate)
        db.flush()

        profile = CandidateProfile(
            candidate_id=candidate.id,
            education="MSc Strategy & Management, London School of Economics",
            experience_years=6,
            current_role="Senior Management Consultant",
            target_level="Principal / Engagement Manager",
            location="London, UK",
            linkedin_url="https://linkedin.com/in/sarah-jenkins-modus-demo",
            skills=["Target Operating Model", "Financial Modeling", "Digital Transformation", "MECE Structuring"]
        )
        db.add(profile)

        consents = [
            Consent(candidate_id=candidate.id, consent_type="DATA_PROCESSING", version="1.0", status="GRANTED"),
            Consent(candidate_id=candidate.id, consent_type="AI_EVALUATION", version="1.0", status="GRANTED"),
            Consent(candidate_id=candidate.id, consent_type="VIDEO_RECORDING", version="1.0", status="GRANTED")
        ]
        db.add_all(consents)

        # 3-Phase Personalized Roadmap
        roadmap = Roadmap(
            candidate_id=candidate.id,
            target_role="Enterprise Transformation Consultant",
            phases=[
                {
                    "phase_number": 1,
                    "title": "Operating Model & TOM Architecture",
                    "target_competency": "C05 / C06",
                    "duration_weeks": 4,
                    "modules": [
                        {"id": "mod_1", "title": "Enterprise TOM Frameworks & Layering", "hours": 12, "competency_code": "C05", "status": "IN_PROGRESS"},
                        {"id": "mod_2", "title": "Value Chain Decoupling & Shared Services", "hours": 10, "competency_code": "C06", "status": "PENDING"}
                    ]
                },
                {
                    "phase_number": 2,
                    "title": "Margin Analysis & Quantitative Rigor",
                    "target_competency": "C09 / C10",
                    "duration_weeks": 6,
                    "modules": [
                        {"id": "mod_3", "title": "EBITDA Bridge & Unit Economics Modeling", "hours": 16, "competency_code": "C10", "status": "PENDING"},
                        {"id": "mod_4", "title": "Capital Allocation Sensitivity Scenarios", "hours": 14, "competency_code": "C11", "status": "PENDING"}
                    ]
                },
                {
                    "phase_number": 3,
                    "title": "Executive Presence & Board Synthesis",
                    "target_competency": "C17 / C18",
                    "duration_weeks": 4,
                    "modules": [
                        {"id": "mod_5", "title": "Pyramid Principle & Executive Storyboarding", "hours": 10, "competency_code": "C18", "status": "PENDING"},
                        {"id": "mod_6", "title": "High-Stakes Client Alignment Simulation", "hours": 12, "competency_code": "C19", "status": "PENDING"}
                    ]
                }
            ]
        )
        db.add(roadmap)
        logger.info("Candidate Sarah Jenkins created with profile, consents, and roadmap.")

    # 2. Assessment: MC-A v1.0
    assessment = db.query(Assessment).filter(Assessment.code == "MC-A").first()
    if not assessment:
        assessment = Assessment(
            id="asm_mca_v1",
            code="MC-A",
            version="1.0",
            status="PUBLISHED",
            title="Enterprise Transformation Consultant Assessment",
            description="Comprehensive benchmark covering problem structuring, operating models, financial rigor, and executive presence.",
            product_code="MC-A",
            time_limit_seconds=3600
        )
        db.add(assessment)
        db.flush()

        # Section 1: Strategy & Diagnostic Hypotheses
        sec1 = Section(
            id="sec_strat",
            assessment_id=assessment.id,
            order_index=1,
            title="Enterprise Strategy & Value Chain",
            instructions="Evaluate client challenges by isolating core drivers without overlapping sub-branches.",
            time_allocation_seconds=900
        )
        db.add(sec1)
        db.flush()

        # Question 1: Single Choice (QT01)
        q1 = Question(
            id="q_01",
            section_id=sec1.id,
            code="Q01",
            order_index=1,
            type="QT01",
            prompt="A $2.4B omnichannel retailer notices that while online GMV has surged 40%, overall operating margin declined from 8.2% to 4.1% over 18 months. As the engagement lead, what is your initial diagnostic hypothesis?",
            options=[
                {"id": "opt_a", "label": "Marketing CAC is too high due to unoptimized performance advertising channels."},
                {"id": "opt_b", "label": "Fulfillment unit economics, returns processing, and split-shipment logistics are eroding digital contribution margins."},
                {"id": "opt_c", "label": "In-store staff headcount should be immediately reduced by 25% to offset digital costs."},
                {"id": "opt_d", "label": "Supplier wholesale purchase prices have increased across all categories evenly."}
            ],
            scoring_rule={"correct_answer": "opt_b"},
            competency_codes=["C01", "C03"]
        )

        # Question 2: Multi-Select (QT02)
        q2 = Question(
            id="q_02",
            section_id=sec1.id,
            code="Q02",
            order_index=2,
            type="QT02",
            prompt="Which of the following elements are mandatory pillars when designing a Target Operating Model (TOM) for enterprise agility? (Select top 3)",
            options=[
                {"id": "opt_1", "label": "Value Streams & Business Capabilities mapping"},
                {"id": "opt_2", "label": "Governance, RACI decision rights, and funding cadence"},
                {"id": "opt_3", "label": "Individual annual bonus percentage formula tables"},
                {"id": "opt_4", "label": "Technology, Data Architecture & Tool enablement"},
                {"id": "opt_5", "label": "Physical office desk lease contracts"}
            ],
            scoring_rule={"correct_answers": ["opt_1", "opt_2", "opt_4"]},
            competency_codes=["C05", "C06"]
        )

        # Question 3: Ranked 4 (QT03)
        q3 = Question(
            id="q_03",
            section_id=sec1.id,
            code="Q03",
            order_index=3,
            type="QT03",
            prompt="Rank these initiatives for an enterprise client facing an acute cash runway constraint (1 = Highest Immediate Priority, 4 = Lowest):",
            options=[
                {"id": "rank_a", "label": "Renegotiate supplier payment terms and liquidate slow-moving SKU inventory"},
                {"id": "rank_b", "label": "Initiate a 3-year enterprise-wide ERP cloud migration"},
                {"id": "rank_c", "label": "Halt non-revenue discretionary CapEx and freeze external contractor spend"},
                {"id": "rank_d", "label": "Launch customer advisory board for a 2028 new product roadmap"}
            ],
            scoring_rule={"optimal_ranking": ["rank_a", "rank_c", "rank_d", "rank_b"]},
            competency_codes=["C01", "C04"]
        )

        # Question 4: Matrix Likert (QT04)
        q4 = Question(
            id="q_04",
            section_id=sec1.id,
            code="Q04",
            order_index=4,
            type="QT04",
            prompt="Evaluate how effectively each lever addresses organizational resistance during an enterprise ERP transition:",
            options=[
                {"id": "row_1", "statement": "Role-specific hands-on workflow simulations"},
                {"id": "row_2", "statement": "Weekly all-hands broadcast emails from executive sponsor"},
                {"id": "row_3", "statement": "Incentivized peer change champions embedded in business units"}
            ],
            scoring_rule={"scale": ["Low Impact", "Moderate Impact", "High Impact", "Critical Lever"]},
            competency_codes=["C13", "C16"]
        )

        # Question 5: Scenario Judgment (QT05)
        q5 = Question(
            id="q_05",
            section_id=sec1.id,
            code="Q05",
            order_index=5,
            type="QT05",
            prompt="SCENARIO: During a cost-transformation engagement, your team finds data showing that a client Vice President's flagship initiative has negative ROI and is burning $1.2M/quarter. The VP privately asks you to omit that chart from the steering committee deck. What is your best action?",
            options=[
                {"id": "scen_a", "label": "Omit the slide as requested to protect relationship with the key sponsor."},
                {"id": "scen_b", "label": "Brief your Engagement Partner immediately, align on data integrity protocol, and present the objective findings constructive with mitigation options."},
                {"id": "scen_c", "label": "Confront the VP in the open steering committee meeting to demonstrate analytical boldness."},
                {"id": "scen_d", "label": "Anonymously leak the numbers to the Chief Financial Officer."}
            ],
            scoring_rule={"correct_answer": "scen_b"},
            competency_codes=["C17", "C19"]
        )

        db.add_all([q1, q2, q3, q4, q5])
        logger.info("Assessment MC-A v1.0 seeded with all 5 standardized TDD question types (QT01-QT05).")

    # 3. Work Sample: OmniRetail Case Study
    case = db.query(CaseStudy).filter(CaseStudy.code == "CASE-OMNI").first()
    if not case:
        case = CaseStudy(
            id="cs_omni_turnaround",
            code="CASE-OMNI",
            title="OmniRetail $1.8B Omnichannel Transformation",
            industry="Retail & Consumer Goods",
            objective="Formulate a 3-year turnaround strategy restoring EBITDA margin from 7.0% back to 11.5% while defending market share against pure-play e-commerce.",
            constraints="CapEx capped at $45M per annum; no unionized store closures allowed in Year 1.",
            brief="OmniRetail operates 420 physical stores and an online commerce platform across the UK & Europe. Despite growing digital top-line by 22%, overall company operating profitability fell by 300 bps due to logistics cost-to-serve dis-synergies and inventory markdowns.",
            exhibits=[
                {
                    "title": "Exhibit 1: Historical Financials (FY23 - FY25)",
                    "data": {
                        "Revenue": ["$1.65B", "$1.74B", "$1.80B"],
                        "Gross Margin": ["42.5%", "41.0%", "39.5%"],
                        "EBITDA": ["$198M (12.0%)", "$180M (10.3%)", "$126M (7.0%)"],
                        "Digital Share": ["14%", "19%", "24%"]
                    }
                },
                {
                    "title": "Exhibit 2: Channel Fulfillment Economics",
                    "data": {
                        "Physical Store Sale": "Cost-to-serve: 4.2% of order value, Returns: 3.1%",
                        "Online Ship-to-Home": "Cost-to-serve: 14.8% of order value, Returns: 18.5%",
                        "Click & Collect (BOPIS)": "Cost-to-serve: 6.5% of order value, Returns: 7.2%"
                    }
                }
            ],
            time_limit_minutes=45
        )
        db.add(case)
        logger.info("OmniRetail Transformation Case Study seeded.")

    db.commit()
    logger.info("Database seeding completed successfully.")
