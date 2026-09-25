import os

OUTPUT_DIR = r"d:\MODUS HACKTOHON\docs\tdd_sections"
os.makedirs(OUTPUT_DIR, exist_ok=True)

sections = {}

sections["01_EXECUTIVE_SUMMARY.md"] = """# Section 1: Executive Summary

METI (Modus Enterprise Talent Intelligence) should provide a dedicated Enterprise Management Consulting assessment journey that identifies what a candidate can do today, how they naturally think and work, what they have actually demonstrated, how ready they are for client-facing consulting, and what development pathway is most appropriate. The application must replace disconnected forms with a native, versioned assessment engine and an AI-assisted evidence model.

The uploaded consultant assessment already evaluates strategy, value chain, business analysis, process, target operating model, transformation, change management, consulting activities, international exposure, career motivation and development preference. The Enterprise Talent DNA assessment adds purpose, learning, systems thinking, innovation, communication, leadership, teamwork, consulting DNA and future/global thinking. The existing METI build specification adds resume intelligence, communication/video analysis, scoring, career matching, skills gaps, roadmaps, reports, dashboards, admin, knowledge graph and multi-agent orchestration. This TDD consolidates those elements into a management-consulting-first product architecture.

## Core Directives
* **Preserve the current public story:** future of work → why enterprise management consulting → why Modus → candidate journey → capability assessment → next steps.
* **Use videos as first-class journey objects:** with completion tracking, captions, transcript, knowledge checks and admin versioning.
* **Commercialise Management Consulting and Professional Personality & Values:** as distinct paid assessment products, with a combined bundle option; support save-and-resume and entitlement-based access.
* **Offer a Professional Personality & Values assessment:** built from Enterprise Talent DNA plus a Schwartz-informed values profile. Position it as professional-development intelligence, not a clinical or pass/fail personality diagnosis.
* **Weight demonstrated evidence:** more heavily than self-reported experience.
* **Generate candidate, assessor and recruiter views:** from the same evidence graph with different permissions.
* **Keep final high-stakes progression decisions:** human-reviewable and fully auditable.

```
METI Management Consulting Assessment Journey:
[Discover & Watch] -> [Register + Consent] -> [Pay / Entitlement] -> [Core Diagnosis] -> [Consulting Deep Dive] -> [AI Scoring + Review] -> [Report + Roadmap] -> [Development Journey]
(Save-and-resume across stages; every score is evidence-linked, versioned and explainable)
```

### Recommended Product Structure
Stage 0 Free Orientation → Paid Management Consulting Assessment and/or Paid Professional Personality & Values Assessment → Included Summary of Findings → Optional USD 250 Detailed Intelligence Report & Personal Development Roadmap → Consulting Deep Dive / Work Sample / Human Review → Development Journey / Mentoring / Reassessment. The product must support separate and bundled entitlements rather than forcing every user into one monolithic assessment.
"""

sections["02_SOURCE_BASIS_AND_TRACEABILITY.md"] = """# Section 2: Source Basis and Traceability

This TDD is grounded in the materials supplied for this request and the linked Modus public assessment experience. Where this document adds new design detail, that detail is explicitly treated as proposed product design rather than a statement from the source forms.

| Source | What it contributes | How this TDD uses it |
| :--- | :--- | :--- |
| **0001 — MODUS Enterprise Transformation Consultant Assessment** | 52-question baseline covering profile, experience, communication, strategy, value chain, business analysis, process/TOM, transformation/change, consulting activities, readiness, interests, industries, geography, support and long-term motivation. | Forms F01–F03 and F06–F18; competency model; branching; readiness routing. |
| **0002 — Modus Enterprise Talent DNA Assessment** | 42-question ranked-response assessment covering purpose, curiosity, systems thinking, innovation, communication, leadership, teamwork, consulting DNA and future/global thinking. | F04 Talent DNA; F05 values; behaviour and leadership reports. |
| **MASTER CODEX BUILD INSTRUCTION** | NextJS/FastAPI/PostgreSQL/Neo4j/Redis/Azure stack; 20 AI agents; multi-agent orchestration; reports, dashboards, RBAC and build rules. | Architecture, agents, APIs, knowledge graph, DevOps. |
| **METI — Commercial Model** | USD 25 diagnosis gateway, 25–40 page report, career matching, skills gap, roadmap, opportunity intelligence, candidate dashboard and later paid journeys. | Commercial gate, entitlements, report and pathway engine. |
| **Modus Learn — Industry Value Chain Transformation page** | Public narrative, explainer video, why consulting, Modus capability areas, journey choices, assessment stage, post-assessment outcomes and guidance video. | Stage 0 web experience, video flow, native assessment launch. |
| **Linked YouTube video: "00-Modus Enterprise Transformation"** | Video is embedded in the public Modus assessment experience; the accessible web page gives the surrounding explainer narrative and assessment flow. | Explainer video object V01 and orientation sequence. |
| **Schwartz Theory of Basic Human Values (external research)** | 10 motivational value types organised in a circular structure and four higher-order value groupings. | F05 values module and values-report logic; separate from pass/fail readiness scoring. |

> **Important assessment-governance note:** If Modus uses a Schwartz-informed custom question set, the product must call it "Schwartz-informed values profile" unless a validated, appropriately administered Schwartz instrument has been implemented and psychometrically validated for the intended use.
"""

sections["03_PRODUCT_SCOPE_PRINCIPLES_AND_OUTCOMES.md"] = """# Section 3: Product Scope, Principles and Outcomes

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
"""

sections["04_USERS_ROLES_AND_TENANCY.md"] = """# Section 4: Users, Roles and Tenancy

## Roles and Key Capabilities

| Role | Key capability |
| :--- | :--- |
| **Candidate** | Watch, register, pay, consent, complete assessments, submit video/work, review report, follow roadmap, interact with mentor. |
| **Assessor / Senior Consultant** | Review AI-scored evidence, calibrate cases/video, interview candidate, approve progression, add notes. |
| **Mentor** | See development profile and roadmap; set assignments; review progress; cannot access unnecessary sensitive data. |
| **Recruiter / Employer Viewer** | With candidate consent, view verified capability summary, evidence-backed readiness and shareable report. |
| **Assessment Content Author** | Create question banks, rubrics, cases, videos, learning content and report text. |
| **Assessment Admin** | Publish versions, manage weights, branches, entitlements, campaigns and calibration sets. |
| **Compliance / Auditor** | Read-only access to consent, model version, fairness metrics, audit events and overrides. |
| **Tenant Admin** | Manage partner consultancy / client organisation users, branding, price, allowed reports and data boundaries. |
| **Super Admin** | Global configuration, tenancy, models, environment flags, system policies, support and break-glass access. |

## Tenancy Model
* Every user, assessment attempt, evidence artifact, report and configuration record carries `tenant_id`.
* Tenant isolation is enforced at API, database and object-storage layers.
* Shared global content (e.g., Modus competency definitions) is read-only and versioned; tenant overlays may extend but not silently modify the global baseline.
"""

sections["05_END_TO_END_CANDIDATE_JOURNEY.md"] = """# Section 5: End-to-End Candidate Journey

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
"""

sections["06_VIDEO_LED_ORIENTATION_AND_LEARNING_EXPERIENCE.md"] = """# Section 6: Video-Led Orientation and Learning Experience

Video content is a managed platform object rather than a hard-coded embed.

| ID | Video | Placement | Target length | Gate |
| :--- | :--- | :--- | :--- | :--- |
| **V01** | The Future of Enterprise Management Consulting | Public orientation | 3–6 min | Required / accessible equivalent |
| **V02** | Assessment Guidance & Honest Responses | Before diagnosis | 2–4 min | Required |
| **V03** | How Modus Thinks About Enterprise Strategy | Before strategy module | 3–5 min | Optional / recommended |
| **V04** | Value Chain and End-to-End Enterprise Thinking | Before value chain module | 3–5 min | Optional / recommended |
| **V05** | Operating Model / TOM Fundamentals | Before TOM module | 3–5 min | Optional / recommended |
| **V06** | Transformation, Change and Benefits | Before transformation module | 3–5 min | Optional / recommended |
| **V07** | Executive Communication for Consultants | Before video response | 2–4 min | Required |
| **V08** | Case Challenge Rules and AI Usage Policy | Before case | 2–3 min | Required |
| **V09** | Understanding Your METI Report | After report | 4–6 min | Recommended |
| **V10** | Your Development Journey | Before enrolment | 3–5 min | Recommended |

## 6.1 Video Platform Requirements
* **VideoSource:** Supports YouTube embed, hosted MP4/HLS and future provider adapters.
* **Metadata Stored:** Title, description, locale, transcript, captions, thumbnail, duration, assessment version, effective dates and tenant visibility.
* **Milestone Tracking:** Tracks start, pause, seek, 25/50/75/90/100% milestones, completion method and last position.
* **YouTube IFrame API:** Used for embed progress where YouTube is used; do not rely only on page dwell time.
* **Accessibility:** Captions, keyboard controls, transcript view and a "read transcript instead" path.
* **Knowledge Checks:** After required videos, show a 1–3 question knowledge check to confirm understanding of assessment rules, not to test memory of marketing content.
* **Unlock Thresholds:** Default 80% viewed; admin configures whether seeking counts toward completion.
* **Privacy Guardrail:** Never infer candidate characteristics from viewing behaviour; progress is used only for navigation and analytics.
"""

