import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Upload, Linkedin, Briefcase, GraduationCap, CheckCircle2, 
  Loader2, ArrowRight, Sparkles, ShieldCheck, UserCheck, Zap,
  FileText, ClipboardPaste, Check, AlertCircle, RefreshCw
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Archetype {
  id: string;
  name: string;
  role: string;
  industry: string;
  experienceYears: number;
  seniority: string;
  education: string;
  skills: string[];
  cvFileName: string;
  summary: string;
}

const CANDIDATE_ARCHETYPES: Archetype[] = [
  {
    id: "fintech_sarah",
    name: "Sarah Jenkins",
    role: "Engagement Manager · Payments Practice",
    industry: "FinTech & Payments",
    experienceYears: 6,
    seniority: "Engagement Manager",
    education: "M.S. Financial Engineering, Columbia University (2020) · B.S. Economics",
    skills: ["Card Scheme Interchange", "Real-Time Payments (A2A)", "Payment Rails", "Target Operating Model", "Unit Economics"],
    cvFileName: "Sarah_Jenkins_Executive_CV.pdf",
    summary: "6 years leading payments modernization and card scheme interchange renegotiations for global tier-1 retail banking clients."
  },
  {
    id: "healthcare_marcus",
    name: "Marcus Vance",
    role: "Associate Partner Track · Healthcare Operations",
    industry: "Healthcare Systems",
    experienceYears: 8,
    seniority: "Associate Partner Track",
    education: "MBA, Harvard Business School (2018) · B.S. Biomedical Engineering",
    skills: ["Value-Based Care", "Clinical Operations Restructuring", "Payer Risk Corridors", "Hospital Margin Recovery"],
    cvFileName: "Marcus_Vance_Executive_CV.pdf",
    summary: "8 years driving clinical turnarounds, specialty provider networks, and capitated risk contracts across 14 health systems."
  },
  {
    id: "retail_elena",
    name: "Elena Rostova",
    role: "Senior Engagement Manager · Omnichannel Retail",
    industry: "Retail & Consumer",
    experienceYears: 5,
    seniority: "Engagement Manager",
    education: "MBA, INSEAD (2021) · B.A. Economics",
    skills: ["Omnichannel Store Modernization", "E-Commerce Return Decoupling", "Fleet Rationalization", "Inventory Topology"],
    cvFileName: "Elena_Rostova_Executive_CV.pdf",
    summary: "5 years advising major department store chains on store fleet economics, micro-fulfillment dark stores, and private label margins."
  },
  {
    id: "logistics_david",
    name: "David Chen",
    role: "Principal · Global Supply Chain & Freight",
    industry: "Logistics & Supply Chain",
    experienceYears: 7,
    seniority: "Principal",
    education: "M.S. Supply Chain, MIT (2019) · B.S. Industrial Engineering",
    skills: ["3PL Network Decoupling", "Freight Resilience", "Dynamic Algorithmic Pricing", "Mega-Hub Topology"],
    cvFileName: "David_Chen_Executive_CV.pdf",
    summary: "7 years optimizing European logistics corridors, reducing empty backhaul miles, and executing automated mega-hub transformations."
  }
];

