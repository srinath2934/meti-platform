# Section 26: DevSecOps, Deployment and Environments

## Environments

| Environment | Purpose | Data policy |
| :--- | :--- | :--- |
| **Local** | Developer Docker Compose; mocks for payment/email/AI where possible. | Synthetic data only. |
| **DEV** | Shared integration, automated tests, fast iteration. | Synthetic / approved test data. |
| **QA** | Release candidate, E2E, accessibility, performance smoke. | Synthetic + controlled calibration data. |
| **UAT** | Consulting/content owner acceptance and calibration. | Consented pilot data where required. |
| **PROD** | Live candidate / partner use. | Production data; strict RBAC, monitoring, backup and retention. |

## 26.1 CI/CD Pipeline
1. PR checks: Lint, type check, unit tests, secret scan, dependency scan, SAST, OpenAPI diff.
2. Build signed Docker images and SBOM; push to registry with immutable tag.
3. Deploy DEV automatically; run integration/E2E/contract tests.
4. Promote to QA/UAT via approval; run database migrations with backward-compatible strategy.
5. Production requires release approval, migration plan, feature flags and rollback image.
