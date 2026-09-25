import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  Target, 
  BookOpen, 
  Calendar, 
  UserCheck, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';

export default function ProgressJourneyView({ onNavigate }) {
  const journeyMilestones = [
    {
      id: 'assessment',
      title: 'Baseline Assessment',
      status: 'COMPLETED',
      date: 'Completed Sep 22, 2026',
      description: 'Adaptive scenario assessment across 5 core consulting competency domains.',
      evidenceCount: '14 behavioral signals captured',
      actionLabel: 'Review Responses',
      target: 'assessment'
    },
    {
      id: 'profile',
      title: 'Capability Profile Diagnosis',
      status: 'COMPLETED',
      date: 'Generated Sep 22, 2026',
      description: 'Evidence-first capability mapping against Management Consulting Success Profile.',
      evidenceCount: 'Triangulated Bayesian synthesis (Confidence: 0.88)',
      actionLabel: 'View Capability Profile',
      target: 'results'
    },
    {
      id: 'plan',
      title: 'Personalized Development Plan',
      status: 'COMPLETED',
      date: 'Active since Sep 23, 2026',
      description: 'Prescriptive 16-week capability acceleration targeted at diagnosed gaps.',
      evidenceCount: '3 prioritized developmental focus areas',
      actionLabel: 'View Development Plan',
      target: 'roadmap'
    },
    {
      id: 'practice',
      title: 'Practice & Business Simulation',
      status: 'IN_PROGRESS',
      date: '2 / 4 Modules Completed',
      description: 'Interactive consulting case exhibits, financial sensitivity tables, and synthesis memo.',
      evidenceCount: 'Market Entry Case ✓ • Financial Model ✓ • Pricing Simulation (Pending)',
      actionLabel: 'Continue Practice →',
      target: 'case'
    },
    {
      id: 'mentor',
      title: 'Mentor & Coach Review',
      status: 'SCHEDULED',
      date: 'Scheduled: Oct 02, 2026',
      description: 'One-on-one executive calibration review with Senior Engagement Partner.',
      evidenceCount: 'Assessor calibration desk notified',
      actionLabel: 'View Calibration Notes',
      target: 'dashboard'
    },
    {
      id: 'reassessment',
      title: 'Progressive Reassessment',
      status: 'UPCOMING',
      date: 'Target: Week 6',
      description: 'Targeted reassessment of hypothesis formation and commercial trade-offs.',
      evidenceCount: 'Triggers readiness index recalculation',
      actionLabel: 'Preview Reassessment Criteria',
      target: 'dashboard'
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Capability Progress & Development Journey
        </h1>
        <p className="text-sm text-slate-600">
          Tracking capability development over time, from baseline diagnosis to partner readiness.
        </p>
      </div>

      {/* Progress Journey Summary Card */}
      <div className="white-panel p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Current Development Phase
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              Phase 2: Practice & Business Simulation
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ● On Track
            </span>
            <span className="text-xs font-medium text-slate-500">
              Target Role: Associate Consultant
            </span>
          </div>
        </div>

        {/* Milestone Steps Timeline */}
        <div className="space-y-6">
          {journeyMilestones.map((m, idx) => {
            const isCompleted = m.status === 'COMPLETED';
            const isInProgress = m.status === 'IN_PROGRESS';

            return (
              <div key={m.id} className="relative flex items-start gap-4">
                {/* Connecting Line */}
                {idx < journeyMilestones.length - 1 && (
                  <div 
                    className={`absolute left-4 top-8 -bottom-6 w-0.5 ${
                      isCompleted ? 'bg-slate-300' : 'bg-slate-200'
                    }`}
                  />
                )}

                {/* Status Dot */}
                <div className="relative z-10 shrink-0 mt-0.5">
                  {isCompleted ? (
                    <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  ) : isInProgress ? (
                    <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center ring-4 ring-blue-50">
                      <Clock className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-300 text-slate-400 flex items-center justify-center">
                      <Circle className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>

                {/* Milestone Content */}
                <div className="flex-1 white-panel p-5 white-panel-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-slate-900">
                          {m.title}
                        </h3>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                          isCompleted ? 'bg-slate-100 text-slate-700' :
                          isInProgress ? 'bg-blue-50 text-blue-700 font-semibold' :
                          'bg-slate-50 text-slate-500'
                        }`}>
                          {m.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {m.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate && onNavigate(m.target)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all self-start sm:self-auto shrink-0 ${
                        isInProgress
                          ? 'bg-slate-900 text-white hover:bg-slate-800'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {m.actionLabel}
                    </button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Evidence status:</span>
                    <span>{m.evidenceCount}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Philosophy Note */}
      <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-slate-600" />
          <span>
            <strong>METI Capability Philosophy:</strong> Progress is measured through demonstrated behavioral mastery and simulation evidence, not arbitrary quiz completion.
          </span>
        </div>
        <span className="font-semibold text-slate-900 hidden md:inline">
          Assess → Understand → Develop → Reassess
        </span>
      </div>

    </div>
  );
}