sections["07_ASSESSMENT_ARCHITECTURE_AND_FORM_REGISTRY.md"] = """# Section 7: Assessment Architecture and Form Registry

Legacy forms are represented as versioned native assessment definitions. A "form" is a configurable collection of sections, items, scoring rules, branching rules and evidence requirements.

| ID | Assessment / Form | Category | Purpose / coverage | Scoring role |
| :--- | :--- | :--- | :--- | :--- |
| **F01** | Registration, Consent & Identity | Profile | Name, email, mobile, country/city, login identity, privacy/AI consent, age eligibility if legally necessary. | No readiness score. |
| **F02** | Education, Experience & Evidence Profile | Profile | Education, roles, years, companies, industries, markets, international exposure, CV/LinkedIn/portfolio. | Context + evidence confidence; capped self-report contribution. |
| **F03** | Career Aspiration & Consulting Motivation | Potential | Commitment, why consulting, target practice areas, target industries/geographies, start readiness, development preference. | Potential / motivation; not client-readiness proof. |
| **F04** | Enterprise Talent DNA | Potential | Purpose, curiosity, systems thinking, innovation, communication, leadership, teamwork, customer/consulting DNA, future thinking. | Talent DNA dimensions + consistency. |
| **F05** | Schwartz-Informed Values Profile | Development | 10 basic values and 4 higher-order dimensions using custom, theory-aligned items/ranks/scenarios. | Descriptive only; no pass/fail. |
| **F06** | Strategy & Enterprise Thinking | Capability | Strategy knowledge, translation into initiatives, business model, strategic choices, enterprise problem framing. | Objective + scenario score. |
| **F07** | Business & Industry Research | Capability | Desk research, source quality, market sizing, industry structure, hypothesis, stakeholder interview plan, synthesis. | Research score + source discipline. |
| **F08** | Value Chain & Enterprise Analysis | Capability | End-to-end customer/products/value chain/process/org/tech/data/suppliers/finance; industry value chains. | Value Chain / BA score. |
| **F09** | Process, Capability & Operating Model / TOM | Capability | BPMN/SIPOC/swimlanes/value streams, capabilities, TOM components and design trade-offs. | Process/TOM score. |
| **F10** | Transformation & Change | Capability | Current/future state, roadmap, change impact, stakeholders, adoption, benefits, governance. | Transformation/change score. |
| **F11** | Organisation, Governance & Functional Design | Capability | Org design, roles, RACI, decision rights, functional design, governance, KPIs, skills. | Org/governance score. |
| **F12** | Programme, Portfolio & Benefits | Capability | Portfolio logic, prioritisation, dependencies, risk, milestones, benefits and PMO/TMO governance. | Programme/portfolio score. |
| **F13** | Enterprise AI & Digital Transformation Awareness | Capability | AI opportunity framing, process/role impacts, governance, data readiness, responsible AI, vendor/architecture awareness. | AI-for-consultants score. |
| **F14** | Professional Judgement, Ethics & Client Stewardship | Behaviour | Evidence-based challenge, escalation, confidentiality, conflicts, handling pressure, responsible recommendations. | Judgement score; mandatory risk gates. |
| **F15** | Executive Communication — Written | Demonstrated | Executive email/memo, 1-page problem summary, recommendation, pyramid structure, data references. | Rubric score. |
| **F16** | Executive Communication — Video | Demonstrated | 2–5 minute response / presentation recorded in platform. | Communication + executive presence. |
| **F17** | Consulting Case & Problem Structuring | Demonstrated | Ambiguous enterprise case: issue tree, hypotheses, analyses, options, recommendation and risks. | Core case score. |
| **F18** | Work Sample / Deliverable Challenge | Demonstrated | Business case, value chain, TOM sketch, roadmap, stakeholder plan or executive deck. | Artifact rubric + evidence graph. |
| **F19** | Stakeholder / Workshop Simulation | Demonstrated | AI or human role-play: clarify needs, challenge assumptions, facilitate trade-offs, close actions. | Facilitation + stakeholder score. |
| **F20** | International & Client Readiness | Readiness | Cross-cultural examples, travel/work model preference, client exposure, communication confidence. | Contextual readiness; protected data excluded. |
| **F21** | Learning Agility & Development Preferences | Development | Availability for foundation, apprenticeship, mentoring, research projects, learning cadence. | Roadmap personalisation. |
| **F22** | Final Reflection & Long-Term Ambition | Development | Why Modus should invest, 5–10 year ambition, support needed, self-assessment. | Narrative input to roadmap; human-readable. |

## 7.1 Supported Question / Evidence Types
* Single choice, multi-select with min/max selections, true/false, numeric, date, short text, long text.
* Rank 4 / rank N, matrix Likert, forced-choice scenario, paired comparison and conditional follow-up.
* Case stem with shared exhibits, file attachments, tables, data extracts and time-boxed sections.
* File upload: PDF/DOCX/PPTX/XLSX/PNG/JPG/ZIP where allowed; malware scan and validation required.
* Audio/video record, upload or live response with duration controls and retry policy.
* Drag/drop sequencing and visual mapping via JSON schemas.
* AI-chat simulation where each turn is logged as evidence and scored against a rubric.

## 7.2 Branching Rules
Branching must be deterministic and stored with the attempt so later score audits reconstruct exactly what the candidate saw. Examples:
* Graduates skip detailed programme-management evidence unless they claim exposure.
* Experienced consultants receive scenario depth questions.
* Candidates with low video bandwidth can submit audio + written response.
* High score in a short screening module unlocks a shorter deep-dive.
"""

sections["08_MANAGEMENT_CONSULTING_COMPETENCY_MODEL.md"] = """# Section 8: Management Consulting Competency Model

## Competencies C01–C20

| ID / Competency | Definition |
| :--- | :--- |
| **C01 Enterprise Strategy** | Business strategy, strategic choices, competitive advantage, business model, strategic translation. |
| **C02 Research & Insight** | Industry research, market analysis, source quality, synthesis, hypothesis, evidence handling. |
| **C03 Enterprise Analysis** | End-to-end enterprise structure, customer/product/service, value systems, financial outcomes. |
| **C04 Value Chain Transformation** | Value chain mapping, bottlenecks, value creation, ecosystem, suppliers, cross-functional transformation. |
| **C05 Business Analysis** | Requirements, problem framing, stakeholder analysis, business cases, traceability, benefits. |
| **C06 Process & Capability** | Process hierarchy, BPMN/SIPOC/swimlanes/value streams, business capabilities, process excellence. |
| **C07 Operating Model / TOM** | Customer, product, service, value chain, process, org, governance, technology, data, people, skills, KPIs, suppliers, financial model. |
| **C08 Transformation Design** | Current state, future state, roadmap, dependencies, workstreams, governance, outcomes. |
| **C09 Change & Adoption** | Stakeholders, change impacts, communication, training, adoption, readiness. |
| **C10 Organisation & Governance** | Org structures, roles, RACI, decision rights, governance, functional design. |
| **C11 Programme / Portfolio / Benefits** | Prioritisation, dependencies, milestones, risk, benefits realisation, TMO/PMO. |
| **C12 Enterprise AI Transformation** | AI opportunity framing, role/process redesign, governance, data, responsible AI, adoption. |
| **C13 Problem Structuring** | Issue trees, hypotheses, MECE thinking, prioritisation, assumptions, synthesis. |
| **C14 Data & Commercial Thinking** | Quantitative reasoning, financial logic, KPI design, value cases, scenario analysis. |
| **C15 Executive Communication** | Structured writing, verbal clarity, brevity, audience adaptation, recommendation storytelling. |
| **C16 Facilitation & Stakeholder Management** | Listening, questioning, workshop design, conflict handling, decision facilitation. |
| **C17 Professional Judgement** | Ethics, confidentiality, evidence-based challenge, risk escalation, quality discipline. |
| **C18 Learning & Adaptability** | Curiosity, feedback response, learning agility, ambiguity tolerance, reflective practice. |
| **C19 Leadership & Collaboration** | Ownership, team contribution, mentoring, influence, constructive challenge. |
| **C20 International / Cross-Cultural Consulting** | Multicultural teamwork, global market awareness, adaptable communication and travel/client readiness. |

## 8.1 Proficiency Levels (L0–L4)

| Level | Evidence anchor |
| :--- | :--- |
| **L0 — Awareness** | Can recognise the concept but has not applied it. |
| **L1 — Assisted** | Can perform with a template, coaching or close review. |
| **L2 — Independent** | Can complete standard consulting work independently to quality expectations. |
| **L3 — Lead** | Can lead a workstream, facilitate senior stakeholders and coach others. |
| **L4 — Expert** | Can design methods, lead complex enterprise programmes and shape client executive decisions. |

> **Capability Anchor:** Proficiency is stored as evidence-backed capability estimates, not simple self-selected labels. A candidate may self-report L3, but the final estimated level remains L1/L2 if demonstrated evidence does not support the claim.
"""

