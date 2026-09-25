# Section 16: API, Event and Integration Design

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
