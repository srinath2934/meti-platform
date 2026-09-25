import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  TrendingUp, 
  FileText, 
  BookOpen,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function LandingOrientation({ onStart }) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-fade-in text-[#111827]">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-[#E5E7EB] text-xs font-semibold text-[#374151]">
          <span>METI Enterprise Capability Intelligence</span>
          <span className="text-[#E5E7EB]">•</span>
          <span className="text-[#2563EB]">Consulting Track</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight">
          Enterprise Employee Capability Assessment & Professional Development
        </h1>

        <p className="text-base text-[#6B7280] leading-relaxed max-w-2xl mx-auto">
          An adaptive, evidence-driven evaluation of management consulting readiness. Transition seamlessly from baseline diagnosis to personalized 16-week practice sprints.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button 
            onClick={onStart} 
            className="btn-primary text-sm py-3 px-6 rounded-lg font-semibold"
          >
            <span>Begin Personalized Assessment</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button 
            onClick={() => setShowTranscript(!showTranscript)}
            className="btn-secondary text-sm py-3 px-5 rounded-lg"
          >
            <BookOpen className="h-4 w-4 text-[#2563EB]" />
            <span>{showTranscript ? 'Hide Guidance' : 'Candidate Guidance'}</span>
          </button>
        </div>
      </div>

      {/* Transcript Accordion if opened */}
      {showTranscript && (
        <div className="white-panel p-6 max-w-3xl mx-auto space-y-3 text-xs text-[#374151] leading-relaxed animate-fade-in bg-slate-50">
          <h3 className="font-bold text-[#111827]">Candidate Journey Briefing:</h3>
          <p>
            Welcome to the METI Capability Evaluation. This assessment is not an exam with arbitrary pass/fail grading. It uses your verified profile to present realistic, adaptive consulting dilemmas that test structured problem decomposition, commercial trade-offs, and executive communication.
          </p>
          <p>
            Your responses calibrate your Consulting Capability Index (CCI) and Client Readiness Index (CRI), directly shaping your customized 16-week development curriculum.
          </p>
        </div>
      )}

      {/* 3 Pillar Value Cards (Thomas & Korn Ferry Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        <div className="white-panel p-6 space-y-3">
          <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB]">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-[#111827]">
            1. Adaptive Scenarios
          </h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Questions adapt on-the-fly to your industry experience and prior responses, eliminating static questionnaires.
          </p>
        </div>

        <div className="white-panel p-6 space-y-3">
          <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB]">
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-[#111827]">
            2. Multi-Measure Evidence
          </h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Triangulates cognitive problem structuring, work-sample case modeling, and multimodal video presence.
          </p>
        </div>

        <div className="white-panel p-6 space-y-3">
          <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB]">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-[#111827]">
            3. Action-Oriented Growth
          </h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Identified capability gaps seamlessly generate a personalized 16-week developmental pathway with mentor review.
          </p>
        </div>

      </div>

    </div>
  );
}