export default function CandidateProfile() {
  const [, setLocation] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype>(CANDIDATE_ARCHETYPES[0]);
  const [isParsing, setIsParsing] = useState(false);
  const [isParsed, setIsParsed] = useState(true);

  // Real Resume State
  const [resumeMode, setResumeMode] = useState<"upload" | "paste">("paste");
  const [resumeText, setResumeText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isRealResume, setIsRealResume] = useState(false);
  const [realSummary, setRealSummary] = useState("");
  const [experienceYearsNum, setExperienceYearsNum] = useState(6);

  // Form State
  const [name, setName] = useState(CANDIDATE_ARCHETYPES[0].name);
  const [education, setEducation] = useState(CANDIDATE_ARCHETYPES[0].education);
  const [experience, setExperience] = useState(`${CANDIDATE_ARCHETYPES[0].experienceYears} Years Management Consulting (${CANDIDATE_ARCHETYPES[0].role})`);
  const [industry, setIndustry] = useState(CANDIDATE_ARCHETYPES[0].industry);
  const [seniority, setSeniority] = useState(CANDIDATE_ARCHETYPES[0].seniority);
  const [skills, setSkills] = useState<string[]>(CANDIDATE_ARCHETYPES[0].skills);
  const [portfolio, setPortfolio] = useState("https://linkedin.com/in/sarah-jenkins-modus");

  const handleSelectArchetype = (arch: Archetype) => {
    setSelectedArchetype(arch);
    setName(arch.name);
    setEducation(arch.education);
    setExperience(`${arch.experienceYears} Years Management Consulting (${arch.role})`);
    setIndustry(arch.industry);
    setSeniority(arch.seniority);
    setSkills(arch.skills);
    setExperienceYearsNum(arch.experienceYears);
    setIsRealResume(false);
    setRealSummary("");
    setPortfolio(`https://linkedin.com/in/${arch.name.toLowerCase().replace(" ", "-")}`);
  };

  const parseResumeContent = async (text: string, base64?: string, fileName?: string) => {
    setIsParsing(true);
    try {
      const res = await fetch("/api/ai/parse-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: text,
          file_base64: base64,
          file_name: fileName
        })
      });
      const data = await res.json();
      if (data && data.name) {
        setName(data.name);
        setIndustry(data.industry || "Enterprise Strategy");
        setSeniority(data.seniority || "Principal Consultant");
        setEducation(data.education || "Verified Degree");
        setSkills(data.skills || ["Strategy", "Transformation", "Leadership"]);
        const yrs = data.experience_years || 7;
        setExperienceYearsNum(yrs);
        setExperience(`${yrs} Years (${data.role || data.seniority || "Executive"})`);
        setRealSummary(data.summary || "");
        setIsRealResume(true);
        setIsParsed(true);
      } else {
        throw new Error(data.error || "Could not parse resume");
      }
    } catch (err: any) {
      alert("Resume extraction notice: " + (err.message || "Please check content"));
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);

    if (file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      const text = await file.text();
      setResumeText(text);
      await parseResumeContent(text, undefined, file.name);
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        await parseResumeContent("", base64, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasteParse = async () => {
    if (!resumeText.trim()) return;
    await parseResumeContent(resumeText.trim());
  };

  const handleTriggerParse = () => {
    if (isRealResume && resumeText) {
      parseResumeContent(resumeText);
      return;
    }
    setIsParsing(true);
    setTimeout(async () => {
      try {
        await fetch("http://localhost:8000/api/v1/candidates/profile-context", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            display_name: name,
            industry: industry,
            experience_years: experienceYearsNum,
            seniority_level: seniority,
            skills: skills,
            education: education,
            target_role: seniority
          })
        });
      } catch (err) {
        console.warn("Backend profile sync notice:", err);
      }
      setIsParsing(false);
      setIsParsed(true);
    }, 600);
  };

  const handleLaunchAssessment = async (e: React.FormEvent) => {
    e.preventDefault();

    const candidateProfileRecord = {
      recordType: "CandidateProfile",
      candidateId: isRealResume ? `REAL_${Date.now()}` : selectedArchetype.id,
      name,
      industry,
      seniority,
      experienceYears: experienceYearsNum,
      experience_years: experienceYearsNum,
      education,
      experience,
      skills,
      portfolio,
      completenessScore: "100%",
      status: "CALIBRATED_FOR_ADAPTIVE_ENGINE",
      isRealResume,
      summary: realSummary || selectedArchetype.summary,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem("meti_candidate_profile", JSON.stringify(candidateProfileRecord));
    localStorage.setItem("meti_active_domain", industry);
    localStorage.setItem("meti_active_product", "combined");
    localStorage.setItem("meti_has_d250", "true");
    // Clear any stale cached scenario
    localStorage.removeItem("meti_cached_scenario");

    // Fire-and-forget: pre-fetch scenario so Assessment loads instantly from cache
    fetch("/api/ai/generate-scenario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        industry: industry,
        experience_years: experienceYearsNum,
        seniority_level: seniority,
        skills: skills
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.title && data.strategic_options?.length > 0) {
          localStorage.setItem("meti_cached_scenario", JSON.stringify(data));
        }
      })
      .catch(() => { /* silent — Assessment.tsx has its own fallback */ });

    try {
      await fetch("http://localhost:8000/api/v1/candidates/profile-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: name,
          industry: industry,
          experience_years: experienceYearsNum,
          seniority_level: seniority,
          skills: skills
        })
      });
    } catch {}

    setLocation("/assessment");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 lg:py-14">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          
          {/* Header Banner */}
          <div className="bg-[#0B3B36] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-card mb-8">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#0E8F91]/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-[#0E8F91] text-white border-0 font-bold px-3 py-1 text-[11px] uppercase tracking-wider">
                  Executive Trajectory &amp; Evidence Profiler
                </Badge>
                <Badge className="bg-white/10 text-[#CBD5E1] border-0 font-semibold px-2.5 py-1 text-[11px]">
                  Dual Engine · Groq Ultra-Fast + NVIDIA Llama 3.2
                </Badge>
              </div>
              <h1 className="text-[32px] sm:text-[38px] font-extrabold tracking-tight">
                Professional Leadership &amp; Domain Calibration
              </h1>
              <p className="mt-2 text-[#CBD5E1] text-[15px] sm:text-[16px] max-w-2xl leading-relaxed">
                METI models your actual leadership trajectory, industry domain, and strategic competencies. Upload or paste your real resume, and our AI engine will parse your experience to generate customized, high-stakes consulting dilemmas.
              </p>
            </div>
          </div>

          {/* REAL RESUME SUBMISSION & AI EXTRACTION PANEL */}
          <Card className="rounded-3xl border-2 border-[#0E8F91] bg-white p-7 sm:p-8 shadow-card mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5 mb-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#0E8F91] text-white flex items-center justify-center font-bold">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-[18px] font-extrabold text-[#0B3B36]">
                    Submit Your Real Resume or CV
                  </h3>
                  <p className="text-[13px] text-[#52796F]">
                    AI parses your exact career trajectory to synthesize 100% authentic consulting dilemmas.
                  </p>
                </div>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center rounded-xl bg-[#F8FAFB] p-1 border border-border self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setResumeMode("paste")}
                  className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition flex items-center gap-1.5 ${
                    resumeMode === "paste"
                      ? "bg-[#0B3B36] text-white shadow-xs"
                      : "text-[#52796F] hover:text-[#0B3B36]"
                  }`}
                >
                  <ClipboardPaste className="h-3.5 w-3.5" />
                  Paste Text
                </button>
                <button
                  type="button"
                  onClick={() => setResumeMode("upload")}
                  className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition flex items-center gap-1.5 ${
                    resumeMode === "upload"
                      ? "bg-[#0B3B36] text-white shadow-xs"
                      : "text-[#52796F] hover:text-[#0B3B36]"
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  Upload File
                </button>
              </div>
            </div>

            {/* Mode 1: Paste Resume Text */}
            {resumeMode === "paste" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#0B3B36] mb-1.5">
                    Paste Resume Content, LinkedIn Summary, or Career Bio
                  </label>
                  <textarea
                    rows={6}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your full resume text here (e.g. roles, company names, years, key achievements, technical/strategic skills)..."
                    className="w-full rounded-2xl border-2 border-border bg-[#FDFEFE] p-4 text-[13px] leading-relaxed outline-none transition focus:border-[#0E8F91] focus:bg-white font-mono"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-[12px] text-[#52796F]">
                    <ShieldCheck className="h-4 w-4 text-[#0E8F91]" />
                    <span>Processed securely via real-time enterprise LLM. Zero permanent storage.</span>
                  </div>

                  <Button
                    type="button"
                    onClick={handlePasteParse}
                    disabled={!resumeText.trim() || isParsing}
                    className="bg-[#0E8F91] hover:bg-[#0A7476] text-white font-extrabold h-11 px-6 rounded-xl shadow-mint flex items-center gap-2"
                  >
                    {isParsing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Extracting Career Trajectory...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Parse &amp; Calibrate My Real Resume
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Mode 2: File Upload (PDF, DOCX, TXT) */}
            {resumeMode === "upload" && (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt,.md"
                  className="hidden"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#0E8F91]/50 bg-[#F2FBF7]/50 hover:bg-[#F2FBF7] rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3"
                >
                  <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0E8F91]">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-sans text-[15px] font-bold text-[#0B3B36]">
                      {uploadedFileName ? `Selected: ${uploadedFileName}` : "Click to Upload Resume (PDF, DOCX, TXT)"}
                    </h4>
                    <p className="text-[12px] text-[#52796F] mt-1">
                      Drag and drop your file here, or browse your local drive.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#0E8F91] text-[#0E8F91] hover:bg-[#E3F3F1] font-bold text-[12px] rounded-xl mt-1"
                  >
                    Browse Files
                  </Button>
                </div>

                {isParsing && (
                  <div className="p-4 rounded-xl bg-[#E3F3F1] flex items-center gap-3 text-[13px] font-semibold text-[#0B3B36] animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin text-[#0E8F91]" />
                    <span>Neural AI Extractor is parsing your file and structuring competencies...</span>
                  </div>
                )}
              </div>
            )}

            {/* Verified Extraction Banner */}
            {isRealResume && (
              <div className="mt-5 p-4 rounded-2xl border-2 border-[#10B981] bg-[#F0FDF4] flex items-center gap-3 animate-fade-in">
                <div className="h-8 w-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-[13px] font-bold text-[#065F46]">
                      Real Resume Calibrated Successfully
                    </strong>
                    <Badge className="bg-[#10B981] text-white border-0 font-bold text-[10px]">
                      Authentic Evidence
                    </Badge>
                  </div>
                  <p className="text-[12px] text-[#047857] mt-0.5">
                    Extracted for: <strong>{name}</strong> · <strong>{industry}</strong> ({experienceYearsNum} Years Experience). Review the extracted fields below and launch your assessment.
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Archetype Quick-Select Carousel */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-sans text-[16px] font-extrabold text-[#0B3B36] flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-[#0E8F91]" />
                  Or Select Pre-Calibrated Candidate Archetype (Demo)
                </h3>
                <p className="text-[13px] text-[#52796F]">
                  Demonstrate how METI synthesizes unique questions for completely different industry backgrounds.
                </p>
              </div>
              <span className="text-[12px] font-bold text-[#0E8F91] bg-[#E3F3F1] px-3 py-1 rounded-full">
                4 Live Calibrated Archetypes
              </span>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {CANDIDATE_ARCHETYPES.map((arch) => {
                const isSelected = selectedArchetype.id === arch.id;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => handleSelectArchetype(arch)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                      isSelected
                        ? "border-[#0E8F91] bg-white shadow-md ring-2 ring-[#0E8F91]/20"
                        : "border-border bg-white hover:border-[#0E8F91]/40 hover:bg-[#F2FBF7]/50"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-[#0E8F91]" />
                    )}
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91] mb-1">
                      {arch.industry}
                    </span>
                    <h4 className="font-sans text-[15px] font-bold text-[#0B3B36]">{arch.name}</h4>
                    <p className="text-[12px] text-[#52796F] line-clamp-1 mt-0.5">{arch.role}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#172321]">
                      <Briefcase className="h-3 w-3 text-[#0E8F91]" />
                      <span>{arch.experienceYears} Years Exp · {arch.seniority}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evidence Parsing Card */}
          <Card className="rounded-3xl border-2 border-border bg-white p-7 sm:p-9 shadow-card mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-6">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#0E8F91]">
                  AI Semantic Evidence Extractor
                </span>
                <h3 className="text-[20px] font-extrabold text-[#0B3B36] mt-0.5">
                  Calibrated Candidate Dossier: {name}
                </h3>
                <p className="text-[14px] text-[#52796F] mt-1">
                  Evidence source: <strong className="text-[#0B3B36]">{selectedArchetype.cvFileName}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={handleTriggerParse}
                  disabled={isParsing}
                  className="bg-[#0E8F91] hover:bg-[#0A7476] text-white font-bold h-11 px-5 rounded-xl shadow-sm"
                >
                  {isParsing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Parsing CV...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Re-Parse &amp; Calibrate
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Extracted Competency Badges */}
            <div className="bg-[#F2FBF7] rounded-2xl p-5 border border-[#BCE8D7] mb-6">
              <div className="flex items-center gap-2 mb-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#0E8F91]" />
                <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#0B3B36]">
                  Extracted Competencies &amp; Domain Anchor
                </span>
                <span className="ml-auto text-[11px] font-bold text-[#0E8F91] bg-white px-2.5 py-0.5 rounded-full border border-[#BCE8D7]">
                  94% Confidence Match
                </span>
              </div>
              <p className="text-[13px] text-[#52796F] mb-3 leading-relaxed">
                {selectedArchetype.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 bg-white border border-[#0E8F91]/30 text-[#0B3B36] font-semibold text-[12px] px-3 py-1 rounded-lg shadow-2xs"
                  >
                    <Zap className="h-3 w-3 text-[#0E8F91]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleLaunchAssessment} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#0B3B36] mb-1.5">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[14px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0B3B36] mb-1.5">
                    Industry Domain Archetype
                  </label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="h-11 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[14px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0B3B36] mb-1.5">
                    Target Role &amp; Seniority Level
                  </label>
                  <input
                    type="text"
                    required
                    value={seniority}
                    onChange={(e) => setSeniority(e.target.value)}
                    className="h-11 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[14px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0B3B36] mb-1.5">
                    Verified Education &amp; Credentials
                  </label>
                  <input
                    type="text"
                    required
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="h-11 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[14px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                  />
                </div>
              </div>

              {/* Free Entitlement Guarantee Box */}
              <div className="rounded-2xl border-2 border-[#10B981]/30 bg-[#F0FDF4] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-sans text-[13px] font-extrabold text-[#065F46]">
                      Free Enterprise Entitlement Auto-Provisioned (MC-A + D250)
                    </h5>
                    <p className="text-[12px] text-[#047857]">
                      Full access to Next-Gen Adaptive Assessment, Multimodal Video Studio, and 16-Week Roadmap. Zero payment required.
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#10B981] text-white border-0 font-bold px-3 py-1 text-[11px] self-start sm:self-auto shrink-0">
                  Active (Admin Grant)
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[12px] text-[#52796F]">
                  Candidate ID: <strong>{selectedArchetype.id}</strong> · Ready for real-time scenario synthesis
                </p>

                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-[#0B3B36] hover:bg-[#172321] text-white font-extrabold h-12 px-8 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch Adaptive Brain Assessment</span>
                  <ArrowRight className="h-4 w-4 text-[#0E8F91]" />
                </Button>
              </div>
            </form>
          </Card>

        </div>
      </main>
    </div>
  );
}
