# METI Master 3-Portal Architecture & Implementation Plan
**Source Basis**: TDD Section 04 (*Users, Roles and Tenancy*), Section 17 (*Screen Requirements S01–S16*), Section 19 (*Mentor & Pathways P1–P8*), Section 20 (*Admin & Governance*), and Section 21 (*Commercial Entitlements*).

---

## 1. System Vision: The 3 Primary Portals

The METI platform operates across three interconnected, role-governed portals sharing a unified evidence graph:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        METI EXECUTIVE CAPABILITY PLATFORM                              │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│ 1. CANDIDATE PORTAL      │ 2. EVALUATOR / ASSESSOR  │ 3. ENTERPRISE ADMIN SUITE        │
│    (Public & Candidate)  │    & MENTOR CONSOLE      │    (Content & Governance)        │
├──────────────────────────┼──────────────────────────┼──────────────────────────────────┤
│ • S01 Landing & Story    │ • Multi-Candidate Queue  │ • S13 Assessment Builder &       │
│ • S02 Video Orientation  │ • Evidence Inspector     │   Question Bank                  │
│ • S04 Entitlement Buy    │ • Video Transcript Audit │ • S14 Video Manager              │
│ • S05 Candidate Desk     │ • Rubric Calibration     │ • S15 Calibration & Fairness     │
│ • S06/S07 Core Diagnosis │ • Human Override Audit   │ • S16 Commercial Pricing &       │
│ • S08 Executive Studio   │ • Pathways P1–P8 Cert.   │   Sponsor Voucher Manager        │
│ • S09 Case Workspace     │ • S11 Mentor Workspace & │ • AI Model & Prompt Registry     │
│ • S10 Findings & Roadmap │   Weekly Sprints Tracker │                                  │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

---

## 2. Immediate UI Fixes & Executive Polish (Addressing User Screenshots)

1. **Remove Duplicate Top Dark Bar (`CandidateJourneyBar`)**:
   * Completely remove the dark bar and its native horizontal scrollbar from `App.tsx`.
   * Keep a single, crisp, authoritative `Navbar` at the top of the application.
