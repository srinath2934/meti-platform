import pytest
from app.services.scoring_engine import ScoringEngine, CONFIDENCE_WEIGHTS, COMPETENCY_DEFINITIONS


def test_confidence_weights_match_tdd():
    """Verify confidence hierarchy defined in TDD v1.1."""
    assert CONFIDENCE_WEIGHTS["SELF_REPORT"] == 0.25
    assert CONFIDENCE_WEIGHTS["PRIOR_WORK"] == 0.50
    assert CONFIDENCE_WEIGHTS["CASE_WORK_SAMPLE"] == 0.85
    assert CONFIDENCE_WEIGHTS["VIDEO_DELIVERY"] == 0.90
    assert CONFIDENCE_WEIGHTS["HUMAN_ASSESSOR"] == 1.00


def test_competency_catalog_contains_c01_to_c20():
    """Verify all 20 management consulting competencies exist."""
    assert len(COMPETENCY_DEFINITIONS) == 20
    assert "C01" in COMPETENCY_DEFINITIONS
    assert "C05" in COMPETENCY_DEFINITIONS
    assert "C10" in COMPETENCY_DEFINITIONS
    assert "C17" in COMPETENCY_DEFINITIONS
    assert "C20" in COMPETENCY_DEFINITIONS
