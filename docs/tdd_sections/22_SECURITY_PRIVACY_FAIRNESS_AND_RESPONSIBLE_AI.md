# Section 22: Security, Privacy, Fairness and Responsible AI

## 22.1 Authentication & Authorisation
* Candidates: Email OTP, Google/Microsoft SSO.
* Enterprise: Microsoft Entra ID.
* Short-lived JWT/OIDC tokens, refresh-token rotation, MFA for admin/assessor.
* RBAC + tenant scope + candidate consent scope on every protected endpoint.

## 22.2 Data Protection
* Encrypt in transit (TLS 1.2+) and at rest; keys in Azure Key Vault.
* Separate sensitive demographic/support data from scoring features. Gender, age, personal commitments must not influence capability scores.
* GDPR and DPDP compliance; data export, correction, and deletion workflows.

## 22.3 Fairness and Assessment Safety
* No protected attributes in scoring feature vectors or prompts.
* Video scoring is content/delivery based; accent-neutral; avoid facial/emotion inference.
* Values are developmental, not a culture-fit rejection tool.
* Human review mandatory before "client-facing ready" external recommendation.
* Audit logging of all score overrides with reason.

## 22.4 Prompt Injection / Untrusted Content
* CVs, PDFs, case uploads and free text treated as untrusted data strings.
* Content sanitisation, malware scanning, strict tool allow-lists.
* Retrieval filters enforce strict SQL, graph, and search tenant boundaries.
