import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, Sliders, FileText, 
  Video, BarChart3, ArrowRight, ArrowLeft, Award, UserCheck, Lock, 
  HelpCircle, MessageSquare, Compass, Check, Users, Calendar, BookOpen, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

type ConsoleView = "evaluator" | "mentor";
type EvidenceTab = "case" | "video" | "talent_dna";

interface CandidateQueueItem {
  id: string;
  name: string;
  initials: string;
  track: string;
  aiScore: number;
  confidence: number;
  status: "Ready for Calibration" | "Calibrated" | "Borderline";
  recommendedPathway: string;
}

const candidateQueue: CandidateQueueItem[] = [
  {
    id: "CAND-ALEX-RIVERA-2026",
    name: "Alex Rivera",
    initials: "AR",
    track: "Strategy & Transformation Track",
    aiScore: 75,
    confidence: 91,
    status: "Ready for Calibration",
    recommendedPathway: "P2: Consultant Bridge"
  },
  {
    id: "CAND-MARCUS-VANCE-2026",
    name: "Marcus Vance",
    initials: "MV",
    track: "Operations & Supply Chain Track",
    aiScore: 68,
    confidence: 84,
    status: "Borderline",
    recommendedPathway: "P4: Transformation Foundation"
  },
  {
    id: "CAND-PRIYA-PATEL-2026",
    name: "Priya Patel",
    initials: "PP",
    track: "Business Analysis & Operating Models",
    aiScore: 84,
    confidence: 94,
    status: "Calibrated",
    recommendedPathway: "P1: Direct Consulting Review"
  }
];

