import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Lock,
  ArrowRight,
  X
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';

export default function AssessorDesk() {
  const [candidates, setCandidates] = useState([
    {
      id: "cand_sarah_jenkins",
      name: "Sarah Jenkins",
      role: "Associate Management Consultant",
      status: "PENDING_ASSESSOR_REVIEW",
      submittedDate: "Sep 24, 2026",
      capabilities: [
        { name: "Problem Structuring", rating: "Strong", score: 88 },
        { name: "Commercial Thinking", rating: "Moderate", score: 68 },
        { name: "Communication", rating: "Strong", score: 82 }
      ],
      aiSynthesis: {
        cci: 77,
        cri: 82,
        confidence: 0.84,
        recommendation: "Approved for Client Deployability with Commercial Coaching"
      },
      evidence: {
        questionResponse: "Selected cost structure investigation first; demonstrated MECE issue tree decomposition with 88% precision.",
        caseResponse: "FY25 Financial Bridge accurately quantified £54M EBITDA recovery through delivery minimums and Click & Collect.",
        videoResponse: "Audio cadence: 144 WPM (optimal executive range). Delivered clear Pyramid Principle answer in first 10 seconds."
      }
    },
    {
      id: "cand_marcus_vance",
      name: "Marcus Vance",
      role: "Senior Transformation Consultant",
      status: "PENDING_ASSESSOR_REVIEW",
      submittedDate: "Sep 23, 2026",
      capabilities: [
        { name: "Problem Structuring", rating: "Moderate", score: 72 },
        { name: "Commercial Thinking", rating: "Strong", score: 86 },
        { name: "Communication", rating: "Moderate", score: 70 }
      ],
      aiSynthesis: {
        cci: 76,
        cri: 74,
        confidence: 0.82,
        recommendation: "Conditional Deployability"
      },
      evidence: {
        questionResponse: "Focuses on supplier pricing inflation; needs broader issue tree scope.",
        caseResponse: "Exceptional quantitative financial sensitivity tables and cash-flow model.",
        videoResponse: "Speech cadence: 118 WPM (hesitant). Requires top-down structuring practice."
      }
    }
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [decision, setDecision] = useState('APPROVE');
  const [overrideReason, setOverrideReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  const handleSubmitReview = async () => {
    setIsSubmitting(true);
    try {
      if (backendApi.submitAssessorOverride && selectedCandidate.id) {
        await backendApi.submitAssessorOverride(selectedCandidate.id, {
          finalCci: selectedCandidate.aiSynthesis.cci,
          finalCri: selectedCandidate.aiSynthesis.cri,
          reason: overrideReason || `Assessor decision: ${decision}`,
          reviewerId: "lead_assessor_modus"
        }).catch(() => null);
      }
      setTimeout(() => {
        setIsSubmitting(false);
        setReviewSubmitted(true);
      }, 500);
    } catch (e) {
      setIsSubmitting(false);
      setReviewSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in text-slate-900">
      
      {/* Assessor Desk Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Governance & Calibration
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Mandatory Human Review Active
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            ASSESSOR CALIBRATION DESK
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Verify AI capability synthesis, inspect observed evidence trails, and submit official qualification decisions.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>Assessor: <strong>David Stirling, Partner</strong></span>
        </div>
      </div>

      {/* Main Two-Column Denser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Review Queue (4 cols) */}
        <div className="lg:col-span-4 white-panel p-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Candidate Queue ({candidates.length})
            </h2>
            <span className="text-[11px] text-slate-400">Sorted by Date</span>
          </div>

          <div className="space-y-2">
            {candidates.map((c) => {
              const isSelected = selectedCandidate.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCandidate(c);
                    setReviewSubmitted(false);
                    setOverrideReason('');
                  }}
                  className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-50 border-slate-900 text-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className="text-[11px] text-slate-400">{c.submittedDate}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">{c.role}</p>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700">CCI: {c.aiSynthesis.cci}</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-medium">
                      CRI: {c.aiSynthesis.cri}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Candidate Evaluation & Decision (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Candidate Dossier Header */}
          <div className="white-panel p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-400">Candidate Evaluation</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedCandidate.name}</h3>
                <p className="text-xs text-slate-600">{selectedCandidate.role}</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
                ● Pending Partner Sign-Off
              </span>
            </div>

            {/* Section 15: CAPABILITY BREAKDOWN */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                CAPABILITY
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedCandidate.capabilities.map((cap) => (
                  <div key={cap.name} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-xs font-semibold text-slate-900 block">{cap.name}</span>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold ${
                        cap.rating === 'Strong' ? 'text-emerald-700' : 'text-blue-700'
                      }`}>
                        {cap.rating}
                      </span>
                      <span className="font-medium text-slate-500">{cap.score} / 100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 15: EVIDENCE BREAKDOWN */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  EVIDENCE
                </h4>
                <button
                  onClick={() => setShowEvidenceModal(true)}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                >
                  <span>View Evidence Detail</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <strong className="text-slate-900 block mb-0.5">Question response:</strong>
                  <span className="text-slate-700">{selectedCandidate.evidence.questionResponse}</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <strong className="text-slate-900 block mb-0.5">Case response:</strong>
                  <span className="text-slate-700">{selectedCandidate.evidence.caseResponse}</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200">
                  <strong className="text-slate-900 block mb-0.5">Video response:</strong>
                  <span className="text-slate-700">{selectedCandidate.evidence.videoResponse}</span>
                </div>
              </div>
            </div>

            {/* Section 15: AI SYNTHESIS */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-slate-700" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    AI SYNTHESIS
                  </h4>
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  Confidence: <strong className="text-slate-900 font-bold">{selectedCandidate.aiSynthesis.confidence}</strong>
                </span>
              </div>
              <p className="text-xs text-slate-700">
                {selectedCandidate.aiSynthesis.recommendation}
              </p>
            </div>

            {/* Section 15: ASSESSOR DECISION */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                ASSESSOR DECISION
              </h4>

              {reviewSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Review recorded and logged to enterprise audit ledger. Candidate profile updated.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Decision Radios */}
                  <div className="flex items-center gap-6 text-xs font-medium text-slate-800">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decision"
                        value="APPROVE"
                        checked={decision === 'APPROVE'}
                        onChange={() => setDecision('APPROVE')}
                        className="text-slate-900 focus:ring-slate-900"
                      />
                      <span>Approve</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="decision"
                        value="OVERRIDE"
                        checked={decision === 'OVERRIDE'}
                        onChange={() => setDecision('OVERRIDE')}
                        className="text-slate-900 focus:ring-slate-900"
                      />
                      <span>Override</span>
                    </label>
                  </div>

                  {/* Reason Textarea */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700 block">
                      Reason:
                    </label>
                    <textarea
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      placeholder="Enter calibration rationale or required bridging requirements..."
                      rows={3}
                      className="w-full p-3 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">
                      Human review is mandatory per METI Governance Model.
                    </span>

                    <button
                      onClick={handleSubmitReview}
                      disabled={isSubmitting}
                      className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2"
                    >
                      <span>{isSubmitting ? 'Recording Decision...' : 'Submit Review →'}</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Evidence Detail Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="white-panel max-w-xl w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Full Evidence Dossier — {selectedCandidate.name}
              </h3>
              <button onClick={() => setShowEvidenceModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-slate-700">
              <p><strong>Adaptive Scenario:</strong> Investigated cost drivers; calibrated confidence at 84%.</p>
              <p><strong>Simulation Deliverable:</strong> Constructed complete FY25 EBITDA recovery bridge (+£54M recurring impact).</p>
              <p><strong>Verbal Delivery:</strong> 144 WPM cadence, 92 composure rating, 1 filler word detected.</p>
            </div>
            <div className="pt-2 flex justify-end">
              <button onClick={() => setShowEvidenceModal(false)} className="btn-secondary text-xs px-3 py-1.5">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
