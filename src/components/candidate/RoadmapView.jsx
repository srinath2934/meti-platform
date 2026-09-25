import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Target, 
  CheckCircle2, 
  Circle,
  Calendar,
  UserCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function RoadmapView({ onNavigateToPractice }) {
  const [activeSprint, setActiveSprint] = useState(1);

  // Section 12: Action-Oriented Development Plan tied to diagnosed gaps
  const developmentActions = [
    {
      number: "01",
      title: "HYPOTHESIS FORMATION",
      gap: "Prioritising competing hypotheses under market ambiguity",
      practice: "Market Entry Case Simulation",
      estimatedTime: "45 minutes",
      target: "case",
      status: "READY"
    },
    {
      number: "02",
      title: "COMMERCIAL THINKING",
      gap: "Connecting recommendations to P&L unit economics",
      practice: "Pricing Strategy & Surcharge Simulation",
      estimatedTime: "30 minutes",
      target: "case",
      status: "READY"
    },
    {
      number: "03",
      title: "EXECUTIVE COMMUNICATION",
      gap: "Structuring top-down Pyramid Principle synthesis for C-suite",
      practice: "Board Pitch Simulation & Cadence Analysis",
      estimatedTime: "20 minutes",
      target: "video",
      status: "READY"
    }
  ];

  // 16-Week Structured Capability Acceleration Curriculum
  const roadmapSprints = [
    {
      sprintNumber: 1,
      weeks: "Weeks 1–4",
      title: "Structured Problem Decomposition & Issue Trees",
      competency: "Problem Structuring & Hypothesis Formation",
      status: "ACTIVE",
      modules: [
        { title: "MECE Decomposition & Logic Trees", duration: "6 hrs", completed: true },
        { title: "80/20 Driver Trees & Hypothesis Prioritization", duration: "8 hrs", completed: true },
        { title: "Case Practice: OmniRetail Turnaround Exhibit Analysis", duration: "10 hrs", completed: false }
      ],
      milestone: "Defend MECE Issue Tree before Engagement Manager",
      mentorCheckin: "Bi-weekly 1:1 hypothesis pruning review"
    },
    {
      sprintNumber: 2,
      weeks: "Weeks 5–8",
      title: "Commercial Sensitivity & Unit Economics Modeling",
      competency: "Commercial Thinking & Financial Trade-Offs",
      status: "UPCOMING",
      modules: [
        { title: "P&L Waterfall Decomposition & Cost-to-Serve", duration: "8 hrs", completed: false },
        { title: "Price Elasticity & Split-Shipment Sensitivity Tables", duration: "10 hrs", completed: false },
        { title: "Financial Model Defense in Uncertain Markets", duration: "6 hrs", completed: false }
      ],
      milestone: "Deliver complete dynamic Excel sensitivity model",
      mentorCheckin: "1:1 review of quantitative assumption defense"
    },
    {
      sprintNumber: 3,
      weeks: "Weeks 9–12",
      title: "C-Suite Executive Synthesis & Pyramid Principle",
      competency: "Executive Communication & Stakeholder Navigation",
      status: "UPCOMING",
      modules: [
        { title: "Minto Pyramid Principle: Governing Thought First", duration: "6 hrs", completed: false },
        { title: "Managing Conflicting C-Suite Incentives (CFO vs CCO)", duration: "8 hrs", completed: false },
        { title: "A10 Video Pitch Simulation (WPM & Composure Training)", duration: "6 hrs", completed: false }
      ],
      milestone: "Record 2-minute C-Suite Board Recommendation Video",
      mentorCheckin: "Senior Partner speech cadence & presence audit"
    },
    {
      sprintNumber: 4,
      weeks: "Weeks 13–16",
      title: "End-to-End Client Simulation & Partner Calibration",
      competency: "Full-Spectrum Client Readiness",
      status: "UPCOMING",
      modules: [
        { title: "Live Rapid-Fire Case Simulation with Partner AI", duration: "12 hrs", completed: false },
        { title: "Final Assessor Calibration & CRI Reassessment", duration: "8 hrs", completed: false }
      ],
      milestone: "Attain 85+ Client Readiness Index (CRI) for Senior Associate Deployability",
      mentorCheckin: "Final Partner Calibration Sign-off"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Professional Development
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            YOUR DEVELOPMENT PLAN
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Prescriptive, action-oriented practice connected directly to diagnosed capability gaps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ● Sprint 1 Active
          </span>
        </div>
      </div>

      {/* Section 12: Action-Oriented Practice Modules Tied to Diagnosed Gaps */}
      <section className="space-y-4" aria-labelledby="action-plan-heading">
        <h2 id="action-plan-heading" className="text-xs font-bold uppercase tracking-wider text-slate-500">
          PRIORITY PRACTICE ACTIONS
        </h2>

        <div className="space-y-4">
          {developmentActions.map((action) => (
            <div 
              key={action.number} 
              className="white-panel p-6 sm:p-7 border-slate-200 white-panel-hover space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {action.number}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {action.title}
                    </h3>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p>
                      <strong className="text-slate-800">Gap: </strong>
                      {action.gap}
                    </p>
                    <p>
                      <strong className="text-slate-800">Practice: </strong>
                      {action.practice}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      Estimated time: {action.estimatedTime}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToPractice && onNavigateToPractice(action.target)}
                  className="btn-primary self-start sm:self-auto shrink-0 flex items-center gap-2 text-xs px-4 py-2"
                >
                  <span>Start</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 16-Week Capability Roadmap Overview */}
      <section className="space-y-6 pt-4 border-t border-slate-200" aria-labelledby="roadmap-heading">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="roadmap-heading" className="text-xs font-bold uppercase tracking-wider text-slate-500">
              16-WEEK CAPABILITY ACCELERATION ROADMAP
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Structured sprints designed to elevate your Client Readiness Index (CRI) to target benchmark.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {roadmapSprints.map((sprint) => {
            const isActive = sprint.status === 'ACTIVE';

            return (
              <div 
                key={sprint.sprintNumber}
                className={`white-panel p-6 space-y-4 transition-all ${
                  isActive ? 'border-slate-900 ring-1 ring-slate-900 shadow-sm' : 'border-slate-200 opacity-90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">
                        {sprint.weeks}
                      </span>
                      <span className="text-slate-300">•</span>
                      <h3 className="text-sm font-bold text-slate-900">
                        {sprint.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Focus: {sprint.competency}
                    </p>
                  </div>

                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded self-start sm:self-auto ${
                    isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isActive ? 'Current Sprint' : 'Upcoming'}
                  </span>
                </div>

                {/* Modules Checklist */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Sprint Modules
                  </span>
                  <div className="space-y-1.5">
                    {sprint.modules.map((mod, i) => (
                      <div key={i} className="flex items-center justify-between text-xs text-slate-700 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                          {mod.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-slate-400 shrink-0" />
                          )}
                          <span className={mod.completed ? 'line-through text-slate-400' : 'text-slate-800'}>
                            {mod.title}
                          </span>
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">{mod.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone & Mentor Check-in */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-slate-700" />
                    <span><strong>Milestone:</strong> {sprint.milestone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <UserCheck className="h-3.5 w-3.5" />
                    <span><strong>Mentor:</strong> {sprint.mentorCheckin}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
