# METI Management Consulting Platform
## UI/UX and Front-End Requirements Discovery

**Document status:** Discovery baseline — not yet approved for design or implementation  
**Source:** METI Technical Design & Development Document v1.1  
**Prepared by:** Manus AI  
**Date:** 24 September 2026

## 1. Purpose of this document

This document converts the METI Technical Design & Development Document (TDD) into a practical discovery framework for product owners, UX designers, UI designers, front-end engineers, assessment designers, consulting reviewers, and brand stakeholders.

The objective at this stage is not to choose colors, write production components, or build screens. The objective is to establish a shared understanding of the product, identify every required user journey and interface state, and surface unresolved decisions before visual design or engineering begins.

The TDD describes METI as an **evidence-based enterprise consulting capability, professional personality and values, reporting, and development platform**. The interface must therefore do more than collect answers. It must help users understand the journey, submit different forms of evidence, see how findings are produced, purchase optional products, receive development guidance, and interact with human and AI review without confusing developmental insight with clinical diagnosis or automated employment decisions. [1]

## 2. Working product definition

METI is a multi-tenant platform with two primary paid assessment products:

1. **Management Consulting Assessment**, focused on consulting knowledge, judgement, demonstrated capability, communication, readiness, and evidence-backed development gaps.
2. **Professional Personality & Values Assessment**, focused on Enterprise Talent DNA and a Schwartz-informed values profile for professional development.

A combined bundle may run shared profile questions once and produce both assessment outputs. Each paid assessment includes a useful Summary of Findings. A separate **Detailed Intelligence Report and Development Roadmap** is available as a configurable premium entitlement, with USD 250 as the default price in the TDD.

The product journey begins with a free, video-led orientation and can continue through assessment, report explanation, case or work-sample evidence, human review, mentoring, learning plans, and reassessment.

## 3. Discovery rules

The following distinctions will be maintained throughout discovery:

| Requirement class | Meaning | Treatment |
|---|---|---|
| Confirmed TDD requirement | Explicitly stated in the supplied specification | Must be preserved unless the product owner changes scope |
| UX interpretation | A design implication of a confirmed requirement | Must be validated with users and stakeholders |
| Open product decision | Not sufficiently defined in the TDD | Requires an answer before final UI specification |
| Engineering constraint | A technical or compliance condition affecting interface behavior | Must be represented in states, permissions, validation, and error handling |
| Brand dependency | Requires official Modus assets, guidelines, or approved references | Do not invent final brand styling before assets are supplied |

## 4. Primary audiences and roles

The interface must support different levels of information access. The same evidence model can produce different views, but the product must not expose the same content to every role.

| Role | Primary job in the product | Main interface need |
|---|---|---|
| Candidate | Understand, purchase, complete, review, and act on assessments | Clear progress, trust, accessibility, save-and-resume, understandable findings |
| Assessor / senior consultant | Review evidence, calibrate AI scoring, interview, approve or override progression | Dense evidence workspace, rubric controls, confidence indicators, audit trail |
| Mentor | Guide development and review progress | Learning plan, assignments, milestones, coaching context without unnecessary sensitive data |
| Recruiter / employer viewer | View consented, verified capability information | Restricted, shareable, evidence-backed summary |
| Content author | Create questions, rubrics, cases, videos, learning content, and report text | Authoring tools, previews, mappings, reusable versioned content |
| Assessment administrator | Publish versions, manage scoring, branching, entitlements, and campaigns | Governance controls, validation, release states, rollback visibility |
| Compliance / auditor | Inspect consent, fairness, model versions, overrides, and audit events | Read-only traceability and monitoring views |
| Tenant administrator | Manage branding, products, users, pricing, and data boundaries | Tenant-scoped configuration and permissions |
| Super administrator | Manage global platform policies, models, environments, and support | Global configuration and break-glass controls |

## 5. End-to-end experience map

The following is the candidate-facing experience currently implied by the TDD. Each stage requires a separate state model, not only a screen mockup.

