# Section 5: End-to-End Candidate Journey

| Stage | Journey step | Experience | Core records |
| :--- | :--- | :--- | :--- |
| **0A** | **Discover** | Landing page explains the future of enterprise consulting and the Modus proposition. | Anonymous session + campaign attribution. |
| **0B** | **Watch Explainer** | Candidate watches V01; 80%+ completion or transcript/accessible equivalent unlocks "Start". | VideoProgress, transcript acknowledgement. |
| **0C** | **Guidance** | Assessment guidance video V02 + short comprehension check. | KnowledgeCheckResponse. |
| **1A** | **Register / Consent** | Account, identity, privacy consent, AI-scoring consent, communications preference. | Candidate, ConsentVersion, AuthIdentity. |
| **1B** | **Profile / Resume** | Education, experience, industries, geography, CV/LinkedIn/portfolio. | CandidateProfile + EvidenceArtifact. |
| **1C** | **Choose Product / Entitlement** | Candidate chooses Management Consulting Assessment, Professional Personality & Values Assessment, or a configurable combined bundle; payment activates only the purchased product entitlement. | Product, PriceBook, Payment, Invoice, Entitlement. |
| **1D** | **Paid Assessment** | Run only the entitled assessment modules. Consulting product prioritises consulting capability and readiness; Personality & Values product prioritises Talent DNA, behavioural preferences and Schwartz-informed values. Combined product runs both without duplicating shared profile questions. | AssessmentAttempts + ProductEntitlement + scores. |
| **1E** | **Included Summary of Findings** | Immediately show a concise findings summary: key scores, top strengths, priority development themes, values/personality highlights where purchased, evidence confidence and a high-level next-step recommendation. Detailed interpretation and roadmap remain locked unless the premium entitlement is purchased. | SummaryReportVersion + UpgradeOffer + Recommendation. |
| **2A** | **USD 250 Detailed Intelligence & Roadmap** | Premium upgrade unlocks detailed score interpretation, relevant deep-dive modules/evidence synthesis, full professional report, detailed gaps, role/pathway analysis and personalised development roadmap. Default price USD 250; configurable by tenant/country. | PremiumEntitlement + DetailedReport + LearningPlan + ExplanationSession. |
| **2B** | **Case / Work Sample** | Structured consulting case with written deliverables and optional data files. | CaseAttempt + Submission + RubricScore. |
| **2C** | **Video / Interview** | Executive answer, presentation or mock stakeholder discussion. | VideoSubmission + Transcript + CommunicationScore. |
| **3A** | **AI Synthesis** | Score, consistency, evidence confidence, role fit, gaps and pathway. | CompositeScore + EvidenceGraph. |
| **3B** | **Human Review** | Required for client-facing recommendation or borderline/low-confidence decisions. | ReviewDecision + override reason. |
| **4** | **Development Journey** | Foundation, Graduate Analyst, apprenticeship, mentor-led development, direct consulting or future reassessment. | LearningPlan + Milestones + Passport. |

## Session Design
* **Stage 1 Duration:** Achieve in ~35–45 minutes using adaptive branching and short modules.
* **Full Deep-Dive:** Split into resumable 15–30 minute blocks, not forced into one sitting.
* **Work Samples:** Separately timed and completed under "closed AI", "AI-assisted" or "open resource" conditions depending on case version.
