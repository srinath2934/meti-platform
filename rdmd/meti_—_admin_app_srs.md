# METI — Admin App Software Requirements Specification

## 1. Goal

Provide controlled administration for assessment content, scoring, branching, videos, cases, learning content, reports, tenants, entitlements, analytics, AI configuration and governance.

## 2. Admin Roles

- Assessment Content Author
- Assessment Admin
- Compliance/Auditor
- Tenant Admin
- Super Admin

Permissions must be role-based and tenant-aware.

## 3. Admin Dashboard

Show:
- Active assessments
- Draft/published versions
- Candidate volume
- Completion
- Assessment performance
- Review queue
- AI confidence issues
- Calibration status
- Content health
- Tenant status

## 4. Assessment Management

Admin can:
- Create assessment definition
- Create sections
- Add questions
- Configure question type
- Map questions to competencies
- Configure scoring
- Configure evidence requirements
- Configure branching
- Set time limits
- Version
- Publish
- Archive

Published versions must be immutable.

## 5. Question Bank

Fields:
- Question ID
- Version
- Question type
- Prompt
- Options
- Competency mapping
- Scoring rule
- Sensitivity class
- Evidence requirement
- Branching rule
- Active status

Support all configured question types.

## 6. Rubric Management

Admin can configure:
- Rubric dimensions
- Anchors
- Weight
- Evidence requirements
- Scoring instructions
- Version

Rubric changes must create a new version.

## 7. Case Management

Admin can create:
- Case brief
- Industry
- Client situation
- Objective
- Constraints
- Data pack
- Time limit
- AI/resource policy
- Expected deliverables
- Rubric
- Evaluation configuration

## 8. Video Content

Admin can manage:
- Video title
- Description
- Provider/storage
- Locale
- Transcript
- Captions
- Thumbnail
- Duration
- Assessment version
- Effective dates
- Tenant visibility
- Completion threshold

## 9. Learning Content

Manage:
- Learning modules
- Competency mapping
- Videos
- Reading
- Workshops
- Assignments
- Mentor tasks
- Milestones
- Reassessment links

## 10. Scoring Configuration

Admin can view/configure:
- Competency weights
- Composite score configuration
- Gates
- Evidence confidence rules
- Role profiles
- Development gap rules

Scoring definitions must be versioned and protected from unauthorized edits.

## 11. Report Templates

Manage:
- Summary report
- Detailed report
- Assessor report
- Recruiter/employer report
- Development roadmap

Templates must reference evidence snapshots and report versions.

## 12. AI Governance

Manage/view:
- Agent identifier
- Prompt version
- Model policy
- Effective date
- Output schema
- Confidence rules
- Failure handling
- Review thresholds

Admin cannot allow an agent to directly alter immutable score definitions.

## 13. Tenant Administration

Tenant configuration:
- Branding
- Pricing
- Products
- Reports
- Data boundaries
- Allowed content
- Campaigns

All tenant-owned records must preserve tenant isolation.

## 14. Compliance

Auditor view:
- Consent versions
- AI model/prompt versions
- Fairness metrics
- Audit events
- Human overrides
- Access history

## 15. Analytics

Track:
- Assessment starts/completions
- Drop-off by section
- Question performance
- Video completion
- Case completion
- Review volume
- Score distributions
- AI/human variance
- Roadmap completion

## 16. Acceptance Criteria

Admin can create, version, test and publish an assessment without modifying application code.

No published assessment, scoring definition, rubric or prompt should be silently modified.