| Stage | Candidate experience | Required UI states to discover |
|---|---|---|
| 0A Discover | Learn about the future of enterprise consulting, Modus, and the available journeys | First visit, returning visitor, campaign attribution, mobile layout, privacy summary |
| 0B Watch explainer | Watch the orientation video or use an accessible transcript alternative | Not started, in progress, paused, completed, transcript mode, inaccessible media, threshold not met |
| 0C Guidance | Watch assessment guidance and complete a short comprehension check | Check incomplete, passed, retry, explanation of assessment rules |
| 1A Register and consent | Create an account, provide identity information, and give privacy and AI-scoring consent | Email/OTP, optional SSO, consent version, withdraw/correction path, validation errors |
| 1B Profile and evidence | Add education, experience, industries, geography, CV, LinkedIn, or portfolio | Uploading, parsing, extracted data review, correction, unsupported file, privacy notice |
| 1C Choose product | Select Management Consulting, Personality & Values, or combined bundle | Product comparison, sponsor/coupon, region-specific pricing, already entitled, incomplete checkout |
| 1D Complete paid assessment | Complete only the modules covered by the active entitlement | Branching, autosave, resume, timed content, accessibility accommodation, locked submission |
| 1E Summary of Findings | Receive immediate useful findings after assessment completion | Generating, ready, score explanation, confidence, limitations, premium upgrade boundary |
| 2A Premium report and roadmap | Purchase or activate detailed intelligence and development roadmap | Locked preview, checkout, entitlement pending, generation, ready, PDF download |
| 2B Case or work sample | Complete structured consulting work under a defined AI-use policy | Brief, exhibits, timer, tabs, uploads, autosave, policy state, final submission |
| 2C Video or interview | Record an executive answer, presentation, or stakeholder discussion | Device check, preparation, recording, review, retry policy, upload, transcript disclosure |
| 3A AI synthesis | Review scores, evidence confidence, role fit, gaps, and pathway recommendations | Processing, partial results, low confidence, model safety failure, explainability |
| 3B Human review | Internal reviewer confirms, calibrates, or overrides a recommendation | Pending review, reviewer notes, override reason, approved, returned for evidence |
| 4 Development journey | Follow a roadmap, complete assignments, work with a mentor, and reassess | Milestone states, evidence submission, overdue, mentor feedback, historical plans |

## 6. Confirmed information architecture

The TDD names sixteen minimum screens. These should be treated as the initial information architecture, not as a final navigation model.

| ID | Screen | Minimum confirmed content |
|---|---|---|
| S01 | Landing | Hero, explainer, future of consulting, why Modus, journey paths, outcomes, privacy summary, Start CTA |
| S02 | Video Explainer | Large player, captions, transcript, progress, chapter markers, accessible completion alternative |
| S03 | Registration | Email, SSO/OTP, country, consent, minimum profile |
| S04 | Checkout | Product summary, currency and tax, coupon/sponsor code, payment status |
| S05 | Candidate Dashboard | Journey progress, next action, saved assessments, reports, roadmap, reassessment dates |
| S06 | Assessment Runner | Stepper, section introduction/video, question, autosave, time indicator, accessibility, save/exit |
| S07 | Rank Question | Drag/drop, keyboard-accessible up/down controls, rank labels |
| S08 | Video Recorder | Prompt, preparation timer, device check, record/review/submit, transcript disclosure, retry policy |
| S09 | Case Workspace | Case brief, exhibits, timer, structured response tabs, file upload, AI-policy badge |
| S10 | Report Viewer | Executive summary, scores, heatmap, values wheel, strengths/gaps, role matches, roadmap, methodology |
| S11 | Mentor Workspace | Candidate plan, evidence-linked gaps, assignments, notes, progress, reassessment |
| S12 | Assessor Review | AI summary, evidence viewer, rubric, transcript/video, score confidence, approve/override |
| S13 | Admin Assessment Builder | Forms, sections, question bank, scoring map, branch rules, preview, validation, publish |
| S14 | Admin Video Manager | Video versions, provider, transcript, completion rules, mapped assessments |
| S15 | Calibration / Fairness Dashboard | Item performance, model-human agreement, score distributions, flags, override rates |
| S16 | Tenant / Commercial Admin | Branding, products/pricing, entitlements, users, roles, report-sharing policies |

## 7. Candidate UX requirements

### 7.1 Trust and orientation

The first experience must clearly explain what METI does, why the assessment exists, what the candidate will be asked to provide, how evidence is used, what is optional, and what is not being assessed. The tone should be professional and developmental rather than evaluative or intimidating.

