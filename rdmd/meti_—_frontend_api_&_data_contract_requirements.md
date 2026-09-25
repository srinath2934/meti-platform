# METI — Frontend API & Data Contract Requirements

## 1. Goal

Define the frontend-facing contract required for Candidate, Assessment/Mentor and Admin applications. Backend implementation is outside this document, but frontend requirements depend on these objects and states.

## 2. Core Resources

Frontend must consume APIs for:
- Candidate
- CandidateProfile
- Consent
- Product
- PriceBook
- Payment
- Entitlement
- AssessmentDefinition
- AssessmentSection
- QuestionDefinition
- AssessmentAttempt
- Response
- EvidenceArtifact
- VideoSubmission
- Transcript
- RubricDefinition
- ScoreComponent
- CompositeScoreSet
- ValuesProfile
- Recommendation
- LearningPlan
- Report
- ReviewDecision
- VideoContent
- VideoProgress
- Payment
- PromptVersion
- AuditEvent

These correspond to the TDD data model.

## 3. Assessment API Requirements

GET assessment definition:
- version
- sections
- questions
- branching
- timing
- scoring/evidence metadata allowed for candidate

Create attempt.

Save response.

Save progress.

Submit response.

Complete attempt.

Resume attempt.

The client must never calculate authoritative scores.

## 4. Evidence API

Support:
- Upload initiation
- Upload progress
- Upload completion
- Evidence metadata
- Evidence provenance
- Consent scope
- Processing state
- Malware status
- Evidence references

## 5. Results API

Return:
- Composite scores
- Competency scores
- Evidence confidence
- Development gap
- Role match
- Strengths
- Development themes
- Explanation references

Frontend should not infer business conclusions from raw scores without backend-provided interpretation/configuration.

## 6. Roadmap API

Return:
- Target role
- Competencies
- Gap
- Learning modules
- Assignments
- Milestones
- Reassessment schedule
- Completion state

## 7. Assessor API

Support:
- Candidate queue
- Evidence retrieval
- Case submission
- Rubric
- AI score
- Human score
- Override
- Reason
- Review decision
- Audit event

## 8. Admin API

Support CRUD/version operations for:
- Assessment definitions
- Questions
- Branching
- Rubrics
- Cases
- Videos
- Learning modules
- Report templates
- Scoring profiles
- Prompt versions
- Tenants
- Products/entitlements

Published configurations must be immutable.

## 9. Error Contract

Frontend must distinguish:
- 400 validation
- 401 authentication
- 403 authorization
- 404 missing resource
- 409 version/state conflict
- 413 file too large
- 422 semantic validation
- 429 rate limit
- 5xx service failure

Errors must be user-readable without exposing internal implementation details.

## 10. Long-Running Jobs

Video transcription, AI scoring, report generation and file processing must expose processing states:
- queued
- processing
- completed
- failed
- review_required

Frontend must poll or subscribe according to the backend contract.

## 11. Versioning

Every assessment attempt must remain tied to the assessment version it used. UI must display version where relevant to reviewers/auditors.
