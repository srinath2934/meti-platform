import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FileText,
  Gauge,
  LockKeyhole,
  Menu,
  Network,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Video,
  Award,
  Lock,
  Unlock,
  Layers,
  Compass,
  Briefcase,
  ExternalLink,
  Printer,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import RankQuestion from "@/components/RankQuestion";
import CompetencyRadar from "@/components/CompetencyRadar";
import EmotionTelemetryCard from "@/components/EmotionTelemetryCard";

type View = "journey" | "assessment" | "findings";

const journeyStages = [
  { stage: "Stage 0", label: "Free Orientation", detail: "Guidance & explainer complete", status: "complete", route: "/video" },
  { stage: "Stage 1", label: "Management Consulting Assessment", detail: "Core assessment module active", status: "current", route: "/app" },
  { stage: "Stage 2", label: "Summary of Findings", detail: "Provisional signals", status: "upcoming", route: "/app" },
  { stage: "Stage 3", label: "Consulting Deep Dive & Human Review", detail: "Case exhibits & Board briefing", status: "locked", route: "/case" },
  { stage: "Stage 4", label: "Detailed Intelligence Report and Roadmap", detail: "Development plan & reassessment", status: "locked", route: "/app" },
];

const capabilities = [
  { label: "Strategy & Framing", value: 78, tone: "teal" },
  { label: "Value Chain & Operations", value: 64, tone: "gold" },
  { label: "Executive Communication", value: 84, tone: "green" },
  { label: "Problem Structuring", value: 59, tone: "teal" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3.5 px-2 transition hover:opacity-85">
      <div className="meti-mark" aria-hidden="true"><span /><span /></div>
      <div>
        <div className="font-sans text-[20px] font-extrabold tracking-[0.12em] text-white leading-none">METI</div>
        <div className="mt-1 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#0E8F91]">Capability intelligence</div>
      </div>
    </Link>
  );
}