The product must distinguish between **capability evidence**, **potential and working preferences**, and **values information**. Values must be presented descriptively and must not appear to be a hidden culture-fit or rejection mechanism.

### 7.2 Progress and resumption

The candidate must be able to save and resume across sessions and devices. Autosave should happen after answer changes, with a visible saved state and clear failure recovery. Progress should communicate completed sections rather than a misleading percentage when branching changes the total number of questions.

The interface must make the next action obvious. A candidate should not need to remember which assessment, report, payment, upload, or review step is pending.

### 7.3 Assessment interaction model

The assessment engine must support single choice, multi-select, ranking, matrix/Likert, forced-choice scenarios, paired comparisons, free text, file upload, audio, video, case responses, drag-and-drop sequencing, and future visual mapping. Every question type requires a complete interaction specification covering instructions, validation, empty state, saved state, error state, accessibility behavior, review behavior, and submission locking.

Branching must be deterministic and stored with the attempt. The interface should explain why a section may be shorter or different without revealing scoring logic or creating anxiety.

### 7.4 Video and media

Video is a managed journey object, not a hard-coded embed. The experience must support captions, keyboard controls, transcript reading, completion tracking, chapter markers, accessible completion alternatives, and knowledge checks. Candidate viewing behavior may be used for navigation and analytics but must not be used to infer candidate characteristics.

The recording flow must include a prompt, preparation timer, camera and microphone check, recording state, review state, upload state, transcript disclosure, retry rules, and final locked submission. Video scoring must be based on observable content and delivery, not appearance, facial attractiveness, emotion inference, race, age, gender, disability, or accent.

### 7.5 Case and work-sample workspace

The case workspace is optimized for desktop and tablet. It should keep the case brief, exhibits, timer, response area, file uploads, and submission status visible without creating unnecessary context switching. The interface must clearly show whether the case permits no AI, AI-assisted work, or open resources.

Timed or locked submissions require a visible warning before final submission. Once a submission is locked, the candidate must understand what can no longer be changed and what evidence is retained.

### 7.6 Results and explainability

The candidate must receive an immediate Summary of Findings after a paid assessment. It should include headline scores, key strengths, development themes, evidence confidence, limitations, and a high-level next step. It must have real value while preserving a clear boundary between the included summary and the premium detailed report.

Every chart or score must provide a “How this was calculated” explanation. The explanation should identify contributing assessment areas and evidence types, display confidence and human-review status where relevant, and avoid exposing proprietary scoring keys.

The Results Explainer must answer questions such as “What does this score mean?”, “Why is this a strength?”, and “What should I work on first?” It must be grounded only in the locked score and evidence snapshot and must not invent biography, reveal hidden scoring keys, or unlock premium content without entitlement.

## 8. Front-end engineering requirements

### 8.1 Responsive behavior

The platform must be responsive across current and previous major versions of Chrome, Edge, and Safari. Mobile is required for non-case journeys. Desktop and tablet receive priority for case and work-sample stages.

The responsive specification must define at least these viewports: small mobile, large mobile, tablet portrait, tablet landscape, laptop, and large desktop. Each screen must document what collapses, what becomes sticky, what becomes a drawer, and what is intentionally unavailable on small screens.

### 8.2 Component system

The front-end should use a reusable component system rather than screen-specific styling. The initial component inventory should include buttons, links, inputs, select controls, radio groups, checkboxes, rank lists, matrix controls, stepper/progress, cards, data visualizations, score badges, evidence chips, upload zones, timers, video controls, transcript panels, modal dialogs, drawers, toasts, tables, tabs, filters, report sections, permission banners, and audit/status indicators.

Atomic design should be used as a planning model: atoms define basic controls and tokens, molecules combine related controls, and organisms define larger modules such as the assessment runner, report section, or assessor evidence panel.

### 8.3 Data and state handling

The interface must represent synchronous and asynchronous states explicitly. These include loading, saving, saved, save failed, retrying, upload progress, processing, report generation, entitlement pending, permission denied, consent required, human review pending, completed, locked, and expired.

Long-running scoring and report-generation processes must show progress or a clear pending state without implying that a result exists before it is ready. The UI must be resilient to refresh, reconnect, duplicate submissions, delayed webhooks, and interrupted uploads.

### 8.4 Accessibility and internationalization

