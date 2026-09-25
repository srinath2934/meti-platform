import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Check, 
  Sparkles, 
  Target, 
  Network, 
  Layers, 
  FileText, 
  ShieldCheck, 
  LockKeyhole, 
  BarChart3, 
  Compass, 
  Award,
  ChevronRight
} from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-ivory text-body flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-border/80">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Editorial Value Proposition */}
              <div className="lg:col-span-7">
                <div className="eyebrow">Enterprise transformation intelligence</div>
                <h1 className="mt-4 font-sans text-[clamp(42px,4.8vw,64px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#0B3B36]">
                  A high-trust, human-reviewed<br />consulting career engagement.
                </h1>
                <p className="mt-6 max-w-2xl font-sans text-[17px] leading-[1.7] text-[#172321]">
                  METI delivers a rigorous, evidence-grounded career intelligence engagement with a tangible professional outcome. We evaluate business problem framing, target operating models, hypothesis structuring, and C-suite oral briefings—calibrated by accredited Senior Practice Partners.
                </p>

                {/* Primary CTAs */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setLocation("/video")}
                    className="bg-[#0E8F91] font-sans text-[15px] font-bold text-white hover:bg-[#0A7476] rounded-xl px-7 py-3.5 shadow-mint transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Start Free Orientation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <a
                    href="#pillars"
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-border bg-white px-6 py-3.5 font-sans text-[15px] font-bold text-[#0B3B36] transition hover:border-[#0E8F91] hover:text-[#0E8F91] shadow-xs"
                  >
                    Explore 3 pillars
                  </a>
                </div>

                {/* Proof Markers */}
                <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-7">
                  <div>
                    <div className="font-sans text-[18px] font-extrabold text-[#0B3B36]">Human-Calibrated</div>
                    <div className="font-sans text-[13px] font-semibold text-[#52796F] mt-1">Senior Partner Review Desk</div>
                  </div>
                  <div>
                    <div className="font-sans text-[18px] font-extrabold text-[#0E8F91]">Evidence-Led</div>
                    <div className="font-sans text-[13px] font-semibold text-[#52796F] mt-1">Real consulting work samples</div>
                  </div>
                  <div>
                    <div className="font-sans text-[18px] font-extrabold text-[#0B3B36]">16-Week Roadmap</div>
                    <div className="font-sans text-[13px] font-semibold text-[#52796F] mt-1">Tangible career outcome</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Executive Metric Teaser Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border border-border bg-white p-7 shadow-deep">
                  <div className="flex items-center justify-between border-b border-border/80 pb-4">
                    <div>
                      <div className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#0E8F91]">Illustrative Example</div>
                      <div className="font-sans text-[16px] font-bold text-[#0B3B36] mt-0.5">Alex Rivera · Senior Associate</div>
                    </div>
                    <Badge className="rounded-full border-0 bg-[#E3F3F1] px-3 py-1 font-sans text-[12px] font-bold text-[#0E8F91]">
                      ● In Progress
                    </Badge>
                  </div>

                  {/* Dual Metric Cards */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {/* Metric 1 */}
                    <div className="rounded-2xl border border-border bg-[#F8FAFB] p-5">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[14px] font-bold text-[#0B3B36]">Capability index</span>
                        <span className="rounded-full bg-[#FDF5E8] px-2.5 py-0.5 font-sans text-[11px] font-bold text-[#845C1D]">Provisional</span>
                      </div>
                      <div className="mt-3.5 flex items-baseline gap-2">
                        <strong className="font-sans font-bold text-[52px] leading-none tracking-tight text-[#0B3B36] tabular-nums">72</strong>
                        <span className="font-sans text-[18px] font-semibold text-[#52796F]">/ 100</span>
                      </div>
                      <div className="mt-3.5 h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8EA]">
                        <div className="h-full rounded-full bg-[#0E8F91]" style={{ width: "72%" }} />
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="rounded-2xl border border-border bg-[#F8FAFB] p-5">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[14px] font-bold text-[#0B3B36]">Evidence confidence</span>
                        <span className="rounded-full bg-[#E3F3F1] px-2.5 py-0.5 font-sans text-[11px] font-bold text-[#0E8F91]">Good</span>
                      </div>
                      <div className="mt-3.5 flex items-baseline gap-2">
                        <strong className="font-sans font-bold text-[52px] leading-none tracking-tight text-[#0B3B36] tabular-nums">81</strong>
                        <span className="font-sans text-[18px] font-semibold text-[#52796F]">/ 100</span>
                      </div>
                      <div className="mt-3.5 h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8EA]">
                        <div className="h-full rounded-full bg-[#C58A32]" style={{ width: "81%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Active Question Preview */}
                  <div className="mt-5 rounded-2xl border border-[#BCE8D7] bg-[#F2FBF7] p-5">
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0B3B36]">
                      <Sparkles className="h-4 w-4 text-[#0E8F91]" /> CasingLab Adaptive Question Engine
                    </div>
                    <div className="mt-2 font-sans text-[15px] font-semibold leading-relaxed text-[#172321]">
                      "A client has clear growth ambition, but the organisation cannot currently deliver it. What would you do first?"
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-[#0E8F91]/20 pt-3 text-[13px] text-[#0B3B36]">
                      <span className="font-medium">Follow-up: Deepens based on answer</span>
                      <span className="font-bold">Step 2 of 3</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setLocation("/login")}
                    className="mt-5 w-full bg-[#0B3B36] font-sans text-[15px] font-bold text-white hover:bg-[#062320] rounded-xl py-3.5 shadow-sm"
                  >
                    Experience the assessment live →
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: THE 3 PILLARS (KNOLSKAPE & Korn Ferry Benchmark) */}
        <section id="pillars" className="py-20 lg:py-28 bg-white border-b border-border/80">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="eyebrow">The METI assessment model</div>
              <h2 className="mt-3 font-sans text-[clamp(34px,3.8vw,48px)] font-extrabold tracking-[-0.025em] text-[#0B3B36]">
                Three layers of calibrated evidence.
              </h2>
              <p className="mt-4 font-sans text-[17px] leading-relaxed text-[#172321]">
                Rather than treating candidates as a generic test score, METI evaluates career context, diagnostic problem-solving logic, and live business scenario execution.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Pillar 1 */}
              <Card className="rounded-2xl border-2 border-border/90 bg-[#F8FAFB] p-8 shadow-sm transition hover:shadow-card-hover hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#E3F3F1] text-[#0B3B36] font-extrabold text-[16px]">
                  01
                </div>
                <h3 className="mt-6 font-sans text-[20px] font-bold text-[#0B3B36]">Context &amp; Profile Evidence</h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#172321]">
                  We parse candidate background, roles, and international exposure. Not to create a pass/fail screen, but to ensure subsequent questions test relevant executive scenarios.
                </p>
                <ul className="mt-6 space-y-3 border-t border-border pt-5 font-sans text-[14px] font-semibold text-[#172321]">
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Role &amp; industry context ingestion</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Senior stakeholder exposure</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Contextual calibration</li>
                </ul>
              </Card>

              {/* Pillar 2 */}
              <Card className="rounded-2xl border-2 border-border/90 bg-[#F8FAFB] p-8 shadow-sm transition hover:shadow-card-hover hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#E3F3F1] text-[#0B3B36] font-extrabold text-[16px]">
                  02
                </div>
                <h3 className="mt-6 font-sans text-[20px] font-bold text-[#0B3B36]">Adaptive Scenario Diagnostic</h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#172321]">
                  Inspired by CasingLab’s probing methodology. If you recommend an operating model roadmap, METI immediately probes your dependency logic and risk-framing.
                </p>
                <ul className="mt-6 space-y-3 border-t border-border pt-5 font-sans text-[14px] font-semibold text-[#172321]">
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Dynamic follow-up challenges</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Hypothesis-driven evaluation</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Trade-off articulation</li>
                </ul>
              </Card>

              {/* Pillar 3 */}
              <Card className="rounded-2xl border-2 border-border/90 bg-[#F8FAFB] p-8 shadow-sm transition hover:shadow-card-hover hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#E3F3F1] text-[#0B3B36] font-extrabold text-[16px]">
                  03
                </div>
                <h3 className="mt-6 font-sans text-[20px] font-bold text-[#0B3B36]">Demonstrated Case Execution</h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#172321]">
                  Grounding capability in action. Candidates interpret real P&amp;L exhibits, identify operating model bottlenecks, and synthesize executive recommendations under time pressure.
                </p>
                <ul className="mt-6 space-y-3 border-t border-border pt-5 font-sans text-[14px] font-semibold text-[#172321]">
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Multi-tab data exhibits</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Written synthesis with limits</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-[#0E8F91] shrink-0" /> Peer-benchmarked readiness</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 3: 4 COMPETENCY DIMENSIONS (Modus Transformation Wheel) */}
        <section id="competencies" className="py-20 lg:py-28 bg-[#F8FAFB] border-b border-border/80">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <div className="eyebrow">Consulting readiness framework</div>
                <h2 className="mt-3 font-sans text-[clamp(32px,3.8vw,44px)] font-extrabold tracking-[-0.025em] text-[#0B3B36]">
                  Four pillars of consulting excellence.
                </h2>
                <p className="mt-4 font-sans text-[17px] leading-relaxed text-[#172321]">
                  Every question and case simulation maps back to the core competencies top strategy firms and internal enterprise advisory teams evaluate across the Modus transformation framework.
                </p>
                <div className="mt-8">
                  <Button
                    onClick={() => setLocation("/checkout")}
                    className="bg-[#0E8F91] font-sans text-[15px] font-bold text-white hover:bg-[#0A7476] rounded-xl px-6 py-3.5 shadow-mint"
                  >
                    View Assessment Entitlements <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
                {[
                  { name: "Strategic Reasoning", score: "78%", tag: "High signal", desc: "Connecting enterprise outcomes, growth targets, and market forces under ambiguous client situations." },
                  { name: "Value Chain Diagnostics", score: "64%", tag: "Development area", desc: "Understanding unit economics, operating model friction points, and operational execution bottlenecks." },
                  { name: "Executive Communication", score: "84%", tag: "Strength signal", desc: "Concise pyramid-principle synthesis, board adaptation, and decision-oriented recommendation framing." },
                  { name: "Problem Structuring", score: "59%", tag: "Priority focus", desc: "Issue trees, MECE hypotheses, and fast scoping under strict diagnostic time pressure." },
                ].map((item) => (
                  <div key={item.name} className="rounded-2xl border-2 border-border bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[12px] font-bold text-[#0E8F91] uppercase tracking-wider">{item.tag}</span>
                      <strong className="font-sans text-[22px] font-extrabold text-[#0B3B36] tabular-nums">{item.score}</strong>
                    </div>
                    <h4 className="mt-3 font-sans text-[18px] font-bold text-[#0B3B36]">{item.name}</h4>
                    <p className="mt-2 font-sans text-[14px] leading-relaxed text-[#172321]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: GOVERNANCE & TRUST (F01 COMPLIANCE) */}
        <section id="governance" className="py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="rounded-3xl bg-[#0B3B36] p-9 lg:p-16 text-white shadow-deep">
              <div className="max-w-2xl">
                <div className="eyebrow" style={{ color: "#0E8F91" }}>Governance &amp; candidate trust</div>
                <h2 className="mt-3 font-sans text-[clamp(30px,3.5vw,44px)] font-extrabold tracking-[-0.025em] text-white">
                  Evidence boundaries and ethical AI evaluation.
                </h2>
                <p className="mt-5 font-sans text-[17px] leading-relaxed text-[#E2E8F0]">
                  METI follows strict evidence isolation. Your resume context is never combined with assessment responses without explicit candidate consent. All AI evaluation operates under human review safeguards.
                </p>

                <div className="mt-9 grid gap-6 sm:grid-cols-2">
                  <div className="flex gap-3.5">
                    <ShieldCheck className="h-6 w-6 text-[#0E8F91] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-sans text-[15px] font-bold text-white">F01 Consent Standard</div>
                      <div className="font-sans text-[13px] text-[#CBD5E1] mt-1">Separate privacy and AI-scoring consent checkboxes.</div>
                    </div>
                  </div>
                  <div className="flex gap-3.5">
                    <LockKeyhole className="h-6 w-6 text-[#0E8F91] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-sans text-[15px] font-bold text-white">Immutable Evidence Log</div>
                      <div className="font-sans text-[13px] text-[#CBD5E1] mt-1">Responses are version-locked and independently auditable.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Button
                    onClick={() => setLocation("/login")}
                    className="bg-[#0E8F91] font-sans text-[15px] font-bold text-white hover:bg-[#0A7476] rounded-xl px-7 py-3.5 shadow-mint"
                  >
                    Enter Candidate Workspace <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
