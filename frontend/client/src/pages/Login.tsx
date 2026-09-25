import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  LockKeyhole, 
  Sparkles, 
  UserCheck, 
  ArrowLeft 
} from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [commsConsent, setCommsConsent] = useState(false);
  const [error, setError] = useState("");

  const handleDemoFill = () => {
    setFullName("Alex Rivera");
    setEmail("alex.rivera@enterprise-advisory.com");
    setRole("Senior Associate · Strategy & Transformation");
    setCountry("United States");
    setPrivacyConsent(true);
    setAiConsent(true);
    setCommsConsent(true);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent || !aiConsent) {
      setError("Mandatory Compliance: Please check both consent agreements below to enter the diagnostic environment.");
      return;
    }
    
    // Simulate timestamp recording and storing profile state
    const consentTimestamp = new Date().toISOString();
    localStorage.setItem("meti_candidate", JSON.stringify({
      fullName,
      email,
      role,
      country,
      consentTimestamp,
      consentVersion: "v1.0.4",
      privacyConsent,
      aiConsent,
      commsConsent
    }));

    setLocation("/profile"); // We'll create this route for Task 1.2
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="h-20 border-b border-border bg-white px-6 sm:px-12 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-3.5 transition hover:opacity-90">
          <div className="meti-mark" aria-hidden="true"><span /><span /></div>
          <div>
            <div className="font-sans text-[22px] font-extrabold tracking-[0.12em] text-[#0B3B36] leading-none">METI</div>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#52796F] mt-1">Capability intelligence</div>
          </div>
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 font-sans text-[14px] font-bold text-[#0B3B36] transition hover:text-[#0E8F91]">
          <ArrowLeft className="h-4 w-4" /> Return to landing overview
        </Link>
      </header>

      {/* Full-Bleed Executive Split Layout */}
      <div className="flex-1 grid lg:grid-cols-12 min-h-0">
        
        {/* Left Column: Dark Pine Full-Height Brand Panel */}
        <div className="lg:col-span-5 bg-[#0B3B36] p-8 sm:p-14 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-24 -top-24 h-88 w-88 rounded-full border border-white/10 shadow-[0_0_0_40px_rgba(255,255,255,.02)]" />
          
          <div className="relative">
            <div className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-[#0E8F91]">
              Executive Assessment Portal · S03
            </div>

            <h1 className="mt-6 font-sans text-[clamp(34px,3.5vw,46px)] font-extrabold leading-[1.18] tracking-[-0.025em] text-white">
              Evidence becomes insight.<br />Insight becomes capability.
            </h1>

            <p className="mt-5 font-sans text-[16px] leading-relaxed text-[#E2E8F0] max-w-lg">
              You are entering the METI enterprise diagnostic workspace. Every scenario and follow-up prompt is calibrated to your profile claims and reasoning signals.
            </p>

            <div className="mt-11 space-y-7">
              <div className="flex gap-4 items-start">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#0E8F91] shrink-0 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <strong className="block font-sans text-[16px] font-bold text-white">Context Before Evaluation</strong>
                  <p className="font-sans text-[14px] leading-relaxed text-[#CBD5E1] mt-1">Your resume claims shape the scenario prompts, ensuring high diagnostic relevance.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#0E8F91] shrink-0 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <strong className="block font-sans text-[16px] font-bold text-white">Adaptive Scenario Probing</strong>
                  <p className="font-sans text-[14px] leading-relaxed text-[#CBD5E1] mt-1">CasingLab-style follow-up challenges test dependency logic and trade-off articulation.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#0E8F91] shrink-0 mt-0.5">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <strong className="block font-sans text-[16px] font-bold text-white">16-Week Actionable Roadmap</strong>
                  <p className="font-sans text-[14px] leading-relaxed text-[#CBD5E1] mt-1">Personalized KNOLSKAPE growth sprints linking your score to certified client delivery.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-12 pt-6 border-t border-white/15 flex items-center gap-3 font-sans text-[13px] text-[#E2E8F0]">
            <ShieldCheck className="h-5 w-5 text-[#0E8F91] shrink-0" />
            <span>Certified under F01 enterprise data consent &amp; privacy standard</span>
          </div>
        </div>

        {/* Right Column: High-Visibility Spacious Form Panel */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-14 lg:p-16 flex flex-col justify-center">
          <div className="w-full max-w-2xl mx-auto">
            
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-sans text-[28px] font-extrabold tracking-tight text-[#0B3B36]">
                  {isRegister ? "Create candidate diagnostic profile" : "Sign in to your assessment"}
                </h2>
                <p className="mt-2 font-sans text-[15px] font-medium text-[#172321]">
                  {isRegister ? "Set up your credentials to initiate adaptive evaluation." : "Access your active diagnostic session, evidence logs, and scores."}
                </p>
              </div>
              <Badge className="rounded-full border-0 bg-[#E3F3F1] px-3.5 py-1.5 font-sans text-[12px] font-bold text-[#0E8F91] shrink-0">
                {isRegister ? "New Profile" : "Candidate Access"}
              </Badge>
            </div>

            {/* Fast Track Evaluator Button */}
            <div className="mt-7 rounded-2xl border-2 border-[#BCE8D7] bg-[#F2FBF7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 font-sans text-[14px] text-[#0B3B36]">
                <UserCheck className="h-5 w-5 text-[#0E8F91] shrink-0" />
                <span><strong className="font-bold">Evaluator Fast-Track:</strong> Load pre-configured candidate</span>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="rounded-xl bg-[#0E8F91] px-5 py-2.5 font-sans text-[13px] font-bold text-white hover:bg-[#0A7476] transition shadow-sm self-start sm:self-auto shrink-0"
              >
                Load Alex Rivera
              </button>
            </div>

            {/* Simulated SSO Block */}
            <div className="mt-6 flex gap-4">
              <button type="button" className="flex-1 h-12 flex items-center justify-center gap-2 border-2 border-border rounded-xl bg-[#F8FAFB] text-[#172321] font-bold text-[14px] hover:bg-white transition shadow-xs">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
              <button type="button" className="flex-1 h-12 flex items-center justify-center gap-2 border-2 border-border rounded-xl bg-[#F8FAFB] text-[#172321] font-bold text-[14px] hover:bg-white transition shadow-xs">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Continue with LinkedIn
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px bg-border flex-1"></div>
              <span className="text-[12px] font-bold text-[#52796F] uppercase tracking-widest">or use email</span>
              <div className="h-px bg-border flex-1"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {isRegister && (
                <>
                  <div>
                    <label className="block font-sans text-[14px] font-bold text-[#0B3B36]">Full name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="mt-2 h-14 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 font-sans text-[15px] text-[#172321] outline-none transition focus:border-[#0E8F91] focus:bg-white shadow-xs"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-sans text-[14px] font-bold text-[#0B3B36]">Country of residence</label>
                    <select
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-2 h-14 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 font-sans text-[15px] text-[#172321] outline-none transition focus:border-[#0E8F91] focus:bg-white shadow-xs appearance-none"
                    >
                      <option value="" disabled>Select a country</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Germany">Germany</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block font-sans text-[14px] font-bold text-[#0B3B36]">Corporate or academic email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@enterprise-advisory.com"
                  className="mt-2 h-14 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 font-sans text-[15px] text-[#172321] outline-none transition focus:border-[#0E8F91] focus:bg-white shadow-xs"
                />
              </div>

              <div>
                <label className="block font-sans text-[14px] font-bold text-[#0B3B36]">Current role &amp; track</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Associate · Strategy & Transformation"
                  className="mt-2 h-14 w-full rounded-xl border-2 border-border bg-[#FDFEFE] px-4 font-sans text-[15px] text-[#172321] outline-none transition focus:border-[#0E8F91] focus:bg-white shadow-xs"
                />
              </div>

              {/* F01 MANDATORY COMPLIANCE & DUAL CONSENT MODULE (HIGH CONTRAST & VISIBILITY) */}
              <div className="mt-8 rounded-2xl border-2 border-[#BCE8D7] bg-[#F2FBF7] p-6 space-y-5">
                <div className="flex items-center gap-2.5 font-sans text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#0B3B36]">
                  <LockKeyhole className="h-4 w-4 text-[#0E8F91]" /> F01 Mandatory Compliance &amp; Consent
                </div>

                <label className="flex items-start gap-3.5 font-sans text-[14px] text-[#172321] cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 accent-[#0E8F91] h-5 w-5 shrink-0 rounded cursor-pointer"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                  />
                  <span className="leading-relaxed">
                    <strong className="text-[#0B3B36] font-bold">Legal privacy &amp; evidence storage consent:</strong> I understand and agree to how my profile context, CV evidence, and scenario responses are stored and evaluated under METI's privacy framework.
                  </span>
                </label>

                <label className="flex items-start gap-3.5 font-sans text-[14px] text-[#172321] cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 accent-[#0E8F91] h-5 w-5 shrink-0 rounded cursor-pointer"
                    checked={aiConsent}
                    onChange={(e) => setAiConsent(e.target.checked)}
                  />
                  <span className="leading-relaxed">
                    <strong className="text-[#0B3B36] font-bold">AI-assisted diagnostic scoring consent:</strong> I consent to AI-assisted diagnostic evaluation with mandatory human review safeguards for all high-stakes assessments.
                  </span>
                </label>

                <label className="flex items-start gap-3.5 font-sans text-[14px] text-[#172321] cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 accent-[#0E8F91] h-5 w-5 shrink-0 rounded cursor-pointer"
                    checked={commsConsent}
                    onChange={(e) => setCommsConsent(e.target.checked)}
                  />
                  <span className="leading-relaxed">
                    <strong className="text-[#0B3B36] font-bold">Communications preference:</strong> I wish to receive actionable updates on my application status and career growth recommendations from METI. (Optional)
                  </span>
                </label>
                
                <div className="text-[11px] font-mono text-[#52796F] border-t border-[#BCE8D7] pt-3 mt-4">
                  Audit Tracking ID: METI-CNS-1044 // Consent Policy v1.0.4
                </div>
              </div>

              {error && (
                <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 font-sans text-[14px] font-bold text-red-700">
                  {error}
                </div>
              )}

              <div className="pt-3">
                <Button
                  type="submit"
                  className="w-full bg-[#0E8F91] font-sans text-[16px] font-bold text-white hover:bg-[#0A7476] rounded-xl h-14 shadow-mint transition-all duration-200"
                >
                  Enter assessment workspace <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between font-sans text-[14px]">
              <button
                type="button"
                onClick={() => { setIsRegister(!isRegister); setError(""); }}
                className="font-bold text-[#0E8F91] hover:underline"
              >
                {isRegister ? "Already registered? Sign in here" : "Need a new profile? Register here"}
              </button>
              <span className="text-[#52796F] font-semibold">Version 1.0 · Calibrated</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