function SideNav({ view, setView }: { view: View; setView: (view: View) => void }) {
  return (
    <aside className="hidden min-h-screen w-[270px] shrink-0 flex-col gap-8 bg-[#0B3B36] px-6 py-8 text-white lg:flex">
      <Logo />
      <div>
        <p className="mb-3 px-3 font-sans text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#CBD5E1]/80">Candidate Desk</p>
        <nav className="grid gap-1.5" aria-label="Candidate workspace">
          <button
            type="button"
            onClick={() => setView("journey")}
            className={cn(
              "flex items-center gap-3.5 rounded-xl px-4 py-3 text-left font-sans text-[14px] font-bold transition-all duration-200",
              view === "journey" ? "bg-white/[0.12] text-white shadow-inner" : "text-[#CBD5E1] hover:bg-white/[0.07] hover:text-white"
            )}
          >
            <Target className="h-4.5 w-4.5" />
            <span>My Journey</span>
            {view === "journey" && <span className="ml-auto h-2 w-2 rounded-full bg-[#0E8F91]" />}
          </button>

          <button
            type="button"
            onClick={() => setView("assessment")}
            className={cn(
              "flex items-center gap-3.5 rounded-xl px-4 py-3 text-left font-sans text-[14px] font-bold transition-all duration-200",
              view === "assessment" ? "bg-white/[0.12] text-white shadow-inner" : "text-[#CBD5E1] hover:bg-white/[0.07] hover:text-white"
            )}
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span>Core Assessment</span>
            {view === "assessment" && <span className="ml-auto h-2 w-2 rounded-full bg-[#0E8F91]" />}
          </button>

          <button
            type="button"
            onClick={() => setView("findings")}
            className={cn(
              "flex items-center gap-3.5 rounded-xl px-4 py-3 text-left font-sans text-[14px] font-bold transition-all duration-200",
              view === "findings" ? "bg-white/[0.12] text-white shadow-inner" : "text-[#CBD5E1] hover:bg-white/[0.07] hover:text-white"
            )}
          >
            <BarChart3 className="h-4.5 w-4.5" />
            <span>Findings &amp; Roadmap</span>
            {view === "findings" && <span className="ml-auto h-2 w-2 rounded-full bg-[#0E8F91]" />}
          </button>
        </nav>

        <p className="mt-6 mb-3 px-3 font-sans text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#CBD5E1]/80">Demonstrated Work</p>
        <div className="grid gap-1.5">
          <Link
            href="/case"
            className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-left font-sans text-[14px] font-semibold text-[#CBD5E1] hover:bg-white/[0.07] hover:text-white transition"
          >
            <FileText className="h-4.5 w-4.5 text-[#0E8F91]" />
            <span>Case Workspace</span>
          </Link>
          <Link
            href="/studio"
            className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-left font-sans text-[14px] font-semibold text-[#CBD5E1] hover:bg-white/[0.07] hover:text-white transition"
          >
            <Video className="h-4.5 w-4.5 text-[#0E8F91]" />
            <span>Executive Studio</span>
          </Link>
        </div>
      </div>

      <div className="mt-auto border-t border-white/15 px-3 pt-6 font-sans text-[13px] font-semibold leading-relaxed text-[#CBD5E1]">
        Evidence becomes insight.<br />Insight becomes capability.
      </div>
    </aside>
  );
}

function MobileHeader({ view, setView }: { view: View; setView: (view: View) => void }) {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-[#0B3B36] px-5 py-4 lg:hidden">
      <Logo />
      <div className="flex items-center gap-2">
        {(["journey", "assessment", "findings"] as View[]).map((item) => (
          <button key={item} type="button" onClick={() => setView(item)} className={cn("rounded-lg p-2 text-[#CBD5E1]", view === item && "bg-white/10 text-white")} aria-label={item}>
            {item === "journey" ? <Target className="h-5 w-5" /> : item === "assessment" ? <BookOpen className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
          </button>
        ))}
        <Menu className="ml-1 h-5 w-5 text-white" />
      </div>
    </div>
  );
}

function Topbar({ activeProduct }: { activeProduct: string }) {
  const getBadgeText = () => {
    if (activeProduct === "consulting") return "Management Consulting Assessment Active";
    if (activeProduct === "personality") return "Professional Personality & Values Active";
    return "Combined Assessment Bundle Active";
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5">
      <div className="flex flex-wrap items-center gap-3 font-sans text-[15px] text-[#52796F]">
        <span className="font-bold text-[#0B3B36]">Candidate Workspace</span>
        <span className="text-[#CBD5E1]">/</span>
        <span className="font-semibold text-[#172321]">Enterprise Diagnostic</span>
        <span className="text-[#CBD5E1]">/</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E3F3F1] px-3 py-1 text-[12px] font-bold text-[#0E8F91]">
          <span className="h-2 w-2 rounded-full bg-[#0E8F91]" />
          {getBadgeText()}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-2.5 text-[13px] text-[#52796F] font-sans">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Autosave: <strong className="font-bold text-[#0B3B36]">Captured</strong></span>
        </div>
        <div className="h-5 w-px bg-border hidden md:block" />
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border-2 border-border bg-white text-[#0B3B36] transition hover:border-[#0E8F91] hover:text-[#0E8F91]" aria-label="Help and support">
          <CircleHelp className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 pl-1">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FDF5E8] font-sans text-[13px] font-extrabold text-[#845C1D]">AR</div>
          <div className="hidden lg:block text-left">
            <div className="font-sans text-[14px] font-bold text-[#0B3B36] leading-tight">Alex Rivera</div>
            <div className="font-sans text-[12px] font-semibold text-[#52796F]">Strategy &amp; Transformation Track</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ title, subtitle, value, tag, tagTone, note, barTone = "teal" }: { title: string; subtitle: string; value: string; tag: string; tagTone: "gold" | "green"; note: string; barTone?: "teal" | "gold" }) {
  const numericVal = parseInt(value, 10);
  const progressVal = !isNaN(numericVal) ? numericVal : (value === "Pending" ? 12 : 28);
  return (
    <Card className="border-2 border-border bg-white p-7 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover rounded-2xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-sans text-[17px] font-bold tracking-tight text-[#0B3B36]">{title}</h2>
          <p className="mt-1 font-sans text-[13px] font-medium leading-relaxed text-[#52796F]">{subtitle}</p>
        </div>
        <Badge className={cn("rounded-full border-0 px-3 py-1 font-sans text-[11px] font-bold", tagTone === "gold" ? "bg-[#FDF5E8] text-[#845C1D]" : "bg-[#E3F3F1] text-[#0E8F91]")}>{tag}</Badge>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <strong className="font-sans font-extrabold text-[56px] leading-none tracking-tight text-[#0B3B36] tabular-nums">{value}</strong>
        {value === "Pending" ? null : <span className="font-sans text-[20px] font-bold text-[#52796F]">/ 100</span>}
      </div>
      <p className="mt-3.5 font-sans text-[14px] font-medium leading-relaxed text-[#172321] min-h-[42px]">{note}</p>
      <div className="mt-4 h-3.5 w-full overflow-hidden rounded-full bg-[#E2E8EA]">
        <div className={cn("h-full rounded-full transition-all duration-500", barTone === "gold" ? "bg-[#C58A32]" : "bg-[#0E8F91]")} style={{ width: `${progressVal}%` }} />
      </div>
    </Card>
  );
}

function JourneyView({ setView, activeProduct }: { setView: (view: View) => void; activeProduct: string }) {
  return (
    <div className="animate-fade-in">
      {/* Example Dashboard Message After Purchase - Active Engagement Banner */}
      <div className="mb-8 rounded-3xl border-2 border-[#BCE8D7] bg-[#F2FBF7] p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0E8F91] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                <CheckCircle2 className="h-3.5 w-3.5" /> Engagement Active
              </span>
              <span className="text-[12px] font-bold text-[#0B3B36] font-mono">Engagement ID: METI-INTEL-2026</span>
            </div>
            <h2 className="font-sans text-[22px] font-extrabold text-[#0B3B36]">
              Your {activeProduct === "personality" ? "Professional Personality & Values Assessment" : activeProduct === "consulting" ? "Management Consulting Assessment" : "Combined Intelligence Bundle"} is active
            </h2>
            <div className="text-[14px] text-[#172321]">
              <span className="font-semibold text-[#0B3B36]">You have access to:</span>
              <ul className="mt-1.5 flex flex-wrap gap-x-6 gap-y-1 text-[13px] font-semibold text-[#0B3B36]">
                {(activeProduct === "bundle" || activeProduct === "consulting") && (
                  <li className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Management Consulting Assessment
                  </li>
                )}
                {(activeProduct === "bundle" || activeProduct === "personality") && (
                  <li className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Professional Personality &amp; Values Assessment
                  </li>
                )}
              </ul>
            </div>
            <p className="pt-1 text-[13px] text-[#52796F] max-w-2xl leading-relaxed">
              Your results will combine demonstrated consulting capability with professional behaviour, values, and development preferences.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link href="/assessment">
              <Button className="w-full bg-[#0E8F91] hover:bg-[#0A7476] text-white font-bold h-12 px-7 rounded-xl shadow-mint text-[14px]">
                Next step: Continue Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-[12px] text-[#52796F] font-semibold justify-center">
              <ShieldCheck className="h-4 w-4 text-[#0E8F91]" />
              <span>Human Practice Partner Calibrated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Human Review Desk Verification Banner */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-border bg-white p-5 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-full bg-[#0B3B36] text-[#0E8F91] grid place-items-center font-bold text-[15px] shrink-0 shadow-xs">
            AV
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <strong className="text-[14px] font-bold text-[#0B3B36]">Lead Evaluator: Dr. Aris Vance</strong>
              <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 text-[11px] font-bold">Senior Practice Partner · Operations &amp; Strategy</Badge>
            </div>
            <span className="text-[12px] text-[#52796F]">
              Evidence portfolio reviewed under dual AI-diagnostic &amp; human expert calibration protocol.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[12px] text-[#0E8F91] font-bold">
          <ShieldCheck className="h-4 w-4" />
          <span>Accredited Senior Partner Review Active</span>
        </div>
      </div>

      <div className="mb-8 flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
        <div className="flex-1">
          <div className="eyebrow">Enterprise capability intelligence</div>
          <h1 className="mt-3 max-w-3xl font-sans text-[clamp(40px,4.5vw,58px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#0B3B36]">
            Build the evidence<br />behind your next move.
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-[17px] leading-[1.7] text-[#172321]">
            METI evaluates your current capability, how you naturally work, and where the evidence points next across the Modus transformation framework.
          </p>
        </div>
        <div className="relative w-full overflow-hidden rounded-2xl bg-[#0B3B36] p-6 text-white shadow-deep sm:w-[340px] shrink-0 xl:w-[338px]">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full border border-white/10 shadow-[0_0_0_26px_rgba(255,255,255,.03)]" />
          <div className="relative">
            <div className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#0E8F91]">Assessment status</div>
            <strong className="mt-2 block font-sans text-[22px] font-bold tracking-tight text-white leading-tight">Evidence collection active</strong>
            <div className="mt-5 flex items-center gap-4 font-sans text-[13px] font-medium text-[#E2E8F0]">
              <span className="flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full bg-[#0E8F91]" />Strategy</span>
              <span className="flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full bg-[#0E8F91]" />Work Sample</span>
              <span className="flex items-center gap-1.5"><i className="inline-block h-2 w-2 rounded-full bg-[#0E8F91]" />Video Studio</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr_1fr] items-start">
        {/* Column 1: Journey Stages & Signals */}
        <div className="space-y-6">
          <Card className="border-2 border-border bg-white p-6 shadow-card rounded-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-sans text-[17px] font-bold tracking-tight text-[#0B3B36]">Your End-to-End Progression</h2>
                <p className="mt-1 font-sans text-[13px] font-medium leading-relaxed text-[#52796F]">Candidate journey milestones</p>
              </div>
              <Badge className="rounded-full border-0 bg-[#E3F3F1] px-3 py-1 font-sans text-[11px] font-bold text-[#0E8F91]">Live Pipeline</Badge>
            </div>
            
            <div className="space-y-3.5">
              {journeyStages.map((st) => (
                <div key={st.stage} className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-[#F8FAFB]">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold",
                      st.status === "complete" ? "bg-[#E3F3F1] text-[#0E8F91]" :
                      st.status === "current" ? "bg-[#0E8F91] text-white ring-2 ring-[#0E8F91]/30" :
                      "bg-border text-[#52796F]"
                    )}>
                      {st.status === "complete" ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : st.status === "locked" ? <LockKeyhole className="h-3 w-3" /> : st.stage.replace("Stage ", "")}
                    </span>
                    <div>
                      <strong className="block text-[13px] font-bold text-[#0B3B36]">{st.label}</strong>
                      <span className="text-[11px] text-[#52796F]">{st.detail}</span>
                    </div>
                  </div>
                  {st.status === "locked" ? (
                    <span className="text-[12px] font-bold text-[#52796F] flex items-center gap-1">
                      Locked
                    </span>
                  ) : st.status === "complete" ? (
                    <Link href={st.route} className="text-[12px] font-bold text-[#52796F] hover:underline flex items-center gap-1">
                      View <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <Link href={st.route} className="text-[12px] font-bold text-[#0E8F91] hover:underline flex items-center gap-1">
                      Continue <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <Link href="/assessment">
              <Button className="mt-5 w-full bg-[#0E8F91] px-5 py-3 font-sans text-[14px] font-bold text-white shadow-mint hover:bg-[#0A7476] rounded-xl">
                Continue Active Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* Column 2: Capability index */}
        <ScoreCard title="Capability index" subtitle="Evidence-backed current capability" value="72" tag="Provisional" tagTone="gold" note="Strong foundation with opportunity in structured problem solving." />

        {/* Column 3: Evidence confidence */}
        <ScoreCard title="Evidence confidence" subtitle="Completeness and consistency" value="81" tag="Good" tagTone="green" note="Your strongest evidence comes from work samples and written responses." barTone="gold" />
      </div>

      {/* Capability at a glance full-width card */}
      <Card className="mt-8 grid gap-7 border-2 border-border bg-white p-7 shadow-card xl:grid-cols-[1.1fr_1.1fr_1.1fr] xl:items-center rounded-2xl">
        <div className="border-b border-border pb-5 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-7">
          <div className="eyebrow">Working view</div>
          <h2 className="mt-2 font-sans text-[24px] font-bold tracking-tight text-[#0B3B36]">Capability at a glance</h2>
          <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#172321] max-w-sm">Directional findings from demonstrated evidence across the Modus transformation framework.</p>
        </div>
        <div className="grid gap-4 pr-3">
          {capabilities.map((item) => (
            <div key={item.label} className="grid grid-cols-[150px_1fr_36px] items-center gap-3.5 font-sans text-[14px] font-semibold text-[#172321]">
              <span className="truncate">{item.label}</span>
              <div className="h-3 overflow-hidden rounded-full bg-[#E2E8EA]">
                <div className={cn("h-full rounded-full transition-all duration-300", item.tone === "gold" ? "bg-[#C58A32]" : "bg-[#0E8F91]")} style={{ width: `${item.value}%` }} />
              </div>
              <b className="text-right font-sans text-[14px] font-extrabold text-[#0B3B36] tabular-nums">{item.value}</b>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-[#FDF5E8] p-6 border border-[#F6EBD5]">
          <strong className="block font-sans text-[16px] font-bold text-[#845C1D]">Stage 2: Summary of Findings &amp; Roadmap</strong>
          <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-[#755C2F]">Review your included summary or access the complete USD 250 Detailed Roadmap &amp; Mentoring sprints.</p>
          <Button onClick={() => setView("findings")} className="mt-4 bg-[#0E8F91] px-5 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-[#0A7476] rounded-xl shadow-sm">
            View Findings Dossier
          </Button>
        </div>
      </Card>
    </div>
  );
}

function AssessmentView({ activeProduct }: { activeProduct: string }) {
  const [selected, setSelected] = useState("");
  const [followUpReady, setFollowUpReady] = useState(false);
  const [questionMode, setQuestionMode] = useState<"probing" | "ranking" | "talent_dna">("probing");
  
  const options = [
    ["Map the gap between ambition and current enterprise capability.", "Start with a structured view of the operating model, constraints, and value chain."],
    ["Recommend a transformation roadmap immediately.", "Move quickly to define workstreams, milestones, and governance."],
    ["Interview the executive sponsor about the desired outcome.", "Clarify the decision, success measures, and expectations before analysing the organisation."],
  ];
  
  const followUpPrompt = selected.includes("Map the gap")
    ? "What evidence would you examine first to distinguish an operating-model gap from an ambition-alignment gap?"
    : selected.includes("roadmap")
      ? "Which dependency would you test before proposing the roadmap, and why?"
      : "How would you translate the sponsor’s desired outcome into a measurable enterprise question?";

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="eyebrow">Adaptive assessment · strategy &amp; values signal</div>
          <h1 className="mt-2 font-sans text-[clamp(34px,3.8vw,46px)] font-extrabold tracking-[-0.03em] text-[#0B3B36]">
            {questionMode === "probing" ? "Strategy & Enterprise Thinking" : questionMode === "ranking" ? "Strategic Priority Trade-Offs" : "Enterprise Talent DNA & Values"}
          </h1>
        </div>

        {/* Question Type Switcher */}
        <div className="flex flex-wrap rounded-xl bg-white border-2 border-border p-1 self-start sm:self-auto shadow-xs gap-1">
          <button
            type="button"
            onClick={() => setQuestionMode("probing")}
            className={cn(
              "px-3.5 py-1.5 font-sans text-[12px] font-bold rounded-lg transition",
              questionMode === "probing" ? "bg-[#0E8F91] text-white shadow-xs" : "text-[#52796F] hover:text-[#0B3B36]"
            )}
          >
            Q1 · Adaptive Probing
          </button>
          <button
            type="button"
            onClick={() => setQuestionMode("ranking")}
            className={cn(
              "px-3.5 py-1.5 font-sans text-[12px] font-bold rounded-lg transition",
              questionMode === "ranking" ? "bg-[#0E8F91] text-white shadow-xs" : "text-[#52796F] hover:text-[#0B3B36]"
            )}
          >
            Q2 · Priority Trade-Offs
          </button>
          <button
            type="button"
            onClick={() => setQuestionMode("talent_dna")}
            className={cn(
              "px-3.5 py-1.5 font-sans text-[12px] font-bold rounded-lg transition",
              questionMode === "talent_dna" ? "bg-[#0E8F91] text-white shadow-xs" : "text-[#52796F] hover:text-[#0B3B36]"
            )}
          >
            Q3 · Talent DNA &amp; Values
          </button>
        </div>
      </div>

      <p className="mt-3 max-w-3xl font-sans text-[16px] leading-[1.7] text-[#172321]">
        Each response adapts dynamically based on your background and previous evidence. Demonstrating clear trade-offs is prioritized over generic answers.
      </p>
      
      {/* S07 Rank Mode */}
      {questionMode === "ranking" && (
        <div className="mt-8">
          <RankQuestion onComplete={() => setQuestionMode("probing")} />
        </div>
      )}

      {/* Talent DNA Mode */}
      {questionMode === "talent_dna" && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr] items-start">
          <aside className="hidden self-start rounded-2xl border-2 border-border bg-white p-6 lg:block shadow-sm">
            <h3 className="mb-1 font-sans text-[15px] font-bold text-[#0B3B36]">Talent DNA Scales</h3>
            <p className="mb-4 font-sans text-[13px] font-medium leading-relaxed text-[#52796F]">Schwartz-grounded motivational profile.</p>
            {[
              "Purpose & Motivation",
              "Systems Thinking",
              "Curiosity & Learning",
              "Innovation & Ambiguity",
              "Consulting DNA"
            ].map((item, index) => (
              <div key={item} className={cn("mb-2 flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 font-sans text-[13px]", index === 0 ? "bg-[#E3F3F1] font-bold text-[#0B3B36]" : "text-[#52796F]")}>
                <span className="truncate">{item}</span>
                {index === 0 ? <span className="h-2 w-2 shrink-0 rounded-full bg-[#0E8F91]" /> : <span className="text-[11px] font-bold uppercase">Calibrating</span>}
              </div>
            ))}
          </aside>

          <Card className="border-2 border-border bg-white p-8 shadow-card rounded-2xl">
            <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold px-3 py-1">
              Professional Personality &amp; Values Assessment
            </Badge>
            <h2 className="mt-4 font-sans text-[24px] font-extrabold text-[#0B3B36]">
              When facing high ambiguity in client transformations, what best reflects your motivational drive?
            </h2>
            <p className="mt-2 text-[14px] text-[#52796F]">
              Select the principle that guides your decision-making when there is no established precedent.
            </p>

            <div className="mt-6 space-y-3">
              {[
                { title: "Self-Direction & Intellectual Independence", desc: "Formulate original hypotheses and explore alternative structural pathways (Openness to Change)." },
                { title: "Governance & Continuity Discipline", desc: "Anchor in verified operating models, audit controls, and risk-mitigated milestones (Conservation)." },
                { title: "Stakeholder Empathy & Collaborative Welfare", desc: "Ensure alignment across all cross-functional teams and minimize human burnout (Self-Transcendence)." },
                { title: "Achievement & Measurable Impact", desc: "Prioritize tangible EBITDA turnaround and concrete commercial milestones (Self-Enhancement)." },
              ].map((opt) => (
                <label key={opt.title} className="flex cursor-pointer gap-4 rounded-xl border-2 border-border p-4 transition hover:border-[#0E8F91] hover:bg-[#F8FAFB]">
                  <input type="radio" name="talent_dna_opt" className="mt-1 accent-[#0E8F91] h-5 w-5" />
                  <div>
                    <strong className="block text-[15px] font-bold text-[#0B3B36]">{opt.title}</strong>
                    <span className="text-[13px] text-[#172321]">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <Button onClick={() => setQuestionMode("probing")} className="mt-6 bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold px-6 py-3 rounded-xl shadow-mint">
              Save Values Signal &amp; Continue
            </Button>
          </Card>
        </div>
      )}

      {/* S06 Adaptive Probing Mode */}
      {questionMode === "probing" && (
        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr] items-start">
          <aside className="hidden self-start rounded-2xl border-2 border-border bg-white p-6 lg:block shadow-sm">
            <h3 className="mb-1 font-sans text-[15px] font-bold text-[#0B3B36]">Capability areas in focus</h3>
            <p className="mb-4 font-sans text-[13px] font-medium leading-relaxed text-[#52796F]">Selected from your profile and previous evidence.</p>
            {["Enterprise perspective", "Strategic translation", "Problem framing", "Evidence discipline", "Professional judgement"].map((item, index) => (
              <div key={item} className={cn("mb-2 flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 font-sans text-[13px]", index === 0 ? "bg-[#E3F3F1] font-bold text-[#0B3B36]" : index < 2 ? "text-[#0B3B36] font-semibold" : "text-[#52796F]")}>
                <span className="truncate">{item}</span>
                {index === 0 ? <span className="h-2 w-2 shrink-0 rounded-full bg-[#0E8F91]" /> : <span className="shrink-0 text-[11px] font-bold uppercase">{index < 2 ? "Exploring" : "Possible"}</span>}
              </div>
            ))}
          </aside>

          <Card className="w-full border-2 border-border bg-white p-8 shadow-card lg:p-9 rounded-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge className="rounded-full border-0 bg-[#E3F3F1] px-3.5 py-1.5 font-sans text-[12px] font-bold text-[#0E8F91]">Adaptive assessment</Badge>
                <div className="mt-2.5 font-sans text-[13px] font-semibold text-[#52796F]">Capability focus: strategic translation · Context: enterprise transformation</div>
              </div>
              <span className="font-sans text-[13px] font-bold text-[#0E8F91] flex items-center gap-1.5">● Saved just now</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 font-sans text-[12px] font-bold text-[#0E8F91]">
              <FileText className="h-4 w-4" /> Based on your experience profile
            </div>

            <h2 className="mt-6 max-w-3xl font-sans text-[clamp(26px,2.8vw,36px)] font-extrabold leading-[1.25] tracking-tight text-[#0B3B36]">
              A client has a clear growth ambition, but the organisation cannot currently deliver it. What would you do first?
            </h2>

            <p className="mt-4 max-w-3xl font-sans text-[16px] leading-[1.7] text-[#172321]">
              Select the response that best reflects your initial consulting approach. Your answer will be interpreted alongside your CV, previous response, and demonstrated evidence.
            </p>

            <div className="mt-6 grid gap-3.5">
              {options.map(([title, detail]) => (
                <label key={title} className={cn("flex cursor-pointer gap-4 rounded-2xl border-2 p-5 transition duration-200", selected === title ? "border-[#0E8F91] bg-[#F2FBF7]" : "border-border hover:border-[#0E8F91]/60 hover:bg-[#F8FAFB]")}>
                  <input type="radio" name="answer" className="mt-1 accent-[#0E8F91] h-5 w-5" checked={selected === title} onChange={() => { setSelected(title); setFollowUpReady(false); }} />
                  <span>
                    <b className="font-sans text-[16px] font-bold text-[#0B3B36]">{title}</b>
                    <small className="mt-1.5 block font-sans text-[14px] leading-relaxed text-[#172321]">{detail}</small>
                  </span>
                </label>
              ))}
            </div>

            {followUpReady && (
              <div className="mt-6 rounded-2xl border-2 border-[#BCE8D7] bg-[#F2FBF7] p-6 font-sans text-[#0B3B36] animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-[15px] text-[#0B3B36]"><Sparkles className="h-5 w-5 text-[#0E8F91]" /> Adaptive Probing Engine</div>
                <p className="mt-2 text-[14px] leading-relaxed text-[#172321]">The engine evaluated your structured answer. Answer the probing question below to demonstrate your reasoning depth.</p>
                <div className="mt-4 rounded-xl border border-[#0E8F91]/30 bg-white p-5 shadow-sm">
                  <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0E8F91]">Dynamic Analytical Probe</div>
                  <div className="mt-2 font-sans text-[16px] font-bold leading-relaxed text-[#0B3B36]">{followUpPrompt}</div>
                  <div className="mt-4">
                    <textarea rows={4} placeholder="State your supporting rationale, initial hypotheses, and key trade-offs..." className="w-full rounded-xl border-2 border-border bg-[#F8FAFB] p-4 font-sans text-[15px] text-[#172321] outline-none transition focus:border-[#0E8F91] focus:bg-white" />
                    <div className="mt-2 flex items-center justify-between text-[13px] text-[#52796F] font-semibold">
                      <span>Target: 2–3 concise sentences</span>
                      <span>Voice simulator: Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col-reverse justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
              <span className="font-sans text-[13px] font-medium leading-relaxed text-[#52796F]">Your next prompt will adapt from this response.</span>
              <Button onClick={() => selected ? (setFollowUpReady(true), undefined) : undefined} disabled={!selected} className="bg-[#0E8F91] font-sans text-[15px] font-bold text-white hover:bg-[#0A7476] disabled:opacity-40 rounded-xl px-6 py-3.5 shadow-mint">
                {followUpReady ? "Continue adaptive flow" : "Submit response"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function FindingsView({ 
  showNotice, 
  activeProduct, 
  hasD250, 
  onUnlockD250 
}: { 
  showNotice: (message: string) => void; 
  activeProduct: string; 
  hasD250: boolean;
  onUnlockD250: () => void;
}) {
  const storedProfile = typeof window !== "undefined" ? localStorage.getItem("meti_candidate_profile") : null;
  let candidateName = "Sarah Jenkins";
  let candidateDomain = "FinTech & Payments";
  if (storedProfile) {
    try {
      const parsed = JSON.parse(storedProfile);
      if (parsed.name) candidateName = parsed.name;
      if (parsed.industry) candidateDomain = parsed.industry;
    } catch (e) {}
  }

  const storedTelemetry = typeof window !== "undefined" ? localStorage.getItem("meti_emotion_telemetry") : null;
  let emotionData = {
    composure: 92,
    cadenceWpm: 142,
    sentiment: "+0.84",
    fillerWordCount: 2,
    focusStability: 89,
    durationSeconds: 120
  };
  if (storedTelemetry) {
    try {
      const parsed = JSON.parse(storedTelemetry);
      emotionData = {
        ...emotionData,
        composure: parsed.composure || 92,
        cadenceWpm: parsed.cadence || 142,
        sentiment: parsed.sentiment || "+0.84",
        fillerWordCount: parsed.fillerCount !== undefined ? parsed.fillerCount : 2
      };
    } catch (e) {}
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="eyebrow">Diagnostic summary of findings</div>
          <h1 className="mt-2 font-sans text-[clamp(36px,4vw,48px)] font-extrabold tracking-[-0.03em] text-[#0B3B36]">Your consulting signal</h1>
          <p className="text-[13px] text-[#52796F] mt-1">
            Evaluated Candidate: <strong className="text-[#0B3B36]">{candidateName}</strong> · Domain: <strong className="text-[#0B3B36]">{candidateDomain}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="border-2 border-[#0E8F91] text-[#0E8F91] hover:bg-[#E3F3F1] font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xs print:hidden"
          >
            <Printer className="h-4 w-4" /> Download Executive Dossier (PDF)
          </Button>
          <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold px-3 py-1">
            Stage 2: Included Findings
          </Badge>
          {hasD250 ? (
            <Badge className="bg-[#10B981] text-white border-0 font-bold flex items-center gap-1 px-3 py-1">
              <Unlock className="h-3.5 w-3.5" /> USD 250 Detailed Roadmap Unlocked
            </Badge>
          ) : (
            <Badge className="bg-[#FDF5E8] text-[#845C1D] border-0 font-bold flex items-center gap-1 px-3 py-1">
              <Lock className="h-3.5 w-3.5" /> Roadmap Upgrade Available
            </Badge>
          )}
        </div>
      </div>

      <p className="mt-3 max-w-3xl font-sans text-[17px] leading-[1.7] text-[#172321]">
        A concise, evidence-grounded view of the patterns emerging from your assessment so far.
      </p>
      
      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-border bg-white shadow-card">
        <div className="flex flex-col justify-between gap-6 bg-[#0B3B36] p-8 text-white md:flex-row md:items-end">
          <div>
            <div className="font-sans text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#0E8F91]">METI / Capability Intelligence Dossier</div>
            <h2 className="mt-2 font-sans text-[28px] font-extrabold tracking-tight">Enterprise consulting capability</h2>
            <p className="mt-1 font-sans text-[14px] text-[#CBD5E1]">Assessment snapshot · Version 1.0 · Calibrated with Senior Assessor</p>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-2 justify-end">
              <strong className="font-sans font-extrabold text-[56px] leading-none tracking-tight text-white tabular-nums">72</strong>
              <span className="font-sans text-[18px] font-semibold text-[#CBD5E1]">/ 100</span>
            </div>
            <span className="mt-1 block font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#0E8F91]">Capability index · Provisional</span>
          </div>
        </div>

        <div className="grid gap-5 p-7 md:grid-cols-2">
          <Finding 
            label="Strength signal" 
            title="Executive Communication" 
            text="Your video and written briefing demonstrated concise recommendations, clear audience adaptation, and disciplined pyramid principle framing." 
            evidenceSource="Board Oral Briefing (Video Studio) — 142 WPM, 0.4% filler ratio, structured risk mitigation"
            tone="strength" 
          />
          <Finding 
            label="Strength signal" 
            title="Enterprise & P&L Perspective" 
            text="You consistently connect customer outcomes, operating constraints, and transformation choices rather than treating problems as isolated functions." 
            evidenceSource="Nexus Freight Case (Exhibit 1 & 2) — P&L demurrage variance and network constraint reconciliation"
            tone="strength" 
          />
          <Finding 
            label="Development theme" 
            title="Rapid Problem Structuring" 
            text="Your opportunity is to make the deductive logic between issue trees, hypotheses, and evidence more explicit when working under strict time pressure." 
            evidenceSource="Adaptive Diagnostic (Q-STRAT-01) — Issue tree logic established; opportunity in priority pruning"
            tone="gap" 
          />
          <Finding 
            label="Next action & roadmap move" 
            title="High-Stakes Hypothesis Sprints" 
            text="Practise structured scoping: clarify the executive decision, frame the issue tree, test the highest-leverage hypothesis first, and close with trade-offs." 
            evidenceSource="Personalized 16-Week Roadmap — Sprint 1 & Knolskape Simulation Milestone"
            tone="gap" 
          />

          {/* Multimodal Neural Telemetry & Vision Audit Card */}
          <div className="col-span-full">
            <EmotionTelemetryCard telemetry={emotionData} />
          </div>

          {/* C01–C20 20-Competency Ontology Radar Chart */}
          <div className="col-span-full">
            <CompetencyRadar candidateName={candidateName} />
          </div>
          
          {/* Optional USD 250 Detailed Roadmap Upgrade Card (Locked vs Unlocked) */}
          {!hasD250 ? (
            <div className="col-span-full rounded-2xl border-2 border-[#C58A32] bg-[#FDF5E8] p-6 text-[#845C1D] shadow-sm animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 font-sans text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#845C1D]">
                    <Lock className="h-4 w-4 text-[#C58A32]" /> Detailed Intelligence Report
                  </div>
                  <h3 className="mt-1.5 font-sans text-[20px] font-extrabold text-[#0B3B36]">
                    Unlock Detailed Intelligence Report &amp; 16-Week Roadmap ($250)
                  </h3>
                  <p className="mt-1 font-sans text-[14px] text-[#755C2F] leading-relaxed max-w-2xl">
                    Upgrade to unlock full evidence explanations, peer benchmark percentiles, top role matches, and your personalized 16-week transformation roadmap.
                  </p>
                </div>
                <Button
                  onClick={onUnlockD250}
                  className="bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold text-[14px] px-6 py-3 rounded-xl shadow-mint shrink-0"
                >
                  <Unlock className="mr-2 h-4 w-4" /> Unlock for USD 250 / Voucher
                </Button>
              </div>
            </div>
          ) : (
            /* KNOLSKAPE 16-Week Transformation Roadmap & P1-P8 Pathway Engine (Unlocked) */
            <div className="col-span-full rounded-2xl border-2 border-[#10B981] bg-[#F8FAFB] p-7 animate-fade-in space-y-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <strong className="block font-sans text-[18px] font-extrabold text-[#0B3B36]">
                      Personalized 16-Week Readiness Roadmap &amp; Learning Plan
                    </strong>
                  </div>
                  <p className="mt-1 font-sans text-[14px] text-[#52796F]">
                    TDD Section 19 · Progression from provisional assessment signal to certified client delivery readiness.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full border-0 bg-[#E3F3F1] px-3.5 py-1.5 font-sans text-[12px] font-extrabold text-[#0E8F91]">
                    Recommended: Pathway P2 (Consultant Bridge)
                  </Badge>
                </div>
              </div>

              {/* TDD Section 19 Pathways P1–P8 Interactive Directory */}
              <div className="rounded-2xl border-2 border-border bg-white p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-sans text-[14px] font-extrabold text-[#0B3B36] uppercase tracking-wider">
                      Development Pathways Directory (TDD P1–P8)
                    </h4>
                    <p className="text-[12px] text-[#52796F]">Eight calibrated transformation routes based on capability index, CRI, and evidence confidence.</p>
                  </div>
                  <span className="text-[12px] font-bold text-[#0E8F91] bg-[#E3F3F1] px-2.5 py-1 rounded-full">
                    8 Calibrated Routes
                  </span>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { id: "P1", name: "Direct Consulting Review", fit: "High capability + CRI", next: "Client-facing shortlist; targeted onboarding", rec: false },
                    { id: "P2", name: "Consultant Bridge", fit: "2–4 specific gaps", next: "4–8 week targeted modules & reassessment", rec: true },
                    { id: "P3", name: "Graduate Analyst", fit: "Strong potential, foundational", next: "Supervised assignments + structured analyst track", rec: false },
                    { id: "P4", name: "Enterprise Transformation", fit: "Core consulting foundations", next: "6–8 week Value Chain & Transformation programme", rec: false },
                    { id: "P5", name: "Research & Consulting", fit: "Need live project evidence", next: "2–3 month supervised research & casework", rec: false },
                    { id: "P6", name: "Business Analyst Route", fit: "Strong analysis/process", next: "BA assignments + strategy/TOM bridge", rec: false },
                    { id: "P7", name: "Executive Upskilling", fit: "Experienced manager/exec", next: "6–12 week modular transformation/AI plan", rec: false },
                    { id: "P8", name: "Future Reassessment", fit: "Building initial evidence", next: "Self-learning plan + future reassessment date", rec: false },
                  ].map((p) => (
                    <div 
                      key={p.id}
                      className={cn(
                        "p-3 rounded-xl border-2 transition text-left flex flex-col justify-between",
                        p.rec 
                          ? "border-[#0E8F91] bg-[#E3F3F1]/40 shadow-xs ring-2 ring-[#0E8F91]/20" 
                          : "border-border bg-[#F8FAFB] hover:border-[#0E8F91]/40"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-[12px] text-[#0E8F91]">{p.id}</span>
                          {p.rec && <span className="text-[10px] font-extrabold uppercase bg-[#0E8F91] text-white px-2 py-0.5 rounded-full">Active Fit</span>}
                        </div>
                        <strong className="block text-[13px] font-bold text-[#0B3B36] mt-1">{p.name}</strong>
                        <p className="text-[11px] text-[#52796F] mt-1 leading-tight">{p.fit}</p>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-border text-[11px] text-[#172321] leading-tight">
                        <strong>Next:</strong> {p.next}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 16-Week Sprints Layout */}
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  { phase: "Weeks 1–4", title: "Problem Structuring", desc: "Issue trees, MECE hypotheses, and fast scoping under ambiguity.", status: "Sprint 1 · Priority", progress: "85% Complete" },
                  { phase: "Weeks 5–8", title: "Value Chain Stress-Test", desc: "Operating model diagnostics, unit economics, and constraint mapping.", status: "Sprint 2", progress: "In Progress" },
                  { phase: "Weeks 9–12", title: "Executive Stakeholders", desc: "C-suite framing, managing disagreement, and decision trade-offs.", status: "Sprint 3", progress: "Scheduled" },
                  { phase: "Weeks 13–16", title: "Live Simulation Capstone", desc: "Full-scale enterprise scenario with demonstrated peer benchmarking.", status: "Certification", progress: "Final Milestone" }
                ].map((sprint, i) => (
                  <div key={sprint.phase} className={cn("rounded-xl p-4.5 border-2 transition", i === 0 ? "border-[#0E8F91] bg-white shadow-sm ring-2 ring-[#0E8F91]/20" : "border-border bg-white")}>
                    <div className="font-sans text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#0E8F91]">{sprint.phase}</div>
                    <h4 className="mt-1.5 font-sans text-[15px] font-bold text-[#0B3B36]">{sprint.title}</h4>
                    <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-[#172321]">{sprint.desc}</p>
                    <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
                      <span className={cn("font-sans text-[12px] font-bold", i === 0 ? "text-[#0E8F91]" : "text-[#52796F]")}>{sprint.status}</span>
                      <span className="text-[11px] font-extrabold text-[#0B3B36]">{sprint.progress}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* TDD 19.1 Learning Plan Object & Mentor Tasks */}
              <div className="rounded-2xl border-2 border-[#0E8F91]/30 bg-white p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#0E8F91]">TDD Section 19.1 · Learning Plan Object</div>
                    <h4 className="text-[16px] font-extrabold text-[#0B3B36] mt-0.5">Target Role: Senior Practice Consultant (Target CRI: 85/100)</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#52796F]">Evidence Completion:</span>
                    <Badge className="bg-[#10B981] text-white border-0 font-bold px-3 py-1">2 of 4 Submissions Certified</Badge>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-xl border border-border bg-[#F8FAFB] space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-[13px] font-bold text-[#0B3B36]">Mentor Task 01: MECE Issue Tree Sprint</strong>
                      <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 text-[10px] font-bold">COMPLETED</Badge>
                    </div>
                    <p className="text-[12px] text-[#52796F] leading-relaxed">
                      Deconstruct client P&amp;L margin compression into mutually exclusive revenue and cost sub-branches under 15-minute time pressure.
                    </p>
                    <div className="text-[11px] font-mono text-[#0E8F91]">Reviewed by Dr. Aris Vance (Accredited Partner)</div>
                  </div>

                  <div className="p-4 rounded-xl border border-border bg-[#F8FAFB] space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-[13px] font-bold text-[#0B3B36]">Mentor Task 02: Board Executive Briefing</strong>
                      <Badge className="bg-[#FDF5E8] text-[#845C1D] border-0 text-[10px] font-bold">IN REVIEW</Badge>
                    </div>
                    <p className="text-[12px] text-[#52796F] leading-relaxed">
                      Deliver 3-minute oral pitch justifying operational turnaround roadmap to hostile client stakeholders in Executive Studio.
                    </p>
                    <div className="text-[11px] font-mono text-[#52796F]">Awaiting Final Partner Sign-off in Evaluator Desk</div>
                  </div>
                </div>
              </div>

              {/* Quick-Jump to Deep Dive Work Samples & Assessor Calibration */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                <span className="text-[13px] font-semibold text-[#0B3B36]">Stage 3 Demonstrated Evidence Work Samples:</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/case">
                    <Button variant="outline" className="border-[#0E8F91] text-[#0E8F91] hover:bg-[#E3F3F1] font-bold text-[13px] rounded-xl">
                      <FileText className="mr-2 h-4 w-4" /> Case Workspace (Nexus Freight)
                    </Button>
                  </Link>
                  <Link href="/studio">
                    <Button variant="outline" className="border-[#0E8F91] text-[#0E8F91] hover:bg-[#E3F3F1] font-bold text-[13px] rounded-xl">
                      <Video className="mr-2 h-4 w-4" /> Executive Video Studio
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="col-span-full rounded-2xl bg-[#FDF5E8] border border-[#F6EBD5] p-6">
            <strong className="block font-sans text-[15px] font-bold text-[#845C1D]">Detailed intelligence dossier &amp; employer pathways</strong>
            <p className="mt-1.5 max-w-3xl font-sans text-[13px] leading-relaxed text-[#755C2F]">
              The full enterprise dossier adds evidence attribution logs, benchmark percentiles against 1,200+ consulting candidates, and verified badge export.
            </p>
            <Button onClick={() => showNotice("Full dossier export generated successfully.")} className="mt-4 bg-[#0E8F91] px-5 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-[#0A7476] rounded-xl shadow-sm">
              Export verified summary dossier
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-5 font-sans text-[13px] leading-relaxed text-[#52796F]">
        Scores are developmental and evidence-based. Values and preferences are descriptive and are not used as pass/fail or hidden culture-fit criteria.
      </p>
    </div>
  );
}

function Finding({ 
  label, 
  title, 
  text, 
  evidenceSource, 
  tone 
}: { 
  label: string; 
  title: string; 
  text: string; 
  evidenceSource?: string; 
  tone: "strength" | "gap" 
}) {
  return (
    <div className="rounded-2xl border-2 border-border p-5 bg-white flex flex-col justify-between">
      <div>
        <span className={cn("text-[12px] font-bold uppercase tracking-[0.12em]", tone === "strength" ? "text-[#0E8F91]" : "text-[#C58A32]")}>{label}</span>
        <h3 className="mt-2 text-[16px] font-bold text-[#0B3B36]">{title}</h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[#172321]">{text}</p>
      </div>
      {evidenceSource && (
        <div className="mt-3.5 pt-3 border-t border-border/70 flex items-start gap-1.5 text-[11px] font-mono text-[#52796F]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#0E8F91] shrink-0 mt-0.5" />
          <span><strong>Evidence Source:</strong> {evidenceSource}</span>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("journey");
  const [notice, setNotice] = useState("");
  const [activeProduct, setActiveProduct] = useState("bundle");
  const [hasD250, setHasD250] = useState(true);

  // Sync view from query or hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const queryView = searchParams.get("view");
      if (queryView === "findings" || queryView === "assessment" || queryView === "journey") {
        setView(queryView as View);
      }
    }
  }, []);

  // Sync entitlement from storage
  useEffect(() => {
    const readStorage = () => {
      try {
        const stored = localStorage.getItem("meti_entitlement");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.product) {
            setActiveProduct(parsed.product);
            setHasD250(parsed.product === "bundle" || parsed.hasD250 === true);
          }
        }
      } catch (e) {
        console.warn(e);
      }
    };
    readStorage();
    window.addEventListener("storage", readStorage);
    return () => window.removeEventListener("storage", readStorage);
  }, []);

  const showNotice = (message: string) => { 
    setNotice(message); 
    window.setTimeout(() => setNotice(""), 3500); 
  };

  const handleUnlockD250 = () => {
    setHasD250(true);
    try {
      const stored = localStorage.getItem("meti_entitlement");
      const current = stored ? JSON.parse(stored) : { product: activeProduct };
      current.hasD250 = true;
      localStorage.setItem("meti_entitlement", JSON.stringify(current));
    } catch (e) {
      console.warn(e);
    }
    showNotice("USD 250 Detailed Roadmap & Intelligence Report unlocked!");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans">
      <MobileHeader view={view} setView={setView} />
      <div className="flex min-h-screen">
        <SideNav view={view} setView={setView} />
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-7 sm:px-8 lg:px-12 lg:py-8">
            <Topbar activeProduct={activeProduct} />
            {view === "journey" && <JourneyView setView={setView} activeProduct={activeProduct} />}
            {view === "assessment" && <AssessmentView activeProduct={activeProduct} />}
            {view === "findings" && (
              <FindingsView 
                showNotice={showNotice} 
                activeProduct={activeProduct} 
                hasD250={hasD250}
                onUnlockD250={handleUnlockD250}
              />
            )}
            <div className="mt-10 flex items-center gap-2.5 text-[13px] font-semibold text-[#52796F]">
              <ShieldCheck className="h-4 w-4 text-[#0E8F91]" /> Your data is handled with consent, evidence boundaries, and human review where required.
            </div>
          </div>
        </main>
      </div>
      {notice && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3.5 rounded-2xl bg-[#0B3B36] px-5 py-3.5 text-[14px] font-bold text-white shadow-deep">
          <Sparkles className="h-4 w-4 text-[#0E8F91]" />
          {notice}
          <button type="button" onClick={() => setNotice("")} aria-label="Dismiss">
            <X className="h-4 w-4 text-[#CBD5E1]" />
          </button>
        </div>
      )}
    </div>
  );
}
