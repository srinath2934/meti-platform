# METI — Assessment & Mentor App Software Requirements Specification

## 1. Goal

Provide assessors, senior consultants and mentors with the controlled interface required to review candidate evidence, validate AI-generated assessment outputs, calibrate cases/video, manage development activity and maintain human oversight.

## 2. Roles

### Assessor / Senior Consultant
- Review candidate evidence
- Review AI scoring
- Calibrate case/video
- Interview candidate
- Approve progression
- Add notes
- Override scores with reason

### Mentor
- View development profile
- View roadmap
- Set assignments
- Review progress
- Give development feedback
- Must not access unnecessary sensitive data

## 3. Assessor Dashboard

Display:
- Candidates requiring review
- Borderline/low-confidence cases
- Pending video reviews
- Pending case reviews
- Recent overrides
- Review SLA/status
- Calibration workload

Filters:
- Candidate
- Assessment
- Status
- Confidence
- Role
- Tenant
- Review date

## 4. Candidate Review

Candidate header:
- Name/ID
- Target role
- Assessment version
- Current status
- Readiness state
- Evidence confidence

Sections:
- Profile
- Competencies
- Evidence
- Case
- Video
- Scores
- Development gaps
- Audit/review history

## 5. Evidence Review

For each competency:
- Evidence source
- Evidence artifact
- Question/assessment reference
- Rubric
- AI score
- AI rationale
- Confidence
- Assessor score
- Final score

The UI must make it easy to trace an aggregate result back to evidence.

## 6. Case Review

Show:
- Case brief
- Candidate problem definition
- Issue tree
- Hypotheses
- Analysis
- Options
- Recommendation
- Risks
- 90-day actions
- Rubric dimensions
- AI score
- Evidence references

Assessor actions:
- Confirm score
- Adjust score
- Add rationale
- Flag concern
- Request further evidence

## 7. Video Review

Show:
- Video
- Transcript
- Delivery metrics
- Rubric
- AI score
- Evidence segments
- Confidence

Evaluate observable communication:
- Relevance/completeness
- Structure/pyramid logic
- Business reasoning/evidence
- Recommendation quality
- Clarity/concision
- Verbal delivery
- Audience adaptation/professionalism

Do not show or use prohibited inferences.

## 8. Human Override

Override workflow:
1. Show original AI result.
2. Show evidence.
3. Assessor enters new score/decision.
4. Assessor must provide reason.
5. Confirm override.
6. Create audit event.
7. Mark final decision.

No silent score changes.

## 9. Progression Decision

Possible states:
- Pending
- Evidence sufficient
- Human review required
- Approved
- Development required
- Reassessment required

Final client-facing progression decisions must remain human-reviewable.

## 10. Mentor Dashboard

Display:
- Assigned candidates
- Roadmap status
- Current gaps
- Active assignments
- Upcoming milestones
- Previous feedback
- Reassessment due

## 11. Mentor Candidate View

Show only required development information:
- Target role
- Competency gaps
- Roadmap
- Learning progress
- Assignments
- Feedback
- Milestones

Sensitive or restricted fields must not be shown unless authorized.

## 12. Assignment Management

Mentor can:
- Create/select assignment
- Assign competency
- Set due date
- Add instructions
- Review submission
- Give feedback
- Mark complete
- Request revision

## 13. Calibration

Provide calibration workspace:
- Case/video sample
- Rubric
- Candidate response
- AI score
- Human reference score
- Variance
- Calibration notes

## 14. Acceptance Criteria

Assessor must be able to complete a full review without leaving the application:
- Open candidate
- Inspect evidence
- Review AI scoring
- Review case/video
- Apply rubric
- Override with reason
- Finalize review
- See audit confirmation

Mentor must be able to:
- View assigned candidate
- Inspect development gaps
- Manage assignments
- Review progress
- Provide feedback
