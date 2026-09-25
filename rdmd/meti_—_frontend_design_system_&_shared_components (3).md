# METI — Frontend Design System & Shared Components

## 1. Goal

Create a shared component system so Candidate, Assessment/Mentor and Admin applications use consistent interaction patterns while preserving role-specific workflows.

## 2. Layout

Shared:
- App shell
- Sidebar
- Top navigation
- Breadcrumbs
- Page header
- Section header
- Content container
- Split pane
- Drawer
- Modal
- Confirmation dialog

## 3. Data Display

- KPI card
- Score card
- Competency card
- Progress bar
- Radar/chart wrapper
- Evidence card
- Timeline
- Roadmap phase
- Table
- Filter bar
- Status badge
- Confidence indicator

## 4. Assessment Components

- Question shell
- Single choice
- Multi-select
- Ranking
- Matrix/Likert
- Scenario
- Text editor
- File uploader
- Audio recorder
- Video recorder
- Timer
- Progress indicator
- Save status
- Submit confirmation

## 5. Case Components

- Case brief
- Exhibit viewer
- Issue tree builder
- Hypothesis card
- Analysis workspace
- Option comparison
- Recommendation editor
- Risk list
- 90-day roadmap editor

## 6. Evidence Components

- Evidence source
- Evidence artifact
- Evidence confidence
- Evidence reference
- Score explanation
- Rubric panel
- AI rationale
- Human override panel
- Audit history

## 7. Roadmap Components

- Competency gap card
- Target/current comparison
- Phase timeline
- Learning item
- Assignment
- Milestone
- Reassessment marker
- Mentor feedback

## 8. State Components

Every reusable component must support:
- Loading
- Empty
- Error
- Disabled
- Locked
- Processing
- Success

## 9. Accessibility

All interactive components must:
- Work with keyboard
- Have accessible names
- Expose validation errors
- Maintain visible focus
- Support captions/transcripts
- Avoid color-only meaning

## 10. Responsive Strategy

Desktop-first for assessor/admin data-heavy workflows; responsive candidate experience for mobile/tablet where practical.

Video recording and complex case work should provide clear desktop recommendations where functionality is constrained.

## 11. Design Principle

Do not use visual complexity to hide weak information architecture. The interface should make the evidence → score → gap → action relationship obvious.