The target is WCAG 2.2 AA. The design must include keyboard navigation, visible focus states, screen-reader labels, captions, transcripts, no color-only meaning, accessible rank controls, error summaries, sufficient contrast, reduced-motion behavior, and accessible alternatives for video and drag/drop interactions.

The platform must support locale-aware content, currencies, time zones, dates, translated assessment text, regional pricing, tax, and right-to-left support if required by the target markets. These requirements must be confirmed before the design system is finalized.

## 9. Visual design and brand discovery requirements

No official Modus brand kit, logo package, font specification, or approved UI reference was included in the supplied TDD. Therefore, final brand styling must not be invented from the TDD alone.

Before high-fidelity design begins, collect the following assets and decisions:

| Brand input | Required discovery question |
|---|---|
| Logo | Which official logo files are approved? Are light, dark, monochrome, and compact variants available? |
| Typography | Which fonts are licensed and approved for web use? Are there fallbacks? |
| Color | What are the primary, secondary, semantic, and neutral tokens? Which combinations are approved for accessible text? |
| Imagery | Should the experience use consulting photography, transformation diagrams, abstract systems imagery, or no photography? |
| Motion | What level of motion is appropriate for a serious assessment product? What must respect reduced-motion preferences? |
| Tone | Should the product feel authoritative, warm, analytical, premium, developmental, or a deliberate combination? |
| Existing product | Is there an existing Modus website, portal, Figma library, or component library to preserve or extend? |
| Tenant branding | Which elements can partner tenants customize, and which are protected Modus product elements? |
| References | Which products should be studied for interaction quality, not copied visually? |

The first design direction should define the visual language, layout patterns, information density, type scale, spacing system, radius strategy, shadow hierarchy, chart language, motion style, and responsive behavior. It should also identify which screens are brand-led and which are information-dense operational workspaces.

## 10. Commercial and entitlement UX requirements

The product must sell configurable assessment products rather than present one hard-coded paywall. The interface must support Management Consulting, Professional Personality & Values, combined bundle, Detailed Intelligence Report and Development Roadmap, sponsored or enterprise-funded access, coupons, regional prices, tax, and future add-ons.

Payment completion must be represented as a pending and confirmed state because entitlement activation depends on a verified payment webhook, not only the browser redirect. The candidate must receive a useful explanation if payment is delayed, declined, interrupted, or successful but entitlement activation is still processing.

Premium boundaries must be clear but not deceptive. The Summary of Findings must remain useful. Locked premium sections should explain what additional value becomes available, why it is relevant, and the configured price without exposing detailed findings that are supposed to remain gated.

## 11. Role-based workspace requirements

### 11.1 Candidate dashboard

The dashboard should answer three questions immediately: **Where am I? What should I do next? What have I already earned or completed?** It should show active products, assessment progress, saved attempts, report availability, roadmap progress, reassessment dates, and any required human-review status.

### 11.2 Assessor review

The assessor workspace should prioritize evidence review. It must make the AI summary, original evidence, transcript or video, rubric, score confidence, calibration status, reviewer notes, approval action, and override reason available without forcing the assessor to navigate through unrelated candidate information.

### 11.3 Mentor workspace

The mentor should see the candidate’s learning-relevant profile, roadmap, gaps, assignments, evidence submissions, progress, and reassessment schedule. Sensitive data, payment details, and unrelated personal information must be excluded by design.

### 11.4 Recruiter or employer view

This view is consent-based and must expose only verified capability, role fit, and selected evidence. Development notes, unnecessary personal data, and sensitive information must not appear by default. The interface must communicate the freshness, confidence, and human-review status of any externally shareable result.

### 11.5 Administration and governance

Admin screens must support draft, validation, preview, publish, effective date, version history, rollback, branch rules, scoring maps, rubrics, report templates, videos, entitlements, tenant overlays, and audit trails. Publishing content or model changes must be visibly separate from deploying application code.

## 12. Reporting and visualization requirements

The report viewer and downloadable report should use the same score snapshot. The core report blueprint includes an executive summary, Consulting Capability Index, Consulting Potential Index, Client Readiness Index, Evidence Confidence, competency radar, capability heatmap, Talent DNA profile, values wheel, strengths, gaps, role matches, case and work-sample evidence, communication, judgement, development priorities, roadmap, methodology, limitations, AI/human review status, and privacy statement.

