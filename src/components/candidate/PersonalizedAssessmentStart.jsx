import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  User, 
  Edit3, 
  HelpCircle,
  FileText,
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import CandidateProfileModal from './CandidateProfileModal';

export default function PersonalizedAssessmentStart({ onStartAssessment }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    title: "AI Engineering",
    subDomain: "Computer Vision & Video Analytics",
    skills: "Python · AWS · PyTorch · RAG",
    experience: "3+ years experience",
    status: "Profile analyzed"
  });

  const handleProfileUpdated = (updated) => {
    setProfile(prev => ({
      ...prev,
      title: updated.targetRole || updated.target_role || prev.title,
      subDomain: updated.currentRole || updated.current_role || prev.subDomain,
      experience: updated.experienceYears ? `${updated.experienceYears}+ years experience` : prev.experienceYears
    }));
  };

  return (
    <div className="min-h-screen bg-white text-[#172321] flex flex-col justify-between py-10 px-6 sm:px-12 lg:px-20 max-w-6xl mx-auto animate-fade-in">
      
      {/* Top Header Rail (Korn Ferry Minimalist Style) */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Korn Ferry style asterisk / star brand mark */}
            <span className="text-[#00B377] font-black text-2xl leading-none">
              ✱
            </span>
            <span className="font-extrabold text-2xl tracking-tight text-[#0B3B36]">
              METI
            </span>
          </div>
          <span className="h-4 w-px bg-[#E5E7EB] hidden sm:block"></span>
          <span className="text-xs text-[#526662] hidden sm:block font-medium">
            Enterprise Capability Intelligence
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-[#526662]">
          <button 
            type="button"
            className="hover:text-[#0B3B36] transition-colors flex items-center gap-1.5"
            onClick={() => alert("METI tailors scenario difficulty and business dilemmas directly to your domain experience.")}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Help</span>
          </button>
          
          <button 
            type="button"
            onClick={() => setIsProfileModalOpen(true)}
            className="hover:text-[#0B3B36] transition-colors flex items-center gap-1.5 font-bold text-[#0B3B36]"
          >
            <User className="h-3.5 w-3.5" />
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="py-12 sm:py-16 space-y-12">
        
        {/* Large Signature Headline with Mint Accent Word */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0B3B36] leading-[1.15]">
            We help businesses and the people in them <span className="text-[#00B377]">thrive</span>
          </h1>
          <p className="text-base sm:text-lg text-[#526662] max-w-2xl leading-relaxed">
            Your assessment is <strong className="text-[#0B3B36]">personalized</strong>. We use your verified profile, skills, and industry experience to tailor real-world consulting scenarios to you.
          </p>
        </div>

        {/* Korn Ferry 3-Tile Row: Deep Pine Card + 96% Stat Card + Profile Analyzed Tile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Tile 1: Deep Pine Hero Tile */}
          <div className="kf-card-pine p-6 sm:p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Capability Intelligence
              </span>
              <h2 className="text-2xl font-bold text-white leading-snug">
                Helping the best <span className="text-[#00C582] block">be more than</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Objective evidence synthesis benchmarked against global consulting success profiles.
              </p>
            </div>

            <button
              onClick={onStartAssessment}
              className="bg-[#0B3B36] hover:bg-[#072622] text-white border border-[#00B377]/40 text-xs font-bold py-2.5 px-4 rounded-md flex items-center justify-between transition-colors shadow-xs"
            >
              <span>Start Assessment</span>
              <ArrowRight className="h-4 w-4 text-[#00C582]" />
            </button>
          </div>

          {/* Tile 2: Sage Green Benchmark Metric Tile */}
          <div className="kf-card-sage p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
                Enterprise Benchmark
              </span>
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                96%
              </div>
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              We align capabilities against 96% of the competencies deployed by world-class management consulting practices.
            </p>
          </div>

          {/* Tile 3: Profile Analysis Card (White with Subtle Border) */}
          <div className="white-panel p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#526662]">
                  YOUR PROFILE
                </span>
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="text-xs text-[#00B377] hover:text-[#009E69] font-bold flex items-center gap-1"
                >
                  <Edit3 className="h-3 w-3" />
                  <span>Edit</span>
                </button>
              </div>

              <h3 className="text-lg font-bold text-[#0B3B36] leading-tight">
                {profile.title}
              </h3>
              <p className="text-xs font-semibold text-[#172321]">
                {profile.subDomain}
              </p>
              <p className="text-[11px] text-[#526662] font-mono">
                {profile.skills}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <span className="text-[#526662]">{profile.experience}</span>
              <span className="font-bold text-[#00B377] flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                <span>{profile.status}</span>
              </span>
            </div>
          </div>

        </div>

        {/* What to Expect Guide (Thomas Assess / Korn Ferry Standard) */}
        <div className="white-panel p-6 sm:p-8 space-y-5">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#526662]">
              WHAT TO EXPECT
            </h3>
            <p className="text-sm font-semibold text-[#0B3B36] mt-0.5">
              Your assessment adapts continuously to your answers — zero generic questionnaires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-[#E5E7EB] space-y-1">
              <span className="font-bold text-[#0B3B36] block">1. Experience Scenarios</span>
              <p className="text-[#526662]">Tailored to your specific domain expertise and past project deliverables.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-[#E5E7EB] space-y-1">
              <span className="font-bold text-[#0B3B36] block">2. Adaptive Trade-offs</span>
              <p className="text-[#526662]">Difficulty and constraints calibrate on-the-fly to test your decision logic.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-[#E5E7EB] space-y-1">
              <span className="font-bold text-[#0B3B36] block">3. 2-Min Video Pitch</span>
              <p className="text-[#526662]">Evaluates verbal presence, executive speech cadence (130-155 WPM), and composure.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-[#E5E7EB] space-y-1">
              <span className="font-bold text-[#0B3B36] block">4. Diagnostic Report</span>
              <p className="text-[#526662]">Evidence-based scorecard with personalized 16-week developmental pathway.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-2 flex items-center gap-4">
          <button
            onClick={onStartAssessment}
            className="btn-mint text-sm px-8 py-3.5 rounded-md flex items-center gap-3 font-bold shadow-xs hover:bg-[#009E69]"
          >
            <span>Start Adaptive Assessment</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Footer */}
      <div className="pt-8 border-t border-[#E5E7EB] text-xs text-[#526662] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>METI Enterprise Capability Intelligence • Built on Korn Ferry & Thomas Assess Psychometric Principles</span>
        <span>Candidate ID: #cand_sarah_01</span>
      </div>

      {/* Edit Profile Modal */}
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
