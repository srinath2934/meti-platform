import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  Play, Pause, ArrowRight, ArrowLeft, CheckCircle2, 
  Save, Clock, AlertCircle, Maximize2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Entitlement-specific section configurations
const consultingSections = [
  { id: "c1", title: "Strategic Framing & Hypothesis Setup", type: "intro", duration: 10 },
  { id: "c2", title: "Market Sizing & Margin Decay", type: "question", qType: "single", timeLimit: 120 },
  { id: "c3", title: "Value Chain Diagnostics", type: "question", qType: "multi", timeLimit: 180 },
  { id: "c4", title: "Strategic Trade-offs & Capital Allocation", type: "question", qType: "rank", timeLimit: 150 },
];

const personalitySections = [
  { id: "p1", title: "Enterprise Talent DNA & Work Styles", type: "intro", duration: 10 },
  { id: "p2", title: "Schwartz Value Orientation", type: "question", qType: "rank", timeLimit: 150 },
  { id: "p3", title: "Decision-Making Under Ambiguity", type: "question", qType: "single", timeLimit: 120 },
  { id: "p4", title: "Leadership & Collaboration Preferences", type: "question", qType: "multi", timeLimit: 180 },
];

const combinedSections = [
  { id: "b1", title: "Combined Intelligence Overview", type: "intro", duration: 10 },
  { id: "b2", title: "Management Consulting: Margin Decay", type: "question", qType: "single", timeLimit: 120 },
  { id: "b3", title: "Management Consulting: Value Chain Diagnostics", type: "question", qType: "multi", timeLimit: 180 },
  { id: "b4", title: "Talent DNA: Schwartz Value Orientation", type: "question", qType: "rank", timeLimit: 150 },
  { id: "b5", title: "Talent DNA: Leadership & Decision Dynamics", type: "question", qType: "single", timeLimit: 120 },
];

