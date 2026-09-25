# METI — Modus Enterprise Talent Intelligence
`
> **Evidence-led consulting intelligence.** A full-stack platform for management consulting assessment, capability benchmarking, and AI-powered career development.
`
---
`
## Stack
`
| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 · TypeScript · Vite · Tailwind CSS v4 · ShadCN UI |
| **Backend** | FastAPI · Python 3.12 · SQLAlchemy · Pydantic v2 |
| **AI Agents** | LangGraph · Azure OpenAI |
| **Storage** | PostgreSQL · Neo4j · Azure Blob · Redis |
| **Infrastructure** | Docker Compose · Azure Container Apps |
`
---
`
## Monorepo Structure
`
```
meti-platform/
├── frontend/                    → React/Vite application
│   ├── client/
│   │   ├── src/
│   │   │   ├── components/      → Shared UI components
│   │   │   ├── pages/           → Route-level page components
│   │   │   ├── hooks/           → React hooks
│   │   │   ├── contexts/        → React context providers
│   │   │   ├── lib/             → Utilities & API clients
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   └── index.html
│   ├── shared/                  → Types shared between frontend & backend
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                     → FastAPI Python API
│   ├── app/
│   │   ├── api/                 → Route handlers
│   │   ├── core/                → Config, auth, middleware
│   │   ├── db/                  → Database sessions
│   │   ├── models/              → SQLAlchemy models
│   │   ├── schemas/             → Pydantic schemas
│   │   ├── services/            → Business logic
│   │   └── main.py              → App entrypoint
│   ├── tests/                   → Pytest integration tests (9/9 passing)
│   ├── .venv/                   → Python virtual environment
│   ├── requirements.txt
│   └── pyproject.toml
│
├── docs/                        → Architecture & specification
│   ├── assets/                  → TDD PDF, reference images
│   ├── tdd_sections/            → Sectioned TDD documents
│   ├── ARCHITECTURE.md
│   ├── BACKEND_ARCHITECTURE_PLAN.md
│   ├── BUSINESS_REQUIREMENTS.md
│   ├── DATA_MODEL_AND_AGENTS.md
│   ├── FRONTEND_ARCHITECTURE.md
│   └── FULLSTACK_E2E_PLAN.md
│
├── screenshots/                 → 12-stage UI captures (01–11)
├── screenshot_runner/           → Puppeteer capture scripts
├── archive/                     → Legacy prototype (do not modify)
│
├── .env                         → Local secrets (gitignored)
├── .env.example                 → Safe environment template
├── docker-compose.yml           → Full-stack orchestration
└── package.json                 → Monorepo root scripts
```
`
---
`
## Quick Start
`
### Prerequisites
- Node.js 20+
- Python 3.12+
- pnpm (`npm i -g pnpm`)
`
### 1. Install dependencies
`
```bash
# Frontend
cd frontend && pnpm install
`
# Backend
cd backend
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
```
`
### 2. Configure environment
`
```bash
cp .env.example .env
# Edit .env with your API keys
```
`
### 3. Run from monorepo root
`
```bash
# Frontend dev server → http://localhost:5173
npm run dev:frontend
`
# Backend API server → http://localhost:8000
npm run dev:backend
`
# Run backend tests
npm run test:backend
```
`
### 4. Full stack with Docker
`
```bash
docker-compose up --build
```
`
---
`
## Available Scripts
`
From the monorepo root (`package.json`):
`
| Command | Action |
|---------|--------|
| `npm run dev` | Start frontend dev server |
| `npm run dev:frontend` | Frontend only (Vite, port 5173) |
| `npm run dev:backend` | Backend only (Uvicorn, port 8000) |
| `npm run build:frontend` | Production frontend build |
| `npm run test:backend` | Pytest backend suite |
| `npm run capture:local` | Generate local UI screenshots |
`
---
`
## Full System Architecture
`
### Component Architecture Diagram
`
````mermaid
graph TD
    subgraph ClientLayer ["🖥️ Frontend Client Layer (React 19 · Vite · Tailwind v4)"]
        P1["1. Real Resume Intake (/profile)<br/>• Drag-and-drop PDF/DOCX<br/>• Real-time CV Extraction"]
        P2["2. Dynamic AI Dilemmas (/assessment)<br/>• Tailored C-Suite Dilemmas<br/>• Live Option Choice & Hypothesis"]
        P3["3. AI Counter-Probe Injection<br/>• Edge-Case Stress Testing<br/>• Cognitive Blind-Spot Challenge"]
        P4["4. Priority Strategic Trade-Offs<br/>• 4-Initiative Strategic Matrix<br/>• Executive Ambiguity Calibration"]
        P5["5. Multimodal Video Studio (/video)<br/>• 1080p WebRTC MediaStream<br/>• Real-Time Speech-to-Text & WPM<br/>• Composure & Gaze Variance"]
        P6["6. Executive Case Workspace (/case)<br/>• Meridian Retail Case Exhibits<br/>• Financial Variance Modeling<br/>• Strategic Recommendations Memo"]
        P7["7. Assessor Desk Portal (/evaluator)<br/>• Multi-Competency Rubric Scoring<br/>• Blind Double-Grading Synthesis"]
        P8["8. Findings Dossier & Roadmap (/app)<br/>• 4-Axis Competency Radar Chart<br/>• 16-Week Leadership Roadmap"]
    end
`
    subgraph AIOrchestration ["⚡ High-Velocity Dual-Engine AI Gateway"]
        Router{"AI Model Router<br/>(Sub-300ms Failover)"}
        Groq["🚀 Primary: Groq Engine<br/>• openai/gpt-oss-120b<br/>• Sub-300ms High-Velocity Inference"]
        Grok["🧠 Frontier: xAI Grok-2<br/>• High-Acuity C-Suite Reasoning"]
        Nvidia["🛡️ Fallback: NVIDIA NIM<br/>• meta/llama-3.2-11b-vision<br/>• Zero-Downtime Enterprise Engine"]
        Whisper["🎙️ Speech: Groq Whisper<br/>• whisper-large-v3-turbo<br/>• Real-Time Transcription & WPM"]
    end