Visualizations require careful interpretation. Scores must not appear more precise than the evidence supports. Values should be shown as relative priorities within the profile unless adequate norms exist. Values must not be displayed as eligibility or rejection thresholds.

Every report visualization should define the following states: populated, partial evidence, low confidence, unavailable because not purchased, processing, human review pending, and historical snapshot.

## 13. Safety, privacy, and responsible-AI UX requirements

Privacy and AI-scoring disclosure must appear in plain language before the first assessment. Consent must be versioned. The user must be able to understand what is collected, why it is used, how long it may be retained, and how to request export, correction, deletion, or withdrawal subject to legal obligations.

Protected or sensitive data must be separated from scoring. Support or personal-circumstance information may tailor scheduling or assistance but must not lower capability scores. The interface must not imply clinical diagnosis, fixed personality typing, guaranteed employment, guaranteed salary, visa outcomes, or automated adverse employment decisions.

Human review is mandatory before a client-facing-ready recommendation is exposed externally. Any AI or human override must display an auditable reason in authorized views.

## 14. Analytics and measurement requirements

The product should measure the candidate funnel from landing page to video completion, registration, payment, assessment start, assessment completion, report availability, premium upgrade, explainer usage, human review, programme conversion, and reassessment retention.

The analytics plan must also measure abandonment by section and device, autosave failures, upload failures, report-generation failures, item timing, missingness, score distributions, AI-human agreement, confidence, overrides, transcription quality, and fairness indicators. No facial or appearance analytics should be introduced.

Before implementation, product owners must define which analytics are candidate-visible, internal-only, tenant-visible, de-identified, or restricted to compliance roles.

## 15. Open requirements questionnaire

The following questions are the first decision gate. Answers will materially affect information architecture, content hierarchy, visual direction, and front-end architecture.

### A. Product and launch scope

1. What is the first release target: orientation plus one assessment, both paid assessments, or the complete candidate journey?
2. Which user role must be fully usable in the first release: candidate, assessor, mentor, recruiter, or admin?
3. Which screens are required for the first design prototype?
4. Is the USD 25 / USD 250 commercial model approved, or should prices be treated as placeholders during discovery?
5. Which geography and language should define the first release?

### B. Candidate and assessment experience

1. Who is the primary launch candidate: graduate, experienced consultant, career changer, executive, or a mixed audience?
2. What level of assessment anxiety should the experience actively reduce?
3. Should candidates see the full journey map before payment, or only the stages included in their selected product?
4. Which assessment modules are mandatory for the first release?
5. What is the desired maximum time for the first paid assessment?
6. Which activities are timed, and which can be paused?
7. Can candidates review answers before submission? If yes, which answer types become locked?
8. What accommodations must be supported at launch?

### C. Reports and commercial conversion

1. Which findings are included immediately after each paid product?
2. What exact content is reserved for the premium report?
3. Should the premium upgrade be offered during checkout, after the summary, or both?
4. Is the candidate allowed to download the summary as a PDF?
5. Which report sections can be shared with a recruiter or employer?
6. What is the approved language for limitations, confidence, and human review?

### D. Brand and visual direction

1. Please provide the official Modus logo files and any existing brand or Figma guidelines.
2. Which existing Modus website or product should the interface feel connected to?
3. Should the visual direction be more premium executive, analytical enterprise SaaS, human developmental, or another direction?
4. Should the platform use photography, illustration, diagrams, video thumbnails, or primarily typography and data visualization?
5. Is dark mode required at launch?
6. Are there approved fonts, icon libraries, chart styles, or design tokens?

### E. Front-end and platform constraints

1. Is the TDD’s Next.js, React, TypeScript, Tailwind, and ShadCN stack final for the front end?
2. Is there an existing codebase, authentication flow, API contract, or component library?
3. Which browsers and devices must be supported beyond the TDD baseline?
4. Is offline resume required for the first release, or only retry-on-reconnect autosave?
5. Which video provider and recording approach are approved?
6. Which payment providers and currencies must be supported at launch?
7. Is right-to-left layout required in the initial language set?

### F. Governance, permissions, and safety

1. Which roles must have separate dashboards in the first release?
2. Who is allowed to override AI scores, and what approval chain is required?
3. Which candidate data can a mentor see?
4. Which evidence may an employer viewer see, and how long does consent remain valid?
5. What are the approved data-retention and deletion rules by artifact type?
6. What is the exact human-review condition before “client-facing ready” can be displayed?

