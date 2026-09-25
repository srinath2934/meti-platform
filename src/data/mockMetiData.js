// METI Master Mock Data Engine
// Aligned with TDD v1.1 & METI SRS

export const candidateProfile = {
  id: "cand_948271",
  name: "Sarah Jenkins",
  email: "s.jenkins@enterprise-talent.io",
  currentRole: "Business Analyst / Strategy Specialist",
  targetRole: "Senior Transformation Consultant",
  experienceYears: 4.5,
  location: "London, UK (Global Mobility Ready)",
  journeyStage: "ASSESSMENT_IN_PROGRESS", // STAGES: DISCOVER, PROFILE, ASSESSMENT, CASE, COMPLETED
  journeyProgressPercent: 65,
  overallCCI: 74,
  overallCPI: 82,
  clientReadinessIndex: 68,
  evidenceConfidence: 81,
  assignedRole: "Management Consultant (Bridge Required for Senior)",
};

export const assessmentQuestions = [
  {
    id: "q_01",
    type: "QT01_SINGLE_CHOICE",
    competency: "C01 Enterprise Strategy",
    section: "Strategy & Value Chain",
    prompt: "A $2.4B omnichannel retailer notices that while online GMV has surged 40%, overall operating margin declined from 8.2% to 4.1% over 18 months. As the engagement lead, what is your initial diagnostic hypothesis?",
    options: [
      { id: "opt_a", text: "Marketing CAC is too high due to unoptimized performance advertising channels." },
      { id: "opt_b", text: "Fulfillment unit economics, returns processing, and split-shipment logistics are eroding digital contribution margins." },
      { id: "opt_c", text: "In-store staff headcount should be immediately reduced by 25% to offset digital costs." },
      { id: "opt_d", text: "Supplier wholesale purchase prices have increased across all categories evenly." }
    ],
    correctId: "opt_b",
    rubricRef: "RUBRIC_STRAT_01",
  },
  {
    id: "q_02",
    type: "QT02_MULTI_SELECT",
    competency: "C07 Operating Model / TOM",
    section: "Target Operating Model (TOM)",
    prompt: "Which of the following elements are mandatory pillars when designing a Target Operating Model (TOM) for enterprise agility? (Select top 3)",
    options: [
      { id: "opt_1", text: "Value Streams & Business Capabilities mapping" },
      { id: "opt_2", text: "Governance, RACI decision rights, and funding cadence" },
      { id: "opt_3", text: "Individual annual bonus percentage formula tables" },
      { id: "opt_4", text: "Technology, Data Architecture & Tool enablement" },
      { id: "opt_5", text: "Physical office desk lease contracts" }
    ],
    maxSelections: 3,
    correctIds: ["opt_1", "opt_2", "opt_4"],
  },
  {
    id: "q_03",
    type: "QT03_RANK_4",
    competency: "C14 Data & Commercial Thinking",
    section: "Prioritization & Trade-Offs",
    prompt: "Rank these initiatives for an enterprise client facing an acute cash runway constraint (1 = Highest Immediate Priority, 4 = Lowest):",
    items: [
      { id: "rank_a", text: "Renegotiate supplier payment terms and liquidate slow-moving SKU inventory" },
      { id: "rank_b", text: "Initiate a 3-year enterprise-wide ERP cloud migration" },
      { id: "rank_c", text: "Halt non-revenue discretionary CapEx and freeze external contractor spend" },
      { id: "rank_d", text: "Launch customer advisory board for a 2028 new product roadmap" }
    ],
    idealOrder: ["rank_a", "rank_c", "rank_d", "rank_b"]
  },
  {
    id: "q_04",
    type: "QT04_MATRIX_LIKERT",
    competency: "C09 Change & Adoption",
    section: "Transformation Readiness",
    prompt: "Evaluate how effectively each lever addresses organizational resistance during an ERP transition:",
    rows: [
      { id: "row_1", statement: "Role-specific hands-on workflow simulations" },
      { id: "row_2", statement: "Weekly all-hands broadcast emails from the executive sponsor" },
      { id: "row_3", statement: "Incentivized peer change champions embedded in business units" }
    ],
    scale: ["Low Impact", "Moderate Impact", "High Impact", "Critical Lever"]
  },
  {
    id: "q_05",
    type: "QT05_SCENARIO",
    competency: "C17 Professional Judgement & Client Stewardship",
    section: "Consulting Ethics & Escalation",
    prompt: "SCENARIO: During a cost-transformation engagement, your team finds data showing that a client Vice President's flagship initiative has negative ROI and is burning $1.2M/quarter. The VP privately asks you to omit that chart from the steering committee deck. What is your best action?",
    options: [
      { id: "scen_a", text: "Omit the slide as requested to protect relationship with the key sponsor." },
      { id: "scen_b", text: "Brief your Engagement Partner immediately, align on the data integrity protocol, and present the objective findings constructive with mitigation options." },
      { id: "scen_c", text: "Confront the VP in the open steering committee meeting to demonstrate analytical boldness." },
      { id: "scen_d", text: "Anonymously leak the numbers to the Chief Financial Officer." }
    ],
    correctId: "scen_b"
  }
];

