import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  FileText, BarChart3, Network, Users, Clock, ShieldCheck, CheckCircle2, 
  Sparkles, ArrowRight, ArrowLeft, AlertCircle, Save, Download, HelpCircle,
  TrendingDown, TrendingUp, Layers, Cpu, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

type ExhibitId = "pl" | "supply_chain" | "stakeholders";
type SynthesisTab = "root_cause" | "options" | "governance";

export default function CaseWorkspace() {
  const [, setLocation] = useLocation();
  const [activeExhibit, setActiveExhibit] = useState<ExhibitId>("pl");
  const [activeTab, setActiveTab] = useState<SynthesisTab>("root_cause");
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState("Just now");
  const [events, setEvents] = useState<string[]>(["Case workspace initialized"]);

  // Executive Synthesis Drafts (Alex Rivera candidate benchmark)
  const [rootCauseText, setRootCauseText] = useState(
    "Nexus Global Freight's EBITDA compression from 14.2% (FY23) to 6.8% (FY25) is driven by three interconnected structural failures rather than external rate deflation alone.\n\nFirst, legacy ERP fragmentation across 4 regional operating units generated $38M in redundant manual reconciliation and demurrage penalties. Second, operational warehouse dwell times surged by 42% at the Rotterdam and Singapore nodes due to uncoordinated dispatch systems. Third, SG&A overhead expanded unchecked by 18% during peak freight volumes and failed to flex downwards when container spot rates normalized. The fundamental issue is a misaligned Target Operating Model that lacks centralized visibility over freight margins."
  );

  const [optionsText, setOptionsText] = useState(
    "Option 1: Aggressive OpEx Retrenchment & Sub-Scale Hub Rationalization\n- Action: Terminate 6 redundant regional processing offices and freeze all discretionary hiring ($28M annual run-rate savings).\n- Trade-off: High risk of middle-management attrition; does not resolve root ERP data debt.\n\nOption 2: Phased Digital Core Migration with Value-Chain Process Optimization (Recommended)\n- Action: Implement unified cloud-native transport management system (TMS) across primary maritime corridors; automate customs clearance and optimize container dwell times ($44M EBITDA recapture by FY27).\n- Trade-off: Requires $14M phased investment and change management across operations.\n\nOption 3: Outsourced Freight Operations Joint Venture\n- Action: Carve out back-office documentation to a global BPO partner.\n- Trade-off: Sacrifices customer experience control and creates vendor margin dependency."
  );

  const [governanceText, setGovernanceText] = useState(
    "To guarantee execution, Nexus must establish a Transformation Office (TO) reporting directly to the Board Audit & Risk Committee and the CEO.\n\nFirst 30 Days: Appoint Transformation Lead, establish Weekly Value Realization Gates, and align COO and CFO on single source of freight margin truth.\nDays 31–60: Pilot automated TMS dispatch at Rotterdam Hub to prove 25% dwell time reduction; renegotiate top 5 maritime demurrage SLAs.\nDays 61–90: Full rollout to Singapore and APAC trade corridors; establish performance incentives tied to container turnaround velocity."
  );

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Autosave simulation
  useEffect(() => {
    const saveTimer = setInterval(() => {
      setLastSaved("Just now");
      logEvent("Autosave triggered");
    }, 15000);
    return () => clearInterval(saveTimer);
  }, [rootCauseText, optionsText, governanceText]);

  const logEvent = (evt: string) => {
    setEvents(prev => {
      const updated = [...prev, `${new Date().toLocaleTimeString()} - ${evt}`];
      return updated.slice(-4); // Keep last 4 events
    });
  };

  const handleTabChange = (tab: SynthesisTab) => {
    setActiveTab(tab);
    logEvent(`Switched to tab: ${tab}`);
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const caseSubmission = {
      submittedAt: new Date().toISOString(),
      timeSpentMinutes: Math.round((45 * 60 - timeLeft) / 60),
      rootCauseWords: countWords(rootCauseText),
      optionsWords: countWords(optionsText),
      governanceWords: countWords(governanceText),
      aiProvisionalScore: 89,
      status: "ready_for_review"
    };
    localStorage.setItem("meti_case_evidence", JSON.stringify(caseSubmission));

    setTimeout(() => {
      setIsSubmitting(false);
      setLocation("/assessor");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 py-6 lg:py-10">
        <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-10">
          
          {/* Top Bar: Case Header, Timer & Autosave Status */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
            <div className="flex flex-wrap items-center gap-3 text-[14px]">
              <Link href="/app" className="font-semibold text-[#52796F] hover:text-[#0B3B36] flex items-center gap-1.5">
                <ArrowLeft className="h-4 w-4" /> Workspace
              </Link>
              <span className="text-[#CBD5E1]">/</span>
              <span className="font-bold text-[#0B3B36]">Consulting Case Work Sample</span>
              <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold px-3 py-0.5 text-[12px]">
                Unaided Work Sample
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-white border border-border px-3.5 py-1.5 shadow-xs">
                <Clock className="h-4 w-4 text-[#0E8F91]" />
                <span className="font-mono text-[14px] font-bold text-[#0B3B36]">{formatTimer(timeLeft)}</span>
                <span className="text-[11px] font-medium text-[#52796F]">remaining</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[13px] font-semibold text-[#52796F]">
                <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Autosaved: <strong className="text-[#0B3B36]">{lastSaved}</strong></span>
              </div>
            </div>
          </div>

          {/* Split Screen Workspace */}
          <div className="grid gap-6 lg:grid-cols-2 items-start">
            
            {/* LEFT PANEL: Case Data Room & Exhibits */}
            <div className="space-y-5">
              
              <Card className="border-2 border-border bg-white shadow-card rounded-2xl overflow-hidden">
                
                {/* Case Scenario Brief Header */}
                <div className="border-b border-border bg-[#0B3B36] p-6 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0E8F91]">
                      Client Data Room · Enterprise Turnaround
                    </span>
                    <Badge className="bg-[#C58A32] text-white border-0 font-bold text-[11px]">
                      High Complexity
                    </Badge>
                  </div>
                  <h1 className="mt-2 font-sans text-[22px] font-extrabold tracking-tight">
                    Nexus Global Freight: Operating Model &amp; Margin Turnaround
                  </h1>
                  <p className="mt-1.5 font-sans text-[13px] text-[#CBD5E1] leading-relaxed">
                    $2.4B Global Logistics Carrier · Rotterdam, Singapore &amp; Long Beach Network · Margin Contraction Diagnostic
                  </p>
                </div>

                {/* Exhibit Navigation Tabs */}
                <div className="flex border-b border-border bg-[#F8FAFB] px-4 pt-2">
                  {[
                    { id: "pl", label: "Exhibit 1: P&L & Margin Decay", icon: BarChart3 },
                    { id: "supply_chain", label: "Exhibit 2: Bottleneck Nodes", icon: Network },
                    { id: "stakeholders", label: "Exhibit 3: Stakeholder Matrix", icon: Users },
                  ].map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => {
                        setActiveExhibit(ex.id as ExhibitId);
                        logEvent(`Viewed Exhibit: ${ex.label}`);
                      }}
                      className={cn(
                        "flex items-center gap-2 border-b-2 px-4 py-3 font-sans text-[13px] font-bold transition",
                        activeExhibit === ex.id
                          ? "border-[#0E8F91] text-[#0E8F91] bg-white rounded-t-lg shadow-xs"
                          : "border-transparent text-[#52796F] hover:text-[#0B3B36]"
                      )}
                    >
                      <ex.icon className="h-4 w-4" />
                      <span>{ex.label}</span>
                    </button>
                  ))}
                </div>

                {/* Exhibit Content Body */}
                <div className="p-6">
                  
                  {/* Exhibit 1: Financial Table */}
                  {activeExhibit === "pl" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="block text-[15px] font-bold text-[#0B3B36]">Consolidated P&amp;L Performance (FY23 – FY25)</strong>
                          <p className="text-[12px] text-[#52796F]">Values in USD Millions ($M) · Source: Nexus Internal Management Accounts</p>
                        </div>
                        <Badge className="bg-red-100 text-red-700 border-0 font-bold text-[11px]">
                          -740 bps EBITDA Decline
                        </Badge>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-border">
                        <table className="w-full text-left font-sans text-[13px]">
                          <thead className="bg-[#F8FAFB] text-[#0B3B36] font-bold border-b border-border">
                            <tr>
                              <th className="p-3">Financial Metric ($M)</th>
                              <th className="p-3 text-right">FY23 Actual</th>
                              <th className="p-3 text-right">FY24 Actual</th>
                              <th className="p-3 text-right">FY25 Projected</th>
                              <th className="p-3 text-right">2-Yr Variance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60 text-[#172321]">
                            <tr>
                              <td className="p-3 font-semibold text-[#0B3B36]">Gross Freight Revenue</td>
                              <td className="p-3 text-right">$2,650</td>
                              <td className="p-3 text-right">$2,480</td>
                              <td className="p-3 text-right">$2,400</td>
                              <td className="p-3 text-right text-red-600 font-bold">-9.4%</td>
                            </tr>
                            <tr>
                              <td className="p-3 pl-6 text-[#52796F]">Carrier Vessel Chartering &amp; Fuel</td>
                              <td className="p-3 text-right">($1,520)</td>
                              <td className="p-3 text-right">($1,490)</td>
                              <td className="p-3 text-right">($1,510)</td>
                              <td className="p-3 text-right font-medium">-0.6%</td>
                            </tr>
                            <tr>
                              <td className="p-3 pl-6 text-[#52796F]">Port Terminal &amp; Demurrage Fees</td>
                              <td className="p-3 text-right">($210)</td>
                              <td className="p-3 text-right">($265)</td>
                              <td className="p-3 text-right text-red-600 font-bold">($310)</td>
                              <td className="p-3 text-right text-red-600 font-bold">+47.6%</td>
                            </tr>
                            <tr className="bg-[#F8FAFB]/60 font-semibold">
                              <td className="p-3 text-[#0B3B36]">Gross Margin</td>
                              <td className="p-3 text-right">$920 (34.7%)</td>
                              <td className="p-3 text-right">$725 (29.2%)</td>
                              <td className="p-3 text-right text-red-600 font-bold">$580 (24.2%)</td>
                              <td className="p-3 text-right text-red-600 font-bold">-37.0%</td>
                            </tr>
                            <tr>
                              <td className="p-3 pl-6 text-[#52796F]">Regional SG&amp;A &amp; Back-Office Ops</td>
                              <td className="p-3 text-right">($395)</td>
                              <td className="p-3 text-right">($415)</td>
                              <td className="p-3 text-right text-red-600 font-bold">($418)</td>
                              <td className="p-3 text-right text-red-600 font-bold">+5.8%</td>
                            </tr>
                            <tr className="bg-[#E3F3F1]/40 font-bold text-[#0B3B36]">
                              <td className="p-3">Operating EBITDA</td>
                              <td className="p-3 text-right">$376 (14.2%)</td>
                              <td className="p-3 text-right">$210 (8.5%)</td>
                              <td className="p-3 text-right text-red-600 font-extrabold">$163 (6.8%)</td>
                              <td className="p-3 text-right text-red-600 font-extrabold">-56.6%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>


                    </div>
                  )}

                  {/* Exhibit 2: Bottleneck Nodes Diagram */}
                  {activeExhibit === "supply_chain" && (
                    <div className="space-y-4 animate-fade-in">
                      <strong className="block text-[15px] font-bold text-[#0B3B36]">Global Freight Hub Bottleneck Telemetry</strong>
                      
                      <div className="grid gap-3.5 sm:grid-cols-3">
                        {[
                          { node: "Rotterdam Terminal Hub", cap: "94% Saturation", dwell: "14.2 Days (Target: 4)", status: "Severe Bottleneck", tone: "red" },
                          { node: "Singapore Transshipment", cap: "88% Saturation", dwell: "9.8 Days (Target: 3)", status: "High Delay Risk", tone: "amber" },
                          { node: "Long Beach Gateway", cap: "82% Saturation", dwell: "7.1 Days (Target: 4)", status: "Chassis Constraint", tone: "amber" }
                        ].map((hub, i) => (
                          <div key={i} className="rounded-xl border border-border p-4 bg-[#F8FAFB]">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-[13px] text-[#0B3B36]">{hub.node}</span>
                              <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", hub.tone === "red" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800")}>
                                {hub.tone === "red" ? "Critical" : "Warning"}
                              </span>
                            </div>
                            <div className="space-y-1 text-[12px] text-[#172321]">
                              <div>Capacity: <strong>{hub.cap}</strong></div>
                              <div>Container Dwell: <strong className="text-red-600">{hub.dwell}</strong></div>
                              <div className="text-[11px] text-[#52796F] mt-1">{hub.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl border border-border bg-white p-4 text-[13px] leading-relaxed text-[#172321]">
                        <strong className="block font-bold text-[#0B3B36] mb-1">Root Cause Architecture:</strong>
                        Legacy dispatch across the four hubs operates on 3 separate on-premises ERP databases with zero real-time interchange EDI. Shipments are manually verified by customs clerks via spreadsheets, triggering automatic demurrage penalties every 24 hours of delay.
                      </div>
                    </div>
                  )}

                  {/* Exhibit 3: Stakeholder Matrix */}
                  {activeExhibit === "stakeholders" && (
                    <div className="space-y-4 animate-fade-in">
                      <strong className="block text-[15px] font-bold text-[#0B3B36]">C-Suite Transformation Alignment Matrix</strong>
                      
                      <div className="space-y-3">
                        {[
                          { role: "Chief Financial Officer (CFO)", stance: "Hostile to Capital Outlays", priority: "Immediate $40M OpEx freeze and contract terminations. Skeptical of multi-year software projects." },
                          { role: "Chief Operating Officer (COO)", stance: "Operational Continuity Defender", priority: "Adamantly refuses system cutover during peak Q4 season. Demands 6-month buffer and warehouse overtime approval." },
                          { role: "Chief Commercial Officer (CCO)", stance: "Customer Churn Anxious", priority: "Top 20 enterprise retail accounts threatening RFP re-tender due to freight visibility opacity." },
                        ].map((st, i) => (
                          <div key={i} className="rounded-xl border border-border p-4 bg-[#F8FAFB]">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[14px] text-[#0B3B36]">{st.role}</span>
                              <Badge className="bg-white text-[#52796F] border-border text-[11px]">{st.stance}</Badge>
                            </div>
                            <p className="mt-2 text-[13px] text-[#172321] leading-relaxed">{st.priority}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </Card>

              {/* Standardized Case Protocol Badge */}
              <div className="rounded-2xl border border-border bg-white p-4 shadow-xs flex items-center justify-between text-[12px] text-[#52796F]">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#0E8F91]" />
                  <span><strong>Standardized Case Protocol:</strong> Unaided work sample evaluated on MECE problem structuring, quantitative causality, and strategic trade-offs.</span>
                </span>
                <span className="font-mono font-bold text-[#0E8F91]">ID: CASE-NEXUS-2026</span>
              </div>

              {/* Telemetry Log */}
              <div className="rounded-2xl border border-border bg-[#F8FAFB] p-4 shadow-xs">
                <div className="flex items-center gap-2 mb-2 font-bold text-[#0B3B36] text-[13px]">
                  <Activity className="h-4 w-4 text-[#0E8F91]" /> Candidate Telemetry Active
                </div>
                <div className="space-y-1">
                  {events.map((evt, i) => (
                    <div key={i} className="text-[11px] font-mono text-[#52796F] truncate">{evt}</div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT PANEL: Structured Executive Synthesis Tabs */}
            <div className="space-y-5">
              
              <Card className="border-2 border-border bg-white shadow-card rounded-2xl overflow-hidden">
                
                {/* Synthesis Header */}
                <div className="border-b border-border bg-[#F8FAFB] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0E8F91]">
                        Deliverable Synthesis
                      </span>
                      <h2 className="mt-1 font-sans text-[18px] font-bold text-[#0B3B36]">
                        Executive Board Recommendation Memo
                      </h2>
                    </div>
                    <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold text-[11px]">
                      3 Required Sections
                    </Badge>
                  </div>

                  {/* Section Switcher */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { id: "root_cause", label: "1. Root Cause" },
                      { id: "options", label: "2. Strategic Options" },
                      { id: "governance", label: "3. Governance & 90D" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as SynthesisTab)}
                        className={cn(
                          "rounded-xl p-2.5 text-left border-2 transition",
                          activeTab === tab.id
                            ? "border-[#0E8F91] bg-white shadow-xs"
                            : "border-border bg-white/60 hover:bg-white"
                        )}
                      >
                        <div className="font-sans text-[12px] font-bold text-[#0B3B36]">{tab.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor Body */}
                <div className="p-6">
                  
                  {activeTab === "root_cause" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-start justify-between">
                        <div>
                          <label className="block text-[14px] font-bold text-[#0B3B36]">
                            Section 1: Problem Definition &amp; Root Cause Analysis
                          </label>
                          <p className="text-[12px] text-[#52796F]">
                            Synthesize the financial &amp; operational drivers of the 740 bps margin compression.
                          </p>
                        </div>
                      </div>
                      <textarea
                        rows={14}
                        value={rootCauseText}
                        onChange={(e) => setRootCauseText(e.target.value)}
                        className="w-full rounded-xl border-2 border-border bg-[#F8FAFB] p-4 font-sans text-[14px] leading-relaxed text-[#172321] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                        placeholder="State your hypothesis, decompose P&L drivers, and isolate structural vs cyclical issues..."
                      />
                    </div>
                  )}

                  {activeTab === "options" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-start justify-between">
                        <div>
                          <label className="block text-[14px] font-bold text-[#0B3B36]">
                            Section 2: Strategic Intervention Options &amp; Trade-Offs
                          </label>
                          <p className="text-[12px] text-[#52796F]">
                            Propose 2–3 feasible options with quantifiable financial upside, risk, and feasibility.
                          </p>
                        </div>
                      </div>
                      <textarea
                        rows={14}
                        value={optionsText}
                        onChange={(e) => setOptionsText(e.target.value)}
                        className="w-full rounded-xl border-2 border-border bg-[#F8FAFB] p-4 font-sans text-[14px] leading-relaxed text-[#172321] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                        placeholder="Detail Option 1, Option 2 (recommended), and Option 3 with explicit trade-offs..."
                      />
                    </div>
                  )}

                  {activeTab === "governance" && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-start justify-between">
                        <div>
                          <label className="block text-[14px] font-bold text-[#0B3B36]">
                            Section 3: Transformation Governance &amp; First 90 Days
                          </label>
                          <p className="text-[12px] text-[#52796F]">
                            Define stakeholder alignment, Transformation Office (TO) cadence, and risk mitigation.
                          </p>
                        </div>
                      </div>
                      <textarea
                        rows={14}
                        value={governanceText}
                        onChange={(e) => setGovernanceText(e.target.value)}
                        className="w-full rounded-xl border-2 border-border bg-[#F8FAFB] p-4 font-sans text-[14px] leading-relaxed text-[#172321] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                        placeholder="Outline governance structure, 30-60-90 day milestone gates, and CCO/COO alignment..."
                      />
                    </div>
                  )}

                  {/* Bottom Navigation & Complete Notice */}
                  <div className="mt-6 flex flex-wrap items-center justify-end gap-4 border-t border-border pt-4">

                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                      className="bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold text-[14px] px-6 py-2.5 rounded-xl shadow-mint"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Work Sample"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                </div>

              </Card>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
