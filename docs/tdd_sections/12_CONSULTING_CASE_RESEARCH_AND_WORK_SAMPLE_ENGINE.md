# Section 12: Consulting Case, Research and Work-Sample Engine

## Case Components
* **Case Brief:** Industry, client situation, objective, constraints, data pack, time limit, AI/resource policy.
* **Problem Definition:** Restate problem, success metric, scope, assumptions and key questions.
* **Issue Tree / Hypotheses:** Structured decomposition, prioritised hypotheses and rationale.
* **Analysis Tasks:** Market / value chain / process / operating model / financial / stakeholder analysis.
* **Options:** At least 2–3 feasible options with benefits, cost, risk, dependencies and trade-offs.
* **Recommendation:** Headline recommendation, evidence, decision rationale, risks and first 90-day actions.
* **Deliverable:** 1–3 page memo, 3–5 slide mini-deck, value-chain map, TOM sketch, roadmap or business case.
* **Reflection:** What additional data is needed; what could invalidate recommendation; what would you do next?

## 12.1 AI Usage Modes
| Mode | Candidate rule | Why use it |
| :--- | :--- | :--- |
| **Closed AI** | No generative AI; platform blocks embedded mentor and candidate signs declaration. | Tests unaided structuring and fundamentals. |
| **Open Resource** | Web/docs allowed but no generative AI. | Tests research discipline and synthesis. |
| **AI-Assisted Consulting** | AI tools explicitly allowed; candidate must include prompts/sources and critique outputs. | Tests future consulting practice: judgement using AI. |
| **Live Challenge** | Time-boxed screen + video response; assessor or agent introduces new information. | Tests adaptability and stakeholder reasoning. |

## 12.2 Case Scoring
* Explicit rubrics with 4–6 anchored levels per dimension.
* Score reasoning quality and evidence, not exact wording or a single "model answer".
* LLM score returns JSON: `dimension_score`, `evidence_quotes_or_artifact_refs`, `rationale`, `confidence`, `flags`.
* Validate quantitative calculations deterministically in code where possible before LLM synthesis.
* Human calibration sample comparison; if deviation exceeds tolerance, route to human review.