sections["09_ENTERPRISE_TALENT_DNA_AND_SCHWARTZ_VALUES.md"] = """# Section 9: Enterprise Talent DNA and Schwartz Values

## 9.1 Talent DNA
Retain the ranked-response style because it reduces "all high scores" behaviour and captures trade-offs. The 9 Talent DNA dimensions are represented as separately scored scales:
1. Purpose & Motivation
2. Learning & Curiosity
3. Enterprise & Systems Thinking
4. Innovation & Entrepreneurship
5. Communication & Collaboration
6. Leadership & Professional Judgement
7. Teamwork & Relationships
8. Customer & Consulting DNA
9. Future & Global Thinking

* **Rank questions:** Use unique positions (1 to 4); no duplicate rank allowed.
* **Base scoring:** rank 1 = 4 points, rank 2 = 3, rank 3 = 2, rank 4 = 1.
* **Diagnostic role:** Talent DNA informs development potential and coaching style; demonstrated capability remains the primary client-readiness evidence.

## 9.2 Schwartz-Informed Values Model

| Value | Core motivational meaning | Consulting interpretation (developmental) |
| :--- | :--- | :--- |
| **Self-direction** | Independent thought/action; creating, choosing and exploring. | Hypothesis independence, intellectual courage, autonomous problem solving. |
| **Stimulation** | Novelty, challenge and excitement. | Comfort with ambiguity and transformation; potential novelty bias. |
| **Hedonism** | Pleasure and enjoyment. | Work-energy preference; report descriptively, not as consulting capability. |
| **Achievement** | Success through demonstrated competence. | Delivery drive, standards, career ambition; watch status-over-substance risk. |
| **Power** | Status, prestige and control of people/resources. | Influence/commercial leadership; develop collaborative use of authority. |
| **Security** | Safety, stability and harmony. | Risk awareness, control, governance, delivery reliability. |
| **Conformity** | Restraint to avoid harming others / violating expectations. | Protocol discipline, client norms, quality; balance with constructive challenge. |
| **Tradition** | Respect and commitment to established customs/ideas. | Institutional respect and continuity; balance with future-state redesign. |
| **Benevolence** | Welfare of people in close contact / in-group. | Team support, mentoring, client care and dependable collaboration. |
| **Universalism** | Understanding, tolerance and welfare of all people/nature. | Stakeholder breadth, ESG/public value and global/systemic orientation. |

## 9.3 Four Higher-Order Value Views
* **Openness to Change:** Self-direction + Stimulation (+ Hedonism) → Experimentation, autonomy, change orientation, ambiguity tolerance.
* **Self-Enhancement:** Achievement + Power (+ Hedonism) → Achievement drive, influence, advancement and commercial ambition.
* **Conservation:** Security + Conformity + Tradition → Stability, governance, duty, order, risk management and continuity.
* **Self-Transcendence:** Benevolence + Universalism → Stakeholder welfare, collaboration, purpose, inclusivity and societal impact.

## 9.4 Values Scoring Method
1. 30–40 original, theory-aligned items.
2. Primary basic value ID + optional secondary value with fractional weight.
3. Compute candidate's Mean Rating Across All items (`MRAT`).
4. Center each value: `centered_value = raw_value_mean - MRAT`.
5. Never use values scores as a rejection threshold or hidden "culture fit" filter.
"""

sections["10_SCORING_EVIDENCE_AND_CALIBRATION_MODEL.md"] = """# Section 10: Scoring, Evidence and Calibration Model

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
"""

sections["11_VIDEO_COMMUNICATION_AND_EXECUTIVE_PRESENCE.md"] = """# Section 11: Video Communication and Executive Presence Assessment

Client-facing consulting depends on the ability to explain a business problem, structure an answer, use evidence, adapt to an executive audience and make a clear recommendation. The platform scores observable communication, not appearance or inferred emotion.

## Rubric Dimensions

| Rubric dimension | Weight % | Scoring anchor |
| :--- | :--- | :--- |
| **Relevance & answer completeness** | 15 | Addresses the prompt, key constraints and client question. |
| **Structure / pyramid logic** | 20 | Clear headline, supporting points, sequence and close. |
| **Business reasoning & evidence** | 20 | Uses assumptions, evidence, trade-offs and implication. |
| **Recommendation quality** | 15 | Specific, actionable, balanced with risks / next steps. |
| **Clarity & concision** | 10 | Low redundancy, understandable language, executive brevity. |
| **Verbal delivery** | 10 | Pace, pauses, articulation, filler density and audibility; accent-neutral. |
| **Audience adaptation / professionalism** | 10 | Appropriate tone, stakeholder awareness and confidence without overclaiming. |

## 11.1 Technical Flow
1. Browser checks microphone/camera permissions and network quality; offer audio-only or upload alternative.
2. Candidate receives prompt and preparation timer.
3. Record using MediaRecorder / supported upload; stream to temporary object storage, then finalise to encrypted Blob path.
4. Generate transcript using speech service; retain timestamps and speaker confidence.
5. Compute deterministic delivery metrics: duration, words per minute, filler ratio, long pauses; never score accent.
6. LLM scores transcript/content against rubric using constrained JSON output and cites transcript segments as evidence.
7. If audio quality or model confidence is low, flag for human review rather than penalise.

## 11.2 Prohibited Inferences
* No facial emotion, attractiveness, age, gender, race/ethnicity, disability, health or socioeconomic inference.
* No scoring based on camera quality, clothing, background, skin tone or physical mannerisms.
* No accent penalty.
* No automated rejection from video alone.
"""

sections["12_CONSULTING_CASE_RESEARCH_AND_WORK_SAMPLE_ENGINE.md"] = """# Section 12: Consulting Case, Research and Work-Sample Engine

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
"""

