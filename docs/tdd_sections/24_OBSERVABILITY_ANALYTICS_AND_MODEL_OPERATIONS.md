# Section 24: Observability, Analytics and Model Operations

## Telemetry Dimensions
* **Application:** Request latency, error rate, auth failures, autosave failures, upload failures.
* **Journey:** Conversion funnel (landing → video → registration → payment → assessment → report); abandonment by section/device.
* **Assessment Quality:** Item difficulty, response distribution, time per item, missingness, discrimination, question exposure rate.
* **AI Quality:** Schema-failure rate, latency/cost, human-vs-AI agreement, confidence distribution, override rate, prompt drift.
* **Video Telemetry:** Transcription error flags, audio quality rate, human rescore rate; never aggregate appearance analytics.
* **Commercial:** Product conversion rates, D250 upgrades, AI-explainer usage, refunds.
* **Fairness & Compliance:** Protected-field exclusion test, progression distribution monitoring, appeals, version audit.

## 24.1 Model Registry Requirements
For every AI-derived score, store: provider/model identifier, deployment name, prompt version, rubric version, temperature/policy, input evidence IDs, output JSON hash, token/cost telemetry, latency, confidence, and moderation flags.
