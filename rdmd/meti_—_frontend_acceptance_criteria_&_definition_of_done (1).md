# METI — Frontend Acceptance Criteria & Definition of Done

## 1. Purpose

Provide testable acceptance criteria for the three frontend applications.

## 2. Candidate App

### Registration
- Candidate can register.
- Required consent is explicit.
- Missing consent blocks protected journey.
- Consent version is recorded/displayed.

### Profile
- Candidate can enter profile information.
- Candidate can upload CV.
- Candidate can provide LinkedIn/portfolio.
- Upload state is visible.
- Failed upload is recoverable.

### Assessment
- Assessment loads from configuration.
- All configured question types render.
- Required questions validate.
- Responses persist.
- User can resume where allowed.
- Branching follows configured rules.
- Submit requires confirmation.

### Case
- Case brief is visible.
- Candidate can create required outputs.
- Exhibits can be viewed.
- Submission state is visible.
- Time limit is respected where configured.

### Video
- Camera/microphone permission state is clear.
- Recording/upload works.
- Duration rules are enforced.
- Preview is available.
- Processing state is visible.

### Results
- Scores render from backend.
- Strengths/gaps render.
- Evidence confidence is visible.
- Score explanation links to evidence.
- Locked premium content remains inaccessible.

### Roadmap
- Current gaps map to roadmap items.
- Learning items show status.
- Assignments can be opened/submitted.
- Milestones show completion.

## 3. Assessment/Mentor App

### Review
- Assessor can find candidate.
- Evidence can be opened.
- Case response and rubric are visible.
- AI score/rationale is visible.
- Human score can be entered.
- Override requires reason.
- Final decision is auditable.

### Mentor
- Mentor sees only authorized development data.
- Mentor can assign work.
- Mentor can review submission.
- Mentor can provide feedback.
- Candidate progress updates.

## 4. Admin App

### Assessment
- Admin can create draft assessment.
- Questions can be added.
- Competency mapping can be configured.
- Branching can be configured.
- Assessment can be versioned.
- Published version cannot be silently edited.

### Rubrics
- Rubric dimensions and anchors can be managed.
- New version is created for material changes.

### Content
- Video, case and learning modules can be created/versioned.

### Governance
- Prompt/model version can be viewed.
- Audit events can be viewed.
- Tenant boundaries are respected.

## 5. Accessibility Acceptance

All critical flows:
- Keyboard accessible
- Focus visible
- Labels present
- Errors announced
- Captions/transcripts available for required video content

## 6. Security Acceptance

- Unauthorized routes rejected.
- Unauthorized actions rejected.
- Sensitive data hidden by role.
- Tenant boundaries enforced.
- No client-side-only authorization.

## 7. Performance Acceptance

- Initial critical screens load without unnecessary blocking.
- Large lists paginate.
- Video/file uploads show progress.
- Heavy components lazy-load where appropriate.

## 8. Definition of Done

A feature is Done when:
1. Requirements mapped to implementation.
2. UI implemented.
3. API integration complete.
4. All states implemented.
5. RBAC tested.
6. Accessibility checked.
7. Responsive behavior checked.
8. Error handling tested.
9. Analytics events added where required.
10. Unit/component tests exist for critical logic.
11. End-to-end test covers the primary workflow.
12. No hardcoded business rules where configuration is required.
