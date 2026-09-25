# Section 14: Knowledge Graph and Enterprise Ontology

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
