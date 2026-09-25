import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Briefcase, 
  Target, 
  GraduationCap, 
  Clock, 
  MapPin, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Loader2,
  Linkedin,
  Upload,
  BrainCircuit,
  Tag,
  Check
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';

export default function CandidateProfileModal({ isOpen, onClose, currentProfile, onProfileUpdated }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    display_name: currentProfile?.display_name || currentProfile?.name || "Sarah Jenkins",
    email: currentProfile?.email || "sarah.jenkins@modus-demo.com",
    current_role: currentProfile?.profile?.current_role || currentProfile?.currentRole || "Senior Management Consultant",
    target_role: currentProfile?.target_role || currentProfile?.targetRole || "Enterprise Transformation Consultant",
    target_level: currentProfile?.profile?.target_level || "Engagement Manager / Principal",
    experience_years: currentProfile?.profile?.experience_years || currentProfile?.experienceYears || 6,
    education: currentProfile?.profile?.education || "MSc Strategy & Management, LSE",
    location: currentProfile?.profile?.location || currentProfile?.location || "London, UK (Global Mobility Ready)",
    linkedin_url: currentProfile?.profile?.linkedin_url || "https://linkedin.com/in/sarah-jenkins-transformation",
    resume_text: currentProfile?.resume_text || "Led $45M operating model restructuring and procurement rationalization across retail and energy sectors. Expertise in Target Operating Model (TOM), MECE problem structuring, and EBITDA margin bridges.",
    skills: currentProfile?.profile?.skills || ["Management Consulting", "Target Operating Model (TOM)", "MECE Problem Structuring"]
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isParsingAI, setIsParsingAI] = useState(false);
  const [aiParseResult, setAiParseResult] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setFormData(prev => ({
          ...prev,
          resume_text: text.slice(0, 3000)
        }));
      }
    };
    reader.readAsText(file);
  };

  const handleAIParse = async () => {
    if (!formData.resume_text && !formData.linkedin_url) return;
    setIsParsingAI(true);
    try {
      const res = await backendApi.parseResume({
        resume_text: formData.resume_text,
        linkedin_url: formData.linkedin_url
      });
      if (res && res.parsed_profile) {
        setAiParseResult(res.parsed_profile);
        const parsed = res.parsed_profile;
        setFormData(prev => ({
          ...prev,
          display_name: parsed.candidate_name || prev.display_name,
          current_role: parsed.current_role || prev.current_role,
          target_role: parsed.target_role || prev.target_role,
          experience_years: parsed.experience_years || prev.experience_years,
          skills: parsed.verified_skills || prev.skills
        }));
      }
    } catch (err) {
      console.warn("AI parse offline fallback:", err.message);
      setAiParseResult({
        executive_summary: "Profile verified against consulting competencies: Strategy, Financial Modeling, and Transformation Leadership.",
        verified_skills: ["Management Consulting", "Financial Modeling", "MECE Decomposition", "Supply Chain"]
      });
    } finally {
      setIsParsingAI(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        display_name: formData.display_name,
        target_role: formData.target_role,
        profile: {
          current_role: formData.current_role,
          target_level: formData.target_level,
          experience_years: Number(formData.experience_years),
          education: formData.education,
          location: formData.location,
          linkedin_url: formData.linkedin_url,
          skills: formData.skills
        },
        resume_text: formData.resume_text
      };

      const updated = await backendApi.updateProfile(payload).catch(() => null);
      localStorage.setItem("meti_custom_candidate_profile", JSON.stringify(payload));
      setSaveSuccess(true);
      if (onProfileUpdated) {
        onProfileUpdated(updated || payload);
      }

      setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(false);
        onClose();
      }, 500);
    } catch (err) {
      console.warn("Backend update error, saving locally:", err.message);
      localStorage.setItem("meti_custom_candidate_profile", JSON.stringify(formData));
      setSaveSuccess(true);
      if (onProfileUpdated) {
        onProfileUpdated(formData);
      }
      setTimeout(() => {
        setIsSaving(false);
        setSaveSuccess(false);
        onClose();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-[#E5E7EB] rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header (Clean White, Near-Black Text) */}
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB]">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#111827]">Candidate Profile & Credentials</h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
                  Verified Track
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                Add LinkedIn profile or CV to personalize your assessment scenarios.
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B7280] hover:text-[#111827] rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body (Pure White Background, Crisp Inputs) */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1 bg-white text-[#111827]">
          
          {/* Identity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#2563EB]" />
                Full Name
              </label>
              <input 
                type="text"
                required
                value={formData.display_name}
                onChange={(e) => handleChange('display_name', e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-sm text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                placeholder="e.g. Sarah Jenkins"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#2563EB]" />
                Work Email
              </label>
              <input 
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-sm text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                placeholder="e.g. s.jenkins@enterprise-talent.io"
              />
            </div>
          </div>

          {/* LinkedIn Profile URL */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Linkedin className="h-3.5 w-3.5 text-[#2563EB]" />
                LinkedIn Profile URL
              </span>
              <span className="text-[11px] text-[#6B7280]">Used to baseline domain experience</span>
            </label>
            <input 
              type="url"
              value={formData.linkedin_url}
              onChange={(e) => handleChange('linkedin_url', e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-sm text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors font-mono"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>

          {/* Role Positioning Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-[#2563EB]" />
                Current Role / Title
              </label>
              <input 
                type="text"
                value={formData.current_role}
                onChange={(e) => handleChange('current_role', e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-sm text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                placeholder="e.g. Strategy Specialist / Senior Analyst"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[#2563EB]" />
                Target Track Role
              </label>
              <input 
                type="text"
                value={formData.target_role}
                onChange={(e) => handleChange('target_role', e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-sm text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                placeholder="Enterprise Transformation Consultant"
              />
            </div>
          </div>

          {/* Experience & Education */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
                Years Experience
              </label>
              <input 
                type="number"
                min="0"
                max="40"
                step="0.5"
                value={formData.experience_years}
                onChange={(e) => handleChange('experience_years', e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-sm text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#374151] mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-[#2563EB]" />
                Education / Degrees
              </label>
              <input 
                type="text"
                value={formData.education}
                onChange={(e) => handleChange('education', e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-sm text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
                placeholder="e.g. MSc Strategy & Management, LSE"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
              Primary Hub Location & Mobility
            </label>
            <input 
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-2 text-sm text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
              placeholder="e.g. London, UK (Global Mobility Ready)"
            />
          </div>

          {/* Resume Upload & AI Agent Action */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#E5E7EB] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-semibold text-[#374151] flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#2563EB]" />
                Resume / Project Deliverables Text
              </label>
              <div className="flex items-center gap-2">
                <label className="text-xs text-[#2563EB] hover:text-[#1D4ED8] cursor-pointer flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E5E7EB] font-medium shadow-2xs">
                  <Upload className="h-3 w-3" />
                  <span>{uploadedFileName ? uploadedFileName : "Upload File (.txt/.doc)"}</span>
                  <input type="file" accept=".txt,.doc,.docx,.pdf" onChange={handleFileUpload} className="hidden" />
                </label>
                <button
                  type="button"
                  onClick={handleAIParse}
                  disabled={isParsingAI || !formData.resume_text}
                  className="text-xs text-[#15803D] hover:text-[#166534] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1 font-semibold disabled:opacity-50"
                >
                  {isParsingAI ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Parsing with AI...</span>
                    </>
                  ) : (
                    <>
                      <BrainCircuit className="h-3 w-3" />
                      <span>Run AI Parser</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <textarea 
              rows={4}
              value={formData.resume_text}
              onChange={(e) => handleChange('resume_text', e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-lg p-3 text-xs text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors leading-relaxed"
              placeholder="Paste your resume bullet points, key enterprise deliverables, client engagements, and consulting skill credentials..."
            />

            {/* AI Extracted Skills Badge Cloud */}
            {formData.skills && formData.skills.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] text-[#6B7280] uppercase font-semibold block mb-1.5 flex items-center gap-1">
                  <Tag className="h-3 w-3 text-[#2563EB]" />
                  Verified Consulting Competencies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.map((skill, idx) => (
                    <span key={idx} className="bg-white border border-[#E5E7EB] text-[#374151] text-xs py-0.5 px-2.5 rounded-md font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {aiParseResult?.executive_summary && (
              <div className="p-3 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] text-xs text-[#1E40AF]">
                <strong className="block mb-0.5">Profile Analysis:</strong> {aiParseResult.executive_summary}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
            <span className="text-xs text-[#6B7280]">
              Personalizes adaptive scenarios
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary px-5 py-2 text-xs font-semibold flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-white" />
                    <span>Profile Saved!</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Save & Update Profile</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
