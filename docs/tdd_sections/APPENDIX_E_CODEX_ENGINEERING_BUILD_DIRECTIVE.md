# Appendix E: Codex / Engineering Build Directive

Master concise build instructions when initiating or refactoring the METI Management Consulting application:

1. **Enterprise Platform:** Build METI as a production-grade, multi-tenant Enterprise Talent Intelligence platform with a dedicated Enterprise Management Consulting track; do not build it as a single form or monolithic CRUD application.
2. **Architecture Stack:** Use NextJS 15 / React / TypeScript / Tailwind / ShadCN for web application; FastAPI + Python for backend APIs and AI services; PostgreSQL for transactions; Neo4j for competency/evidence graph; Redis for ephemeral state; Azure Blob for evidence; Azure OpenAI / NVIDIA NIM for LLM services; LangGraph for agent orchestration; Docker for deployment.
3. **Complete Journey:** Implement landing/video → registration/consent → entitlement/payment → core diagnosis → consulting deep dive → video/case/work sample → AI scoring → human review when required → report → role/pathway → learning plan/dashboard.
4. **Native Entities:** Implement native, versioned AssessmentDefinition, Section, Question, Response, Attempt, Rubric, ScoreComponent, CompositeScoreSet and EvidenceArtifact services. Never hard-code assessment content in UI components.
5. **Seed Definitions:** Create F01–F22 from this TDD as seed definitions. Support all question/evidence types in Appendix B, autosave, branching, timing, save/resume and immutable published versions.
6. **Talent DNA & Values:** Implement Enterprise Talent DNA and a Schwartz-informed values module. Values must be descriptive and excluded from client-readiness pass/fail scoring.
7. **Video Management:** Implement video management, playback progress, captions/transcript, recorder/upload, speech-to-text, content rubric scoring, deterministic delivery metrics and human fallback. Never score facial appearance/emotion, accent identity or protected traits.
8. **Competency Model:** Implement competency model C01–C20 and evidence-confidence scoring. Demonstrated case/video/work evidence must outweigh self-report.
9. **Agent Network:** Implement agents A01–A20 with strict JSON contracts, versioned prompts, schema validation, tool allow-lists, timeouts, retries, confidence and evidence citations. Persist shared state.
10. **RBAC:** Implement candidate, assessor, mentor, employer/recruiter, content author, admin, compliance and super-admin RBAC. Enforce tenant and consent scope.
11. **Modular Reports:** Implement candidate/internal/employer report variants from immutable score snapshots. Every AI narrative must be grounded in stored scores/evidence only.
12. **Admin Governance:** Implement admin builders for assessments, questions, rubrics, cases, videos, scoring profiles, report templates, prompts/models, users, pricing and publishing workflows.
13. **Responsible AI:** Implement security, privacy, accessibility, audit and fairness requirements from Section 22 as release-blocking requirements.
14. **Commercial Entitlements:** After each paid assessment, generate an entitlement-scoped Summary of Findings immediately. Add D250 as a separate USD 250 configurable entitlement that unlocks the detailed Intelligence Report, personalised Development Roadmap and premium AI Results Explainer.
15. **Product Models:** Implement Product, PriceBook, Bundle, Payment, Invoice and Entitlement services (MC-A, PV-A, COMBO-A, D250). Do not hard-code price or form access in the UI.