## 16. Recommended discovery sequence

The next working sequence should be:

1. Confirm the launch scope and primary candidate.
2. Confirm the brand assets and visual direction.
3. Confirm the candidate journey and assessment modules for the first prototype.
4. Confirm the Summary of Findings versus premium report boundary.
5. Confirm roles, permissions, and human-review rules.
6. Confirm front-end technical constraints and existing assets.
7. Produce the information architecture and task flows.
8. Produce the design system proposal and one early viewable prototype.
9. Validate the prototype with representative users before implementing the full interface.

No production UI should be built until the first six discovery gates are answered or explicitly marked as assumptions.

## 17. Initial acceptance criteria for the requirements phase

The requirements phase is complete when:

- The first-release scope and primary candidate are approved.
- Every required role has a defined access boundary.
- The candidate journey has defined entry, completion, interruption, failure, and resume states.
- Each assessment question type has an interaction and accessibility requirement.
- The report and premium-entitlement boundary is explicit.
- Official brand assets and design references are available or an interim design direction is approved.
- The first responsive breakpoints and browser/device targets are confirmed.
- Privacy, AI-scoring, human-review, and sharing language has an owner and approval path.
- The first prototype screens are selected and their success criteria are documented.

## References

[1]: /home/ubuntu/upload/METI_Management_Consulting_Assessment_TDD_v1.1%282%29%283%29.pdf "METI Management Consulting Assessment & Development Platform — Technical Design & Development Document v1.1"

[2]: https://www.w3.org/TR/WCAG22/ "Web Content Accessibility Guidelines (WCAG) 2.2"

[3]: https://www.nngroup.com/articles/ten-usability-heuristics/ "Nielsen Norman Group — 10 Usability Heuristics for User Interface Design"

[4]: https://www.schwartzvalues.com/ "Schwartz Theory of Basic Human Values"

> References [2]–[4] are included as external standards and background sources for later design validation. The supplied TDD remains the controlling product-specific source for this discovery baseline.

---

**Current decision requested from the product owner:** Please answer Section 15A–D first, especially the launch scope, primary candidate, first prototype screens, and approved Modus brand assets. The remaining sections can then be refined without prematurely locking the UI direction.


## 18. TDD audit addendum: requirements underrepresented in the first pass

The first discovery version captured the major journeys and screen inventory but did not state several lower-level requirements with enough precision. The following additions close that gap.

### 18.1 Case workspace must represent the complete consulting deliverable

The case experience is not only a text editor and file upload. Depending on the case configuration, it must support structured responses for:

- Problem restatement, success metric, scope, assumptions, and key questions.
- Issue tree and prioritised hypotheses with rationale.
- Market, value-chain, process, operating-model, financial, and stakeholder analysis tasks.
- Two or three feasible options with benefits, cost, risk, dependencies, and trade-offs.
- A headline recommendation with evidence, decision rationale, risks, and first 90-day actions.
- A configured deliverable such as a one-to-three-page memo, mini-deck, value-chain map, target operating model sketch, roadmap, or business case.
- Reflection on additional data needed, what could invalidate the recommendation, and the next action.

The UI must allow the assessment author to configure which response blocks are required, optional, timed, file-based, or structured. The candidate must see the required output format before beginning.

### 18.2 AI-use policy and originality controls

The case engine must support four explicit modes:

| Mode | Candidate-facing requirement |
|---|---|
| Closed AI | Generative AI is not permitted; embedded AI assistance is blocked and the candidate confirms a declaration |
| Open resource | Web and documents may be allowed, but generative AI remains restricted if configured |
| AI-assisted consulting | AI tools are permitted; the candidate records prompts or sources and critiques the output |
| Live challenge | The candidate responds to new information under a time-boxed screen and video interaction |

A declaration control is a gate and audit record, not a capability score. The interface must explain the active policy before the timer begins and require acknowledgement where configured. The UI should display originality, conflict-of-interest, or consent declarations as separate controls rather than hiding them inside general terms.

### 18.3 Video and audio accessibility fallback

The recording flow must support a low-bandwidth or accessibility path using audio-only recording or upload and, where configured, a written response. The fallback must preserve the same content rubric while avoiding penalties for camera, network, device, clothing, background, or appearance.

