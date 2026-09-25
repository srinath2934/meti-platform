# METI — Frontend Implementation Task Specification for AI Agent

## 1. Mission

Build the METI frontend as a production-oriented, data-driven enterprise assessment platform based on the METI TDD v1.1.

The implementation must cover three role-oriented applications:
1. Candidate
2. Assessment/Mentor
3. Admin

Do not implement a generic dashboard or static mockup. Build the core workflow end-to-end.

## 2. Primary Goal

Demonstrate this complete business loop:

Candidate → Assessment → Evidence → Case → Results → Capability Gaps → Development Roadmap.

## 3. Technical Direction

Preferred architecture:
- Next.js
- TypeScript
- Component-based UI
- Server/client boundaries appropriate to the framework
- Typed API client
- Schema validation
- Reusable assessment renderer
- RBAC-aware routing
- Responsive design

If an existing repository specifies a different stack, preserve repository conventions unless they conflict with the product requirements.

## 4. Implementation Order

### Phase 1 — Foundation
Build:
- App shell
- Authentication boundary
- RBAC
- Design tokens
- Shared components
- API client
- Error/loading patterns

### Phase 2 — Candidate
Build:
- Landing
- Orientation
- Registration/consent
- Profile
- Product/entitlement
- Assessment engine
- Case
- Results
- Gap analysis
- Roadmap

### Phase 3 — Assessment/Mentor
Build:
- Candidate queue
- Candidate detail
- Evidence review
- Case review
- Rubric
- Human override
- Mentor roadmap
- Assignments

### Phase 4 — Admin
Build:
- Admin dashboard
- Assessment builder
- Question bank
- Rubrics
- Case/content management
- Versioning
- Analytics/governance views

### Phase 5 — Integration
Connect:
- Assessment state
- Evidence
- Scoring
- Roadmap
- Review
- Audit

## 5. Assessment Engine Requirement

Implement a reusable renderer.

Input:
AssessmentDefinition

Output:
Interactive assessment UI.

Required renderer types:
- choice
- multi-select
- ranking
- matrix
- scenario
- text
- file
- audio
- video
- case

Do not create one component/page per assessment form.

## 6. Data-Driven Rule

The agent must not hard-code:
- Assessment questions
- Competency weights
- Branching logic
- Rubric values
- Role requirements
- Roadmap rules

These belong to backend/configuration.

## 7. Evidence-First UI

Every result should support:
Score → Explanation → Evidence.

Example:

Competency: Operating Model
Current score: 48
Target: 70
Gap: 22
Evidence:
- Case
- Work sample
- Assessment response

The user should be able to inspect the evidence where permissions allow.

## 8. Candidate MVP

Implement these routes first:

/  
/orientation  
/register  
/profile  
/assessments  
/assessments/[id]  
/cases/[id]  
/results  
/gaps  
/roadmap

## 9. Assessor MVP

/assessor  
/assessor/candidates  
/assessor/candidates/[id]  
/assessor/reviews/[id]  
/assessor/calibration

## 10. Admin MVP

/admin  
/admin/assessments  
/admin/assessments/[id]  
/admin/questions  
/admin/rubrics  
/admin/cases  
/admin/videos  
/admin/learning  
/admin/scoring  
/admin/audit

## 11. AI Agent Working Rules

Before coding:
1. Inspect existing repository.
2. Identify existing stack and conventions.
3. Identify existing routes/components.
4. Do not overwrite working code unnecessarily.
5. Map each requirement to a frontend feature.
6. Implement one vertical slice at a time.
7. Run tests after each major module.
8. Record assumptions explicitly.
9. Never invent backend contracts silently.
10. If backend is unavailable, use typed mock adapters that can later be replaced without changing UI components.

## 12. Required Vertical Slice

The first demo must work as:

1. Candidate opens platform.
2. Registers.
3. Completes profile.
4. Starts assessment.
5. Answers multiple question types.
6. Submits case.
7. Receives simulated/backend result.
8. Sees strengths and gaps.
9. Opens evidence.
10. Opens personalized roadmap.
11. Assessor can inspect candidate.
12. Assessor can review evidence and override a score.
13. Admin can inspect/configure assessment metadata.

## 13. Quality Bar

Reject these implementation patterns:
- Static screenshots masquerading as product
- Hardcoded scores
- Hardcoded assessment pages
- Fake AI results without a clear mock boundary
- Client-only authorization
- Missing loading/error states
- No resume behavior for long assessments
- No evidence traceability
- No version awareness
- Giant monolithic components
- Duplicated UI across roles

## 14. Deliverables

The coding agent must produce:
- Frontend application
- Reusable component system
- Typed models
- API adapters
- Candidate flow
- Assessment engine
- Case flow
- Results/gap/roadmap
- Assessor review flow
- Admin configuration flow
- Tests
- README with setup
- Requirement-to-implementation traceability table
- Explicit assumptions and unresolved backend dependencies

## 15. Final Acceptance

The implementation is successful only if a reviewer can understand, from the UI:

**What the candidate is trying to become → what was assessed → what evidence was collected → what the candidate demonstrated → where the gaps are → what the candidate should do next.**

That relationship is the central product experience.
