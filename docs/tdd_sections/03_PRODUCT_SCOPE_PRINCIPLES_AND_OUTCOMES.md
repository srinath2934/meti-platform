# Section 3: Product Scope, Principles and Outcomes

## 3.1 In Scope
* Public landing and video-led orientation.
* Candidate registration, consent, identity, profile, CV/LinkedIn/portfolio ingestion and resume parsing.
* Product-level payment/entitlement gates for Management Consulting Assessment, Professional Personality & Values Assessment, combined bundles and the USD 250 Detailed Intelligence Report & Development Roadmap; configurable by tenant, country and campaign.
* Native assessment engine supporting single-choice, multi-select, ranked statements, matrix/Likert, scenario, free text, file upload, audio, video and case submissions.
* Enterprise Talent DNA assessment and Schwartz-informed values profile.
* Management Consulting capability assessments across strategy, research, enterprise analysis, value chain, processes, operating models, transformation, change, organisation, governance, programme/portfolio, AI awareness and executive communication.
* Video communication assessment and mock consulting interview.
* Case study and work-sample assessment with rubric-based AI scoring and human calibration.
* Consulting readiness, potential, client readiness, evidence confidence, skills gaps and development journey.
* AI-generated candidate report, internal assessor report and consented recruiter/employer view.
* Admin authoring, versioning, analytics, moderation, scoring weights, report templates and model/prompt governance.
* Multi-tenant capability for Modus, partner consultancies and future enterprise clients.

## 3.2 Out of Scope for v1
* Clinical or mental-health diagnosis.
* Automated adverse employment decisions without human review.
* Facial attractiveness, emotion, race, age, gender, disability or accent-based scoring.
* Claiming official psychometric validity before calibration and validation work is complete.
* Guaranteeing employment, salary, visa or client opportunity outcomes.

## 3.3 Core Design Principles
| Principle | Implementation meaning |
| :--- | :--- |
| **Evidence before assertion** | Self-report is useful context but cannot outweigh demonstrated case, written and video evidence. |
| **Explainability by design** | Every aggregate score must link to contributing assessments, questions, artifacts, rubrics, model version and confidence. |
| **Development, not rejection** | Reports should identify current readiness and the next achievable pathway. |
| **Version everything** | Assessments, questions, scoring weights, prompts, rubrics, videos and reports require immutable versions. |
| **Human-in-the-loop** | AI can score and recommend; human reviewers can confirm, override with reason, and audit. |
| **Fairness and accessibility** | Protected/sensitive fields are separated from scoring. Accommodations are supported without penalty. |
| **Platform, not form** | All journeys are native, data-backed workflows rather than embedded third-party forms. |
| **Reusable capability ontology** | Competencies, roles, industries, assignments, reports and learning modules share one graph model. |