The preflight screen must check microphone, camera, browser permission, network quality, available storage, and recording support. If the check fails, the candidate must receive a clear recovery option rather than a generic error.

If audio quality, transcription quality, or model confidence is low, the result must be routed to human review rather than automatically reducing the score. The interface must show this as a review status, not as a candidate failure.

### 18.4 Evidence-linked navigation and knowledge graph behavior

The competency and evidence graph has direct UX consequences. A score, gap, role match, learning recommendation, or report statement should be able to link back to its permitted evidence sources. Depending on the user role, this may include a response, artifact, transcript segment, rubric dimension, assessor note, learning module, project, or reassessment milestone.

The following relationships should be reflected in navigation or contextual links where permission allows:

- Candidate to evidence.
- Evidence to demonstrated competency.
- Competency to required role.
- Question to measured competency.
- Evidence to scoring rubric.
- Candidate to value priority.
- Competency to learning module.
- Project to produced evidence.
- Report to immutable score snapshot.

The interface must not expose restricted evidence merely because a graph relationship exists. Tenant scope, consent scope, role permissions, and artifact sensitivity remain controlling rules.

### 18.5 Agent-driven journey and processing states

The TDD defines twenty narrow agents, including journey orchestration, resume intelligence, video learning, Talent DNA, values, consulting capability, research, case assessment, communication, stakeholder simulation, integrity and consistency, scoring and calibration, role and pathway recommendation, skills gap and learning, report generation, mentor support, human review, fairness and compliance, and admin intelligence.

The front end does not need to expose “agents” as a technical concept to candidates, but it must represent the outcomes of their work. The state model must support:

- A journey stage that is blocked by a prerequisite.
- A branch or retry generated by the journey orchestrator.
- Resume extraction requiring candidate correction.
- Inconsistent or contradictory evidence requiring review.
- Low confidence or schema failure routed safely to human review.
- Score generation using an immutable evidence snapshot.
- Report generation using a locked score snapshot.
- Entitlement restrictions enforced in the Results Explainer.

For authorized assessor, admin, and compliance users, the system should provide sufficient model, prompt, rubric, confidence, cited-evidence, and version metadata to explain the processing status without storing or displaying free-form chain-of-thought.

### 18.6 Full question-type catalogue

The original discovery document described the main interaction families but did not retain the TDD catalogue IDs. The native engine must support the following versioned types:

| ID | Type | Interface implication |
|---|---|---|
| QT01 | Single choice | Keyed answer or rubric feedback; clear selection state |
| QT02 | Multi-select | Minimum/maximum selection rules and visible count validation |
| QT03 | Rank 4 | Unique positions, drag/drop, keyboard up/down controls |
| QT04 | Matrix Likert | Accessible row/column navigation and incomplete-row validation |
| QT05 | Scenario judgement | Best-next-action or rubric response with partial-credit configuration |
| QT06 | Short text | Character limits, validation, and save state |
| QT07 | Long text | Rich prompt context, word guidance, autosave, draft and submission lock |
| QT08 | Numeric/calculation | Deterministic validation, units, tolerance, and calculation error state |
| QT09 | File upload | Allowed formats, size limits, malware scan, parsing progress, replacement rules |
| QT10 | Video | Prompt, preparation, device check, recording, review, upload, transcript status |
| QT11 | Audio | Accessible and low-bandwidth equivalent to video content rubric |
| QT12 | Timed case section | Shared exhibits, timer, structured responses, lock and timeout behavior |
| QT13 | AI role-play chat | Turn-level transcript, hidden scenario state, interruption/retry rules, final score state |
| QT14 | Visual mapping | Keyboard-accessible alternative to drag/drop and structured JSON validation |
| QT15 | Declaration | AI policy, originality, consent, or conflict acknowledgement; audit gate only |

### 18.7 Data, artifact, and security states

The interface must account for the artifact types named in the TDD: resume claims, responses, files, video, audio, transcripts, assessor notes, rubrics, score components, reports, invoices, entitlements, learning plans, and audit records.

File and evidence flows must include type validation, malware scanning, signed access, encryption status where visible to authorized users, upload retry, parsing failure, retention information, and deletion or withdrawal behavior. Candidate corrections to extracted profile data must create a versioned correction and must not overwrite submitted assessment evidence.

