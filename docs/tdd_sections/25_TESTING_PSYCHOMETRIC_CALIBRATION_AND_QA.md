# Section 25: Testing, Psychometric Calibration and Quality Assurance

## 25.1 Software Test Pyramid
* **Unit tests:** Scoring functions, rank conversion, branching expressions, entitlements, role gates, API validation.
* **Contract tests:** Agent JSON schemas, event contracts, payment webhooks, storage adapters, search/graph filters.
* **Integration tests:** Assessment submit → score → report; video upload → transcript → score; payment → entitlement → unlock.
* **E2E tests:** Candidate flow on desktop/mobile; assessor review; admin publish; tenant isolation.
* **Security tests:** Broken access control, IDOR, upload abuse, prompt injection, tenant data leakage, secrets expiry.
* **Performance tests:** Large assessment, concurrent autosave, video upload, queue backpressure, report generation.

## 25.2 Psychometric Quality
* Expert review for each competency and proficiency level.
* Human rubric calibration ground truth.
* Item difficulty, ceiling/floor analysis, internal consistency.
* Test-retest stability for Talent DNA / values ($r \ge 0.82$).
* Inter-rater reliability for human assessors.

## 25.3 Release Gates
* **Assessment content:** Consulting lead approval + QA + no broken branching + accessibility review.
* **Scoring profile:** Unit tests + calibration sample + score-distribution review.
* **AI rubric scorer:** Schema pass >99%, defined human agreement threshold met, hallucination audit.
* **Video scoring:** Accent-neutral review, accessibility alternative, human fallback.
* **Report generator:** Score snapshot parity; PDF visual QA; privacy variant tests.
* **Tenant launch:** Data isolation test, RBAC test, pricing test.