2. **Eradicate Raw Spec Codes & Engineering Labels**:
   * Remove `(S02)`, `(S04)`, `(S06)`, `(S07)`, `(S08)`, `(S09)`, `(S11)`, `(S12)`, `(PV-A)`.
   * Remove `TDD 22.1`, `TDD 11.2`, `TDD 12.1`.
   * Replace with clean, executive terminology and subtle trust pills:
     * *Example*: Instead of `"TDD 22.1 Human-in-the-Loop Protocol"`, use a subtle pill: `"🛡️ Verified Partner Calibration: All AI evaluations are reviewed and calibrated by Senior Transformation Partners before client presentation."*
3. **Add Global Executive Role / Portal Switcher in Navbar**:
   * Add a sleek, discrete segmented control in the `Navbar`:
     `[Candidate Portal] [Evaluator Desk] [Admin Suite]`
   * Allows hackathon judges, evaluators, and partners to switch perspectives in one click without friction.

---

## 3. Detailed Task Breakdown

### Phase 1: De-Cluttering & Navigation Harmonization
#### Task 1.1: Remove Top Dark Bar and Fix Layout in `App.tsx`
* **Target File**: `client/src/App.tsx`
* **What Needs to Be Done**:
  1. Remove `<CandidateJourneyBar />` import and rendering.
  2. Register routes for all three portals:
     * Candidate: `/`, `/video`, `/login`, `/checkout`, `/app`, `/studio`, `/case`
     * Evaluator & Mentor: `/evaluator` (and `/mentor`)
     * Admin Suite: `/admin`
* **Outcome**: Single clean header; zero horizontal scrollbars.

#### Task 1.2: Polish Main `Navbar.tsx` with Executive Portal Switcher
* **Target File**: `client/src/components/Navbar.tsx`
* **What Needs to Be Done**:
  1. Replace navigation labels with clean, professional titles:
     * **Orientation** (routes to `/video`)
     * **Assessments** (routes to `/checkout`)
     * **Case Study** (routes to `/case`)
     * **Executive Studio** (routes to `/studio`)
  2. Embed a subtle **Portal Switcher** pill on the right:
     * `Candidate` $\rightarrow$ `/app`
     * `Evaluator` $\rightarrow$ `/evaluator`
     * `Admin` $\rightarrow$ `/admin`
* **Outcome**: Effortless, instant navigation across all 3 portals for judges.

---

### Phase 2: Portal 2 — Evaluator / Senior Assessor & Mentor Console (`/evaluator`)
#### Task 2.1: Multi-Candidate Queue & Evidence Inspector
* **Target File**: `client/src/pages/AssessorReview.tsx` (route `/evaluator` & `/assessor`)
* **What Needs to Be Done**:
  1. **Candidate Selector Queue**:
     * Candidate 1: *Alex Rivera* (Strategy & Enterprise Transformation, Score: 75, Ready for Review)
     * Candidate 2: *Marcus Vance* (Operational Turnaround & Supply Chain, Score: 68, Borderline)
     * Candidate 3: *Priya Patel* (Business Analysis & Operating Models, Score: 84, Client Ready)
  2. **Evidence Inspection Sub-Panels**:
     * *Case Study Synthesis*: Display submitted work sample memo with AI highlight markers.
     * *Executive Oral Briefing*: Video playback with synchronized transcript, WPM, and filler ratio.
     * *Talent DNA & Schwartz Radar*: 9 dimensions chart and motivational balance.
  3. **Partner Calibration Rubric Sliders (1.0 to 5.0)**:
     * Problem Structuring, Financial Acumen, Executive Presence, Change Governance.
     * Live recalculation of final calibrated composite score.
  4. **Human-in-the-Loop Override Box (Cleaned)**:
     * Subtle trust pill instead of raw `TDD 22.1`.
     * Mandatory override justification if partner score deviates by >10%.
  5. **Accreditation & Pathway Assignment (P1–P8)**:
     * Assign P1 Direct Consulting, P2 Consultant Bridge, P3 Graduate Analyst, or P4 Foundation.
     * Certify with immutable cryptographic hash stamp.

#### Task 2.2: Mentor Workspace Tab (TDD Section 19 / Screen S11)
* **What Needs to Be Done**:
  1. Add a **Mentor View** toggle inside the evaluator console:
     * Candidate 16-Week Milestone Progress tracker (Weeks 1–4, 5–8, 9–12, 13–16).
     * Learning assignments and case practice tasks.
     * Mentor private notes and reassessment scheduling date.

---

### Phase 3: Portal 3 — Enterprise Admin & Content Governance Suite (`/admin`)
#### Task 3.1: Complete Admin Governance Suite (`AdminPanel.tsx`)
* **Target File**: `client/src/pages/AdminPanel.tsx` (route `/admin`)
* **What Needs to Be Done**:
  1. **Tab 1: Commercial Pricing & Corporate Voucher Engine (S16 / TDD 21)**:
     * Live pricing matrix for MC-A ($150), PV-A ($120), COMBO-A ($250), and D250 Roadmap ($250).
     * Corporate Sponsor Voucher Manager: Add, toggle, and view redemption metrics for `MODUS-EXEC-2026`, `ENTERPRISE-SPONSOR`, and custom client codes.
     * Real-time funnel metrics: Ingested candidates, paid activations, corporate subsidy share.
  2. **Tab 2: Question Bank & Case Library (S13 / TDD 07 & 20)**:
     * Interactive question bank tagged by competency (Strategy, Operating Models, Value Chain), seniority level, and question type (Adaptive probe, Priority rank, Talent DNA).
     * Case study registry: `Nexus Global Freight Turnaround` with exhibits data pack and AI mode configuration.
     * Rule: Published versions are immutable.
  3. **Tab 3: Video Manager (S14 / TDD 06 & 20)**:
     * Orientation video V01 and V02 management, chapter markers, transcript sync, and 80% completion gate rules.
  4. **Tab 4: AI Model & Prompt Governance (TDD 13 & 22)**:
     * Model registry: Scoring agent (`v2.4`), Probing agent (`v1.8`), Speech telemetry agent (`v2.0`).
     * Temperature policies, output schema validation, closed-AI guardrails.
  5. **Tab 5: Calibration & Fairness Dashboard (S15 / TDD 22 & 25)**:
     * AI-to-Human agreement telemetry (94.2%), average score deviation (+2.4 pts), override frequency (5.8%).
     * Demographic & accent neutrality index (1.00 AIR).

---

### Phase 4: Portal 1 — Candidate Experience De-Cluttering (`/app`, `/case`, `/studio`)
#### Task 4.1: Clean All Raw Codes in Candidate Screens
* **Target Files**:
  * `client/src/pages/Home.tsx`
  * `client/src/pages/CaseWorkspace.tsx`
  * `client/src/pages/VideoRecorder.tsx`
* **What Needs to Be Done**:
  1. In `Home.tsx`:
     * Rename tabs: `Q1 · Adaptive Probing`, `Q2 · Priority Trade-Offs`, `Q3 · Talent DNA & Values`.
     * Clean roadmap and dossier action links.
  2. In `VideoRecorder.tsx`:
     * Clean header: `Executive Video Briefing`.
     * Replace `TDD 11.2` with `🛡️ Standardized Evaluation Standard: Observable communication only`.
  3. In `CaseWorkspace.tsx`:
     * Clean header: `Consulting Case Work Sample`.
     * Replace `TDD 12.1` with `🛡️ Unaided Work Sample: Evaluated on MECE rigor and financial causality`.

---

### Phase 5: Verification & Quality Audit
* **Actions**:
  1. Run `npm run check` (`tsc --noEmit`) to verify 0 type errors.
  2. Verify all 3 portals in the browser (`/app`, `/evaluator`, `/admin`).
  3. Confirm complete elimination of the top bar, native scrollbar, and raw spec codes.

---

### Acceptance Criteria
- [ ] No top dark bar; no horizontal scrollbars on desktop viewports.
- [ ] Clean executive `Navbar` with 1-click **Portal Switcher** (`Candidate`, `Evaluator`, `Admin`).
- [ ] All 3 portals fully functional, styled in Modus Signature Teal (`#0E8F91`) and Deep Pine (`#0B3B36`).
- [ ] Zero instances of raw `TDD x.x` or `(S0x)` text in user-facing views.
- [ ] Full compliance with TDD Sections 01 through 28.
