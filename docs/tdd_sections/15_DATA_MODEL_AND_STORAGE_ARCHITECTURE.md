# Section 15: Data Model and Storage Architecture

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
