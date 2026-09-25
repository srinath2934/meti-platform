import os

OUTPUT_DIR = r"d:\MODUS HACKTOHON\docs\tdd_sections"
os.makedirs(OUTPUT_DIR, exist_ok=True)

sections = {}

sections["01_EXECUTIVE_SUMMARY.md"] = """# Section 1: Executive Summary

METI (Modus Enterprise Talent Intelligence) should provide a dedicated Enterprise Management Consulting assessment journey that identifies what a candidate can do today, how they naturally think and work, what they have actually demonstrated, how ready they are for client-facing consulting, and what development pathway is most appropriate. The application must replace disconnected forms with a native, versioned assessment engine and an AI-assisted evidence model.

The uploaded consultant assessment already evaluates strategy, value chain, business analysis, process, target operating model, transformation, change management, consulting activities, international exposure, career motivation and development preference. The Enterprise Talent DNA assessment adds purpose, learning, systems thinking, innovation, communication, leadership, teamwork, consulting DNA and future/global thinking. The existing METI build specification adds resume intelligence, communication/video analysis, scoring, career matching, skills gaps, roadmaps, reports, dashboards, admin, knowledge graph and multi-agent orchestration. This TDD consolidates those elements into a management-consulting-first product architecture.

## Key Principles & Pillars

* **Preserve the current public story:** future of work → why enterprise management consulting → why Modus → candidate journey → capability assessment → next steps.
* **Use videos as first-class journey objects:** with completion tracking, captions, transcript, knowledge checks and admin versioning.
* **Commercialise distinct paid assessment products:** Management Consulting and Professional Personality & Values as distinct paid assessment products, with a combined bundle option; support save-and-resume and entitlement-based access.
* **Professional Personality & Values:** assessment built from Enterprise Talent DNA plus a Schwartz-informed values profile. Position it as professional-development intelligence, not a clinical or pass/fail personality diagnosis.
* **Weight demonstrated evidence:** more heavily than self-reported experience.
* **Multi-perspective views:** Generate candidate, assessor and recruiter views from the same evidence graph with different permissions.
* **Human-in-the-loop oversight:** Keep final high-stakes progression decisions human-reviewable and fully auditable.

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

for fname, content in sections.items():
    with open(os.path.join(OUTPUT_DIR, fname), "w", encoding="utf-8") as f:
        f.write(content)

print(f"Generated initial {len(sections)} sections in {OUTPUT_DIR}")