export const caseStudyData = {
  id: "case_omni_2026",
  title: "OmniRetail Global: $1.8B Margin Compression & Supply Chain Redesign",
  client: "OmniRetail Group (UK & Northern Europe)",
  timeLimitMinutes: 45,
  aiPolicy: "CLOSED_AI_EXAMINATION", // No LLM generation allowed during case test
  brief: `OmniRetail is an established retailer with 420 physical stores and an expanding digital commerce footprint. Over FY25, e-commerce gross revenue surged by 38% to £620M, but total enterprise EBITDA fell from £148M to £74M (a 50% profit contraction). 
  
  The Chief Executive Officer has commissioned Modus to diagnose the profit leakage, propose three viable operating turnaround options, and present a structured 90-day implementation plan for the executive board.`,
  exhibits: [
    {
      id: "ex_1",
      title: "Exhibit 1: Revenue vs. EBITDA by Channel",
      data: [
        { channel: "Physical Retail Stores", revenue: "£1,180M", grossMargin: "48%", ebitda: "£112M (9.5%)" },
        { channel: "Digital E-Commerce", revenue: "£620M", grossMargin: "34%", ebitda: "-£38M (-6.1%)" },
        { channel: "Wholesale & B2B", revenue: "£210M", grossMargin: "22%", ebitda: "£14M (6.6%)" }
      ]
    },
    {
      id: "ex_2",
      title: "Exhibit 2: Digital Fulfillment Cost Drivers",
      notes: "Logistics cost per e-commerce order rose from £4.10 to £8.90 due to third-party split shipments and 26% returns rate in apparel."
    }
  ]
};

export const candidateCompetencies = [
  { code: "C01", name: "Enterprise Strategy", score: 82, target: 80, gap: 0, level: "L3 Lead" },
  { code: "C03", name: "Enterprise Analysis", score: 76, target: 75, gap: 0, level: "L2 Independent" },
  { code: "C04", name: "Value Chain Transformation", score: 78, target: 75, gap: 0, level: "L2 Independent" },
  { code: "C07", name: "Operating Model / TOM", score: 62, target: 75, gap: 13, level: "L1 Assisted" },
  { code: "C08", name: "Transformation Design", score: 70, target: 75, gap: 5, level: "L2 Independent" },
  { code: "C13", name: "Problem Structuring (MECE)", score: 85, target: 80, gap: 0, level: "L3 Lead" },
  { code: "C14", name: "Data & Commercial Thinking", score: 58, target: 75, gap: 17, level: "L1 Assisted" },
  { code: "C15", name: "Executive Communication", score: 64, target: 75, gap: 11, level: "L1 Assisted" },
  { code: "C17", name: "Professional Judgement", score: 88, target: 80, gap: 0, level: "L3 Lead" }
];