sections["13_AI_AGENT_ARCHITECTURE_AND_ORCHESTRATION.md"] = """# Section 13: AI Agent Architecture and Orchestration

The platform deploys 20 specialized, single-responsibility AI agents (A01–A20) structured via a deterministic state graph:

| Agent | Responsibility | Primary output |
| :--- | :--- | :--- |
| **A01 Journey Orchestrator** | Determines next allowed stage, branching, retries, prerequisites and completion state. | JourneyState JSON |
| **A02 Registration & Profile Agent** | Normalises profile, education, experience, industries, geography and evidence links. | CandidateProfile |
| **A03 Resume Intelligence Agent** | Extracts roles, skills, industries, projects, achievements and consulting evidence from CV/portfolio. | EvidenceClaims + graph nodes |
| **A04 Video Learning Agent** | Tracks required video completion, transcript access and knowledge checks. | VideoProgress |
| **A05 Talent DNA Agent** | Scores F04 dimensions and response consistency. | TalentDNAProfile |
| **A06 Schwartz Values Agent** | Scores F05 basic/higher-order values and generates neutral development narrative. | ValuesProfile |
| **A07 Consulting Capability Agent** | Aggregates F06–F14 capability assessments against competency model. | CompetencyScores |
| **A08 Research & Industry Agent** | Scores source quality, research synthesis and industry reasoning. | ResearchScore |
| **A09 Case Assessment Agent** | Evaluates problem structuring, analysis, options and recommendation. | CaseRubricScore |
| **A10 Communication Intelligence Agent** | Scores written/video communication from transcripts/artifacts. | CommunicationScore |
| **A11 Stakeholder Simulation Agent** | Runs configured client/stakeholder role-play with hidden scenario state. | SimulationTranscript + score |
| **A12 Integrity & Consistency Agent** | Checks contradictory claims, missing evidence, copy similarity and AI-policy declarations. | Flags + confidence adjustments |
| **A13 Scoring & Calibration Agent** | Computes CCI/CPI/CRI/EC/DG, applies gates and calibration rules. | CompositeScoreSet |
| **A14 Role & Pathway Recommendation Agent** | Maps profile to consultant/analyst/graduate/research/apprenticeship pathways. | RecommendationSet |
| **A15 Skills Gap & Learning Agent** | Produces competency gaps, priority learning, assignments and reassessment plan. | LearningPlan |
| **A16 Report Generator Agent** | Builds candidate/internal/employer reports from locked evidence snapshot. | ReportPackage |
| **A17 Mentor Agent** | Explains report, coaches against roadmap, reviews assignments. | MentorConversation + actions |
| **A18 Human Review Assistant** | Summarises evidence for assessor and highlights low-confidence or conflicting areas. | ReviewBrief |
| **A19 Fairness & Compliance Agent** | Runs policy checks, protected-field exclusion tests and adverse-impact monitoring reports. | ComplianceFlags |
| **A20 Admin Intelligence Agent** | Assists admins with question/rubric analytics, item performance, content gaps and release checks. | AdminRecommendations |

## 13.1 Orchestration Flow
Candidate → Journey Orchestrator → Profile/Resume → Video Gate → Talent DNA + Values → Consulting Capability → Case/Work Sample → Communication/Simulation → Integrity/Consistency → Scoring/Calibration → Role/Pathway → Skills Gap/Learning → Report → Human Review if required → Dashboard/Mentor.

## 13.2 Agent Contract Requirements
* Versioned system prompt, input JSON schema, output JSON schema, allowed tools, timeout, retry policy and confidence contract.
* Agents are stateless where practical; shared state lives in PostgreSQL/Neo4j.
* No free-form chain-of-thought stored; store concise rationale, cited evidence IDs and decision metadata.
* All LLM outputs schema validated with single repair retry.
"""

sections["14_KNOWLEDGE_GRAPH_AND_ENTERPRISE_ONTOLOGY.md"] = """# Section 14: Knowledge Graph and Enterprise Ontology

## Logical Architecture
* **Experience Layer:** Landing • Video • Registration • Assessments • Dashboard • Reports • Mentor
* **Journey & Assessment Layer:** Form Engine • Video Engine • Case Engine • Work Samples • Interview • Payments
* **AI Orchestration Layer:** Journey Orchestrator • Consulting Agents • Schwartz Values • Communication • Scoring • Report
* **Knowledge & Reasoning Layer:** Competency Model • Question Bank • Rubrics • Neo4j Knowledge Graph • Azure AI Search • GraphRAG
* **Data & Evidence Layer:** PostgreSQL / Azure SQL • Blob Evidence • Redis • Transcripts • Scores • Audit Events
* **Platform Services:** Identity • RBAC • Consent • Notifications • Entitlements • Admin • Observability
* **Azure / DevSecOps:** Container Apps • GitHub Actions • Key Vault • Monitor • App Insights • Backup • DR

## Ontology Graph Nodes & Relations

| Node | Meaning |
| :--- | :--- |
| **Candidate** | Person-level assessment subject; pseudonymous internal ID. |
| **Role** | Enterprise Consultant, Transformation Consultant, Business Analyst, Graduate Analyst, etc. |
| **Competency** | C01–C20 capability nodes. |
| **Skill** | Specific method/tool/knowledge such as BPMN, value chain mapping, benefits realisation. |
| **Industry** | Retail, banking, manufacturing, healthcare, energy, technology, FMCG, logistics, public sector. |
| **Framework** | Value chain, TOM, business capability, RACI, change impact, programme governance. |
| **Assessment** | Published version of F01–F22. |
| **Question** | Versioned assessment item. |
| **Evidence** | Response, artifact, video, transcript, resume claim or assessor note. |
| **Rubric** | Versioned scoring criteria. |
| **Value** | Schwartz basic value or higher-order domain. |
| **LearningModule** | Video, reading, workshop, assignment or mentor task. |
| **Project** | Work sample / apprenticeship project. |
| **Report** | Immutable generated report snapshot. |
| **Tenant** | Modus / partner consultancy / client boundary. |

### Relationships
* `(:Candidate)-[:HAS_EVIDENCE]->(:Evidence)`
* `(:Evidence)-[:DEMONSTRATES]->(:Competency)`
* `(:Competency)-[:REQUIRED_FOR]->(:Role)`
* `(:Candidate)-[:HAS_ESTIMATED_LEVEL]->(:Competency)`
* `(:Question)-[:MEASURES]->(:Competency)`
* `(:Assessment)-[:CONTAINS]->(:Question)`
* `(:Evidence)-[:SCORED_BY]->(:Rubric)`
* `(:Candidate)-[:HAS_VALUE_PRIORITY]->(:Value)`
* `(:Candidate)-[:INTERESTED_IN]->(:Industry)`
* `(:Candidate)-[:MATCHES]->(:Role)`
* `(:Competency)-[:DEVELOPED_BY]->(:LearningModule)`
* `(:LearningModule)-[:REQUIRES]->(:Competency)`
* `(:Project)-[:PRODUCES_EVIDENCE_FOR]->(:Competency)`
* `(:Report)-[:SNAPSHOTS]->(:ScoreSet)`
* `(:Tenant)-[:OWNS]->(:Candidate|:Assessment|:Report)`
"""

sections["15_DATA_MODEL_AND_STORAGE_ARCHITECTURE.md"] = """# Section 15: Data Model and Storage Architecture

## Relational Entity Model

| Entity | Minimum fields / purpose |
| :--- | :--- |
| **Candidate** | id, tenant_id, user_id, enterprise_id, status, locale, created_at |
| **CandidateProfile** | candidate_id, education, experience_summary, industries, markets, links; sensitive fields separated |
| **ConsentRecord** | candidate_id, consent_type, version, granted_at, withdrawn_at, source_ip_hash |
| **AssessmentDefinition** | id, tenant_id/global, code, name, version, status, timing, scoring_profile_id |
| **AssessmentSection** | assessment_id, order, branch_expression, instructions, video_id |
| **QuestionDefinition** | id, version, type, prompt, options_json, competency_map, scoring_rule, sensitivity_class |
| **AssessmentAttempt** | candidate_id, assessment_version, started_at, completed_at, state, time_spent |
| **Response** | attempt_id, question_id, answer_json, submitted_at, source_mode |
| **EvidenceArtifact** | candidate_id, type, storage_uri, checksum, provenance, consent_scope, malware_status |
| **VideoSubmission** | artifact_id, prompt_version, duration, transcript_id, retry_no |
| **Transcript** | artifact_id, segments_json, language, confidence, service_version |
| **RubricDefinition** | id, version, dimensions_json, anchors_json |
| **ScoreComponent** | candidate_id, assessment_attempt_id, competency_id, raw, normalised, confidence, evidence_refs |
| **CompositeScoreSet** | candidate_id, scoring_profile_version, CCI, CPI, CRI, EC, DG, gates_json |
| **ValuesProfile** | candidate_id, scoring_version, ten_values_json, higher_order_json, reliability_flags |
| **Recommendation** | candidate_id, target_role_id, fit, readiness, rationale, mandatory_gaps |
| **LearningPlan** | candidate_id, version, target_role, milestones_json, reassessment_schedule |
| **Report** | candidate_id, report_type, version, evidence_snapshot_id, storage_uri, generated_at |
| **ReviewDecision** | candidate_id, reviewer_id, decision, override_from, reason, created_at |
| **VideoContent** | id, version, provider, url/storage, transcript, completion_rule |
| **VideoProgress** | candidate_id, video_id, watched_seconds, max_position, completion_method |
| **Payment** | candidate_id, provider, amount, currency, status, external_ref |
| **Entitlement** | candidate_id, product_code, starts_at, expires_at, source |
| **PromptVersion** | agent_code, version, prompt_hash, model_policy, effective_at |
| **AuditEvent** | actor_id, candidate_id, entity_type, entity_id, action, metadata, timestamp |

## 15.1 Storage Patterns
* **PostgreSQL / Azure SQL:** Transactional user, assessment, response, score, payment and audit metadata.
* **Neo4j:** Competency-role-skill-industry-assessment-learning relationships and evidence graph.
* **Azure Blob Storage:** CVs, case artifacts, video/audio, generated reports with short-lived SAS tokens.
* **Azure AI Search:** Approved knowledge, assessment guidance, case content vector index.
* **Redis:** Short-lived session state, rate limiting, queues, and orchestration locks.
"""

