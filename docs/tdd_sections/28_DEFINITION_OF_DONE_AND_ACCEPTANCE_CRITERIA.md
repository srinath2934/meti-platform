# Section 28: Definition of Done and Acceptance Criteria

| Area | Acceptance criterion |
| :--- | :--- |
| **Journey** | Candidate can start from landing, choose Consulting, Personality & Values or bundle, pay, activate the correct entitlement, complete only entitled assessment modules, receive Summary of Findings, purchase the USD 250 detailed report/roadmap, and continue to the relevant development journey. |
| **Forms** | All F01–F22 definitions are supported by the native engine even if some modules are feature-flagged at launch. |
| **Versioning** | Every attempt binds to immutable assessment, question, scoring, prompt and report template versions. |
| **Scoring** | CCI/CPI/CRI/EC/DG reproduce deterministically from stored evidence and configuration; values are not included in pass/fail readiness. |
| **Video** | Record/upload/transcribe/score works; accessible alternative works; prohibited inferences are absent. |
| **Case** | Timed case supports exhibits, autosave, submission lock, rubric scoring and human review. |
| **Reports** | Summary Findings and USD 250 detailed candidate/internal PDF/dashboard variants are entitlement-correct, match the locked score snapshot, clearly distinguish included vs premium content and contain no unsupported AI claims. |
| **Security** | Tenant isolation, RBAC, consent, signed evidence access, malware scan and audit logs pass test suite. |
| **Fairness** | Protected/sensitive fields are demonstrably excluded from scoring inputs and prompts; monitoring dashboard available to compliance role. |
| **Admin** | Non-developer admin can create/publish assessments and manage product catalogue, MC/PV/bundle pricing, USD 250 premium price, coupons/sponsors, entitlements, report templates and country/tenant overrides without code changes. |
| **Observability** | Trace a candidate attempt from UI request through agent calls, scores and report via correlation ID. |
| **Documentation** | OpenAPI, data dictionary, agent contracts, runbooks, model cards, assessment version notes and deployment guide are generated/maintained. |