`
    subgraph BackendCore ["⚙️ Core FastAPI Services (Python 3.12)"]
        Gateway["REST API Gateway (/api/v1)"]
        CandidateSvc["Candidate Profile & Context Service"]
        BrainSvc["Adaptive Brain Dynamic Engine"]
        VideoSvc["Video Telemetry & Speech Service"]
        ScoreSvc["Competency Scoring & Calibration Engine"]
    end
`
    subgraph StorageLayer ["💾 Persistence & Telemetry Layer"]
        DB[("PostgreSQL Database (Supabase)<br/>• Candidate Profiles & Scores<br/>• Rubric Calibration Weights")]
        Telemetry[("Session & LocalStorage Cache<br/>• Real-time Video Telemetry<br/>• Cached Adaptive Dilemma")]
    end
`
    %% Client to Gateway
    P1 --> Router
    P2 --> Router
    P3 --> Router
    P4 --> Router
    P5 --> Whisper
    P5 --> VideoSvc
`
    %% Router to Models
    Router --> Groq
    Router --> Grok
    Router --> Nvidia
`
    %% Client to Backend
    P1 --> CandidateSvc
    P2 --> BrainSvc
    P6 --> Gateway
    P7 --> ScoreSvc
    P8 --> ScoreSvc
`
    %% Backend to Database
    CandidateSvc --> DB
    BrainSvc --> DB
    ScoreSvc --> DB
    ClientLayer -.-> Telemetry