sections["16_API_EVENT_AND_INTEGRATION_DESIGN.md"] = """# Section 16: API, Event and Integration Design

## Core REST Endpoints

| Endpoint | Purpose |
| :--- | :--- |
| `POST /v1/auth/register` | Create account / initiate OTP or SSO. |
| `GET/PUT /v1/candidates/me` | Read/update allowed profile fields. |
| `POST /v1/consents` | Record consent version. |
| `POST /v1/evidence/uploads` | Create signed upload session; scan on completion. |
| `POST /v1/payments/checkout` | Create payment session / entitlement purchase. |
| `GET /v1/journey` | Return current stage, prerequisites and next action. |
| `GET /v1/videos/{id}` | Video metadata + transcript rights. |
| `POST /v1/videos/{id}/progress` | Store player milestones / completion. |
| `POST /v1/assessments/{code}/attempts` | Create attempt against a locked version. |
| `GET /v1/attempts/{id}/next` | Return next section/question according to stored branch graph. |
| `PUT /v1/attempts/{id}/responses/{questionId}` | Idempotent save/update answer before final submit. |
| `POST /v1/attempts/{id}/submit` | Lock attempt and enqueue scoring. |
| `POST /v1/video-prompts/{id}/submissions` | Create recorded response submission. |
| `POST /v1/cases/{id}/attempts` | Create case attempt / timer state. |
| `GET /v1/scores/me` | Candidate-safe composite scores and explainability. |
| `GET /v1/reports` | List generated reports. |
| `GET /v1/reports/{id}/download` | Authorised short-lived download. |
| `GET /v1/learning-plan` | Current roadmap and milestones. |
| `POST /v1/reviews/{candidateId}/decision` | Assessor decision / override with reason. |
| `POST /v1/admin/assessments` | Create draft assessment version. |
| `POST /v1/admin/assessments/{id}/publish` | Publish immutable version after validation. |
| `GET /v1/admin/calibration` | Item/model performance dashboard. |
| `GET /v1/admin/audit` | Audit query with RBAC. |

## 16.1 Domain Events
`CandidateRegistered`, `ConsentGranted`, `EntitlementActivated`, `VideoCompleted`, `AssessmentStarted`, `AssessmentSubmitted`, `ArtifactUploaded`, `TranscriptReady`, `ScoreCompleted`, `HumanReviewRequired`, `ReportGenerated`, `RecommendationCreated`, `LearningPlanPublished`, `ReassessmentDue`, `ConsentWithdrawn`.
"""

sections["17_USER_EXPERIENCE_AND_SCREEN_REQUIREMENTS.md"] = """# Section 17: User Experience and Screen Requirements

| Screen | Minimum requirements |
| :--- | :--- |
| **S01 Landing** | Hero, explainer, future of consulting, why Modus, journey paths, outcomes, privacy summary, Start CTA. |
| **S02 Video Explainer** | Large player, captions, transcript, progress, chapter markers, accessible completion alternative. |
| **S03 Registration** | Email/SSO/OTP, country, consent, minimum profile. |
| **S04 Checkout** | Product summary, currency/tax, coupon/sponsor code, payment status. |
| **S05 Candidate Dashboard** | Journey progress, next action, saved assessments, reports, roadmap, reassessment dates. |
| **S06 Assessment Runner** | Stepper, section intro/video, question, autosave, time indicator, accessibility, clear save/exit. |
| **S07 Rank Question** | Drag/drop + keyboard accessible up/down controls and rank labels. |
| **S08 Video Recorder** | Prompt, prep timer, device check, record/review/submit, transcript disclosure, retry policy. |
| **S09 Case Workspace** | Case brief, exhibits, timer, structured response tabs, file upload, AI-policy badge. |
| **S10 Report Viewer** | Executive summary, scores, heatmap, values wheel, strengths/gaps, role matches, roadmap, methodology. |
| **S11 Mentor Workspace** | Candidate plan, evidence-linked gaps, assignments, notes, progress, reassessment. |
| **S12 Assessor Review** | AI summary, evidence viewer, rubric, transcript/video, score confidence, approve/override. |
| **S13 Admin Assessment Builder** | Forms, sections, question bank, scoring map, branch rules, preview, validation, publish. |
| **S14 Admin Video Manager** | Video versions, provider, transcript, completion rules, mapped assessments. |
| **S15 Calibration / Fairness Dashboard** | Item performance, model-vs-human agreement, score distributions, flags, override rates. |
| **S16 Tenant / Commercial Admin** | Branding, products/pricing, entitlements, users, roles, report sharing policies. |

## 17.1 UX Requirements
* Mobile-responsive, desktop/tablet optimized for cases.
* Autosave every answer change; visible "Saved" state; safe resume.
* Progress shows sections completed, not misleading percent when branching occurs.
* Plain-language privacy and AI-scoring disclosure.
* WCAG 2.2 AA target: keyboard navigation, captions, transcript, no color-only meaning.
"""

sections["18_REPORT_GENERATION_AND_CANDIDATE_INTELLIGENCE.md"] = """# Section 18: Report Generation and Candidate Intelligence Outputs

Modular generation supporting 12–18 page core diagnosis and 25–40 page full consulting report:

## Report Blueprint Sections
1. Cover, enterprise ID, assessment version and date
2. Executive Summary: current stage, strongest evidence, priority gaps and recommended pathway
3. Consulting Capability Index, Potential Index, Client Readiness and Evidence Confidence
4. Competency radar across C01–C20
5. Capability heatmap: current estimated level vs target role level
6. Enterprise Talent DNA profile
7. Schwartz-informed Values Profile: wheel, higher-order balance, strengths/tensions, coaching implications
8. Strategy & Enterprise Thinking
9. Research & Industry Insight
10. Value Chain & Enterprise Analysis
11. Process / Capability / Operating Model / TOM
12. Transformation, Change, Organisation & Governance
13. Programme / Portfolio / Benefits and Enterprise AI awareness
14. Case / work-sample results with rubric evidence
15. Written & Video Executive Communication
16. Professional Judgement and Stakeholder / Facilitation readiness
17. Top role matches: Consultant, Transformation Consultant, BA, etc.
18. Skills Gap and Development Priorities
19. 12-week / 16-week personalised roadmap with assignments and reassessment milestones
20. Recommended Modus pathway and next action
21. Methodology, evidence confidence, limitations, AI/human review status and privacy statement

## 18.1 Report Variants
* **Detailed Candidate ($250):** Full developmental language, detailed consulting findings, full values profile, personalised roadmap.
* **Assessor:** Question-level evidence, low-confidence flags, model rationale, calibration status, review controls.
* **Employer / Recruiter:** Consented verified capability, role fit, selected evidence; excludes sensitive data.
* **Mentor:** Learning-relevant profile, gaps, values/coaching style, progress.
* **Summary Findings (Included with test):** Headline scores, top strengths, priority development themes, confidence, next steps.
"""

