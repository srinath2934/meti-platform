# Section 6: Video-Led Orientation and Learning Experience

Video content is a managed platform object rather than a hard-coded embed.

| ID | Video | Placement | Target length | Gate |
| :--- | :--- | :--- | :--- | :--- |
| **V01** | The Future of Enterprise Management Consulting | Public orientation | 3–6 min | Required / accessible equivalent |
| **V02** | Assessment Guidance & Honest Responses | Before diagnosis | 2–4 min | Required |
| **V03** | How Modus Thinks About Enterprise Strategy | Before strategy module | 3–5 min | Optional / recommended |
| **V04** | Value Chain and End-to-End Enterprise Thinking | Before value chain module | 3–5 min | Optional / recommended |
| **V05** | Operating Model / TOM Fundamentals | Before TOM module | 3–5 min | Optional / recommended |
| **V06** | Transformation, Change and Benefits | Before transformation module | 3–5 min | Optional / recommended |
| **V07** | Executive Communication for Consultants | Before video response | 2–4 min | Required |
| **V08** | Case Challenge Rules and AI Usage Policy | Before case | 2–3 min | Required |
| **V09** | Understanding Your METI Report | After report | 4–6 min | Recommended |
| **V10** | Your Development Journey | Before enrolment | 3–5 min | Recommended |

## 6.1 Video Platform Requirements
* **VideoSource:** Supports YouTube embed, hosted MP4/HLS and future provider adapters.
* **Metadata Stored:** Title, description, locale, transcript, captions, thumbnail, duration, assessment version, effective dates and tenant visibility.
* **Milestone Tracking:** Tracks start, pause, seek, 25/50/75/90/100% milestones, completion method and last position.
* **YouTube IFrame API:** Used for embed progress where YouTube is used; do not rely only on page dwell time.
* **Accessibility:** Captions, keyboard controls, transcript view and a "read transcript instead" path.
* **Knowledge Checks:** After required videos, show a 1–3 question knowledge check to confirm understanding of assessment rules, not to test memory of marketing content.
* **Unlock Thresholds:** Default 80% viewed; admin configures whether seeking counts toward completion.
* **Privacy Guardrail:** Never infer candidate characteristics from viewing behaviour; progress is used only for navigation and analytics.
