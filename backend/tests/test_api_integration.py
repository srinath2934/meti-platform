import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db.base import Base
from app.db.session import get_db
from app.db.seed import seed_database

# Configure in-memory SQLite engine for tests
TEST_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="module", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    seed_database(db)
    db.close()
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client():
    return TestClient(app)


def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["healthy", "degraded"]
    assert "version" in data


def test_get_current_candidate(client):
    response = client.get("/api/v1/candidates/me")
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "sarah.jenkins@modus-demo.com"
    assert data["display_name"] == "Sarah Jenkins"


def test_get_active_assessment(client):
    response = client.get("/api/v1/assessments/active")
    assert response.status_code == 200
    data = response.json()
    assert data["code"] == "MC-A"
    assert len(data["sections"]) > 0


def test_complete_assessment_workflow(client):
    # 1. Fetch candidate
    cand_resp = client.get("/api/v1/candidates/me").json()
    cand_id = cand_resp["id"]

    # 2. Fetch active assessment
    asm_resp = client.get("/api/v1/assessments/active").json()
    asm_id = asm_resp["id"]
    q_id = asm_resp["sections"][0]["questions"][0]["id"]

    # 3. Start attempt
    start_resp = client.post(
        f"/api/v1/assessments/{asm_id}/attempts",
        json={"candidate_id": cand_id, "assessment_id": asm_id}
    )
    assert start_resp.status_code == 200
    attempt_data = start_resp.json()
    attempt_id = attempt_data["id"]
    assert attempt_data["status"] == "IN_PROGRESS"
    assert attempt_data["timer"]["remaining_seconds"] > 0

    # 4. Autosave response
    save_resp = client.put(
        f"/api/v1/attempts/{attempt_id}/responses/{q_id}",
        json={"response_value": {"selected": "A"}, "is_final": False}
    )
    assert save_resp.status_code == 200
    assert save_resp.json()["status"] == "SAVED"

    # 5. Submit attempt
    submit_resp = client.post(f"/api/v1/attempts/{attempt_id}/submit")
    assert submit_resp.status_code == 200
    submit_data = submit_resp.json()
    assert submit_data["status"] == "SUBMITTED"
    assert "scores" in submit_data
    assert submit_data["scores"]["cci"] > 0

    # 6. Fetch authoritative scores
    scores_resp = client.get("/api/v1/candidates/me/scores")
    assert scores_resp.status_code == 200
    scores_data = scores_resp.json()
    assert scores_data["cci"] > 0
    assert scores_data["cpi"] > 0
    assert scores_data["cri"] > 0
    assert len(scores_data["radar_data"]) == 20


def test_case_study_workflow(client):
    cand_resp = client.get("/api/v1/candidates/me").json()
    cand_id = cand_resp["id"]

    # 1. Start case attempt
    start_case = client.post(
        "/api/v1/cases/cs_omni_turnaround/attempts",
        params={"candidate_id": cand_id}
    )
    assert start_case.status_code == 200
    case_attempt_id = start_case.json()["id"]

    # 2. Autosave deliverables
    save_deliv = client.put(
        f"/api/v1/case-attempts/{case_attempt_id}",
        json={
            "problem_statement": "Turnaround OmniRetail EBITDA from 7.0% back to 11.5% across 420 physical store network.",
            "success_metrics": "$54M EBITDA expansion, 12% omnichannel retention.",
            "issue_tree": {"root": "Turnaround", "branches": ["Revenue", "Costs"]},
            "quantitative_analysis": "EBITDA bridge adds $27M logistics savings."
        }
    )
    assert save_deliv.status_code == 200
    assert save_deliv.json()["status"] == "SAVED"

    # 3. Submit case and evaluate
    submit_case = client.post(f"/api/v1/case-attempts/{case_attempt_id}/submit")
    assert submit_case.status_code == 200
    submit_data = submit_case.json()
    assert submit_data["status"] == "SUBMITTED"
    assert submit_data["case_score"] >= 60.0
    assert "llm_feedback" in submit_data


def test_assessor_override_workflow(client):
    # Fetch review queue
    queue_resp = client.get("/api/v1/assessor/reviews")
    assert queue_resp.status_code == 200
    queue = queue_resp.json()
    assert len(queue) > 0
    attempt_id = queue[0]["attempt_id"]

    # Submit calibrated override
    override_resp = client.post(
        f"/api/v1/assessor/reviews/{attempt_id}/override",
        json={
            "reviewer_id": "lead_assessor_modus",
            "final_cci": 84.0,
            "final_cri": 82.0,
            "reason": "Demonstrated superior MECE problem structuring during turnaround case defense."
        }
    )
    assert override_resp.status_code == 200
    data = override_resp.json()
    assert data["override_applied"] is True
    assert data["final_cci"] == 84.0
    assert data["final_cri"] == 82.0
