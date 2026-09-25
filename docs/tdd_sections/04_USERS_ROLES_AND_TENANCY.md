# Section 4: Users, Roles and Tenancy

## Roles and Key Capabilities

| Role | Key capability |
| :--- | :--- |
| **Candidate** | Watch, register, pay, consent, complete assessments, submit video/work, review report, follow roadmap, interact with mentor. |
| **Assessor / Senior Consultant** | Review AI-scored evidence, calibrate cases/video, interview candidate, approve progression, add notes. |
| **Mentor** | See development profile and roadmap; set assignments; review progress; cannot access unnecessary sensitive data. |
| **Recruiter / Employer Viewer** | With candidate consent, view verified capability summary, evidence-backed readiness and shareable report. |
| **Assessment Content Author** | Create question banks, rubrics, cases, videos, learning content and report text. |
| **Assessment Admin** | Publish versions, manage weights, branches, entitlements, campaigns and calibration sets. |
| **Compliance / Auditor** | Read-only access to consent, model version, fairness metrics, audit events and overrides. |
| **Tenant Admin** | Manage partner consultancy / client organisation users, branding, price, allowed reports and data boundaries. |
| **Super Admin** | Global configuration, tenancy, models, environment flags, system policies, support and break-glass access. |

## Tenancy Model
* Every user, assessment attempt, evidence artifact, report and configuration record carries `tenant_id`.
* Tenant isolation is enforced at API, database and object-storage layers.
* Shared global content (e.g., Modus competency definitions) is read-only and versioned; tenant overlays may extend but not silently modify the global baseline.
