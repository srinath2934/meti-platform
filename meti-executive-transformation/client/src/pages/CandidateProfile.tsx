import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Upload, Linkedin, Briefcase, GraduationCap, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function CandidateProfile() {
  const [, setLocation] = useLocation();
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initialParsed = params ? params.get("parsed") === "true" : false;

  const [isParsing, setIsParsing] = useState(false);
  const [isParsed, setIsParsed] = useState(initialParsed);
  
  // Profile Form State
  const [education, setEducation] = useState(initialParsed ? "MBA, INSEAD (2020) · B.S. Industrial Engineering" : "");
  const [experience, setExperience] = useState(initialParsed ? "5 Years Management & Strategy Consulting (ex-Tier 2 / Strategy Practice)" : "");
  const [industries, setIndustries] = useState(initialParsed ? "Logistics, Supply Chain, FinServ, Enterprise SaaS" : "");
  const [geography, setGeography] = useState(initialParsed ? "North America, Western Europe, APAC Hubs" : "");
  const [portfolio, setPortfolio] = useState(initialParsed ? "https://linkedin.com/in/alex-rivera" : "");

  const handleUploadResume = () => {
    setIsParsing(true);
    // Simulate 1.5 seconds of "AI Resume Parsing"
    setTimeout(() => {
      setEducation("MBA, INSEAD (2020) · B.S. Industrial Engineering");
      setExperience("5 Years Management & Strategy Consulting (ex-Tier 2 / Strategy Practice)");
      setIndustries("Logistics, Supply Chain, FinServ, Enterprise SaaS");
      setGeography("North America, Western Europe, APAC Hubs");
      setPortfolio("https://linkedin.com/in/alex-rivera");
      setIsParsing(false);
      setIsParsed(true);
    }, 1500);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save ProfileCompleteness and EvidenceArtifacts records
    const profileRecord = {
      recordType: "CandidateProfile",
      candidateId: "CAND-2026-ARIV",
      education,
      experience,
      industries,
      geography,
      portfolio,
      completenessScore: "100%",
      profileCompletenessRecord: {
        fieldsCompleted: 5,
        totalFields: 5,
        status: "VERIFIED_READY_FOR_ENTITLEMENT",
        timestamp: new Date().toISOString()
      },
      evidenceArtifacts: [
        {
          artifactId: "ART-CV-2026-001",
          type: "CURRICULUM_VITAE",
          filename: "Alex_Rivera_Executive_CV.pdf",
          fileSizeBytes: 284192,
          parsingConfidence: 0.94,
          extractedCompetencies: [
            "Operating Model Design",
            "P&L Restructuring",
            "Supply Chain Diagnostics",
            "Executive Stakeholder Alignment"
          ],
          verified: true,
          uploadedAt: new Date().toISOString()
        },
        {
          artifactId: "ART-LNK-2026-002",
          type: "PROFESSIONAL_PORTFOLIO",
          url: portfolio || "https://linkedin.com/in/alex-rivera",
          verified: true,
          linkedAt: new Date().toISOString()
        }
      ]
    };
    
    localStorage.setItem("meti_candidate_profile", JSON.stringify(profileRecord));
    setLocation("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col font-sans text-[#172321]">
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
          
          <div className="bg-[#0B3B36] p-8 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0E8F91] mb-4">
                Step 2 of 4 · Professional Evidence
              </span>
              <h1 className="text-[28px] font-extrabold tracking-tight">Professional Evidence Profile</h1>
              <p className="mt-2 text-[#CBD5E1] text-[15px] max-w-lg">
                Upload your resume or LinkedIn profile. Our intelligence engine will parse your experience to calibrate your assessment scenarios.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            {/* Upload Section */}
            <div className="mb-10 p-6 rounded-2xl border-2 border-dashed border-[#BCE8D7] bg-[#F2FBF7] text-center">
              {isParsing ? (
                <div className="flex flex-col items-center py-6 text-[#0B3B36]">
                  <Loader2 className="h-10 w-10 animate-spin text-[#0E8F91] mb-4" />
                  <h3 className="font-bold text-[16px]">Parsing Evidence Artifact...</h3>
                  <p className="text-[14px] text-[#52796F] mt-1">Extracting competencies and industry context</p>
                </div>
              ) : isParsed ? (
                <div className="flex flex-col items-center py-5 text-[#0B3B36] space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-8 w-8 text-[#0E8F91]" />
                    <h3 className="font-bold text-[18px]">Evidence Artifact Parsed Successfully</h3>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="bg-[#0E8F91] text-white px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                      94% Extraction Confidence
                    </span>
                    <span className="bg-white border border-[#0E8F91]/40 text-[#0B3B36] px-3 py-1 rounded-full text-[11px] font-bold">
                      Artifact: Alex_Rivera_Executive_CV.pdf (284 KB)
                    </span>
                    <span className="bg-[#E3F3F1] text-[#0E8F91] px-3 py-1 rounded-full text-[11px] font-bold">
                      Profile Completeness: 100%
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 max-w-xl">
                    <span className="text-[11px] font-bold uppercase text-[#52796F] mr-1">Calibrated Competencies:</span>
                    {["Operating Model Design", "P&L Restructuring", "Supply Chain Diagnostics", "Executive Alignment"].map(tag => (
                      <span key={tag} className="bg-white border border-border text-[#0B3B36] px-2.5 py-0.5 rounded-lg text-[11px] font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[13px] text-[#52796F]">Please review the extracted records below before confirming entitlement.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={handleUploadResume} className="bg-white border-2 border-[#0B3B36] text-[#0B3B36] hover:bg-[#F8FAFB] font-bold h-12 px-6 rounded-xl shadow-sm">
                      <Upload className="mr-2 h-5 w-5" /> Upload Resume (PDF)
                    </Button>
                    <Button onClick={handleUploadResume} className="bg-[#0077B5] text-white hover:bg-[#006097] font-bold h-12 px-6 rounded-xl shadow-sm border-0">
                      <Linkedin className="mr-2 h-5 w-5" /> Import LinkedIn
                    </Button>
                  </div>
                  <p className="text-[12px] text-[#52796F] font-medium">Supports PDF, DOCX, direct LinkedIn import, or Portfolio URL.</p>
                </div>
              )}
            </div>

            {/* Extracted Form Section */}
            <form onSubmit={handleContinue} className="space-y-6">
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-bold text-[14px] text-[#0B3B36] mb-2">
                    <GraduationCap className="h-4 w-4 text-[#0E8F91]" /> Education History
                  </label>
                  <input
                    type="text"
                    required
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    placeholder="e.g. MBA, INSEAD"
                    className="h-12 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[15px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 font-bold text-[14px] text-[#0B3B36] mb-2">
                    <Briefcase className="h-4 w-4 text-[#0E8F91]" /> Professional Experience
                  </label>
                  <input
                    type="text"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 5 Years Strategy Consulting"
                    className="h-12 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[15px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[14px] text-[#0B3B36] mb-2">Primary Industries</label>
                  <input
                    type="text"
                    required
                    value={industries}
                    onChange={(e) => setIndustries(e.target.value)}
                    placeholder="e.g. Tech, Financial Services"
                    className="h-12 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[15px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[14px] text-[#0B3B36] mb-2">Geography & Int. Exposure</label>
                  <input
                    type="text"
                    required
                    value={geography}
                    onChange={(e) => setGeography(e.target.value)}
                    placeholder="e.g. APAC, EMEA, North America"
                    className="h-12 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[15px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[14px] text-[#0B3B36] mb-2">Portfolio or LinkedIn URL</label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://"
                  className="h-12 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 text-[15px] outline-none transition focus:border-[#0E8F91] focus:bg-white"
                />
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-end">
                <Button 
                  type="submit" 
                  disabled={!isParsed && (!education || !experience)}
                  className="bg-[#0B3B36] hover:bg-[#172321] text-white font-bold h-12 px-8 rounded-xl transition-all"
                >
                  Confirm Profile & Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
            
          </div>
        </div>
      </main>
    </div>
  );
}
