from app.services.llm_evaluator import LLMEvaluator


def test_deterministic_evaluator_returns_structured_rubric():
    """Verify fallback evaluator returns valid structured output without external API calls."""
    sample_deliverables = {
        "problem_statement": "Turnaround OmniRetail EBITDA from 7% back to 11.5% across 420 European store network.",
        "success_metrics": "Restored $72M EBITDA, reduced returns from 18.5% to 8%.",
        "issue_tree": {
            "root": "Turnaround EBITDA",
            "branches": [
                {"name": "Revenue Optimization", "sub": ["Price elasticity", "Digital channel mix"]},
                {"name": "Cost Rationalization", "sub": ["Fulfillment dis-synergies", "Store footprint"]}
            ]
        },
        "quantitative_analysis": "EBITDA bridge: $126M + $27M logistics savings + $27M promotional discipline = $180M (10%)."
    }

    result = LLMEvaluator.evaluate_case_deliverables(sample_deliverables)
    assert "overall_score" in result
    assert result["overall_score"] >= 70.0
    assert "strengths" in result
    assert len(result["strengths"]) > 0
    assert "issue_tree_score" in result