sections["19_DEVELOPMENT_PATHWAY_MENTOR_AND_LEARNING_ENGINE.md"] = """# Section 19: Development Pathway, Mentor and Learning Engine

## Pathways P1–P8

| Pathway | When recommended | Typical next step |
| :--- | :--- | :--- |
| **P1 Direct Consulting Review** | High capability + CRI + evidence confidence + human approval. | Client-facing shortlist; targeted onboarding. |
| **P2 Consultant Bridge** | Good capability with 2–4 specific gaps. | 4–8 week targeted modules and reassessment. |
| **P3 Graduate Analyst** | Strong potential, foundational capability, low experience. | Structured analyst development + supervised assignments. |
| **P4 Enterprise Transformation Foundation** | Material gaps across core consulting foundations. | 6–8 week Value Chain & Enterprise Transformation programme. |
| **P5 Research & Consulting Apprenticeship** | Need real evidence / international consulting exposure. | 2–3 month supervised research and live project work. |
| **P6 Business Analyst Route** | Strong analysis/value chain/process skills; consulting breadth still developing. | BA-focused assignments + strategy/TOM bridge. |
| **P7 Executive Upskilling** | Experienced manager/executive developing transformation consulting or AI advisory. | 6–12 week executive modular plan. |
| **P8 Future Reassessment** | Insufficient evidence or commitment today. | Self-learning plan + reassessment date; no negative label. |

## 19.1 Learning Plan Object
* Target role and target competency levels.
* Prioritised gaps, each linked to learning modules, videos, readings, exercises, cases and mentor tasks.
* Weekly milestones, estimated hours, evidence to submit and reassessment rules.
* Progress computed from evidence completion, not only content watched.
"""

sections["20_ADMINISTRATION_CONTENT_AND_GOVERNANCE.md"] = """# Section 20: Administration, Content and Assessment Governance

## Admin Modules

| Admin module | Requirements |
| :--- | :--- |
| **Assessment Builder** | Create draft versions, sections, instructions, questions, options, timers, branching and scoring mappings. |
| **Question Bank** | Tag by competency, level, industry, role, item type, language, validation status; manage retirement. |
| **Rubric Manager** | Define dimensions, anchors, weights, mandatory gates and examples. |
| **Case Library** | Cases, exhibits, AI-policy mode, time limit, target level, scoring rubric and allowed resources. |
| **Video Manager** | Upload/link, transcript, captions, completion rules, mapped stage, locale and effective dates. |
| **Scoring Profile** | Weights, normalisation, thresholds, confidence rules, role profiles and route logic. |
| **Prompt / Model Registry** | Agent prompt, schema, model, temperature/policy, effective dates, rollback and evaluation status. |
| **Report Templates** | Candidate/internal/employer layouts, narrative blocks, charts, branding, terms. |
| **Publishing Workflow** | Draft → peer review → calibration check → compliance check → approved → published. |
| **User / Role Admin** | RBAC, tenant membership, assessor assignment, mentor assignment, external viewer access. |
| **Commercial Admin** | Products, currencies, taxes, coupons, sponsor entitlements, invoice rules. |
| **Analytics** | Completion funnels, item statistics, time-on-task, score distributions, review overrides, model drift, fairness metrics. |

> **Publishing rule:** A published assessment version is immutable. To change a question, rubric, weight, video gate or report logic, create a new version. Existing attempts remain bound to the version they started.
"""

sections["21_COMMERCIAL_PAYMENT_AND_ENTITLEMENT_MODEL.md"] = """# Section 21: Commercial, Payment and Entitlement Model

Product-led assessment commercial architecture:
* **Product MC-A (Management Consulting Assessment):** USD 25 default; assesses consulting knowledge, judgement, readiness; includes Summary of Findings.
* **Product PV-A (Professional Personality & Values Assessment):** USD 25 default; combines Enterprise Talent DNA + Schwartz values; includes Personality & Values Summary of Findings.
* **Product COMBO-A (Bundle):** Configurable price; runs common profile once; includes combined Summary of Findings.
* **Product D250 (Detailed Intelligence Report & Roadmap):** USD 250 default; unlocks full evidence explanations, detailed strengths/gaps, role/pathway interpretation, 16-week personalized roadmap, premium AI Results Explainer.

## 21.4 AI Results Explainer
Interactive METI Results Explainer as a constrained AI model over the candidate's locked assessment snapshot:
* Answers: "What does this score mean?", "Why is this a strength?", "What should I work on first?".
* Must never invent findings, change scores, or disclose hidden scoring keys.

## 21.5 Payment Requirements
* Provider: Stripe (adapter interface for Razorpay/PayPal).
* Webhook verification is source of truth for entitlement activation.
* Payment data is isolated from assessment-scoring agents.
"""

sections["22_SECURITY_PRIVACY_FAIRNESS_AND_RESPONSIBLE_AI.md"] = """# Section 22: Security, Privacy, Fairness and Responsible AI

## 22.1 Authentication & Authorisation
* Candidates: Email OTP, Google/Microsoft SSO.
* Enterprise: Microsoft Entra ID.
* Short-lived JWT/OIDC tokens, refresh-token rotation, MFA for admin/assessor.
* RBAC + tenant scope + candidate consent scope on every protected endpoint.

## 22.2 Data Protection
* Encrypt in transit (TLS 1.2+) and at rest; keys in Azure Key Vault.
* Separate sensitive demographic/support data from scoring features. Gender, age, personal commitments must not influence capability scores.
* GDPR and DPDP compliance; data export, correction, and deletion workflows.

## 22.3 Fairness and Assessment Safety
* No protected attributes in scoring feature vectors or prompts.
* Video scoring is content/delivery based; accent-neutral; avoid facial/emotion inference.
* Values are developmental, not a culture-fit rejection tool.
* Human review mandatory before "client-facing ready" external recommendation.
* Audit logging of all score overrides with reason.

## 22.4 Prompt Injection / Untrusted Content
* CVs, PDFs, case uploads and free text treated as untrusted data strings.
* Content sanitisation, malware scanning, strict tool allow-lists.
* Retrieval filters enforce strict SQL, graph, and search tenant boundaries.
"""

sections["23_NON_FUNCTIONAL_REQUIREMENTS.md"] = """# Section 23: Non-Functional Requirements

| NFR | Target |
| :--- | :--- |
| **Availability** | 99.9% monthly target for candidate-facing platform excluding planned maintenance. |
| **Performance** | P95 API reads <500 ms; assessment save <800 ms; dashboard <2 s after warm cache; async scoring visible immediately. |
| **Autosave** | Response persisted within 2 seconds of change; offline queue retry. |
| **Scalability** | Baseline 10,000 concurrent active candidates with horizontally scalable services. |
| **Accessibility** | WCAG 2.2 AA target; captions/transcripts; keyboard rank controls; accessible video alternatives. |
| **Internationalisation** | Locale-aware content, currencies, time zones and date formats. |
| **Auditability** | Every score/recommendation reproducible from immutable version IDs and evidence snapshot. |
| **Recovery** | RPO ≤ 15 min for transactional data; RTO ≤ 4 hours baseline; backup restore tested quarterly. |
| **Observability** | Structured logs, distributed traces, metrics, AI call telemetry, cost/latency, queue depth. |
| **Security** | OWASP ASVS-aligned controls, dependency scanning, secret scanning, SAST/DAST, penetration testing. |
| **Data portability** | Reports as PDF plus machine-readable JSON; candidate export package. |
| **Browser support** | Chrome, Edge, Safari; responsive mobile support for non-case journeys. |
"""

sections["24_OBSERVABILITY_ANALYTICS_AND_MODEL_OPERATIONS.md"] = """# Section 24: Observability, Analytics and Model Operations

## Telemetry Dimensions
* **Application:** Request latency, error rate, auth failures, autosave failures, upload failures.
* **Journey:** Conversion funnel (landing → video → registration → payment → assessment → report); abandonment by section/device.
* **Assessment Quality:** Item difficulty, response distribution, time per item, missingness, discrimination, question exposure rate.
* **AI Quality:** Schema-failure rate, latency/cost, human-vs-AI agreement, confidence distribution, override rate, prompt drift.
* **Video Telemetry:** Transcription error flags, audio quality rate, human rescore rate; never aggregate appearance analytics.
* **Commercial:** Product conversion rates, D250 upgrades, AI-explainer usage, refunds.
* **Fairness & Compliance:** Protected-field exclusion test, progression distribution monitoring, appeals, version audit.

## 24.1 Model Registry Requirements
For every AI-derived score, store: provider/model identifier, deployment name, prompt version, rubric version, temperature/policy, input evidence IDs, output JSON hash, token/cost telemetry, latency, confidence, and moderation flags.
"""

