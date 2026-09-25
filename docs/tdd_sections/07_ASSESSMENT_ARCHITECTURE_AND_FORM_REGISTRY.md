# Section 7: Assessment Architecture and Form Registry

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
