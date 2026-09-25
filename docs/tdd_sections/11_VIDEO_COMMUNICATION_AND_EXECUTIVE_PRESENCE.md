# Section 11: Video Communication and Executive Presence Assessment

Client-facing consulting depends on the ability to explain a business problem, structure an answer, use evidence, adapt to an executive audience and make a clear recommendation. The platform scores observable communication, not appearance or inferred emotion.

## Rubric Dimensions

| Rubric dimension | Weight % | Scoring anchor |
| :--- | :--- | :--- |
| **Relevance & answer completeness** | 15 | Addresses the prompt, key constraints and client question. |
| **Structure / pyramid logic** | 20 | Clear headline, supporting points, sequence and close. |
| **Business reasoning & evidence** | 20 | Uses assumptions, evidence, trade-offs and implication. |
| **Recommendation quality** | 15 | Specific, actionable, balanced with risks / next steps. |
| **Clarity & concision** | 10 | Low redundancy, understandable language, executive brevity. |
| **Verbal delivery** | 10 | Pace, pauses, articulation, filler density and audibility; accent-neutral. |
| **Audience adaptation / professionalism** | 10 | Appropriate tone, stakeholder awareness and confidence without overclaiming. |

## 11.1 Technical Flow
1. Browser checks microphone/camera permissions and network quality; offer audio-only or upload alternative.
2. Candidate receives prompt and preparation timer.
3. Record using MediaRecorder / supported upload; stream to temporary object storage, then finalise to encrypted Blob path.
4. Generate transcript using speech service; retain timestamps and speaker confidence.
5. Compute deterministic delivery metrics: duration, words per minute, filler ratio, long pauses; never score accent.
6. LLM scores transcript/content against rubric using constrained JSON output and cites transcript segments as evidence.
7. If audio quality or model confidence is low, flag for human review rather than penalise.

## 11.2 Prohibited Inferences
* No facial emotion, attractiveness, age, gender, race/ethnicity, disability, health or socioeconomic inference.
* No scoring based on camera quality, clothing, background, skin tone or physical mannerisms.
* No accent penalty.
* No automated rejection from video alone.