```
`
### Universal Architecture Map (High-Acuity Fallback)
`
```text
+-----------------------------------------------------------------------------------+
|                        METI END-TO-END ARCHITECTURE MAP                           |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ CANDIDATE / USER ]                                                             |
|         |                                                                         |
|         v                                                                         |
|  +-----------------------------------------------------------------------------+  |
|  |  FRONTEND LAYER (React 19 + TypeScript + Vite + Tailwind CSS v4)            |  |
|  |                                                                             |  |
|  |  (1) /profile     --> Real CV Extraction (Drag-and-Drop / Paste Text)       |  |
|  |  (2) /assessment  --> Dynamic Consulting Dilemmas & Real-Time Counter-Probe |  |
|  |  (3) /video       --> Multimodal AI Video Studio (Webcam + Speech Analysis) |  |
|  |  (4) /case        --> Meridian Retail Financial Exhibits & Synthesis Memo   |  |
|  |  (5) /evaluator   --> Assessor Desk (Double-Blind Competency Rubric)        |  |
|  |  (6) /app         --> Findings Dossier, 4-Axis Radar Chart & 16-Week Roadmap|  |
|  +-----------------------------------------------------------------------------+  |
|         |                                              |                          |
|         | REST / JSON                                  | WebRTC Audio             |
|         v                                              v                          |
|  +-----------------------------------+     +-----------------------------------+  |
|  |  AI DUAL-ENGINE GATEWAY           |     |  SPEECH & AUDIO TRANSCRIPTION     |  |
|  |                                   |     |                                   |  |
|  |  [Primary] Groq gpt-oss-120b      |     |  Groq Whisper whisper-large-turbo |  |
|  |  (Sub-300ms Low-Latency Inference)|     |  (Real-Time WPM & Persuasion HUD) |  |
|  |                                   |     +-----------------------------------+  |
|  |  [Secondary] xAI Grok-2           |                         |                  |
|  |  (Frontier C-Suite Reasoning)     |                         v                  |
|  |                                   |     +-----------------------------------+  |
|  |  [Fallback] NVIDIA NIM Llama 3.2  |     |  COMPUTER VISION TELEMETRY        |  |
|  |  (Zero-Downtime Enterprise Engine)|     |  (Facial Composure & Gaze Gaze %) |  |
|  +-----------------------------------+     +-----------------------------------+  |
|         |                                              |                          |
|         +----------------------+-----------------------+                          |
|                                |                                                  |
|                                v                                                  |
|  +-----------------------------------------------------------------------------+  |
|  |  BACKEND & PERSISTENCE SERVICES (FastAPI + Python 3.12)                     |  |
|  |                                                                             |  |
|  |  - Candidate Profile Management       - PostgreSQL Database (Supabase)      |  |
|  |  - Adaptive Brain Dynamic Scoring    - Session & Telemetry LocalStorage    |  |
|  |  - Competency Radar Synthesizer       - Free MVP Entitlement Engine         |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```
`
---
`
## Candidate Adaptive Evaluation Journey Map
`
````mermaid
flowchart LR
    S1["1. Resume Intake<br/>(Real CV Parsed)"] --> S2["2. Adaptive Dilemma<br/>(Dynamic C-Suite Case)"]
    S2 --> S3["3. AI Counter-Probe<br/>(Blind-Spot Challenge)"]
    S3 --> S4["4. Strategic Trade-Offs<br/>(Operating Initiatives)"]
    S4 --> S5["5. Multimodal Video<br/>(Oral Defense & Cadence)"]
    S5 --> S6["6. Case Workspace<br/>(Meridian Retail Memo)"]
    S6 --> S7["7. Findings Dossier<br/>(Radar Chart & Roadmap)"]
```
`
---
`
## 16-Week Dynamic Development Roadmap
`
````mermaid
gantt
    title METI 16-Week Executive Leadership Acceleration Roadmap
    dateFormat YYYY-MM-DD
    section Sprint 1: Foundation
    Telemetry Debrief            :done, s1, 2026-10-01, 7d
    Pyramid Principle Framing    :active, s2, after s1, 14d
    Financial EBITDA Modeling    :s3, after s2, 7d
    section Sprint 2: Depth
    Trade-Off Operating Models   :s4, after s3, 14d
    MECE Problem Structuring     :s5, after s4, 14d
    section Sprint 3: Persuasion
    Oral Defense Simulations     :s6, after s5, 14d
    Counter-Probe Rebuttals      :s7, after s6, 14d
    section Sprint 4: Partner
    Boardroom Governance         :s8, after s7, 14d
    CapEx Valuation Synthesis    :s9, after s8, 14d
    Partner Certification Review :milestone, s10, after s9, 0d
