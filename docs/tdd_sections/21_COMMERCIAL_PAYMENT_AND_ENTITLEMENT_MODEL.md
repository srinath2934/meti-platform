# Section 21: Commercial, Payment and Entitlement Model

Product-led assessment commercial architecture:
* **Product MC-A (Management Consulting Assessment):** USD 25 default; assesses consulting knowledge, judgement, readiness; includes Summary of Findings.
* **Product PV-A (Professional Personality & Values Assessment):** USD 25 default; combines Enterprise Talent DNA + Schwartz values; includes Personality & Values Summary of Findings.
* **Product COMBO-A (Bundle):** Configurable price; runs common profile once; includes combined Summary of Findings.
* **Product D250 (Detailed Intelligence Report & Roadmap):** USD 250 default; unlocks full evidence explanations, detailed strengths/gaps, role/pathway interpretation, 16-week personalized roadmap, premium AI Results Explainer.

## 21.4 AI Results Explainer
Interactive METI Results Explainer as a constrained AI model over the candidate's locked assessment snapshot:
* Answers: "What does this score mean?", "Why is this a strength?", "What should I work on first?".
* Must never invent findings, change scores, or disclose hidden scoring keys.

## 21.5 Payment Requirements
* Provider: Stripe (adapter interface for Razorpay/PayPal).
* Webhook verification is source of truth for entitlement activation.
* Payment data is isolated from assessment-scoring agents.