sections["25_TESTING_PSYCHOMETRIC_CALIBRATION_AND_QA.md"] = """# Section 25: Testing, Psychometric Calibration and Quality Assurance

## 25.1 Software Test Pyramid
* **Unit tests:** Scoring functions, rank conversion, branching expressions, entitlements, role gates, API validation.
* **Contract tests:** Agent JSON schemas, event contracts, payment webhooks, storage adapters, search/graph filters.
* **Integration tests:** Assessment submit → score → report; video upload → transcript → score; payment → entitlement → unlock.
* **E2E tests:** Candidate flow on desktop/mobile; assessor review; admin publish; tenant isolation.
* **Security tests:** Broken access control, IDOR, upload abuse, prompt injection, tenant data leakage, secrets expiry.
* **Performance tests:** Large assessment, concurrent autosave, video upload, queue backpressure, report generation.

## 25.2 Psychometric Quality
* Expert review for each competency and proficiency level.
* Human rubric calibration ground truth.
* Item difficulty, ceiling/floor analysis, internal consistency.
* Test-retest stability for Talent DNA / values ($r \ge 0.82$).
* Inter-rater reliability for human assessors.

## 25.3 Release Gates
* **Assessment content:** Consulting lead approval + QA + no broken branching + accessibility review.
* **Scoring profile:** Unit tests + calibration sample + score-distribution review.
* **AI rubric scorer:** Schema pass >99%, defined human agreement threshold met, hallucination audit.
* **Video scoring:** Accent-neutral review, accessibility alternative, human fallback.
* **Report generator:** Score snapshot parity; PDF visual QA; privacy variant tests.
* **Tenant launch:** Data isolation test, RBAC test, pricing test.
"""

sections["26_DEVSECOPS_DEPLOYMENT_AND_ENVIRONMENTS.md"] = """# Section 26: DevSecOps, Deployment and Environments

## Environments

| Environment | Purpose | Data policy |
| :--- | :--- | :--- |
| **Local** | Developer Docker Compose; mocks for payment/email/AI where possible. | Synthetic data only. |
| **DEV** | Shared integration, automated tests, fast iteration. | Synthetic / approved test data. |
| **QA** | Release candidate, E2E, accessibility, performance smoke. | Synthetic + controlled calibration data. |
| **UAT** | Consulting/content owner acceptance and calibration. | Consented pilot data where required. |
| **PROD** | Live candidate / partner use. | Production data; strict RBAC, monitoring, backup and retention. |

## 26.1 CI/CD Pipeline
1. PR checks: Lint, type check, unit tests, secret scan, dependency scan, SAST, OpenAPI diff.
2. Build signed Docker images and SBOM; push to registry with immutable tag.
3. Deploy DEV automatically; run integration/E2E/contract tests.
4. Promote to QA/UAT via approval; run database migrations with backward-compatible strategy.
5. Production requires release approval, migration plan, feature flags and rollback image.
"""

sections["27_MVP_RELEASE_PLAN.md"] = """# Section 27: MVP / Release Plan

| Phase | Indicative duration | Deliverables |
| :--- | :--- | :--- |
| **Phase 0 — Foundation** | 2 weeks | Repo, architecture skeleton, auth, tenancy, RBAC, database, audit, CI/CD, Blob, admin shell. |
| **Phase 1 — Core Diagnosis** | 4 weeks | Landing/video, registration, product catalogue, separate Consulting and Personality & Values payments/entitlements, F01–F05 plus baseline consulting assessment, autosave, scoring, included Summary of Findings and USD 250 upgrade CTA. |
| **Phase 2 — Consulting Deep Dive** | 4 weeks | F06–F14 domain modules, question bank, branching, competency graph, scoring/calibration dashboard. |
| **Phase 3 — Video & Case Evidence** | 4 weeks | F15–F19, recorder, transcription, case workspace, rubric scoring, human review. |
| **Phase 4 — Development Journey** | 3 weeks | USD 250 detailed report entitlement, detailed evidence interpretation, personalised development roadmap, role match/gaps, AI Results Explainer, mentor workspace, reassessment and passport/progress. |
| **Phase 5 — Partner / Employer** | 3 weeks | Multi-tenant branding, employer/recruiter view, sharing consent, external reports, commercial admin. |
| **Phase 6 — Calibration & Hardening** | Ongoing | Psychometric/assessment calibration, fairness audits, performance, security, model evaluation, content expansion. |
"""

sections["28_DEFINITION_OF_DONE_AND_ACCEPTANCE_CRITERIA.md"] = """# Section 28: Definition of Done and Acceptance Criteria

| Area | Acceptance criterion |
| :--- | :--- |
| **Journey** | Candidate can start from landing, choose Consulting, Personality & Values or bundle, pay, activate the correct entitlement, complete only entitled assessment modules, receive Summary of Findings, purchase the USD 250 detailed report/roadmap, and continue to the relevant development journey. |
| **Forms** | All F01–F22 definitions are supported by the native engine even if some modules are feature-flagged at launch. |
| **Versioning** | Every attempt binds to immutable assessment, question, scoring, prompt and report template versions. |
| **Scoring** | CCI/CPI/CRI/EC/DG reproduce deterministically from stored evidence and configuration; values are not included in pass/fail readiness. |
| **Video** | Record/upload/transcribe/score works; accessible alternative works; prohibited inferences are absent. |
| **Case** | Timed case supports exhibits, autosave, submission lock, rubric scoring and human review. |
| **Reports** | Summary Findings and USD 250 detailed candidate/internal PDF/dashboard variants are entitlement-correct, match the locked score snapshot, clearly distinguish included vs premium content and contain no unsupported AI claims. |
| **Security** | Tenant isolation, RBAC, consent, signed evidence access, malware scan and audit logs pass test suite. |
| **Fairness** | Protected/sensitive fields are demonstrably excluded from scoring inputs and prompts; monitoring dashboard available to compliance role. |
| **Admin** | Non-developer admin can create/publish assessments and manage product catalogue, MC/PV/bundle pricing, USD 250 premium price, coupons/sponsors, entitlements, report templates and country/tenant overrides without code changes. |
| **Observability** | Trace a candidate attempt from UI request through agent calls, scores and report via correlation ID. |
| **Documentation** | OpenAPI, data dictionary, agent contracts, runbooks, model cards, assessment version notes and deployment guide are generated/maintained. |
"""

sections["APPENDIX_A_EXISTING_FORM_COVERAGE_MAP.md"] = """# Appendix A: Existing Form Coverage Map

Maps legacy uploaded forms into the native METI-MC assessment suite:

| Existing source block | Coverage | Target METI-MC module |
| :--- | :--- | :--- |
| Consultant Assessment Q1–8 | Identity / demographics / country-state-city | F01; sensitive fields separated from scoring. |
| Q9–17 | Education, experience types, industries, compensation, countries/cities | F02; compensation optional and excluded from readiness scoring. |
| Q18–21 | Business English, senior stakeholders, international/multicultural exposure, markets | F02 + F20; self-report context. |
| Q22–24 | Strategy confidence, translating strategy, consulting knowledge areas | F06 baseline + branching to F06–F13. |
| Q25–27 | End-to-end enterprise analysis, value chain mapping, industries understood | F08. |
| Q28–31 | Process level, BPMN/SIPOC/swimlanes/VSM/journey/service blueprint/process hierarchy, TOM, TOM components | F09. |
| Q32–34 | Transformation/change programme experience, activities, change management | F10. |
| Q35–38 | Independent consulting activities, capability self-view, role level, training/apprenticeship preference | F03 + F21; self-view does not override evidence. |
| Q39–46 | Career commitment, why consulting, interest areas, industries, geography, start date, CV/LinkedIn | F03 + F02. |
| Q47–51 | Personal commitments, assignment flexibility, working arrangement, support and learning environment | F20/F21 support context; not capability score. |
| Q52 | Why Modus should invest / 5–10 year ambition | F22. |
| Talent DNA Q16–18 | Purpose & Motivation | F04 Purpose + value/impact mapping. |
| Q19–21 | Learning & Curiosity | F04 Learning Agility. |
| Q22–24 | Enterprise & Systems Thinking | F04 Systems + F06 potential indicator. |
| Q25–27 | Innovation & Entrepreneurship | F04 Innovation. |
| Q28–30 | Communication & Collaboration | F04 behaviour + F19 potential. |
| Q31–33 | Leadership & Professional Judgement | F04 + F14. |
| Q34–36 | Teamwork & Relationships | F04 + F21 development context. |
| Q37–39 | Customer & Consulting DNA | F04 + F14. |
| Q40–42 | Future & Global Thinking | F04 + F05 Universalism / future orientation context. |
"""

