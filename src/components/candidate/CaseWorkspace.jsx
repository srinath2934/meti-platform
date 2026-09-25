import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Send, 
  FileText, 
  CheckCircle2, 
  BarChart2, 
  Loader2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck,
  Building,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';
import { caseStudyData } from '../../data/mockMetiData';

export default function CaseWorkspace({ onSubmitCase }) {
  const [activeTab, setActiveTab] = useState('memo');
  const [activeExhibit, setActiveExhibit] = useState('ex_1');
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseInfo, setCaseInfo] = useState(caseStudyData);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // 11 Structured TDD v1.1 Deliverables
  const [formData, setFormData] = useState({
    problem_statement: "OmniRetail is experiencing severe profit erosion (-50% EBITDA) primarily due to unmanaged digital fulfillment unit economics and split-shipments, despite top-line e-commerce growth of 38%.",
    success_metrics: "Restore operating EBITDA from 7.0% (£74M) back to 11.5% (£207M) over 36 months, while capping annual turnaround CapEx at £45M.",
    working_assumptions: "No unionized physical store closures in Year 1; 26% apparel return rate can be mitigated via sizing guidance and store returns.",
    issue_tree: "1.0 Revenue Realization\n  1.1 Promotional discounting discipline\n  1.2 Category mix (private label vs wholesale)\n2.0 Fulfillment & Logistics Unit Economics\n  2.1 Parcel carrier contract renegotiation\n  2.2 Store-based fulfillment (BOPIS/Click & Collect)\n  2.3 Split-shipment routing minimization\n3.0 Store Network Fixed Costs\n  3.1 Lease re-gearing across top 100 locations\n  3.2 Store payroll realignment to omni-shipment tasks",
    hypotheses: "Hypothesis A: Store-based fulfillment for apparel can reduce last-mile parcel fees by 35%.\nHypothesis B: Instituting a £45 minimum order value for free delivery will eliminate negative-margin e-commerce transactions.",
    quantitative_analysis: "FY25 Financial Bridge:\n• Digital revenue: £620M, Digital EBITDA: -£38M (-6.1% margin).\n• Cost to serve: £8.90/order vs £4.10 historical.\n• Recommended levers: Minimum £45 free shipping threshold (+£18M), store fulfillment routing (+£22M), supplier terms (+£14M) = +£54M recurring EBITDA.",
    strategic_options: "Option 1: Aggressive store footprint rationalization (High union friction).\nOption 2: Pure-play digital retrenchment (Relinquishes e-commerce market share).\nOption 3: Hybrid Store-Enabled Omnichannel Decoupling (Recommended).",
    final_recommendation: "Execute an immediate 3-lever omnichannel turnaround:\n1. Institute minimum £45 order threshold for free home delivery.\n2. Scale Click & Collect (BOPIS) to 60% of apparel orders utilizing existing 420 store footprint.\n3. Consolidate parcel contracts with tier-discounted SLAs within 90 days.",
    risks_and_mitigations: "Risk 1: Customer backlash against delivery thresholds -> Mitigation: Offer free Click & Collect across all basket sizes.\nRisk 2: Store associate burnout from order packing -> Mitigation: Dedicated back-of-house mobile picking terminals.",
    first_90_days_roadmap: "Days 1–30: Implement £45 shipping threshold and freeze non-essential digital ad spend.\nDays 31–60: Pilot store-based fulfillment across top 50 metropolitan locations.\nDays 61–90: Re-negotiate carrier master services agreements and establish real-time order margin telemetry.",
    missing_data_reflection: "To refine sensitivity modeling, I would request SKU-level return rates, regional carrier zone surcharge tables, and store-level picking labor costs."
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      setEvaluationResult({
        overall_score: 91.5,
        executive_summary: "Exceptional consulting rigor. Candidate displays strong commercial intuition and client-ready synthesis.",
        strengths: [
          "Exemplary MECE problem decomposition isolating logistics cost-to-serve",
          "Sound financial bridging quantifying £54M EBITDA recovery"
        ]
      });
      setIsLocked(true);
      setShowFeedbackModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in text-[#111827]">
      
      {/* Header */}
      <div className="white-panel p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
              Consulting Work Sample
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Evaluation Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">
            {caseInfo.title || "OmniRetail $1.8B Omnichannel Transformation"}
          </h1>
          <p className="text-xs text-[#6B7280]">
            Industry: Retail & Consumer Goods • Objective: Restore operating EBITDA to 11.5%
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs font-mono text-[#374151]">
            <Clock className="h-4 w-4 text-[#2563EB]" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting || isLocked}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : isLocked ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Evaluated</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Submit Deliverables</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Brief & Exhibits (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Executive Brief */}
          <div className="white-panel p-6 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#374151] flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#2563EB]" />
                Executive Brief & Constraints
              </h2>
              <span className="text-[11px] font-mono text-[#6B7280]">CASE-OMNI</span>
            </div>

            <p className="text-xs text-[#374151] leading-relaxed whitespace-pre-line">
              {caseInfo.brief}
            </p>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <strong>Mandatory Constraint:</strong> {caseInfo.constraints}
            </div>
          </div>

          {/* Data Pack & Exhibits */}
          <div className="white-panel p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#374151] flex items-center gap-1.5">
                <BarChart2 className="h-3.5 w-3.5 text-[#2563EB]" />
                Data Pack & Exhibits
              </h3>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveExhibit('ex_1')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    activeExhibit === 'ex_1' ? 'bg-[#111827] text-white' : 'bg-slate-100 text-[#374151]'
                  }`}
                >
                  Exhibit 1 (P&L)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveExhibit('ex_2')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                    activeExhibit === 'ex_2' ? 'bg-[#111827] text-white' : 'bg-slate-100 text-[#374151]'
                  }`}
                >
                  Exhibit 2 (Logistics)
                </button>
              </div>
            </div>

            {/* Exhibit 1: Historical Financials */}
            {activeExhibit === 'ex_1' && (
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#111827] block">Exhibit 1: Historical Financials (FY23 - FY25)</span>
                <div className="overflow-x-auto rounded-lg border border-[#E5E7EB]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-[#374151] border-b border-[#E5E7EB]">
                      <tr>
                        <th className="py-2 px-3 font-semibold">Channel</th>
                        <th className="py-2 px-2.5 font-semibold">Revenue</th>
                        <th className="py-2 px-2.5 font-semibold">Margin</th>
                        <th className="py-2 px-2.5 font-semibold">EBITDA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      <tr>
                        <td className="py-2 px-3 font-medium text-[#111827]">Physical Stores</td>
                        <td className="py-2 px-2.5">£1,180M</td>
                        <td className="py-2 px-2.5">48%</td>
                        <td className="py-2 px-2.5 font-semibold text-emerald-700">£112M (9.5%)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-[#111827]">Digital E-Commerce</td>
                        <td className="py-2 px-2.5">£620M</td>
                        <td className="py-2 px-2.5">34%</td>
                        <td className="py-2 px-2.5 font-semibold text-rose-700">-£38M (-6.1%)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-[#111827]">Wholesale / B2B</td>
                        <td className="py-2 px-2.5">£210M</td>
                        <td className="py-2 px-2.5">22%</td>
                        <td className="py-2 px-2.5 font-semibold text-emerald-700">£14M (6.6%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  Key Signal: Digital revenue grew to £620M but produced an operating loss of -£38M due to split-shipment logistics costs.
                </p>
              </div>
            )}

            {/* Exhibit 2: Channel Fulfillment Economics */}
            {activeExhibit === 'ex_2' && (
              <div className="p-4 rounded-lg bg-slate-50 border border-[#E5E7EB] space-y-3 text-xs text-[#374151]">
                <span className="font-semibold text-[#111827] block">Exhibit 2: Channel Fulfillment Economics</span>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-[#E5E7EB] pb-1.5">
                    <span>Physical Store Sale:</span>
                    <span className="font-mono text-emerald-700 font-semibold">Cost: 4.2% • Returns: 3.1%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E7EB] pb-1.5">
                    <span>Online Ship-to-Home:</span>
                    <span className="font-mono text-rose-700 font-semibold">Cost: 14.8% (£8.90/ord) • Returns: 18.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Click & Collect (BOPIS):</span>
                    <span className="font-mono text-blue-700 font-semibold">Cost: 6.5% • Returns: 7.2%</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#EFF6FF] border border-[#DBEAFE] text-[#1E40AF] text-[11px]">
                  <strong>Consultant Diagnostic Hint:</strong> Average order value is £48. A £8.90 fulfillment fee plus returns erodes gross margins below zero.
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: 11 Structured Deliverables (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="white-panel p-6 space-y-6">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E7EB] text-xs font-semibold">
              {[
                { id: 'memo', label: '1. Executive Memo' },
                { id: 'issue_tree', label: '2. MECE Issue Tree' },
                { id: 'financials', label: '3. Financial Bridge' },
                { id: 'roadmap', label: '4. 90-Day Plan' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === t.id ? 'bg-[#111827] text-white' : 'bg-slate-100 text-[#374151] hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Memo */}
            {activeTab === 'memo' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#111827] block mb-1">
                    Problem Statement & Root Cause
                  </label>
                  <textarea
                    rows={3}
                    value={formData.problem_statement}
                    onChange={(e) => handleChange('problem_statement', e.target.value)}
                    className="w-full p-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#111827] block mb-1">
                    Final Recommendation (Pyramid Principle)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.final_recommendation}
                    onChange={(e) => handleChange('final_recommendation', e.target.value)}
                    className="w-full p-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-hidden focus:border-[#2563EB]"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Issue Tree */}
            {activeTab === 'issue_tree' && (
              <div className="space-y-2 text-xs">
                <label className="font-bold text-[#111827] block">
                  MECE Issue Tree Decomposition
                </label>
                <textarea
                  rows={9}
                  value={formData.issue_tree}
                  onChange={(e) => handleChange('issue_tree', e.target.value)}
                  className="w-full p-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] font-mono leading-relaxed focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            )}

            {/* Tab 3: Financials */}
            {activeTab === 'financials' && (
              <div className="space-y-2 text-xs">
                <label className="font-bold text-[#111827] block">
                  Quantitative Financial Bridge (£M EBITDA Impact)
                </label>
                <textarea
                  rows={8}
                  value={formData.quantitative_analysis}
                  onChange={(e) => handleChange('quantitative_analysis', e.target.value)}
                  className="w-full p-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] font-mono leading-relaxed focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            )}

            {/* Tab 4: Roadmap */}
            {activeTab === 'roadmap' && (
              <div className="space-y-2 text-xs">
                <label className="font-bold text-[#111827] block">
                  First 90-Days Turnaround Roadmap
                </label>
                <textarea
                  rows={6}
                  value={formData.first_90_days_roadmap}
                  onChange={(e) => handleChange('first_90_days_roadmap', e.target.value)}
                  className="w-full p-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] leading-relaxed focus:outline-hidden focus:border-[#2563EB]"
                />
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Submission Feedback Modal */}
      {showFeedbackModal && evaluationResult && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="white-panel max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-[#111827]">
                Work Sample Evaluated
              </h3>
            </div>
            <div className="space-y-2 text-xs text-[#374151]">
              <p>Score: <strong className="text-emerald-700 font-bold">{evaluationResult.overall_score} / 100</strong></p>
              <p>{evaluationResult.executive_summary}</p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  onSubmitCase(formData);
                }}
                className="btn-primary text-xs px-4 py-2"
              >
                Proceed to Scorecard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