The UI must never use an untrusted CV, case file, PDF, external text, or uploaded instruction as a system command. Candidate-visible messages should describe the safe handling of uploads without exposing internal security mechanisms.

### 18.8 Administration and publishing details

The admin requirements need to be represented as a workflow, not only as CRUD screens. The authoring and governance experience must support:

- Question-bank tags for competency, proficiency level, industry, role, item type, language, and validation status.
- Item retirement and exposure limits.
- Rubric dimensions, anchored levels, weights, mandatory gates, and examples.
- Case exhibits, time limit, target level, AI policy, allowed resources, and scoring rubric.
- Video provider, transcript, captions, completion rules, mapped stage, locale, and effective dates.
- Scoring weights, normalization, thresholds, confidence rules, role profiles, and route logic.
- Prompt/model schemas, temperature or determinism policy, effective dates, rollback, and evaluation status.
- Candidate, internal, and employer report layouts, narrative blocks, charts, branding, and terms.
- User, role, tenant membership, assessor assignment, mentor assignment, and external viewer access.

The publishing workflow must visibly move through draft, peer review, calibration check, compliance check, approved, and published. Published assessment versions are immutable. A change to a question, rubric, weight, video gate, or report logic creates a new version, and existing attempts remain bound to their original version.

### 18.9 Report blueprint additions

The report requirements include a page or block for an opportunity, industry, and geography view when enabled. The report cover must include the enterprise ID, date, report version, and disclaimer. The methodology section must include evidence sources, confidence, limitations, and human-review status.

The report viewer and PDF must be tested for:

- Summary, detailed, assessor, mentor, employer, and admin variants.
- Entitlement-correct visibility.
- Score-snapshot parity between dashboard and PDF.
- Privacy-variant correctness.
- Low-confidence and partial-evidence messaging.
- Unsupported-claim prevention.
- Print and download layout quality.

### 18.10 Quality, release, and acceptance requirements

The requirements phase must include a validation plan covering unit, contract, integration, end-to-end, security, accessibility, performance, and tenant-isolation tests. At minimum, the front end must be tested for:

- Candidate desktop and mobile flow.
- Assessor review flow.
- Admin publish flow.
- Payment-to-entitlement-to-unlock behavior.
- Assessment submission-to-score-to-report behavior.
- Video upload-to-transcription-to-score behavior.
- Concurrent autosave and reconnect behavior.
- Large file and video upload behavior.
- Expired tokens, broken access control, signed evidence access, and tenant data leakage.
- Prompt-injection-safe handling of uploaded content.

Release gates must block production when assessment content has broken branching or accessibility defects, when AI schemas or human-agreement thresholds fail, when video fallback or prohibited-inference tests fail, when values wording is not neutral, when PDF and dashboard snapshots diverge, or when tenant isolation, RBAC, pricing, entitlement, or retention tests fail.

### 18.11 Phase and MVP implications

The TDD recommends completing an end-to-end Core Diagnosis and report loop before expanding the breadth of modules. The discovery plan should therefore distinguish the following product increments:

| Phase | UX scope |
|---|---|
| Phase 0 | Authentication, tenancy, RBAC, audit shell, admin shell, design-system foundation |
| Phase 1 | Landing, orientation, registration, product catalogue, payment, entitlements, F01–F05, baseline consulting assessment, autosave, scoring, Summary of Findings, premium CTA |
| Phase 2 | Consulting capability deep dive, question bank, branching, competency graph, calibration dashboard |
| Phase 3 | F15–F19, recorder, transcription, case workspace, rubric scoring, human review |
| Phase 4 | Detailed report, roadmap, role match, gaps, Results Explainer, mentor workspace, reassessment, passport/progress |
| Phase 5 | Tenant branding, recruiter/employer view, consented sharing, external reports, commercial administration |
| Phase 6 | Calibration, fairness, performance, security, model evaluation, and content expansion |

The first prototype should represent the complete Phase 1 loop rather than attempt to visually represent every future module at once.

### 18.12 Audit conclusion

The original discovery document did not omit the product’s main journeys, screens, roles, or commercial structure. It did, however, compress several engineering-ready requirements into broader UX language. This addendum restores those details and should be treated as part of the requirements baseline before information architecture and high-fidelity UI work begin.