sections["APPENDIX_B_PROPOSED_QUESTION_TYPE_CATALOGUE.md"] = """# Appendix B: Proposed Assessment Question-Type Catalogue

| Type | Use | Scoring |
| :--- | :--- | :--- |
| **QT01 Single choice** | Knowledge / classification / best action. | Keyed score or rubric. |
| **QT02 Multi-select** | Experience, methods, artifacts, industries. | Weighted with max cap; self-report confidence lower. |
| **QT03 Rank 4** | Talent DNA / forced trade-off. | 4-3-2-1 mapping by statement dimension. |
| **QT04 Matrix Likert** | Frequency / confidence / behavioural tendency. | Scale + reverse-coded metadata. |
| **QT05 Scenario judgement** | Client/ethics/change situations. | Rubric / best-next-action; may allow partial credit. |
| **QT06 Short text** | Clarification / factual response. | Validation or LLM rubric where needed. |
| **QT07 Long text** | Executive memo / reasoning / reflection. | LLM + rubric + human calibration. |
| **QT08 Numeric / calculation** | Commercial / quantitative case. | Deterministic calculation + tolerance. |
| **QT09 File upload** | Deck, memo, value chain, TOM, business case. | Artifact parsing + rubric. |
| **QT10 Video** | Executive answer / presentation. | Transcript rubric + delivery metrics. |
| **QT11 Audio** | Accessible / low-bandwidth alternative. | Same content rubric; delivery metrics. |
| **QT12 Timed case section** | Shared exhibits + structured responses. | Multi-dimensional case score. |
| **QT13 AI role-play chat** | Stakeholder simulation. | Turn-level rubric + final interaction score. |
| **QT14 Visual mapping** | Future drag/drop value chain/TOM map. | Structured JSON vs reference/rubric. |
| **QT15 Declaration** | AI policy, originality, consent, conflict. | Gate / audit, not capability points. |
"""

sections["APPENDIX_C_SCORE_FORMULAS_AND_THRESHOLDS.md"] = """# Appendix C: Score Formulas and Threshold Logic

## Mathematical Formulations

### Question Score
$$\\text{normalised\\_question} = \\text{clamp}\\left(\\frac{\\text{raw} - \\text{min\\_possible}}{\\text{max\\_possible} - \\text{min\\_possible}} \\times 100,\\, 0,\\, 100\\right)$$

### Competency Score
$$\\text{competency} = \\frac{\\sum (\\text{normalised\\_evidence} \\times \\text{evidence\\_confidence} \\times \\text{mapping\\_weight})}{\\sum (\\text{evidence\\_confidence} \\times \\text{mapping\\_weight})}$$

### Evidence Confidence (EC)
EC combines:
* `objective_evidence_ratio`
* `completion`
* `recency/provenance`
* `model_confidence`
* `human_agreement`
* `cross_assessment_consistency`

### Role Match
$$\\text{role\\_fit} = \\text{weighted\\_similarity}(\\mathbf{candidate\\_competency\\_vector},\\, \\mathbf{role\\_requirement\\_vector}) \\times \\text{mandatory\\_gate\\_factor}$$

### Client Readiness Gate
$$\\text{client\\_facing} = (\\text{CCI} \\ge \\text{threshold}) \\land (\\text{Communication} \\ge \\text{threshold}) \\land (\\text{Judgement} \\ge \\text{threshold}) \\land (\\text{EC} \\ge \\text{threshold}) \\land (\\text{no critical risk flags}) \\land (\\text{human\\_review} = \\text{approved})$$

### Values Profile Rule
Values are **not** included in CCI/CRI gates. They influence coaching narrative, preferred development style and optional team-working insights only.
"""

sections["APPENDIX_D_CANDIDATE_REPORT_BLUEPRINT.md"] = """# Appendix D: Candidate Report Blueprint

| Page / block | Content |
| :--- | :--- |
| **1** | Cover, Enterprise ID, date, report version, disclaimer. |
| **2** | Executive summary and recommended next action. |
| **3** | CCI / CPI / CRI / Evidence Confidence tiles. |
| **4** | C01–C20 capability radar. |
| **5–6** | Capability heatmap vs target role. |
| **7–8** | Enterprise Talent DNA profile. |
| **9–10** | Schwartz values wheel + higher-order balance + neutral interpretation. |
| **11–14** | Strategy, research, value chain and business analysis. |
| **15–17** | Process, TOM, transformation, change, organisation and governance. |
| **18** | Programme/portfolio, AI transformation awareness. |
| **19–21** | Case / work sample evidence and rubric. |
| **22–23** | Written + video executive communication. |
| **24** | Professional judgement, stakeholder/facilitation. |
| **25–26** | Role matches and mandatory gaps. |
| **27–30** | Skills gap, 12/16-week roadmap, assignments and reassessment. |
| **31** | Opportunity / industry/geography view if enabled. |
| **32** | Methodology, evidence sources, confidence, limitations and human review status. |
"""

sections["APPENDIX_E_CODEX_ENGINEERING_BUILD_DIRECTIVE.md"] = """# Appendix E: Codex / Engineering Build Directive

Master concise build instructions when initiating or refactoring the METI Management Consulting application:

1. **Enterprise Platform:** Build METI as a production-grade, multi-tenant Enterprise Talent Intelligence platform with a dedicated Enterprise Management Consulting track; do not build it as a single form or monolithic CRUD application.
2. **Architecture Stack:** Use NextJS 15 / React / TypeScript / Tailwind / ShadCN for web application; FastAPI + Python for backend APIs and AI services; PostgreSQL for transactions; Neo4j for competency/evidence graph; Redis for ephemeral state; Azure Blob for evidence; Azure OpenAI / NVIDIA NIM for LLM services; LangGraph for agent orchestration; Docker for deployment.
3. **Complete Journey:** Implement landing/video → registration/consent → entitlement/payment → core diagnosis → consulting deep dive → video/case/work sample → AI scoring → human review when required → report → role/pathway → learning plan/dashboard.
4. **Native Entities:** Implement native, versioned AssessmentDefinition, Section, Question, Response, Attempt, Rubric, ScoreComponent, CompositeScoreSet and EvidenceArtifact services. Never hard-code assessment content in UI components.
5. **Seed Definitions:** Create F01–F22 from this TDD as seed definitions. Support all question/evidence types in Appendix B, autosave, branching, timing, save/resume and immutable published versions.
6. **Talent DNA & Values:** Implement Enterprise Talent DNA and a Schwartz-informed values module. Values must be descriptive and excluded from client-readiness pass/fail scoring.
7. **Video Management:** Implement video management, playback progress, captions/transcript, recorder/upload, speech-to-text, content rubric scoring, deterministic delivery metrics and human fallback. Never score facial appearance/emotion, accent identity or protected traits.
8. **Competency Model:** Implement competency model C01–C20 and evidence-confidence scoring. Demonstrated case/video/work evidence must outweigh self-report.
9. **Agent Network:** Implement agents A01–A20 with strict JSON contracts, versioned prompts, schema validation, tool allow-lists, timeouts, retries, confidence and evidence citations. Persist shared state.
10. **RBAC:** Implement candidate, assessor, mentor, employer/recruiter, content author, admin, compliance and super-admin RBAC. Enforce tenant and consent scope.
11. **Modular Reports:** Implement candidate/internal/employer report variants from immutable score snapshots. Every AI narrative must be grounded in stored scores/evidence only.
12. **Admin Governance:** Implement admin builders for assessments, questions, rubrics, cases, videos, scoring profiles, report templates, prompts/models, users, pricing and publishing workflows.
13. **Responsible AI:** Implement security, privacy, accessibility, audit and fairness requirements from Section 22 as release-blocking requirements.
14. **Commercial Entitlements:** After each paid assessment, generate an entitlement-scoped Summary of Findings immediately. Add D250 as a separate USD 250 configurable entitlement that unlocks the detailed Intelligence Report, personalised Development Roadmap and premium AI Results Explainer.
15. **Product Models:** Implement Product, PriceBook, Bundle, Payment, Invoice and Entitlement services (MC-A, PV-A, COMBO-A, D250). Do not hard-code price or form access in the UI.
"""

for fname, content in sections.items():
    fpath = os.path.join(OUTPUT_DIR, fname)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print(f"Successfully generated all {len(sections)} TDD section markdown files in {OUTPUT_DIR}")