export default function AssessorReview() {
  const [, setLocation] = useLocation();
  const [consoleView, setConsoleView] = useState<ConsoleView>("evaluator");
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateQueueItem>(candidateQueue[0]);
  const [evidenceTab, setEvidenceTab] = useState<EvidenceTab>("case");
  
  // Rubric Sliders (1.0 to 5.0 scale)
  const [rubricScores, setRubricScores] = useState({
    structuring: 4.2,
    financial: 3.8,
    presence: 4.5,
    governance: 4.0,
  });

  const [pathway, setPathway] = useState("P2");
  const [overrideReason, setOverrideReason] = useState(
    "Candidate demonstrated exceptional pyramid logic and stakeholder sensitivity during oral briefing, justifying an upward calibration of the provisional capability index."
  );
  const [isCertified, setIsCertified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute calibrated human score
  const baseAiScore = selectedCandidate.aiScore;
  const avgRubric = (rubricScores.structuring + rubricScores.financial + rubricScores.presence + rubricScores.governance) / 4;
  const humanScore = Math.round((avgRubric / 5) * 100);
  const scoreDiffPercent = Math.abs(((humanScore - baseAiScore) / baseAiScore) * 100);
  const requiresOverrideJustification = scoreDiffPercent > 10;

  const handleCertify = () => {
    setIsSubmitting(true);
    const certificationData = {
      certifiedAt: new Date().toISOString(),
      candidateId: selectedCandidate.id,
      candidateName: selectedCandidate.name,
      aiScore: baseAiScore,
      humanCalibratedScore: humanScore,
      rubricScores,
      assignedPathway: pathway,
      overrideReason: requiresOverrideJustification ? overrideReason : null,
      assessorId: "ASSESSOR-SR-PARTNER-09",
      certificateHash: "MODUS-METI-CERT-88F4A12B"
    };
    localStorage.setItem("meti_certification", JSON.stringify(certificationData));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCertified(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          
          {/* Header Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
            <div className="flex flex-wrap items-center gap-3 text-[14px]">
              <Link href="/app" className="font-semibold text-[#52796F] hover:text-[#0B3B36] flex items-center gap-1.5">
                <ArrowLeft className="h-4 w-4" /> Candidate Workspace
              </Link>
              <span className="text-[#CBD5E1]">/</span>
              <span className="font-bold text-[#0B3B36]">Human Evaluator &amp; Mentor Console</span>
              <Badge className="bg-[#0B3B36] text-white border-0 font-bold px-3 py-0.5 text-[12px]">
                Senior Partner Desk
              </Badge>
            </div>

            {/* View Switcher: Assessor Desk vs Mentor Workspace */}
            <div className="flex items-center rounded-xl bg-white border border-border p-1 shadow-xs text-[13px] font-bold">
              <button
                type="button"
                onClick={() => setConsoleView("evaluator")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg transition-all",
                  consoleView === "evaluator"
                    ? "bg-[#0E8F91] text-white shadow-xs"
                    : "text-[#52796F] hover:text-[#0B3B36]"
                )}
              >
                Evaluator Calibration
              </button>
              <button
                type="button"
                onClick={() => setConsoleView("mentor")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg transition-all",
                  consoleView === "mentor"
                    ? "bg-[#0B3B36] text-white shadow-xs"
                    : "text-[#52796F] hover:text-[#0B3B36]"
                )}
              >
                Mentor Workspace
              </button>
            </div>
          </div>

          {/* Candidate Selector Queue Strip */}
          <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#52796F] shrink-0">
              Evaluation Queue:
            </span>
            {candidateQueue.map((cand) => (
              <button
                key={cand.id}
                type="button"
                onClick={() => {
                  setSelectedCandidate(cand);
                  setIsCertified(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-2 px-4 py-2.5 transition text-left shrink-0 bg-white",
                  selectedCandidate.id === cand.id
                    ? "border-[#0E8F91] shadow-card ring-2 ring-[#0E8F91]/20"
                    : "border-border hover:border-[#0E8F91]/60"
                )}
              >
                <div className="h-9 w-9 rounded-full bg-[#0B3B36] text-[#0E8F91] flex items-center justify-center font-bold text-[13px]">
                  {cand.initials}
                </div>
                <div>
                  <strong className="block text-[14px] font-bold text-[#0B3B36]">{cand.name}</strong>
                  <span className="text-[11px] text-[#52796F]">{cand.track}</span>
                </div>
                <div className="ml-2 text-right">
                  <span className="text-[13px] font-extrabold text-[#0B3B36]">{cand.aiScore}</span>
                  <span className="text-[10px] text-[#52796F] block">{cand.confidence}% conf.</span>
                </div>
              </button>
            ))}
          </div>

          {/* Candidate Overview Card */}
          <Card className="mb-8 border-2 border-border bg-white p-6 shadow-card rounded-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-[#0B3B36] text-[#0E8F91] flex items-center justify-center font-sans font-extrabold text-[24px] shadow-sm">
                  {selectedCandidate.initials}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-sans text-[22px] font-extrabold text-[#0B3B36]">{selectedCandidate.name}</h1>
                    <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold">
                      {selectedCandidate.track}
                    </Badge>
                    {isCertified && (
                      <Badge className="bg-[#10B981] text-white border-0 font-bold flex items-center gap-1">
                        <Check className="h-3 w-3 stroke-[3]" /> Accredited &amp; Certified
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] text-[#52796F]">
                    Candidate ID: <span className="font-mono font-bold text-[#0B3B36]">{selectedCandidate.id}</span> · Entitlement: Combined Executive Bundle
                  </p>
                </div>
              </div>

              {/* Score Comparison */}
              <div className="flex flex-wrap items-center gap-6 border-t border-border pt-4 lg:border-t-0 lg:pt-0">
                <div className="text-right">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#52796F]">AI Provisional Score</span>
                  <div className="text-[28px] font-extrabold text-[#52796F] leading-none mt-1">
                    {baseAiScore} <span className="text-[14px] font-normal text-[#8DA19D]">/ 100</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0E8F91]">{selectedCandidate.confidence}% confidence</span>
                </div>

                <div className="h-10 w-px bg-border hidden sm:block" />

                <div className="text-right">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91]">Calibrated Partner Score</span>
                  <div className="text-[36px] font-extrabold text-[#0B3B36] leading-none mt-1">
                    {humanScore} <span className="text-[16px] font-normal text-[#52796F]">/ 100</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#10B981]">
                    {humanScore > baseAiScore ? `+${humanScore - baseAiScore} pts adjustment` : "Calibrated"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* VIEW 1: Evaluator Calibration Console */}
          {consoleView === "evaluator" && (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start animate-fade-in">
              
              {/* Left Column: Evidence Inspector */}
              <div className="space-y-6">
                <Card className="border-2 border-border bg-white shadow-card rounded-2xl overflow-hidden">
                  
                  {/* Evidence Tabs Header */}
                  <div className="flex border-b border-border bg-[#F8FAFB] px-5 pt-3">
                    {[
                      { id: "case", label: "Case Synthesis", icon: FileText },
                      { id: "video", label: "Executive Briefing", icon: Video },
                      { id: "talent_dna", label: "Talent DNA & Values", icon: BarChart3 },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setEvidenceTab(tab.id as EvidenceTab)}
                        className={cn(
                          "flex items-center gap-2 border-b-2 px-4 py-3 font-sans text-[13px] font-bold transition",
                          evidenceTab === tab.id
                            ? "border-[#0E8F91] text-[#0E8F91] bg-white rounded-t-lg shadow-xs"
                            : "border-transparent text-[#52796F] hover:text-[#0B3B36]"
                        )}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Evidence Body */}
                  <div className="p-6">
                    {evidenceTab === "case" && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <div>
                            <strong className="block text-[15px] font-bold text-[#0B3B36]">
                              Work Sample Deliverable: Nexus Turnaround Memo
                            </strong>
                            <p className="text-[12px] text-[#52796F]">Unaided timed work sample · 45-minute sprint</p>
                          </div>
                          <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold text-[11px]">
                            89 AI Quality Rating
                          </Badge>
                        </div>

                        <div className="rounded-xl border border-border bg-[#F8FAFB] p-4 text-[13px] leading-relaxed text-[#172321] space-y-3">
                          <div>
                            <strong className="text-[#0B3B36]">Root Cause Deconstruction:</strong>
                            <p className="mt-1">
                              "Nexus Global Freight's EBITDA compression from 14.2% to 6.8% is driven by three structural failures: legacy ERP fragmentation generating $38M in demurrage penalties, uncoordinated dispatch surging dwell times by 42% at Rotterdam and Singapore, and SG&A scaling by 18% unchecked."
                            </p>
                            <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#0E8F91]">
                              <Sparkles className="h-3 w-3" /> AI Insight: Strong identification of the $100M demurrage causality.
                            </span>
                          </div>

                          <div className="border-t border-border/60 pt-2">
                            <strong className="text-[#0B3B36]">Strategic Recommendation:</strong>
                            <p className="mt-1">
                              "Option 2: Phased Digital Core Migration with Value-Chain Process Optimization ($44M EBITDA recapture by FY27). Proposes establishing a Transformation Office (TO) with 30-60-90 day milestone gates to defuse COO resistance."
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {evidenceTab === "video" && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <div>
                            <strong className="block text-[15px] font-bold text-[#0B3B36]">
                              Board Briefing Transcript &amp; Oral Delivery Telemetry
                            </strong>
                            <p className="text-[12px] text-[#52796F]">Simulated Board Briefing · Duration: 01:54 · Speech Clarity: 98%</p>
                          </div>
                          <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold text-[11px]">
                            86 / 100 Communication Index
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-2">
                          <div className="rounded-xl bg-[#F8FAFB] p-3 text-center border border-border">
                            <span className="text-[11px] text-[#52796F] block">Pace</span>
                            <strong className="text-[14px] text-[#0B3B36]">138 WPM</strong>
                          </div>
                          <div className="rounded-xl bg-[#F8FAFB] p-3 text-center border border-border">
                            <span className="text-[11px] text-[#52796F] block">Filler Density</span>
                            <strong className="text-[14px] text-[#10B981]">1.2% (Low)</strong>
                          </div>
                          <div className="rounded-xl bg-[#F8FAFB] p-3 text-center border border-border">
                            <span className="text-[11px] text-[#52796F] block">Demographic Bias</span>
                            <strong className="text-[14px] text-[#0E8F91]">Zero (Neutral)</strong>
                          </div>
                        </div>

                        <div className="rounded-xl border border-border bg-[#F8FAFB] p-4 text-[13px] leading-relaxed text-[#172321] space-y-2">
                          <div className="flex gap-2">
                            <span className="font-mono text-[11px] font-bold text-[#0E8F91] shrink-0">[00:04]</span>
                            <p>"Members of the Board, our immediate priority is balancing liquidity defense with operational risk..."</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-mono text-[11px] font-bold text-[#0E8F91] shrink-0">[00:38]</span>
                            <p>"The CFO's 25% freeze is understandable, but pausing ERP cutover will cause Q4 tracking outages costing $38M in demurrage..."</p>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-mono text-[11px] font-bold text-[#0E8F91] shrink-0">[01:15]</span>
                            <p>"I recommend a $14M phased budget release: fund Phase 1 Rotterdam automation now, defer analytics to FY27."</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {evidenceTab === "talent_dna" && (
                      <div className="space-y-4 animate-fade-in">
                        <strong className="block text-[15px] font-bold text-[#0B3B36]">
                          Enterprise Talent DNA &amp; Schwartz Values Balance
                        </strong>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            { dim: "Enterprise & Systems Thinking", score: "88 / 100", tag: "Very Strong" },
                            { dim: "Purpose & Motivation", score: "82 / 100", tag: "High" },
                            { dim: "Customer & Consulting DNA", score: "85 / 100", tag: "Strong" },
                            { dim: "Leadership & Professional Judgement", score: "79 / 100", tag: "Solid" },
                          ].map((dna, idx) => (
                            <div key={idx} className="rounded-xl border border-border p-3.5 bg-[#F8FAFB] flex items-center justify-between">
                              <div>
                                <span className="font-bold text-[13px] text-[#0B3B36] block">{dna.dim}</span>
                                <span className="text-[11px] text-[#52796F]">{dna.tag}</span>
                              </div>
                              <span className="font-mono font-bold text-[14px] text-[#0E8F91]">{dna.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Subtle Trust Badge */}
                <div className="rounded-2xl border border-border bg-white p-5 shadow-xs flex items-start gap-3.5 text-[#52796F]">
                  <ShieldCheck className="h-5 w-5 text-[#0E8F91] shrink-0 mt-0.5" />
                  <div className="text-[13px] leading-relaxed">
                    <strong className="font-bold text-[#0B3B36]">Verified Partner Calibration:</strong> All AI evaluations are reviewed and calibrated by Senior Transformation Partners before client presentation. All scoring adjustments are recorded in the candidate evidence graph.
                  </div>
                </div>
              </div>

              {/* Right Column: Calibration Rubric Sliders & Certification */}
              <div className="space-y-6">
                <Card className="border-2 border-border bg-white p-7 shadow-card rounded-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="font-sans text-[18px] font-bold text-[#0B3B36]">Partner Calibration Rubric</h2>
                      <p className="text-[12px] text-[#52796F]">1.0 to 5.0 anchor scale</p>
                    </div>
                    <Badge className="bg-[#FDF5E8] text-[#845C1D] border-0 font-bold px-3 py-1">
                      4 Anchored Dimensions
                    </Badge>
                  </div>

                  <div className="space-y-5">
                    {[
                      { key: "structuring", label: "1. Problem Structuring & Hypothesis Rigor", val: rubricScores.structuring, anchor: "Pyramid logic, MECE deconstruction" },
                      { key: "financial", label: "2. Financial & Operational Acumen", val: rubricScores.financial, anchor: "P&L decay, margin causality, unit economics" },
                      { key: "presence", label: "3. Executive Presence & Influence", val: rubricScores.presence, anchor: "Board poise, concision, stakeholder handling" },
                      { key: "governance", label: "4. Change Governance & Pragmatism", val: rubricScores.governance, anchor: "30-60-90 day gates, resistance mitigation" },
                    ].map((slider) => (
                      <div key={slider.key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-bold text-[13px] text-[#0B3B36]">{slider.label}</label>
                          <span className="font-mono text-[14px] font-extrabold text-[#0E8F91]">
                            {slider.val.toFixed(1)} / 5.0
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="5.0"
                          step="0.1"
                          value={slider.val}
                          onChange={(e) => setRubricScores({ ...rubricScores, [slider.key]: parseFloat(e.target.value) })}
                          className="w-full accent-[#0E8F91] h-2 bg-[#E2E8EA] rounded-lg cursor-pointer"
                        />
                        <p className="text-[11px] text-[#52796F]">{slider.anchor}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recalculated Score */}
                  <div className="mt-6 rounded-xl bg-[#E3F3F1] p-4 text-[#0B3B36] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91]">Calibrated Composite Index</span>
                      <strong className="block text-[22px] font-extrabold text-[#0B3B36]">{humanScore} / 100</strong>
                    </div>
                    <Badge className="bg-white text-[#0B3B36] border-0 font-bold px-3 py-1 shadow-xs">
                      {humanScore >= 80 ? "Client Ready (Level 3)" : "Developing (Level 2)"}
                    </Badge>
                  </div>

                  {/* Override Justification Box */}
                  {requiresOverrideJustification && (
                    <div className="mt-5 rounded-xl border-2 border-[#C58A32] bg-[#FDF5E8] p-4 text-[#845C1D] animate-fade-in space-y-2">
                      <div className="flex items-center gap-2 font-bold text-[13px]">
                        <AlertTriangle className="h-4 w-4 text-[#C58A32]" />
                        <span>Partner Override Justification Required (Deviation: {scoreDiffPercent.toFixed(1)}%)</span>
                      </div>
                      <textarea
                        rows={3}
                        value={overrideReason}
                        onChange={(e) => setOverrideReason(e.target.value)}
                        placeholder="State the partner justification for deviating from the AI provisional baseline..."
                        className="w-full rounded-lg border border-[#F6EBD5] bg-white p-3 font-sans text-[13px] text-[#172321] outline-none focus:border-[#C58A32]"
                      />
                    </div>
                  )}

                  {/* Pathway Decision */}
                  <div className="mt-6 space-y-2">
                    <label className="block text-[13px] font-bold text-[#0B3B36]">
                      Assigned Development Pathway
                    </label>
                    <select
                      value={pathway}
                      onChange={(e) => setPathway(e.target.value)}
                      className="w-full rounded-xl border-2 border-border bg-[#F8FAFB] p-3 text-[14px] font-bold text-[#0B3B36] outline-none focus:border-[#0E8F91]"
                    >
                      <option value="P1">P1: Direct Consulting Review (Ready for Client Delivery Shortlist)</option>
                      <option value="P2">P2: Consultant Bridge (4–8 Week Targeted Financial Modeling) [Recommended]</option>
                      <option value="P3">P3: Graduate Analyst (Structured Analyst Development)</option>
                      <option value="P4">P4: Enterprise Transformation Foundation (Core Consulting Bootcamp)</option>
                      <option value="P6">P6: Business Analyst Route (Strong Value Chain / Process Focus)</option>
                    </select>
                  </div>

                  {/* Certify Button */}
                  <div className="mt-6 border-t border-border pt-5">
                    <Button
                      onClick={handleCertify}
                      disabled={isSubmitting || isCertified}
                      className="w-full bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold text-[15px] py-4 rounded-xl shadow-mint"
                    >
                      {isCertified ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" /> Official Certification Recorded
                        </span>
                      ) : isSubmitting ? (
                        "Certifying in Evidence Graph..."
                      ) : (
                        <span className="flex items-center gap-2 justify-center">
                          <Award className="h-5 w-5" /> Certify Official Candidate Dossier
                        </span>
                      )}
                    </Button>
                  </div>

                </Card>

                {isCertified && (
                  <Card className="border-2 border-[#10B981] bg-[#ECFDF5] p-6 text-[#065F46] rounded-2xl animate-fade-in shadow-md">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-[#10B981] shrink-0" />
                      <div>
                        <h4 className="font-sans text-[16px] font-bold text-[#065F46]">Dossier Certified &amp; Accredited</h4>
                        <p className="mt-0.5 text-[12px] text-[#065F46]/80">
                          Certificate Hash: <code className="font-mono font-bold">MODUS-METI-CERT-88F4A12B</code>
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#065F46]">
                      {selectedCandidate.name} is certified on Pathway <strong>{pathway}: Consultant Bridge</strong>. The candidate report, verified employer view, and 16-Week KNOLSKAPE roadmap have been unlocked.
                    </p>
                  </Card>
                )}
              </div>

            </div>
          )}

          {/* VIEW 2: Mentor Workspace (TDD Section 19 / Screen S11) */}
          {consoleView === "mentor" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                
                {/* 16-Week Milestone Progress */}
                <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-7">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-sans text-[18px] font-bold text-[#0B3B36]">
                        {selectedCandidate.name}'s 16-Week Learning Plan
                      </h3>
                      <p className="text-[13px] text-[#52796F]">
                        KNOLSKAPE Transformation Roadmap · Assigned Mentor: Evelyn Vance
                      </p>
                    </div>
                    <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold px-3 py-1">
                      Sprint 1 in Progress
                    </Badge>
                  </div>

                  <div className="space-y-4 mt-6">
                    {[
                      { sprint: "Weeks 1–4", title: "Problem Structuring & Issue Trees", hours: "12 / 16 hrs", progress: 75, status: "Active Sprint", deliverables: "Nexus P&L decomposition memo (Submitted)" },
                      { sprint: "Weeks 5–8", title: "Value Chain Diagnostics & Unit Economics", hours: "0 / 20 hrs", progress: 0, status: "Upcoming", deliverables: "Rotterdam warehouse dwell simulation" },
                      { sprint: "Weeks 9–12", title: "Executive Framing & C-Suite Handling", hours: "0 / 18 hrs", progress: 0, status: "Upcoming", deliverables: "Mock Board confrontation exercise" },
                      { sprint: "Weeks 13–16", title: "Live Transformation Capstone", hours: "0 / 24 hrs", progress: 0, status: "Upcoming", deliverables: "Peer-benchmarked capstone presentation" },
                    ].map((sp) => (
                      <div key={sp.sprint} className="rounded-xl border border-border p-4.5 bg-[#F8FAFB]">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-[11px] font-extrabold uppercase text-[#0E8F91]">{sp.sprint}</span>
                            <strong className="block text-[15px] font-bold text-[#0B3B36] mt-0.5">{sp.title}</strong>
                          </div>
                          <Badge className={cn("border-0 font-bold text-[11px]", sp.progress > 0 ? "bg-[#E3F3F1] text-[#0E8F91]" : "bg-white text-[#52796F]")}>
                            {sp.status}
                          </Badge>
                        </div>
                        <p className="text-[12px] text-[#52796F] mt-1.5">Deliverable: {sp.deliverables}</p>
                        <div className="mt-3 flex items-center justify-between text-[12px]">
                          <span className="text-[#52796F]">Progress: {sp.hours}</span>
                          <span className="font-bold text-[#0B3B36]">{sp.progress}%</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full rounded-full bg-[#E2E8EA] overflow-hidden">
                          <div className="h-full bg-[#0E8F91] rounded-full transition-all" style={{ width: `${sp.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Mentor Notes & Reassessment Date */}
                <div className="space-y-6">
                  <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-6">
                    <h4 className="font-sans text-[16px] font-bold text-[#0B3B36] mb-2">Mentor Calibration Notes</h4>
                    <p className="text-[13px] text-[#52796F] mb-3">Private notes visible only to assigned mentors and assessors.</p>
                    <textarea
                      rows={5}
                      defaultValue="Alex shows high natural instinct for executive brevity. Next coaching session should focus on explicitly proving mathematical MECE logic during issue tree decomposition under time pressure."
                      className="w-full rounded-xl border border-border bg-[#F8FAFB] p-3 text-[13px] text-[#172321] outline-none focus:border-[#0E8F91]"
                    />
                    <Button className="mt-3 bg-[#0B3B36] text-white hover:bg-[#082A26] font-bold text-[13px] rounded-xl">
                      Save Mentor Note
                    </Button>
                  </Card>

                  <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="h-5 w-5 text-[#0E8F91]" />
                      <div>
                        <strong className="block text-[15px] font-bold text-[#0B3B36]">Target Reassessment Milestone</strong>
                        <span className="text-[12px] text-[#52796F]">Post-Sprint 2 Mid-Point Review</span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#F8FAFB] border border-border p-3.5 text-[13px]">
                      <div className="flex justify-between py-1">
                        <span className="text-[#52796F]">Scheduled Date:</span>
                        <strong className="text-[#0B3B36]">October 28, 2026</strong>
                      </div>
                      <div className="flex justify-between py-1 border-t border-border/60">
                        <span className="text-[#52796F]">Target Competency:</span>
                        <strong className="text-[#0E8F91]">Level 3 (Client Delivery)</strong>
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