export default function Assessment() {
  const [, setLocation] = useLocation();
  const [activeProduct, setActiveProduct] = useState<string>("combined");
  
  useEffect(() => {
    const saved = localStorage.getItem("meti_active_product");
    if (saved) setActiveProduct(saved);
  }, []);

  const sections = 
    activeProduct === "personality" ? personalitySections :
    activeProduct === "consulting" ? consultingSections :
    combinedSections;

  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const stepParam = new URLSearchParams(window.location.search).get("step");
      if (stepParam) {
        const parsed = parseInt(stepParam, 10);
        if (!isNaN(parsed) && parsed >= 0) return parsed;
      }
    }
    return 0;
  });
  const [timeLeft, setTimeLeft] = useState(120);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  
  const currentSection = sections[currentStepIndex] || sections[0];

  // Autosave and Timer simulation
  useEffect(() => {
    if (currentSection.type === "question" && currentSection.timeLimit) {
      setTimeLeft(currentSection.timeLimit);
    }
  }, [currentStepIndex, currentSection]);

  useEffect(() => {
    if (timeLeft > 0 && currentSection.type === "question") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentSection]);

  const handleNext = () => {
    setIsSaving(true);
    
    // Save assessment attempt record
    const attemptRecord = {
      recordType: "AssessmentAttempt",
      attemptId: `ATT-${Date.now().toString(36)}`,
      productEntitlement: activeProduct,
      currentStep: currentStepIndex + 1,
      totalSteps: sections.length,
      answersRecorded: answers,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("meti_assessment_attempt", JSON.stringify(attemptRecord));

    setTimeout(() => {
      setIsSaving(false);
      if (currentStepIndex < sections.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      } else {
        setLocation("/app"); // End of assessment
      }
    }, 600);
  };

  const handleSaveAndExit = () => {
    setIsSaving(true);
    setTimeout(() => {
      setLocation("/app");
    }, 600);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      {/* Assessment Top Bar */}
      <header className="h-16 bg-[#0B3B36] text-white px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="meti-mark" aria-hidden="true"><span /><span /></div>
          <div className="h-4 w-px bg-white/20" />
          <span className="font-bold text-[14px]">Executive Capability Diagnostic</span>
        </div>
        
        <div className="flex items-center gap-6">
          {isSaving ? (
            <span className="flex items-center gap-2 text-[12px] font-bold text-[#BCE8D7]">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BCE8D7] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#BCE8D7]"></span></span>
              Autosaving...
            </span>
          ) : (
            <span className="flex items-center gap-2 text-[12px] font-bold text-white/70">
              <Save className="h-4 w-4" /> Saved securely
            </span>
          )}

          <div className="h-4 w-px bg-white/20" />
          
          <button 
            onClick={() => setShowExitModal(true)}
            className="text-[13px] font-bold hover:text-[#0E8F91] transition"
          >
            Save &amp; Exit
          </button>
        </div>
      </header>

      {/* Stepper Navigation */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-center gap-2">
        {sections.map((sec, idx) => (
          <div key={sec.id} className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-12 rounded-full transition-all",
              idx < currentStepIndex ? "bg-[#0E8F91]" :
              idx === currentStepIndex ? "bg-[#0B3B36]" : "bg-border"
            )} />
          </div>
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center py-10 px-6">
        <div className="w-full max-w-4xl flex-1 flex flex-col">
          
          {/* Section Introduction / Video */}
          {currentSection.type === "intro" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in">
              <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 mb-6 font-bold uppercase tracking-widest px-3 py-1">
                Section 1 of 4
              </Badge>
              <h2 className="text-[36px] font-extrabold text-[#0B3B36] mb-4">{currentSection.title}</h2>
              <p className="text-[16px] text-[#52796F] max-w-lg mb-10 leading-relaxed">
                This module assesses your ability to frame complex enterprise problems and identify value-creation opportunities.
              </p>
              
              <div className="w-full max-w-2xl bg-black rounded-3xl aspect-video border-4 border-white shadow-deep relative flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-[#062320] flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-50 group-hover:scale-110 transition cursor-pointer" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/80 text-[12px] font-bold">
                  <span>Introduction Briefing</span>
                  <span>02:30</span>
                </div>
              </div>

              <Button onClick={handleNext} className="mt-12 h-14 px-8 bg-[#0E8F91] hover:bg-[#0A7476] text-white font-bold rounded-xl shadow-mint text-[16px]">
                Begin Module <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Interactive Question Module */}
          {currentSection.type === "question" && (
            <div className="flex-1 flex flex-col animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-[24px] font-extrabold text-[#0B3B36]">{currentSection.title}</h2>
                  <p className="text-[14px] font-bold text-[#52796F] mt-1 uppercase tracking-wider">
                    Question {currentStepIndex} of {sections.length - 1}
                  </p>
                </div>
                
                {/* Persistent Time Indicator */}
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-[15px] border-2 shadow-xs transition-colors",
                  timeLeft < 30 ? "bg-red-50 border-red-200 text-red-700 animate-pulse" : "bg-white border-border text-[#0B3B36]"
                )}>
                  <Clock className="h-5 w-5" />
                  {formatTime(timeLeft)}
                </div>
              </div>

              <Card className="flex-1 bg-white border-2 border-border shadow-card rounded-3xl p-8 lg:p-12 mb-8">
                
                {/* Single Select Question */}
                {currentSection.qType === "single" && (
                  <div className="space-y-6">
                    <p className="text-[18px] font-medium text-[#172321] leading-relaxed">
                      Your client faces a 15% margin contraction due to supply chain logistics. Which driver should you analyze first to validate the hypothesis?
                    </p>
                    <div className="space-y-3">
                      {["Supplier lead times", "Warehouse labor costs", "Last-mile delivery routing", "Inventory holding costs"].map((opt, i) => (
                        <label key={i} className="flex items-center gap-4 p-4 rounded-2xl border-2 border-border hover:border-[#0E8F91] cursor-pointer transition">
                          <input type="radio" name="q" className="h-5 w-5 accent-[#0E8F91]" />
                          <span className="font-bold text-[#0B3B36] text-[15px]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Multi Select Question */}
                {currentSection.qType === "multi" && (
                  <div className="space-y-6">
                    <p className="text-[18px] font-medium text-[#172321] leading-relaxed">
                      Select all potential risks when transitioning from a CapEx to OpEx technology model.
                    </p>
                    <div className="space-y-3">
                      {["Vendor lock-in", "Increased short-term cash flow", "Regulatory data sovereignty", "Hardware depreciation"].map((opt, i) => (
                        <label key={i} className="flex items-center gap-4 p-4 rounded-2xl border-2 border-border hover:border-[#0E8F91] cursor-pointer transition">
                          <input type="checkbox" className="h-5 w-5 rounded accent-[#0E8F91]" />
                          <span className="font-bold text-[#0B3B36] text-[15px]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rank Question with Keyboard Controls */}
                {currentSection.qType === "rank" && (
                  <div className="space-y-6">
                    <div className="bg-[#F8FAFB] border border-[#0E8F91]/30 p-4 rounded-xl flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-[#0E8F91] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[14px] font-bold text-[#0B3B36]">Ranking Interaction</strong>
                        <p className="text-[13px] text-[#52796F] mt-1">Use Tab to focus on an item, and Space/Enter to move it up or down. Accessible for screen readers.</p>
                      </div>
                    </div>
                    <p className="text-[18px] font-medium text-[#172321] leading-relaxed">
                      Prioritize the following post-merger integration workstreams by day-1 criticality.
                    </p>
                    <div className="space-y-3">
                      {["IT Systems Integration", "Cultural Alignment", "Financial Consolidation", "Brand Consolidation"].map((opt, i) => (
                        <button key={i} className="w-full text-left flex items-center justify-between p-4 rounded-2xl border-2 border-border focus:border-[#0E8F91] focus:ring-4 focus:ring-[#0E8F91]/20 transition bg-white group">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#E3F3F1] text-[#0E8F91] font-bold text-[14px]">
                              {i + 1}
                            </span>
                            <span className="font-bold text-[#0B3B36] text-[15px]">{opt}</span>
                          </div>
                          <div className="flex flex-col opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition">
                            <span className="text-[20px] text-[#52796F] hover:text-[#0E8F91] leading-none">▲</span>
                            <span className="text-[20px] text-[#52796F] hover:text-[#0E8F91] leading-none mt-1">▼</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Bottom Nav */}
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="font-bold text-[#52796F] hover:text-[#0B3B36]" onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleNext} className="h-14 px-8 bg-[#0B3B36] hover:bg-[#172321] text-white font-bold rounded-xl shadow-sm text-[16px]">
                  {currentStepIndex === sections.length - 1 ? "Submit Section" : "Confirm & Continue"} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Save & Exit Modal Flow */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B3B36]/80 backdrop-blur-sm p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-deep animate-in zoom-in-95 duration-200">
            <h2 className="text-[24px] font-extrabold text-[#0B3B36] mb-2">Save &amp; Exit?</h2>
            <p className="text-[15px] text-[#52796F] mb-8 leading-relaxed">
              Your progress up to this exact point has been securely saved. You can safely resume this module later from your candidate dashboard.
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={handleSaveAndExit} className="h-12 bg-[#0B3B36] text-white hover:bg-[#172321] font-bold rounded-xl w-full">
                Yes, Save and Exit Workspace
              </Button>
              <Button onClick={() => setShowExitModal(false)} variant="outline" className="h-12 border-2 border-border text-[#0B3B36] font-bold rounded-xl w-full">
                Cancel, Return to Assessment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
