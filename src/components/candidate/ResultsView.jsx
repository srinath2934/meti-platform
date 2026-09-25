import React, { useState } from 'react';
import { 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  ChevronRight, 
  X, 
  Sparkles,
  Info,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';

export default function ResultsView({ onOpenRoadmap }) {
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  // Grouped Competencies adhering strictly to Section 10
  const competencyGroups = [
    {
      group: "STRATEGY",
      description: "Macro positioning, business model economics, and competitive dynamics",
      items: [
        {
          id: "strat_thinking",
          name: "Strategic Thinking",
          current: 78,
          target: 85,
          gap: 7,
          level: "Strong",
          priority: "Low",
          confidence: "High",
          confidenceDots: "●●●●○",
          evidenceSources: [
            "Scenario response (Market Entry)",
            "Case analysis (OmniTurnaround)",
            "Multi-criteria decision logic"
          ],
          behaviours: [
            "Evaluates competitive defensibility across 3-year horizons",
            "Identifies disruptive industry headwinds early",
            "Synthesizes qualitative customer sentiment into strategic posture"
          ],
          gapReason: "Candidate currently focuses on incumbent response rather than emerging low-cost substitutes.",
          developmentOpportunity: "Deepening competitive game theory analysis in fast-shifting regulatory landscapes.",
          evidenceDetails: {
            scenarioQuote: "Evaluated OmniRetail entering German retail without local warehousing; flagged 18% customs tariff penalty accurately.",
            caseDeliverable: "Section 2.1 Strategic Rationale — identified 3 core drivers of margin erosion correctly.",
            assessorNote: "Clear strategic baseline; demonstrated solid market sizing logic."
          }
        },
        {
          id: "comm_thinking",
          name: "Commercial Thinking",
          current: 68,
          target: 85,
          gap: 17,
          level: "Developing",
          priority: "High",
          confidence: "High",
          confidenceDots: "●●●●○",
          evidenceSources: [
            "Scenario response (Surcharge Dilemma)",
            "Financial sensitivity model in Case",
            "Unit economics trade-off evaluation"
          ],
          behaviours: [
            "Understands gross vs contribution margin distinctions",
            "Identifies high-cost service channels",
            "Needs deeper rigor connecting recommendations to bottom-line P&L"
          ],
          gapReason: "Candidate favored customer goodwill over immediate working capital constraints during the split-shipment dilemma.",
          developmentOpportunity: "Connecting qualitative policy recommendations directly to P&L unit economics and cash flow run-rates.",
          evidenceDetails: {
            scenarioQuote: "Recommended phased surcharge roll-out; hesitated on immediate $4.50 fee due to customer churn concern.",
            caseDeliverable: "Exhibit 3 Financial Model — calculated EBITDA impact within 4% of optimal baseline.",
            assessorNote: "Requires structured financial modeling training to accelerate executive credibility."
          }
        },
        {
          id: "market_under",
          name: "Market Understanding",
          current: 82,
          target: 85,
          gap: 3,
          level: "Strong",
          priority: "Low",
          confidence: "Very High",
          confidenceDots: "●●●●●",
          evidenceSources: [
            "Scenario response (E-commerce channels)",
            "Case briefing synthesis"
          ],
          behaviours: [
            "Demonstrates crisp awareness of omni-channel fulfillment dynamics",
            "Applies Porter's Five Forces instinctively without jargon",
            "Accurately maps consumer channel preferences"
          ],
          gapReason: "Minor gap in enterprise B2B procurement subtleties.",
          developmentOpportunity: "Exploring B2B vendor contract renegotiation protocols.",
          evidenceDetails: {
            scenarioQuote: "Mapped supplier power concentration accurately across third-party fulfillment centers.",
            caseDeliverable: "Exhibit 1 Market Dynamics — identified private-label substitution trends.",
            assessorNote: "Very solid market domain instinct."
          }
        }
      ]
    },
    {
      group: "PROBLEM SOLVING",
      description: "Rigorous decomposition, MECE structuring, and analytical deduction",
      items: [
        {
          id: "prob_struct",
          name: "Problem Structuring",
          current: 76,
          target: 88,
          gap: 12,
          level: "Strong",
          priority: "Medium",
          confidence: "High",
          confidenceDots: "●●●●○",
          evidenceSources: [
            "Scenario response (Profitability decline)",
            "Case issue tree deliverable",
            "Structured reasoning memo"
          ],
          behaviours: [
            "Breaks ambiguous problems into mutually exclusive components",
            "Identifies relevant financial and operational drivers",
            "Builds structured issue trees from top-down goals"
          ],
          gapReason: "When faced with multi-variable ambiguity, candidate investigated cost buckets before confirming top-line revenue stabilization.",
          developmentOpportunity: "Prioritising hypotheses under high uncertainty using 80/20 driver trees.",
          evidenceDetails: {
            scenarioQuote: "Selected 'Cost structure (fixed vs variable splits)' first, when top-line volume mix was also shifting.",
            caseDeliverable: "Work Sample Issue Tree — 3 primary branches established, MECE rating: 88%.",
            assessorNote: "Strong foundational logic; with coaching will master rapid hypothesis tree pruning."
          }
        },
        {
          id: "hyp_form",
          name: "Hypothesis Formation",
          current: 66,
          target: 85,
          gap: 19,
          level: "Developing",
          priority: "High",
          confidence: "High",
          confidenceDots: "●●●●○",
          evidenceSources: [
            "Scenario response (Fulfillment expense surge)",
            "Case hypothesis matrix"
          ],
          behaviours: [
            "Forms intuitive hunches quickly",
            "Can articulate testable assumptions",
            "Struggles to rank competing hypotheses by data accessibility"
          ],
          gapReason: "Candidate tended to validate all hypotheses simultaneously rather than sequencing the fastest-kill hypothesis first.",
          developmentOpportunity: "Formulating early, testable hypotheses and prioritizing by business impact vs validation effort.",
          evidenceDetails: {
            scenarioQuote: "Selected warehouse routing over packaging inflation; needed 2 extra queries to validate.",
            caseDeliverable: "Hypothesis Section — identified root cause but did not state falsification criteria.",
            assessorNote: "Core development priority for 16-week acceleration."
          }
        },
        {
          id: "ana_reasoning",
          name: "Analytical Reasoning",
          current: 84,
          target: 85,
          gap: 1,
          level: "Strong",
          priority: "Low",
          confidence: "Very High",
          confidenceDots: "●●●●●",
          evidenceSources: [
            "Case Excel sensitivity deliverable",
            "Margin waterfall calculation",
            "Statistical test evaluation"
          ],
          behaviours: [
            "Interprets financial tables and break-even points flawlessly",
            "Identifies data anomalies and statistical outliers",
            "Quantifies sensitivity ranges for key assumptions"
          ],
          gapReason: "Virtually zero gap; demonstrates quantitative consulting standard.",
          developmentOpportunity: "Translating complex analytical tables into single-sentence executive takeaways.",
          evidenceDetails: {
            scenarioQuote: "Calculated multi-channel cost-to-serve variance within 20 seconds.",
            caseDeliverable: "Sensitivity table correctly identified optimal pricing at $42.50.",
            assessorNote: "High analytical horsepower."
          }
        }
      ]
    },
    {
      group: "PEOPLE & COMMUNICATION",
      description: "Executive presence, stakeholder navigation, and C-suite alignment",
      items: [
        {
          id: "exec_comm",
          name: "Executive Communication",
          current: 74,
          target: 85,
          gap: 11,
          level: "Developing",
          priority: "Medium",
          confidence: "High",
          confidenceDots: "●●●●○",
          evidenceSources: [
            "2-minute Video Pitch recording",
            "Written Synthesis Executive Memo",
            "A10 Communication Intelligence evaluation"
          ],
          behaviours: [
            "Maintains poised, steady executive posture",
            "Speech cadence in optimal consulting range (144 WPM)",
            "Needs stronger Pyramid Principle 'Answer First' structuring"
          ],
          gapReason: "In the video pitch, candidate spent 45 seconds on context before delivering the core recommendation.",
          developmentOpportunity: "Adopting strict top-down 'Governing Thought First' communication in all executive meetings.",
          evidenceDetails: {
            scenarioQuote: "Audio transcript: 144 WPM, 3 filler words, composure score: 92/100.",
            caseDeliverable: "Executive memo was comprehensive but required inverted pyramid structuring.",
            assessorNote: "Strong presence and vocal tone; needs structural polish."
          }
        },
        {
          id: "stake_mgmt",
          name: "Stakeholder Management",
          current: 80,
          target: 85,
          gap: 5,
          level: "Strong",
          priority: "Low",
          confidence: "High",
          confidenceDots: "●●●●○",
          evidenceSources: [
            "Scenario response (CFO vs CCO conflict)",
            "Case stakeholder empathy mapping"
          ],
          behaviours: [
            "Balances competing executive incentives effectively",
            "Frames solutions through shared corporate KPIs",
            "Diplomatic escalation protocol"
          ],
          gapReason: "Minor hesitation on when to involve CEO vs resolving at Steering Committee level.",
          developmentOpportunity: "Facilitating multi-stakeholder workshops with diverging political agendas.",
          evidenceDetails: {
            scenarioQuote: "Selected joint working session with shared financial modeling over unilateral escalation.",
            caseDeliverable: "Addressed operational union concerns proactively.",
            assessorNote: "Mature stakeholder awareness."
          }
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in">
      
      {/* Page Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Capability Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            CAPABILITY PROFILE & EVIDENCE DIAGNOSIS
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Every capability score is grounded in observed behavioral evidence, current-vs-target gaps, and developmental priorities.
          </p>
        </div>

        <button
          onClick={onOpenRoadmap}
          className="btn-primary text-xs py-2 px-4 flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <span>Open Development Plan</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Summary Indices Bar (Calm, Evidence-First) */}
      <div className="white-panel p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Consulting Capability (CCI)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">77</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Benchmark: 70 (Associate)</p>
        </div>

        <div className="pt-4 sm:pt-0 sm:pl-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Client Readiness (CRI)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">82%</span>
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Client Deployable</p>
        </div>

        <div className="pt-4 sm:pt-0 sm:pl-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Evidence Confidence
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">0.88</span>
            <span className="text-xs font-semibold text-slate-700">High</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Triangulated streams</p>
        </div>

        <div className="pt-4 sm:pt-0 sm:pl-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Top Priority Gap
          </span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 block truncate">
              Hypothesis Formation
            </span>
            <span className="text-xs text-amber-700 font-semibold">
              19 pt delta to target
            </span>
          </div>
        </div>
      </div>

      {/* Logical Competency Groupings (Section 10) */}
      <div className="space-y-12">
        {competencyGroups.map((group) => (
          <section key={group.group} className="space-y-4" aria-labelledby={`group-${group.group}`}>
            <div className="border-b border-slate-200 pb-2">
              <h2 id={`group-${group.group}`} className="text-lg font-bold text-slate-900 tracking-tight">
                {group.group}
              </h2>
              <p className="text-xs text-slate-500">
                {group.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {group.items.map((item) => (
                <div key={item.id} className="white-panel p-6 space-y-6 white-panel-hover">
                  
                  {/* Card Header: Title + Status + Confidence */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base font-bold text-slate-900">
                          {item.name}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          item.level === 'Strong' ? 'bg-slate-100 text-slate-900' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {item.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span>Confidence: <strong className="text-slate-700">{item.confidence}</strong></span>
                        <span className="text-slate-800 tracking-widest">{item.confidenceDots}</span>
                        <span>•</span>
                        <span>{item.evidenceSources.length} evidence sources</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedEvidence(item)}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 self-start sm:self-auto px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <span>View evidence</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Section 11: Current vs Target Gap Visualization */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Current Score */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-slate-700">Current Observed</span>
                          <span className="font-bold text-slate-900">{item.current} / 100</span>
                        </div>
                        <div className="capability-bar-track">
                          <div 
                            className="capability-bar-fill" 
                            style={{ width: `${item.current}%` }}
                          />
                        </div>
                      </div>

                      {/* Target Score */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-slate-700">Target Standard</span>
                          <span className="font-bold text-slate-900">{item.target} / 100</span>
                        </div>
                        <div className="capability-bar-track">
                          <div 
                            className="capability-bar-fill-blue" 
                            style={{ width: `${item.target}%` }}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Gap Metrics & Priority */}
                    <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 border-t border-slate-200/60">
                      <div className="flex items-center gap-3">
                        <span>Gap: <strong className="text-slate-900 font-bold">{item.gap} points</strong></span>
                        <span>•</span>
                        <span>Priority: <strong className={item.priority === 'High' ? 'text-amber-700 font-semibold' : 'text-slate-700'}>{item.priority}</strong></span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        Bayesian calibrated standard
                      </span>
                    </div>

                    {/* Explanation of WHY the gap exists (Section 11) */}
                    <div className="text-xs text-slate-700 pt-1">
                      <strong className="text-slate-900">Why this gap exists: </strong>
                      <span>{item.gapReason}</span>
                    </div>
                  </div>

                  {/* Section 9: Observed Behaviours & Development Opportunity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    
                    {/* Observed Behaviours */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Observed Behaviours
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {item.behaviours.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Development Opportunity */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Development Opportunity
                      </h4>
                      <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100 text-xs text-blue-900 space-y-1">
                        <span className="font-semibold block">→ Recommended Focus</span>
                        <p>{item.developmentOpportunity}</p>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Traceable Evidence Modal (Section 9: Traceable to Evidence) */}
      {selectedEvidence && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="white-panel max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Evidence Audit Trail
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedEvidence.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-semibold text-slate-900 block">
                  1. Scenario Assessment Evidence
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {selectedEvidence.evidenceDetails.scenarioQuote}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-semibold text-slate-900 block">
                  2. Case Simulation Work Sample Evidence
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {selectedEvidence.evidenceDetails.caseDeliverable}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-100 space-y-1.5">
                <span className="font-semibold text-blue-950 block">
                  3. Assessor & AI Calibration Synthesis
                </span>
                <p className="text-blue-900 leading-relaxed">
                  {selectedEvidence.evidenceDetails.assessorNote}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedEvidence(null)}
                className="btn-primary text-xs px-4 py-2"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