export const sixteenWeekRoadmap = [
  {
    phase: "Phase 1: Foundations & Analytical Modeling",
    weeks: "Weeks 1–4",
    status: "CURRENT",
    competencyFocus: "C14 Data & Commercial Thinking",
    learningModules: [
      { id: "mod_1", title: "Unit Economics & Digital Fulfillment P&L Modeling", hours: 14, completed: true },
      { id: "mod_2", title: "Cohort Analysis & Customer Lifetime Value (LTV:CAC)", hours: 10, completed: false }
    ],
    milestone: "Submit complete interactive financial sensitivity model for Case OmniRetail",
    mentorTask: "1:1 review of quantitative assumption defense with Engagement Partner"
  },
  {
    phase: "Phase 2: Target Operating Model (TOM) Design",
    weeks: "Weeks 5–8",
    status: "UPCOMING",
    competencyFocus: "C07 Operating Model / TOM",
    learningModules: [
      { id: "mod_3", title: "Capability Heatmapping & Value Stream Decomposition", hours: 16, completed: false },
      { id: "mod_4", title: "Governance Design & RACI Decision Rights Matrix", hours: 12, completed: false }
    ],
    milestone: "Architect an end-to-end multi-channel supply chain operating model",
    mentorTask: "Mid-point capability calibration on architecture blueprints"
  },
  {
    phase: "Phase 3: Executive Communication & Synthesis",
    weeks: "Weeks 9–12",
    status: "UPCOMING",
    competencyFocus: "C15 Executive Communication",
    learningModules: [
      { id: "mod_5", title: "Minto Pyramid Principle & Board Memo Crafting", hours: 12, completed: false },
      { id: "mod_6", title: "High-Stakes Stakeholder Objection Handling", hours: 10, completed: false }
    ],
    milestone: "Deliver 5-slide C-suite recommendation deck and 3-minute video presentation",
    mentorTask: "Mock executive steering committee defense session"
  },
  {
    phase: "Phase 4: Client Readiness & Assessor Reassessment",
    weeks: "Weeks 13–16",
    status: "UPCOMING",
    competencyFocus: "CRI Gate Approval",
    learningModules: [
      { id: "mod_7", title: "Full Management Consulting Capstone Case Simulation", hours: 20, completed: false }
    ],
    milestone: "Achieve Client Readiness Index (CRI) >= 75 across live case evaluation",
    mentorTask: "Final progression sign-off for Client-Facing Consulting Deployment"
  }
];

export const assessorQueue = [
  {
    id: "rev_01",
    candidateId: "cand_948271",
    candidateName: "Sarah Jenkins",
    targetRole: "Senior Transformation Consultant",
    aiScore: 74,
    aiRecommendation: "Consultant Bridge (Targeted Gaps in TOM & Data)",
    confidence: "81% (High)",
    status: "PENDING_REVIEW",
    submittedDate: "2026-09-24",
    flagged: false,
    rubricEvaluation: {
      pyramidStructure: { ai: 72, notes: "Clear top-line headline; supporting points need tighter MECE discipline." },
      commercialLogic: { ai: 58, notes: "Identified fulfillment cost rise, but missed split-shipment root cause." },
      actionability: { ai: 85, notes: "Strong 90-day pragmatic roadmap." }
    }
  },
  {
    id: "rev_02",
    candidateId: "cand_817263",
    candidateName: "Marcus Sterling",
    targetRole: "Enterprise Strategy Lead",
    aiScore: 89,
    aiRecommendation: "Client-Facing Ready",
    confidence: "94% (Very High)",
    status: "READY_FOR_SIGN_OFF",
    submittedDate: "2026-09-23",
    flagged: false
  },
  {
    id: "rev_03",
    candidateId: "cand_402918",
    candidateName: "Priya Nair",
    targetRole: "Business Analyst",
    aiScore: 61,
    aiRecommendation: "Foundation Development Pathway",
    confidence: "67% (Borderline Review Required)",
    status: "NEEDS_CALIBRATION",
    submittedDate: "2026-09-24",
    flagged: true
  }
];

export const adminAssessmentMeta = {
  code: "METI-MC-2026",
  name: "Enterprise Management Consulting Track v1.1",
  version: "1.1.0",
  status: "PUBLISHED (IMMUTABLE)",
  totalSections: 6,
  totalQuestions: 22,
  scoringEngineVersion: "SE-v2.4",
  lastPublished: "2026-08-21 by Consulting Leadership"
};
