# Section 13: AI Agent Architecture and Orchestration

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
