import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';
import { storageAdapter } from '../../services/supabaseClient';

export default function AssessmentRunner({ onComplete, onExit }) {
  // Step 0 = Screen 02 (Experience Question)
  // Step 1 = Screen 03 (Adaptive Follow-up - Proving the brain)
  // Step 2 = Screen 04 (Commercial / Executive Stakeholder Dilemma)
  const [step, setStep] = useState(0);

  // Screen 02 response state
  const [experienceText, setExperienceText] = useState(
    "In our automated fulfillment center project, the primary challenge was frame drop and GPU memory thrashing during peak conveyor belt speeds. We had 40 concurrent 4K camera streams overwhelmed by packet collisions. I redesigned the ingestion layer using Redis streaming buffer queues and reduced inference latency from 3.8s down to 240ms with INT8 TensorRT quantization."
  );

  // Screen 03 response state
  const [selectedTradeoff, setSelectedTradeoff] = useState("opt_keyframe");
  const [confidence, setConfidence] = useState("Confident");

  // Screen 04 response state
  const [selectedStakeholderOption, setSelectedStakeholderOption] = useState("opt_tier");

  const [saveStatus, setSaveStatus] = useState('Saved ✓');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // UX Signals Tracking
  const firstInteractionRef = useRef(null);
  const changeCountRef = useRef(0);
  const stepStartTimeRef = useRef(Date.now());

  useEffect(() => {
    stepStartTimeRef.current = Date.now();
    firstInteractionRef.current = null;
    changeCountRef.current = 0;
  }, [step]);

  const handleTextChange = (e) => {
    if (!firstInteractionRef.current) firstInteractionRef.current = Date.now();
    setExperienceText(e.target.value);
    setSaveStatus('Saving...');
    setTimeout(() => setSaveStatus('Saved ✓'), 300);
  };

  const handleOptionChange = (val, setter) => {
    if (!firstInteractionRef.current) firstInteractionRef.current = Date.now();
    changeCountRef.current += 1;
    setter(val);
    setSaveStatus('Saving...');
    setTimeout(() => setSaveStatus('Saved ✓'), 300);
  };

  const handleContinue = () => {
    const elapsed = Date.now() - stepStartTimeRef.current;
    
    // Background save to local/backend
    storageAdapter.saveResponse('adaptive_attempt', `step_${step}`, {
      step,
      elapsed_ms: elapsed,
      experience_text: step === 0 ? experienceText : undefined,
      tradeoff: step === 1 ? selectedTradeoff : undefined,
      confidence: step === 1 ? confidence : undefined,
      stakeholder: step === 2 ? selectedStakeholderOption : undefined
    });

    if (step < 2) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(prev => prev + 1);
        setIsTransitioning(false);
      }, 350);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-[85vh] bg-white text-[#171717] flex flex-col justify-between py-10 px-6 sm:px-12 lg:px-20 max-w-4xl mx-auto animate-fade-in">
      
      {/* Top Header Rail: Minimal, Clean, Task-Oriented */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-4">
          <span className="font-extrabold text-xl tracking-tight text-[#171717]">
            METI
          </span>
          <span className="h-4 w-px bg-[#E5E7EB]"></span>
          <span className="text-xs font-medium text-[#667085]">
            Assessment
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#15803D] font-semibold flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5" />
            <span>{saveStatus}</span>
          </span>
          <button
            onClick={onExit}
            className="text-[#667085] hover:text-[#171717] font-medium transition-colors"
          >
            Save & Exit
          </button>
        </div>
      </div>

      {/* Main Adaptive Question Area */}
      <div className={`py-10 sm:py-14 space-y-10 transition-opacity duration-200 ${isTransitioning ? 'opacity-40' : 'opacity-100'}`}>
        
        {/* ========================================================
            SCREEN 02: EXPERIENCE-SPECIFIC QUESTION (Step 0)
            "You actually read my background."
           ======================================================== */}
        {step === 0 && (
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                LET'S START WITH YOUR EXPERIENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] leading-tight">
                You mentioned working with computer vision and video analytics.
              </h2>
              <p className="text-base text-[#667085] leading-relaxed">
                We'd like to understand how you approached one of those projects.
              </p>
            </div>

            {/* Prompt Box */}
            <div className="border border-[#E5E7EB] rounded-xl p-6 sm:p-7 bg-white space-y-4">
              <label className="text-sm font-bold text-[#171717] block leading-snug">
                Tell us about the most difficult problem you faced while building that system.
              </label>

              <textarea
                value={experienceText}
                onChange={handleTextChange}
                rows={6}
                placeholder="Start typing..."
                className="w-full p-4 border border-[#E5E7EB] rounded-lg text-sm text-[#171717] leading-relaxed focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] resize-y"
              />

              <div className="flex items-center justify-between text-xs text-[#667085] pt-1">
                <span>Provide context on technical constraints, decisions, and outcomes.</span>
                <span>{experienceText.length} characters</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 03: ADAPTIVE FOLLOW-UP (Step 1)
            "You understood my answer & prove the brain."
           ======================================================== */}
        {step === 1 && (
          <div className="space-y-8 max-w-2xl animate-fade-in">
            {/* Visual Adaptive Transition Signal */}
            <div className="p-4 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] text-xs text-[#1E40AF] leading-relaxed">
              <p className="font-semibold text-[#1E3A8A] mb-1">
                Capability Signal Observed
              </p>
              "Your response gives us a better understanding of your technical approach. Let's explore how you handled the business and operational impact of that decision."
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                ARCHITECTURAL & BUSINESS TRADE-OFF
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] leading-snug">
                When scaling this video pipeline to 50 concurrent warehouse streams, GPU memory utilization peaked at 98%, causing frame latency to exceed SLA thresholds.
              </h2>
              <p className="text-sm text-[#667085]">
                Which operational trade-off would you prioritize to stabilize throughput?
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3" role="radiogroup" aria-label="Trade-off options">
              {[
                { id: "opt_batch", label: "Downscale input resolution from 1080p to 720p with dynamic batching", tradeOff: "Minor 2% reduction in small-item barcode detection" },
                { id: "opt_keyframe", label: "Switch from full-frame inference to motion-triggered keyframe detection", tradeOff: "Optimal throughput with 40% compute saving; requires threshold tuning" },
                { id: "opt_scale", label: "Provision dedicated multi-GPU cloud instances with auto-scaling", tradeOff: "Immediate SLA stabilization but surges monthly cloud spend by 3.5x" },
                { id: "opt_quant", label: "Quantize model weights from FP32 to INT8 with TensorRT", tradeOff: "Fastest runtime speedup with minimal 0.8% mAP degradation" }
              ].map((opt) => {
                const isSelected = selectedTradeoff === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleOptionChange(opt.id, setSelectedTradeoff)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-[#2563EB] bg-[#EFF6FF] text-[#171717] font-medium'
                        : 'border-[#E5E7EB] bg-white text-[#171717] hover:bg-slate-50/70'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#CBD5E1]'
                    }`}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white"></span>}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#171717]">{opt.label}</p>
                      <p className="text-xs text-[#667085] mt-0.5">Impact: {opt.tradeOff}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Confidence Calibration */}
            <div className="pt-4 border-t border-[#E5E7EB] space-y-2">
              <label className="text-xs font-semibold text-[#171717] block">
                How confident are you in this decision?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Not confident', 'Somewhat confident', 'Confident', 'Very confident'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setConfidence(lvl)}
                    className={`py-2 px-3 text-xs rounded-lg border text-center transition-all ${
                      confidence === lvl
                        ? 'bg-[#171717] text-white border-[#171717] font-semibold'
                        : 'bg-white text-[#667085] border-[#E5E7EB] hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            SCREEN 04: EXECUTIVE STAKEHOLDER ALIGNMENT (Step 2)
           ======================================================== */}
        {step === 2 && (
          <div className="space-y-8 max-w-2xl animate-fade-in">
            {/* Visual Adaptive Transition Signal */}
            <div className="p-4 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] text-xs text-[#1E40AF] leading-relaxed">
              <p className="font-semibold text-[#1E3A8A] mb-1">
                Capability Signal Observed
              </p>
              "You demonstrated structured technical optimization and trade-off awareness. Finally, let's explore how you navigate executive stakeholder friction when constraints emerge."
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
                COMMERCIAL & EXECUTIVE ALIGNMENT
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] leading-snug">
                The CFO demands an immediate 30% reduction in AI infrastructure expenditure by end of quarter, while Operations refuses any SLA latency regression.
              </h2>
              <p className="text-sm text-[#667085]">
                What is your alignment protocol?
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: "opt_tier", label: "Present a tiered camera criticality matrix (critical gates vs background storage) with tailored inference frequencies to achieve the 30% cut without operational impact" },
                { id: "opt_unilateral", label: "Immediately throttle cloud instances across all cameras to meet the CFO mandate and issue contingency notices to operations" },
                { id: "opt_escalate", label: "Escalate the dispute directly to the Executive Committee with an unaligned conflict memo" },
                { id: "opt_split", label: "Compromise by phasing in a 15% budget cut this quarter and deferring the rest to next fiscal year" }
              ].map((opt) => {
                const isSelected = selectedStakeholderOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleOptionChange(opt.id, setSelectedStakeholderOption)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-[#2563EB] bg-[#EFF6FF] text-[#171717] font-medium'
                        : 'border-[#E5E7EB] bg-white text-[#171717] hover:bg-slate-50/70'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-[#CBD5E1]'
                    }`}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white"></span>}
                    </div>
                    <span className="leading-relaxed">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="pt-4 max-w-2xl">
          <button
            onClick={handleContinue}
            disabled={step === 0 ? !experienceText.trim() : false}
            className="btn-primary text-sm px-7 py-3 font-semibold rounded-lg flex items-center gap-2.5 shadow-xs hover:bg-[#1D4ED8]"
          >
            <span>{step === 2 ? 'Proceed to Video Pitch' : 'Continue'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Discreet Footer Note */}
      <div className="pt-6 border-t border-[#E5E7EB] text-xs text-[#667085] flex items-center justify-between">
        <span>METI Adaptive Sequence • No static question database</span>
        <span>Screen 0{step + 2} of 04</span>
      </div>

    </div>
  );
}
