import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Target, 
  BookOpen, 
  ChevronRight,
  Edit3,
  Sparkles,
  FileText,
  UserCheck
} from 'lucide-react';
import { candidateProfile as defaultProfile } from '../../data/mockMetiData';
import { backendApi } from '../../services/backendApi';
import CandidateProfileModal from './CandidateProfileModal';

export default function CandidateDashboard({ onNavigate }) {
  const [candidate, setCandidate] = useState(defaultProfile);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    async function loadCandidate() {
      try {
        const data = await backendApi.getCandidateDashboard();
        if (data?.candidate) {
          setCandidate(prev => ({
            ...prev,
            name: data.candidate.display_name,
            email: data.candidate.email,
            targetRole: data.candidate.target_role,
            currentRole: data.candidate.profile?.current_role || prev.currentRole,
            experienceYears: data.candidate.profile?.experience_years || prev.experienceYears,
            location: data.candidate.profile?.location || prev.location
          }));
        }
      } catch (err) {
        // Fallback to local storage if offline
        const local = localStorage.getItem("meti_custom_candidate_profile");
        if (local) {
          try {
            const parsed = JSON.parse(local);
            setCandidate(prev => ({
              ...prev,
              name: parsed.display_name,
              email: parsed.email,
              targetRole: parsed.target_role,
              currentRole: parsed.current_role
            }));
          } catch (e) {}
        }
      }
    }
    loadCandidate();
  }, []);

  const handleProfileUpdated = (updated) => {
    setCandidate(prev => ({
      ...prev,
      name: updated.display_name || updated.name || prev.name,
      email: updated.email || prev.email,
      targetRole: updated.target_role || updated.targetRole || prev.targetRole,
      currentRole: updated.current_role || updated.profile?.current_role || prev.currentRole,
    }));
  };

  const capabilities = [
    { name: 'Problem Solving', score: 88, level: 'Strong', width: '88%' },
    { name: 'Strategy', score: 74, level: 'Developing', width: '74%' },
    { name: 'Analytics', score: 68, level: 'Developing', width: '68%' },
    { name: 'Communication', score: 82, level: 'Strong', width: '82%' },
  ];

  const developmentPriorities = [
    {
      num: '01',
      title: 'Hypothesis Formation',
      gap: 'Prioritising competing hypotheses under market ambiguity',
      target: 'roadmap'
    },
    {
      num: '02',
      title: 'Commercial Thinking',
      gap: 'Connecting operational recommendations to P&L unit economics',
      target: 'roadmap'
    },
    {
      num: '03',
      title: 'Executive Communication',
      gap: 'Structuring top-down Pyramid Principle synthesis for C-suite partners',
      target: 'video'
    }
  ];

  const progressSteps = [
    { label: 'Assessment', completed: true, detail: 'Baseline completed' },
    { label: 'Capability Profile', completed: true, detail: 'Diagnosed' },
    { label: 'Development Plan', completed: true, detail: 'Active 16-week plan' },
    { label: 'Practice', completed: false, inProgress: true, detail: '2 / 4 completed' },
    { label: 'Mentor Review', completed: false, inProgress: false, detail: 'Scheduled' },
    { label: 'Reassessment', completed: false, inProgress: false, detail: 'Week 6 target' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in">
      
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Employee Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-0.5">
            YOUR CAPABILITY JOURNEY
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track your consulting capability profile, upcoming practice, and personalized development.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-900">{candidate.name}</p>
            <p className="text-[11px] text-slate-500">{candidate.targetRole}</p>
          </div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
            title="Update Profile & CV"
          >
            <Edit3 className="h-3.5 w-3.5 text-slate-500" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* 1. NEXT STEP CARD (Focused, Uncluttered, Direct) */}
      <section aria-labelledby="next-step-heading">
        <div className="white-panel p-6 sm:p-7 border-slate-200 white-panel-hover">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                NEXT STEP
              </span>
              <h2 id="next-step-heading" className="text-xl font-bold text-slate-900">
                Problem Structuring
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span className="font-medium text-slate-800">Scenario Assessment</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  ~8 minutes
                </span>
                <span>•</span>
                <span className="text-slate-500">Adaptive sequence</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('assessment')}
              className="btn-primary self-start sm:self-auto shrink-0 flex items-center gap-2 text-sm px-5 py-2.5"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        </div>
      </section>

      {/* 2. CAPABILITY PROFILE (Horizontal Bar Visualizations) */}
      <section className="space-y-4" aria-labelledby="capability-heading">
        <div className="flex items-center justify-between">
          <h2 id="capability-heading" className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
            CAPABILITY PROFILE
          </h2>
          <button 
            onClick={() => onNavigate('results')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
          >
            <span>View detailed evidence</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="white-panel p-6 space-y-5">
          {capabilities.map((c) => (
            <div key={c.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">{c.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{c.level}</span>
                  <span className="font-medium text-slate-700 w-8 text-right">{c.score}</span>
                </div>
              </div>
              <div className="capability-bar-track">
                <div 
                  className="capability-bar-fill" 
                  style={{ width: c.width }}
                  aria-label={`${c.name} capability ${c.score}%`}
                />
              </div>
            </div>
          ))}
          
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Diagnosed across 3 independent evidence streams (Scenario, Case, Pitch)</span>
            <span className="font-medium text-slate-700">Bayesian Confidence: High</span>
          </div>
        </div>
      </section>

      {/* 3. DEVELOPMENT PRIORITIES */}
      <section className="space-y-4" aria-labelledby="priorities-heading">
        <div className="flex items-center justify-between">
          <h2 id="priorities-heading" className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
            DEVELOPMENT PRIORITIES
          </h2>
          <button 
            onClick={() => onNavigate('roadmap')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
          >
            <span>View 16-week roadmap</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {developmentPriorities.map((item) => (
            <div 
              key={item.num}
              onClick={() => onNavigate(item.target)}
              className="white-panel p-4 flex items-start gap-4 white-panel-hover cursor-pointer"
            >
              <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                {item.num}
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Gap: {item.gap}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 self-center" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. CURRENT PROGRESS (Journey-First, not % alone) */}
      <section className="space-y-4" aria-labelledby="progress-heading">
        <div className="flex items-center justify-between">
          <h2 id="progress-heading" className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
            CURRENT PROGRESS
          </h2>
          <button 
            onClick={() => onNavigate('progress')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
          >
            <span>View progress details</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="white-panel p-5 divide-y divide-slate-100">
          {progressSteps.map((step) => (
            <div key={step.label} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-800">{step.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-[11px]">{step.detail}</span>
                {step.completed ? (
                  <span className="font-bold text-emerald-600">✓</span>
                ) : step.inProgress ? (
                  <span className="font-semibold text-blue-600">2 / 4</span>
                ) : (
                  <span className="text-slate-400">○</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Modal for CV & LinkedIn */}
      {isProfileModalOpen && (
        <CandidateProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onProfileUpdated={handleProfileUpdated}
        />
      )}

    </div>
  );
}
