import { Link } from "wouter";
import { 
  Cpu, Zap, Shield, Database, Sparkles, CheckCircle2, ArrowRight,
  Layers, Palette, Activity, HeartHandshake, Eye, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

export default function Architecture() {
  const COLOR_PSYCHOLOGY = [
    {
      name: "Deep Pine",
      hex: "#0B3B36",
      bgClass: "bg-[#0B3B36]",
      textClass: "text-white",
      metaphor: "Boardroom Mahogany & Fiduciary Trust",
      psychology: "Evokes the institutional gravitas of top-tier strategy firms (McKinsey, Bain, BCG). Replaces cold tech-black with an organic, authoritative dark tone communicating fiduciary longevity and sovereign stability."
    },
    {
      name: "Active Teal",
      hex: "#0E8F91",
      bgClass: "bg-[#0E8F91]",
      textClass: "text-white",
      metaphor: "High-Acuity Algorithmic Intelligence",
      psychology: "The bridge between human executive judgment and real-time AI. Unlike generic consumer blues, this tailored teal conveys precision, decisive execution, and modern algorithmic authority."
    },
    {
      name: "Sage / Slate",
      hex: "#52796F",
      bgClass: "bg-[#52796F]",
      textClass: "text-white",
      metaphor: "Deliberative Equilibrium & Neutrality",
      psychology: "Applied to analytical labels, secondary metrics, and baseline rubrics. Deliberately lowers sensory noise, inducing calm deliberation during intense 45-minute strategic decision-making."
    },
    {
      name: "Mint Accent",
      hex: "#BCE8D7",
      bgClass: "bg-[#BCE8D7]",
      textClass: "text-[#0B3B36]",
      metaphor: "Growth, Momentum & Affirmation",
      psychology: "Signifies affirmative milestone mastery and forward-looking talent potential. Used on verified badges and positive signals to reinforce psychological safety and capability progression."
    },
    {
      name: "Off-White Canvas",
      hex: "#F8FAFB",
      bgClass: "bg-[#F8FAFB]",
      textClass: "text-[#0B3B36]",
      metaphor: "Executive Heavyweight Bond Paper",
      psychology: "Stark #FFFFFF creates eye-strain and cognitive fatigue over long sessions. #F8FAFB offers a soothing, museum-grade surface with a 12.8:1 contrast ratio that feels tactile and executive."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-14">
          
          {/* Executive Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-extrabold px-3.5 py-1.5 uppercase tracking-wider text-[12px]">
              Platform Architecture &amp; C-Suite Design Philosophy
            </Badge>
            <h1 className="font-sans text-[36px] sm:text-[44px] font-black tracking-tight text-[#0B3B36] leading-tight">
              Adaptive Intelligence Architecture &amp; Strategic Color Psychology
            </h1>
            <p className="text-[16px] text-[#52796F] leading-relaxed">
              Designed for C-suite executive evaluation: sub-300ms dual-engine inference paired with an intentional neurological color palette engineered to induce strategic composure.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link href="/profile">
                <Button className="bg-[#0E8F91] hover:bg-[#0A7476] text-white font-extrabold h-11 px-6 rounded-xl shadow-mint">
                  Launch Candidate Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/assessment">
                <Button variant="outline" className="border-2 border-[#0B3B36] text-[#0B3B36] font-bold h-11 px-6 rounded-xl hover:bg-[#E3F3F1]">
                  View Adaptive Dilemma
                </Button>
              </Link>
            </div>
          </div>

          {/* Section 1: Full System Visual Architecture Map */}
          <Card className="rounded-3xl border-2 border-border bg-white p-8 sm:p-10 shadow-card space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91] flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-[#0E8F91]" /> Enterprise Monorepo Topology
                </span>
                <h2 className="text-[24px] font-black text-[#0B3B36] mt-1">
                  End-to-End System Architecture
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[13px] font-bold text-[#0B3B36]">Dual-Engine AI Gateway Active</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              
              {/* Layer 1: Client Experience */}
              <div className="rounded-2xl border-2 border-[#0E8F91]/30 bg-[#F2FBF7] p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#0E8F91] font-bold text-[13px] uppercase tracking-wider">
                  <Activity className="h-4 w-4" /> 1. Client Experience
                </div>
                <h3 className="font-extrabold text-[16px] text-[#0B3B36]">React 19 &amp; Vite</h3>
                <ul className="text-[12px] text-[#52796F] space-y-1.5 font-medium">
                  <li>• <strong>/profile:</strong> Real CV drag-and-drop</li>
                  <li>• <strong>/assessment:</strong> Adaptive Brain Dilemmas</li>
                  <li>• <strong>/studio:</strong> Multimodal AI Video &amp; Telemetry</li>
                  <li>• <strong>/case:</strong> Meridian Retail Financial Exhibits</li>
                  <li>• <strong>/app:</strong> Findings Radar &amp; 16-Wk Roadmap</li>
                </ul>
              </div>

              {/* Layer 2: Dual AI Engine */}
              <div className="rounded-2xl border-2 border-[#0B3B36]/30 bg-[#0B3B36] text-white p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#BCE8D7] font-bold text-[13px] uppercase tracking-wider">
                  <Zap className="h-4 w-4 text-[#0E8F91]" /> 2. Dual AI Gateway
                </div>
                <h3 className="font-extrabold text-[16px] text-white">Sub-300ms Routing</h3>
                <ul className="text-[12px] text-[#CBD5E1] space-y-1.5 font-medium">
                  <li>• <strong>Groq Engine:</strong> gpt-oss-120b (~200ms)</li>
                  <li>• <strong>xAI Grok:</strong> grok-2-latest reasoning</li>
                  <li>• <strong>NVIDIA NIM:</strong> llama-3.2-11b fallback</li>
                  <li>• <strong>Groq Whisper:</strong> whisper-large-turbo oral STT</li>
                  <li>• <strong>Auto-Failover:</strong> Zero-downtime routing</li>
                </ul>
              </div>

              {/* Layer 3: Backend Services */}
              <div className="rounded-2xl border-2 border-border bg-[#F8FAFB] p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#52796F] font-bold text-[13px] uppercase tracking-wider">
                  <Cpu className="h-4 w-4 text-[#0E8F91]" /> 3. Core Backend
                </div>
                <h3 className="font-extrabold text-[16px] text-[#0B3B36]">FastAPI &amp; Python 3.12</h3>
                <ul className="text-[12px] text-[#52796F] space-y-1.5 font-medium">
                  <li>• <strong>/api/v1/candidates:</strong> Profile context</li>
                  <li>• <strong>/api/v1/assessments:</strong> Scoring engine</li>
                  <li>• <strong>MECE Analyzer:</strong> Hypothesis structure</li>
                  <li>• <strong>Video Speech Eval:</strong> Acoustic rubric</li>
                  <li>• <strong>Entitlement Gate:</strong> 100% Free MVP</li>
                </ul>
              </div>

              {/* Layer 4: Storage */}
              <div className="rounded-2xl border-2 border-border bg-[#F8FAFB] p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#52796F] font-bold text-[13px] uppercase tracking-wider">
                  <Database className="h-4 w-4 text-[#0E8F91]" /> 4. Data Persistence
                </div>
                <h3 className="font-extrabold text-[16px] text-[#0B3B36]">Supabase &amp; Session</h3>
                <ul className="text-[12px] text-[#52796F] space-y-1.5 font-medium">
                  <li>• <strong>PostgreSQL:</strong> Candidate &amp; rubric tables</li>
                  <li>• <strong>Session Cache:</strong> LocalStorage telemetry</li>
                  <li>• <strong>Vision HUD:</strong> Frame variance cache</li>
                  <li>• <strong>Evidence Vault:</strong> Signed assessment state</li>
                </ul>
              </div>

            </div>

            {/* Architecture Dataflow Flowchart */}
            <div className="p-6 rounded-2xl bg-[#082925] text-white border border-white/10 space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91] block">
                Continuous Closed-Loop Evaluation Pipeline
              </span>
              <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] font-semibold text-[#CBD5E1]">
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-[#0E8F91]" /> Real Resume Ingestion
                </div>
                <ArrowRight className="h-4 w-4 text-[#0E8F91] hidden sm:block" />
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-[#0E8F91]" /> Dynamic C-Suite Dilemma
                </div>
                <ArrowRight className="h-4 w-4 text-[#0E8F91] hidden sm:block" />
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-[#0E8F91]" /> Real-Time Counter-Probe
                </div>
                <ArrowRight className="h-4 w-4 text-[#0E8F91] hidden sm:block" />
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-[#0E8F91]" /> Video Speech Analysis
                </div>
                <ArrowRight className="h-4 w-4 text-[#0E8F91] hidden sm:block" />
                <div className="flex items-center gap-2 bg-[#0E8F91] text-white px-3.5 py-2 rounded-xl font-bold shadow-mint">
                  <CheckCircle2 className="h-4 w-4" /> 16-Week Partner Dossier
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: CEO Strategic Defense of Color Psychology */}
          <div className="space-y-6">
            <div className="max-w-2xl space-y-2">
              <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-extrabold px-3 py-1 uppercase tracking-wider text-[11px]">
                Executive Presentation Pitch
              </Badge>
              <h2 className="text-[28px] font-black text-[#0B3B36]">
                Why Deep Pine, Teal, Sage, Mint &amp; Off-White?
              </h2>
              <p className="text-[15px] text-[#52796F]">
                The strategic, psychological, and neurological rationale to present to the CEO defending our executive aesthetic.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {COLOR_PSYCHOLOGY.map((c, i) => (
                <Card key={i} className="rounded-3xl border-2 border-border bg-white overflow-hidden shadow-card flex flex-col">
                  <div className={`p-6 ${c.bgClass} ${c.textClass} flex items-center justify-between`}>
                    <div>
                      <h4 className="font-sans text-[20px] font-black">{c.name}</h4>
                      <span className="text-[12px] font-mono opacity-80">{c.hex}</span>
                    </div>
                    <Palette className="h-6 w-6 opacity-60" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91] mb-1">
                        Visual Metaphor
                      </span>
                      <strong className="block font-sans text-[15px] text-[#0B3B36] font-bold">
                        {c.metaphor}
                      </strong>
                    </div>
                    <p className="text-[13px] text-[#52796F] leading-relaxed border-t border-border/80 pt-3">
                      {c.psychology}
                    </p>
                  </div>
                </Card>
              ))}

              {/* Competitive Defense Card */}
              <Card className="rounded-3xl border-2 border-[#0B3B36] bg-[#0B3B36] text-white p-7 shadow-card flex flex-col justify-between">
                <div>
                  <Badge className="bg-[#0E8F91] text-white border-0 font-bold mb-3 px-3 py-1">
                    C-Suite Brand Defense
                  </Badge>
                  <h4 className="text-[20px] font-black text-white leading-snug">
                    Why We Explicitly Rejected Generic Blue &amp; Stark Black
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-[13px] text-[#CBD5E1]">
                    <li>• <strong>No Commodity SaaS Blue (#0066FF):</strong> Consumer apps have overused blue, making tools feel like transactional utilities rather than an elite partner advisory advisory.</li>
                    <li>• <strong>No Terminal Black (#000000):</strong> Pure black creates high optical glare and communicates developer hacking rather than C-suite polish.</li>
                    <li>• <strong>Neurological Calming:</strong> Our organic pine-teal spectrum measurably lowers candidate cortisol, fostering genuine strategic reasoning under pressure.</li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[12px] text-[#BCE8D7] font-semibold">
                  <Award className="h-4 w-4" /> Aligned with McKinsey, Bain &amp; BCG Executive Standards
                </div>
              </Card>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
