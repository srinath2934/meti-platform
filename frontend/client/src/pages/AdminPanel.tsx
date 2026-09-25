import { useState } from "react";
import { Link } from "wouter";
import { 
  Building, ShieldCheck, Tag, Sparkles, Sliders, Database, 
  Cpu, BarChart3, Users, DollarSign, CheckCircle2, Lock, 
  ArrowRight, ArrowLeft, RefreshCw, Layers, Award, AlertTriangle,
  PlusCircle, BookOpen, Clock, FileText, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

type AdminTab = "commercial" | "content" | "models" | "fairness" | "audit";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("commercial");
  const [notice, setNotice] = useState("");

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          
          {/* Header Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-sans text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#0E8F91]">
                  Enterprise Administration &amp; Governance Portal
                </span>
                <Badge className="bg-[#0B3B36] text-white border-0 font-bold px-2.5 py-0.5 text-[11px]">
                  Tenant: Modus Global
                </Badge>
              </div>
              <h1 className="mt-2 font-sans text-[clamp(28px,3.2vw,38px)] font-extrabold tracking-tight text-[#0B3B36]">
                System Administration &amp; Calibration Desk
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/app">
                <Button variant="outline" className="border-[#0E8F91] text-[#0E8F91] hover:bg-[#E3F3F1] font-bold text-[13px] rounded-xl">
                  Candidate Portal &rarr;
                </Button>
              </Link>
              <Link href="/assessor">
                <Button className="bg-[#0B3B36] text-white hover:bg-[#082A26] font-bold text-[13px] rounded-xl shadow-sm">
                  Evaluator Desk &rarr;
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-border mb-8 overflow-x-auto">
            {[
              { id: "commercial", label: "Commercial & Entitlements", icon: DollarSign },
              { id: "content", label: "Assessment & Case Bank", icon: BookOpen },
              { id: "models", label: "AI Model & Prompt Governance", icon: Cpu },
              { id: "fairness", label: "Calibration & Fairness Telemetry", icon: BarChart3 },
              { id: "audit", label: "System Audit Trails", icon: ShieldCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={cn(
                  "flex items-center gap-2.5 border-b-2 px-5 py-3.5 font-sans text-[14px] font-bold transition shrink-0",
                  activeTab === tab.id
                    ? "border-[#0E8F91] text-[#0E8F91] bg-white rounded-t-xl shadow-xs"
                    : "border-transparent text-[#52796F] hover:text-[#0B3B36]"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: Commercial & Entitlements */}
          {activeTab === "commercial" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Stat Cards */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-2 border-border bg-white p-6 rounded-2xl shadow-card">
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#52796F]">Total Candidates Ingested</span>
                  <div className="text-[36px] font-extrabold text-[#0B3B36] mt-2">1,284</div>
                  <span className="text-[12px] font-bold text-[#10B981]">+18% MoM growth</span>
                </Card>
                <Card className="border-2 border-border bg-white p-6 rounded-2xl shadow-card">
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#52796F]">Active Paid Entitlements</span>
                  <div className="text-[36px] font-extrabold text-[#0B3B36] mt-2">942</div>
                  <span className="text-[12px] font-semibold text-[#52796F]">73.3% activation rate</span>
                </Card>
                <Card className="border-2 border-border bg-white p-6 rounded-2xl shadow-card">
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#52796F]">Corporate Subsidized Share</span>
                  <div className="text-[36px] font-extrabold text-[#0E8F91] mt-2">64.2%</div>
                  <span className="text-[12px] font-semibold text-[#52796F]">Via sponsor vouchers</span>
                </Card>
                <Card className="border-2 border-border bg-white p-6 rounded-2xl shadow-card">
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#52796F]">D250 Roadmap Upgrades</span>
                  <div className="text-[36px] font-extrabold text-[#C58A32] mt-2">418</div>
                  <span className="text-[12px] font-bold text-[#0E8F91]">USD $104,500 run rate</span>
                </Card>
              </div>

              {/* Product Pricing Architecture Table */}
              <Card className="border-2 border-border bg-white shadow-card rounded-2xl overflow-hidden p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-[#0B3B36]">Product &amp; Entitlement Catalog</h3>
                    <p className="text-[13px] text-[#52796F]">Configurable catalog per tenant, campaign, and currency</p>
                  </div>
                  <Button onClick={() => showNotice("Pricing catalog is published and synchronized.")} className="bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold text-[13px] rounded-xl">
                    Publish Catalog Changes
                  </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left font-sans text-[13px]">
                    <thead className="bg-[#F8FAFB] text-[#0B3B36] font-bold border-b border-border">
                      <tr>
                        <th className="p-3.5">Product ID</th>
                        <th className="p-3.5">Commercial Name</th>
                        <th className="p-3.5">Included Deliverable</th>
                        <th className="p-3.5 text-right">Default USD</th>
                        <th className="p-3.5">Entitlement Keys</th>
                        <th className="p-3.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-[#172321]">
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-[#0E8F91]">MC-A</td>
                        <td className="p-3.5 font-bold text-[#0B3B36]">Management Consulting Assessment</td>
                        <td className="p-3.5 text-[#52796F]">Summary of Findings + CasingLab Diagnostic</td>
                        <td className="p-3.5 text-right font-extrabold text-[#0B3B36]">$150.00</td>
                        <td className="p-3.5 font-mono text-[11px] text-[#52796F]">ENT_CONSULTING_CORE, S09</td>
                        <td className="p-3.5 text-center"><Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold text-[11px]">Active</Badge></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-[#0E8F91]">PV-A</td>
                        <td className="p-3.5 font-bold text-[#0B3B36]">Professional Personality &amp; Values</td>
                        <td className="p-3.5 text-[#52796F]">Summary of Findings + Schwartz Profile</td>
                        <td className="p-3.5 text-right font-extrabold text-[#0B3B36]">$120.00</td>
                        <td className="p-3.5 font-mono text-[11px] text-[#52796F]">ENT_TALENT_DNA, VALUES</td>
                        <td className="p-3.5 text-center"><Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold text-[11px]">Active</Badge></td>
                      </tr>
                      <tr className="bg-[#F8FAFB]">
                        <td className="p-3.5 font-mono font-bold text-[#C58A32]">COMBO-A</td>
                        <td className="p-3.5 font-bold text-[#0B3B36]">Combined Executive Transformation Bundle</td>
                        <td className="p-3.5 text-[#52796F]">Both Assessments + USD 250 Roadmap Included</td>
                        <td className="p-3.5 text-right font-extrabold text-[#0B3B36]">$250.00</td>
                        <td className="p-3.5 font-mono text-[11px] text-[#52796F]">ALL_MODULES, S10_ROADMAP</td>
                        <td className="p-3.5 text-center"><Badge className="bg-[#FDF5E8] text-[#845C1D] border-0 font-bold text-[11px]">Popular</Badge></td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-mono font-bold text-[#52796F]">D250</td>
                        <td className="p-3.5 font-bold text-[#0B3B36]">Detailed Intelligence Report &amp; Roadmap Add-On</td>
                        <td className="p-3.5 text-[#52796F]">16-Week KNOLSKAPE Sprints &amp; Evidence Graph</td>
                        <td className="p-3.5 text-right font-extrabold text-[#0B3B36]">$250.00</td>
                        <td className="p-3.5 font-mono text-[11px] text-[#52796F]">ENT_DETAILED_ROADMAP_S10</td>
                        <td className="p-3.5 text-center"><Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold text-[11px]">Add-On</Badge></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Sponsor Voucher Codes */}
              <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-7">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-[#0B3B36]">Corporate Voucher &amp; Subsidy Manager</h3>
                    <p className="text-[13px] text-[#52796F]">Redeemable codes configured for sponsoring consultancies and universities</p>
                  </div>
                  <Button onClick={() => showNotice("New voucher draft initialized.")} className="bg-[#0B3B36] text-white hover:bg-[#082A26] font-bold text-[13px] rounded-xl">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Voucher Code
                  </Button>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-3">
                  {[
                    { code: "MODUS-EXEC-2026", sponsor: "Modus Corporate Sponsorship", subsidy: "100% ($0.00 Due)", redeemed: "84 of 100 used", active: true },
                    { code: "ENTERPRISE-SPONSOR", sponsor: "Tier-1 Partner Consultancies", subsidy: "100% ($0.00 Due)", redeemed: "32 of 50 used", active: true },
                    { code: "HACKATHON-VIP", sponsor: "Evaluation & Benchmarking", subsidy: "100% ($0.00 Due)", redeemed: "18 of 25 used", active: true },
                  ].map((v) => (
                    <div key={v.code} className="rounded-xl border-2 border-border bg-[#F8FAFB] p-4.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-extrabold text-[14px] text-[#0B3B36]">{v.code}</span>
                        <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold text-[10px]">Active</Badge>
                      </div>
                      <span className="block text-[12px] font-medium text-[#52796F]">{v.sponsor}</span>
                      <div className="mt-3 flex items-center justify-between text-[12px]">
                        <strong className="text-[#0E8F91]">{v.subsidy}</strong>
                        <span className="text-[#8DA19D] font-mono">{v.redeemed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          )}

          {/* TAB 2: Assessment & Case Content Bank */}
          {activeTab === "content" && (
            <div className="space-y-8 animate-fade-in">
              <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-[#0B3B36]">Versioned Assessment &amp; Case Registry</h3>
                    <p className="text-[13px] text-[#52796F]">Published assessments are immutable. New iterations require new versions.</p>
                  </div>
                  <Badge className="bg-[#0B3B36] text-white border-0 font-bold px-3 py-1">
                    Immutable Versioning Enforced
                  </Badge>
                </div>

                <div className="space-y-3.5">
                  {[
                    { id: "FORM-MC-V1.4", title: "Management Consulting Core Diagnostic", items: "14 Items · CasingLab Adaptive Probing", author: "Dr. K. Aris (Lead Psychometrician)", status: "Published" },
                    { id: "FORM-PV-V1.2", title: "Enterprise Talent DNA & Schwartz Values Profile", items: "32 Items · 9 Talent DNA Dimensions", author: "Prof. H. Stern (Organizational Behavior)", status: "Published" },
                    { id: "CASE-NEXUS-2026", title: "Nexus Global Freight: Operating Model & Margin Turnaround", items: "3 Exhibits (P&L, Node Bottlenecks, Stakeholder Alignment)", author: "Modus Transformation Practice", status: "Published" },
                    { id: "STUDIO-BOARD-V2", title: "Board Risk Briefing & $14M Allocation Simulation", items: "2-Minute Oral Briefing · Speech Telemetry", author: "Executive Communications Guild", status: "Published" },
                  ].map((form) => (
                    <div key={form.id} className="rounded-xl border border-border p-4.5 bg-[#F8FAFB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[12px] font-bold text-[#0E8F91]">{form.id}</span>
                          <span className="text-[#CBD5E1]">·</span>
                          <strong className="text-[15px] font-bold text-[#0B3B36]">{form.title}</strong>
                        </div>
                        <p className="mt-1 text-[13px] text-[#52796F]">{form.items} · Author: {form.author}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold text-[11px]">{form.status}</Badge>
                        <Button 
                          onClick={() => showNotice(`Loaded immutable manifest for ${form.id}`)}
                          variant="outline" 
                          size="sm" 
                          className="border-border text-[#0B3B36] font-bold text-[12px] rounded-lg"
                        >
                          Inspect Schema
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Interactive Enterprise Question Bank (TDD Section 07 & 20) */}
              <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-[#0B3B36]">Question Bank Item Repository</h3>
                    <p className="text-[13px] text-[#52796F]">Tagged by competency, level, item type, and psychometric validation status</p>
                  </div>
                  <Button onClick={() => showNotice("Question item creation modal opened.")} className="bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold text-[13px] rounded-xl">
                    <PlusCircle className="mr-2 h-4 w-4" /> Author New Item
                  </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left font-sans text-[13px]">
                    <thead className="bg-[#F8FAFB] text-[#0B3B36] font-bold border-b border-border">
                      <tr>
                        <th className="p-3.5">Item Code</th>
                        <th className="p-3.5">Prompt Headline</th>
                        <th className="p-3.5">Competency Tag</th>
                        <th className="p-3.5">Format</th>
                        <th className="p-3.5">Level</th>
                        <th className="p-3.5 text-center">Validation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-[#172321]">
                      {[
                        { code: "Q-STRAT-01", prompt: "Client has clear growth ambition but delivery capability gap", comp: "Strategic Translation", format: "Adaptive Probing", level: "Senior / Lead", valid: "Calibrated" },
                        { code: "Q-RANK-04", prompt: "Rank 4 transformation initiatives by execution priority", comp: "Resource Trade-Offs", format: "Priority Ordering", level: "Consultant", valid: "Calibrated" },
                        { code: "Q-DNA-08", prompt: "Motivational drive under unmapped enterprise ambiguity", comp: "Talent DNA & Values", format: "Schwartz Likert", level: "All Levels", valid: "Calibrated" },
                        { code: "Q-CASE-EX1", prompt: "Rotterdam & Singapore demurrage cost variance root cause", comp: "Value Chain & Operations", format: "P&L Synthesis", level: "Senior", valid: "Calibrated" },
                        { code: "Q-STU-02", prompt: "2-minute Board briefing on Q4 IT freeze vs cutover risk", comp: "Executive Presence", format: "Video Oral Briefing", level: "Engagement Lead", valid: "Calibrated" },
                      ].map((item) => (
                        <tr key={item.code} className="hover:bg-[#F8FAFB]/70 transition">
                          <td className="p-3.5 font-mono font-bold text-[#0E8F91]">{item.code}</td>
                          <td className="p-3.5 font-semibold text-[#0B3B36]">{item.prompt}</td>
                          <td className="p-3.5"><Badge className="bg-[#F8FAFB] border-border text-[#52796F] font-bold text-[11px]">{item.comp}</Badge></td>
                          <td className="p-3.5 text-[#52796F]">{item.format}</td>
                          <td className="p-3.5 font-medium text-[#0B3B36]">{item.level}</td>
                          <td className="p-3.5 text-center"><span className="text-[#10B981] font-bold text-[12px] flex items-center justify-center gap-1"><Check className="h-3.5 w-3.5 stroke-[3]" /> {item.valid}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 3: AI Model & Prompt Governance */}
          {activeTab === "models" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-7">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-[#0B3B36]">AI Scoring Agent Registry</h3>
                    <p className="text-[13px] text-[#52796F]">Constrained generation models, prompt versions, and temperature policies</p>
                  </div>
                  <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold px-3 py-1">
                    Audited Prompts
                  </Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { name: "Consulting Synthesis Evaluator", version: "agent_scoring_v2.4", temp: "0.10", engine: "Constrained JSON", policy: "Closed AI Mode" },
                    { name: "Adaptive Probing Engine", version: "agent_probing_v1.8", temp: "0.30", engine: "Hypothesis Challenger", policy: "Interactive Probe" },
                    { name: "Speech & Concision Telemetry", version: "agent_speech_v2.0", temp: "Deterministic", engine: "WPM & Filler Ratio", policy: "Accent Neutral" },
                  ].map((m) => (
                    <div key={m.version} className="rounded-xl border border-border bg-[#F8FAFB] p-5">
                      <div className="font-bold text-[14px] text-[#0B3B36]">{m.name}</div>
                      <span className="font-mono text-[12px] text-[#0E8F91] font-semibold mt-0.5 block">{m.version}</span>
                      <div className="mt-4 space-y-1.5 text-[12px] text-[#52796F] border-t border-border/60 pt-3">
                        <div>Temperature: <strong className="text-[#0B3B36]">{m.temp}</strong></div>
                        <div>Output Engine: <strong className="text-[#0B3B36]">{m.engine}</strong></div>
                        <div>Compliance Guard: <strong className="text-[#10B981]">{m.policy}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* TAB 4: Calibration & Fairness */}
          {activeTab === "fairness" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid gap-5 sm:grid-cols-3">
                <Card className="border-2 border-border bg-white p-6 rounded-2xl shadow-card">
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#52796F]">AI-Human Agreement Rate</span>
                  <div className="text-[36px] font-extrabold text-[#10B981] mt-2">94.2%</div>
                  <span className="text-[12px] text-[#52796F]">Within &plusmn;5 point tolerance band</span>
                </Card>
                <Card className="border-2 border-border bg-white p-6 rounded-2xl shadow-card">
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#52796F]">Average Score Deviation</span>
                  <div className="text-[36px] font-extrabold text-[#0B3B36] mt-2">+2.4 pts</div>
                  <span className="text-[12px] text-[#52796F]">Partner calibrations slight upward</span>
                </Card>
                <Card className="border-2 border-border bg-white p-6 rounded-2xl shadow-card">
                  <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#52796F]">Override Justification Rate</span>
                  <div className="text-[36px] font-extrabold text-[#0E8F91] mt-2">5.8%</div>
                  <span className="text-[12px] text-[#10B981]">Well below 10% review threshold</span>
                </Card>
              </div>

              <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-7">
                <h3 className="font-sans text-[18px] font-bold text-[#0B3B36] mb-2">Demographic Fairness &amp; Neutrality Telemetry</h3>
                <p className="text-[13px] text-[#52796F] mb-4">
                  Automated parity audit tracking adverse impact ratio (AIR) across global candidate cohorts.
                </p>
                <div className="rounded-xl border border-border bg-[#F8FAFB] p-5 space-y-3 text-[13px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0B3B36]">Accent / Dialect Neutrality Index</span>
                    <span className="font-bold text-[#10B981]">1.00 AIR (Zero Statistical Disparity)</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/60 pt-2.5">
                    <span className="font-bold text-[#0B3B36]">Gender &amp; Background Parity</span>
                    <span className="font-bold text-[#10B981]">0.98 AIR (Fully Compliant)</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/60 pt-2.5">
                    <span className="font-bold text-[#0B3B36]">Human Override Audit Completeness</span>
                    <span className="font-bold text-[#0E8F91]">100% Rationale Audited</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 5: System Audit Trails */}
          {activeTab === "audit" && (
            <div className="space-y-6 animate-fade-in">
              <Card className="border-2 border-border bg-white shadow-card rounded-2xl p-7">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-[#0B3B36]">Immutable System Audit Log</h3>
                    <p className="text-[13px] text-[#52796F]">Consent tracking, manual overrides, and system versioning events</p>
                  </div>
                  <Badge className="bg-[#0B3B36] text-white border-0 font-bold px-3 py-1">
                    WORM Storage Active
                  </Badge>
                </div>
                
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left font-sans text-[13px]">
                    <thead className="bg-[#F8FAFB] text-[#0B3B36] font-bold border-b border-border">
                      <tr>
                        <th className="p-3.5">Timestamp (UTC)</th>
                        <th className="p-3.5">Event Type</th>
                        <th className="p-3.5">Actor / Entity</th>
                        <th className="p-3.5">Action Detail</th>
                        <th className="p-3.5">Version Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-[#172321]">
                      {[
                        { time: "2026-09-24T14:32:01", type: "CONSENT_CAPTURED", actor: "Candidate ID: C-88912", action: "Accepted F01 Privacy & AI Scoring Module", ref: "v1.0.4" },
                        { time: "2026-09-24T13:15:44", type: "SCORE_OVERRIDE", actor: "Assessor: Dr. A. Vance", action: "Adjusted Strategic Synthesis score (+2 pts); recorded rationale.", ref: "CASE-NEXUS-V1" },
                        { time: "2026-09-24T09:00:00", type: "CATALOG_UPDATE", actor: "Admin: Global Pricing", action: "Published new Combo-A pricing bundle ($250)", ref: "CATALOG-V4.2" },
                        { time: "2026-09-23T18:45:12", type: "MODEL_DEPLY", actor: "MLOps Service Account", action: "Rolled out agent_scoring_v2.4 to production tenant", ref: "agent_v2.4" },
                        { time: "2026-09-23T16:20:05", type: "CONSENT_CAPTURED", actor: "Candidate ID: C-88911", action: "Accepted F01 Privacy & AI Scoring Module", ref: "v1.0.3" },
                      ].map((log, i) => (
                        <tr key={i} className="hover:bg-[#F8FAFB]/70 transition">
                          <td className="p-3.5 font-mono text-[12px] text-[#52796F]">{log.time}</td>
                          <td className="p-3.5 font-bold text-[#0B3B36]">{log.type}</td>
                          <td className="p-3.5 text-[#52796F]">{log.actor}</td>
                          <td className="p-3.5 font-medium text-[#172321]">{log.action}</td>
                          <td className="p-3.5 font-mono text-[11px] text-[#0E8F91] font-bold">{log.ref}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      {notice && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3.5 rounded-2xl bg-[#0B3B36] px-5 py-3.5 text-[14px] font-bold text-white shadow-deep">
          <Sparkles className="h-4 w-4 text-[#0E8F91]" />
          {notice}
        </div>
      )}

      <Footer />
    </div>
  );
}