```
`
| Phase | Duration | Core Competencies | Deliverables and Milestones |
| :--- | :--- | :--- | :--- |
| **Phase 1: Diagnostic & Structuring** | Weeks 1-4 | Problem Structuring and Pyramid Principle | Baseline Diagnostic Report and Recommendation memos |
| **Phase 2: Commercial & Operational Depth** | Weeks 5-8 | Unit Economics and Operating Models and MECE | Financial trade-off matrix and CapEx allocation memo |
| **Phase 3: Executive Persuasion & Poise** | Weeks 9-12 | Oral Defense and Composure and Cadence Control | 3 Video briefing recordings evaluated by AI |
| **Phase 4: C-Suite Governance & Board Mastery** | Weeks 13-16 | Board Governance and Counterparty Management | Final Partner Readiness Dossier & Certification |
`
---
`
## Executive Design System & Color Psychology (CEO Presentation Guide)
`
> **Core Objective for the CEO:** Why did we choose Deep Pine, Teal, Sage, Mint, and Off-White over standard corporate blue and grey?
`
| Color Token | Hex Code | Visual Metaphor | Executive Emotion & Psychological Justification |
| :--- | :--- | :--- | :--- |
| **Deep Pine** | #0B3B36 | Boardroom Mahogany & Fiduciary Trust | Evokes the gravitas of a tier-1 strategy firm (McKinsey, BCG, Bain). Replaces cold corporate black with an organic, authoritative dark tone that communicates longevity, risk management, and fiduciary stability. |
| **Active Teal** | #0E8F91 | High-Acuity Algorithmic Intelligence | The bridge between biological judgment and artificial intelligence. Unlike aggressive neon blues, this bespoke teal conveys precision, decisive momentum, and modern executive rigor. |
| **Sage / Slate** | #52796F | Deliberative Equilibrium & Neutrality | Used for analytical labels, supporting rubrics, and secondary context. Eliminates cognitive clutter, inducing calm focus during high-pressure cognitive decision-making. |
| **Mint Accent** | #BCE8D7 | Growth, Momentum & Affirmation | Represents affirmative milestone achievement and capability mastery. Used on positive signals, verified badges, and forward-looking developmental milestones. |
| **Off-White Canvas** | #F8FAFB | Premium Executive Bond Paper | Stark #FFFFFF creates glare and cognitive fatigue during 45-minute analytical assessments. #F8FAFB provides a museum-grade reading surface with 12.8:1 contrast ratio that feels tactile, calm, and premium. |
`
### Strategic Defense Against Competitor Palettes:
1. **Why not standard SaaS Blue (#0066FF)?** Commodity SaaS and social media have saturated generic blue. It feels like a software utility rather than an elite executive advisory firm.
2. **Why not dark mode black (#000000)?** Harsh dark modes simulate developer terminals or gaming suites. A partner assessing an Associate Director expects institutional polish and high-legibility document structures.
3. **The Neurological Result:** The METI palette lowers candidate cortisol during high-stakes assessments, encouraging authentic problem-solving rather than performative panic.
`
---
`
## Key Documents
`
| Document | Purpose |
|----------|---------|
| [Business Requirements](docs/BUSINESS_REQUIREMENTS.md) | Commercial model, stakeholder requirements, KPIs |
| [System Architecture](docs/ARCHITECTURE.md) | Full topology, 20-agent LangGraph state machine |
| [Frontend Architecture](docs/FRONTEND_ARCHITECTURE.md) | Screen map S01–S16, form registry, component specs |
| [Data Models & Agents](docs/DATA_MODEL_AND_AGENTS.md) | PostgreSQL DDL, Neo4j ontology, agent catalog (A01–A20) |
| [TDD v1.1 PDF](docs/assets/METI_Management_Consulting_Assessment_TDD_v1.1%20(2)%20(3).pdf) | Original design specification |
`
---
`
## Commercial Products
`
| Product | Price | Deliverable |
|---------|-------|-------------|
| Professional Personality & Values Assessment | $120 | Talent DNA · Schwartz values · Development themes |
| Management Consulting Assessment | $150 | MECE scoring · Case analysis · Consulting capability report |
| Full Intelligence Report + Roadmap | $250 | 25–40 page report · 16-week roadmap · AI explainer |
`
---
`
## Testing
`
```bash
# Backend — 9 integration tests
cd backend && .venv\Scripts\pytest.exe -v
`
# Frontend — TypeScript type check
cd frontend && pnpm run check
```
`
---
`
*Built for the MODUS Hackathon · September 2026*
