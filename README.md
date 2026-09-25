# METI: Modus Enterprise Talent Intelligence Platform
## Enterprise Management Consulting Track — Technical Design & Architecture Documentation (TDD v1.1)

Welcome to the **METI Enterprise Platform** engineering repository. This project implements the end-to-end management consulting assessment, capability benchmarking, multi-agent AI orchestration, and talent development platform specified in **TDD v1.1**.

---

## 📚 Master Architectural Documentation Index

| Document | Primary Focus | Key Contents |
| :--- | :--- | :--- |
| **[Business Requirements & Strategic Context](file:///d:/MODUS%20HACKTOHON/docs/BUSINESS_REQUIREMENTS.md)** | Strategic Context & Business Model | • Industry Problem Statement & Business Opportunity<br/>• Commercial Two-Tier Entitlement Model ($25 vs $250)<br/>• Detailed Stakeholder Requirements<br/>• 5 Core Desired Output Artifacts<br/>• Comprehensive KPIs (Commercial, Psychometric, Fairness, Engineering) |
| **[System Architecture & Master Design](file:///d:/MODUS%20HACKTOHON/docs/ARCHITECTURE.md)** | Engineering & System Topology | • End-to-End Logical System Topology & Ingress Layer<br/>• 20-Agent LangGraph State Machine Workflow<br/>• Polyglot Data Model (PostgreSQL + Neo4j Graph + Azure Blob)<br/>• Speech-to-Text & Video Communication Pipeline<br/>• Security, Privacy, Anti-Injection & DevSecOps CI/CD |
| **[Frontend Architecture & Design System](file:///d:/MODUS%20HACKTOHON/docs/FRONTEND_ARCHITECTURE.md)** | Client Layer & User Experience | • Next.js 15 App Router Screen Map (S01–S16)<br/>• Question Factory Engine (QT01–QT15) & Form Registry (F01–F22)<br/>• Sub-2s Autosave & IndexedDB Offline Sync Queue<br/>• WebRTC Video Studio & Case Workspace Layout<br/>• Recharts Radar & D3 Schwartz Circumplex Visualizations<br/>• WCAG 2.2 AA Accessibility Specifications |
| **[Data Models & Multi-Agent Catalog](file:///d:/MODUS%20HACKTOHON/docs/DATA_MODEL_AND_AGENTS.md)** | Schemas & Agent Specifications | • PostgreSQL DDL Schema (Candidates, Attempts, Scores, Entitlements)<br/>• Neo4j Talent Knowledge Graph Ontology & Cypher Query Patterns<br/>• Complete Catalog of 20 AI Agents (A01–A20) with I/O Contracts<br/>• Python Scoring & Ipsative Centering Algorithms |

---

## 🏛️ Executive Architecture Diagram

```mermaid
graph TD
    subgraph ClientLayer["Experience Layer (Next.js 15 + ShadCN)"]
        Landing["S01 Landing & V01 Video"]
        Checkout["S04 Stripe Checkout ($25 / $250)"]
        Runner["S06 Form Runner (F01-F22)"]
        VideoStudio["S08 Executive Video Studio"]
        CaseDesk["S09 Consulting Case Desk"]
        ReportViewer["S10 Intelligence Report & AI Explainer"]
        AssessorDesk["S12 Assessor Calibration Desk"]
    end

    subgraph ServiceLayer["API & Domain Layer (FastAPI Microservices)"]
        Gateway["API Gateway & Tenant Isolation"]
        JourneyEngine["Journey & Branching Engine"]
        AssessmentEngine["Assessment & Question Service"]
        MediaService["Azure Blob Streaming & Speech Service"]
        CommerceService["Stripe Webhook Entitlement Engine"]
    end

    subgraph AgentLayer["AI Orchestration Layer (LangGraph)"]
        Orchestrator["A01 Journey Orchestrator"]
        Agents_Evaluation["A05-A10 Evaluation Agents (DNA, Values, Case, Video)"]
        Scorer["A13 Scoring & Calibration Agent"]
        Pathway["A14 Role & Pathway Agent"]
        Explainer["A17/A18 AI Explainer & Human Review Assistant"]
    end

    subgraph StorageLayer["Data & Persistence Layer"]
        Postgres[("PostgreSQL / Azure SQL<br/>(Transactional Truth)")]
        Neo4j[("Neo4j Knowledge Graph<br/>(Talent Ontology)")]
        BlobStorage[("Azure Blob Storage<br/>(Videos, Resumes, PDFs)")]
        AISearch[("Azure AI Search<br/>(Vector Knowledge & Rubrics)")]
        RedisCache[("Redis<br/>(Session State & Locks)")]
    end

    ClientLayer --> Gateway
    Gateway --> ServiceLayer
    ServiceLayer --> AgentLayer
    ServiceLayer --> StorageLayer
    AgentLayer --> StorageLayer
```

---

## 🚀 Quick Reference: Key Technical & Business Attributes

* **Target Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, ShadCN UI, FastAPI, PostgreSQL, Neo4j, Redis, Azure OpenAI, LangGraph, Azure Blob Storage.
* **Commercial Tiers:**
  * **$25 Entry:** Management Consulting Assessment (`MC-A`) or Professional Personality & Values (`PV-A`) $\to$ includes immediate **Summary of Findings**.
  * **$250 Premium Upgrade:** Product `D250` $\to$ unlocks full **25–40 page Report**, **16-Week Personalized Roadmap**, and **Interactive AI Results Explainer**.
* **Integrity & Fairness:** Capped self-report ($0.25$), heavy demonstrated evidence weighting ($0.85$ case, $0.80$ video), zero facial/accent/emotion evaluation, strict separation of demographic attributes from scoring vectors.
