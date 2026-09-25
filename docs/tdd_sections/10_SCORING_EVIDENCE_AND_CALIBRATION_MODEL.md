# Section 10: Scoring, Evidence and Calibration Model

The scoring architecture separates self-report, objective/structured responses and demonstrated evidence, exposing an Evidence Confidence (EC) score.

## Capability Default Weights

| Capability component | Default weight % | Primary evidence |
| :--- | :--- | :--- |
| Strategy & Enterprise Thinking | 10 | F06, F17 |
| Research & Insight | 8 | F07, F17, F18 |
| Value Chain & Enterprise Analysis | 10 | F08, F17, F18 |
| Process / Capability / TOM | 10 | F09, F18 |
| Transformation & Change | 9 | F10, F18 |
| Organisation / Governance / Functional Design | 7 | F11, F18 |
| Programme / Portfolio / Benefits | 6 | F12 |
| Enterprise AI Transformation Awareness | 5 | F13 |
| Problem Structuring & Commercial Thinking | 10 | F17, F18 |
| Executive Communication — Written | 7 | F15, F18 |
| Executive Communication — Video | 7 | F16, F19 |
| Stakeholder / Facilitation | 5 | F19 |
| Professional Judgement | 4 | F14 |
| Learning Agility / Adaptability | 2 | F04, F21 |

## 10.1 Composite Scores
* **Consulting Capability Index (CCI):** Weighted demonstrated capability across C01–C20 (0–100 scale).
* **Consulting Potential Index (CPI):** Talent DNA, learning agility, motivation, consistency and improvement velocity (0–100 scale).
* **Client Readiness Index (CRI):** CCI + communication, judgement, stakeholder evidence, evidence confidence, and reviewer gate (0–100 scale + gate).
* **Evidence Confidence (EC):** Completeness, recency, objective evidence ratio, rubric agreement, cross-assessment consistency (0–100 scale).
* **Development Gap (DG):** Distance between current capability profile and target role profile (0–100 gap).
* **Role Match:** Cosine/weighted similarity between candidate competency vector and role requirement vector.

## 10.2 Evidence Weighting Rules
| Evidence type | Default confidence | Rules |
| :--- | :--- | :--- |
| Self-report checkbox / claim | 0.25 | Useful for branching and context; cap influence; never treat as proof. |
| Structured knowledge / scenario | 0.55 | Use keyed or rubric-scored answers; randomise question pools. |
| Written free-text response | 0.65 | LLM + deterministic rubric + calibration; store rationale and version. |
| Case / work-sample artifact | 0.85 | Primary capability evidence; score against explicit rubric. |
| Live / recorded consulting response | 0.80 | Transcript/content rubric plus delivery metrics; no facial/emotion scoring. |
| Verified prior work / portfolio | 0.75 | Candidate-supplied evidence; provenance and permission required. |
| Human assessor review | 0.95 | Final calibration evidence; overrides require reason and audit event. |

## 10.3 Readiness Thresholds
* **85–100:** High demonstrated capability; CRI and evidence gates apply → Direct consulting review / senior pathway.
* **70–84:** Consulting-ready with targeted gaps → Consultant / analyst + mentoring or short bridge plan.
* **55–69:** Strong potential, material development required → Foundation + supervised research/apprenticeship.
* **40–54:** Basic understanding / limited demonstration → Foundation training and reassess.
* **<40:** Early-stage capability or insufficient evidence → Awareness / learning roadmap.
