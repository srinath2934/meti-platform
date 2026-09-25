# Section 23: Non-Functional Requirements

| NFR | Target |
| :--- | :--- |
| **Availability** | 99.9% monthly target for candidate-facing platform excluding planned maintenance. |
| **Performance** | P95 API reads <500 ms; assessment save <800 ms; dashboard <2 s after warm cache; async scoring visible immediately. |
| **Autosave** | Response persisted within 2 seconds of change; offline queue retry. |
| **Scalability** | Baseline 10,000 concurrent active candidates with horizontally scalable services. |
| **Accessibility** | WCAG 2.2 AA target; captions/transcripts; keyboard rank controls; accessible video alternatives. |
| **Internationalisation** | Locale-aware content, currencies, time zones and date formats. |
| **Auditability** | Every score/recommendation reproducible from immutable version IDs and evidence snapshot. |
| **Recovery** | RPO ≤ 15 min for transactional data; RTO ≤ 4 hours baseline; backup restore tested quarterly. |
| **Observability** | Structured logs, distributed traces, metrics, AI call telemetry, cost/latency, queue depth. |
| **Security** | OWASP ASVS-aligned controls, dependency scanning, secret scanning, SAST/DAST, penetration testing. |
| **Data portability** | Reports as PDF plus machine-readable JSON; candidate export package. |
| **Browser support** | Chrome, Edge, Safari; responsive mobile support for non-case journeys. |
