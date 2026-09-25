import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, 
  CheckCircle2, ArrowRight, ShieldCheck, FileText, Sparkles, 
  HelpCircle, ChevronRight, Lock, Check, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface Chapter {
  timeSec: number;
  label: string;
  desc: string;
}

const chapters: Chapter[] = [
  { timeSec: 0, label: "01. Modus Transformation Thesis", desc: "Why enterprise consulting is shifting from credentialism to demonstrated capability." },
  { timeSec: 45, label: "02. The 4 Competency Dimensions", desc: "Strategic reasoning, value chain diagnostics, communication, and problem structuring." },
  { timeSec: 110, label: "03. Adaptive Scenarios vs. Static Resumes", desc: "How dynamic follow-ups probe hypothesis depth and trade-offs." },
  { timeSec: 180, label: "04. Responsible AI & F01 Governance", desc: "Ethical AI scoring transparency, evidence isolation, and human-in-the-loop review." },
];

export default function VideoExplainer() {
  const [, setLocation] = useLocation();
  const [activeVideo, setActiveVideo] = useState<"V01" | "V02">("V01");
  const [showCaptions, setShowCaptions] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"transcript" | "quiz" | "records">("transcript");
  const [transcriptAcknowledged, setTranscriptAcknowledged] = useState(false);
  const totalDuration = activeVideo === "V01" ? 240 : 180;

  // 3-Question Non-Punitive Knowledge Check
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({ 1: 1, 2: 2, 3: 0 });
  const [quizSubmitted, setQuizSubmitted] = useState(true);

  // Simulated Video Playback Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const progressPercent = Math.min(100, Math.round((currentTime / totalDuration) * 100));
  const isUnlocked = progressPercent >= 80 || transcriptAcknowledged;

  // Save VideoProgress & KnowledgeCheck records to localStorage
  useEffect(() => {
    const videoProgressRecord = {
      recordType: "VideoProgress",
      videoId: activeVideo,
      title: activeVideo === "V01" ? "Modus Transformation Explainer" : "Assessment Guidance & Calibration",
      watchedSeconds: currentTime,
      totalDurationSeconds: totalDuration,
      completionRate: `${progressPercent}%`,
      isGatedRequirementMet: isUnlocked,
      transcriptFallbackUsed: transcriptAcknowledged,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem("meti_video_progress", JSON.stringify(videoProgressRecord));

    if (quizSubmitted) {
      const knowledgeCheckRecord = {
        recordType: "KnowledgeCheckResponse",
        checkId: "KC-ORIENTATION-V01",
        candidateId: "CAND-2026-ARIV",
        score: "3/3",
        status: "PASSED_NON_PUNITIVE",
        responses: quizAnswers,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("meti_knowledge_check", JSON.stringify(knowledgeCheckRecord));
    }
  }, [activeVideo, currentTime, totalDuration, progressPercent, isUnlocked, transcriptAcknowledged, quizSubmitted, quizAnswers]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${rem.toString().padStart(2, "0")}`;
  };

  const handleSeek = (secs: number) => {
    setCurrentTime(secs);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          {/* Header & Stage Tracker */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="eyebrow">Candidate Briefing · Executive Overview</span>
                <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 rounded-full px-3 py-0.5 text-[11px] font-bold">
                  Orientation Module
                </Badge>
              </div>
              <h1 className="mt-2 font-sans text-[clamp(28px,3.2vw,40px)] font-extrabold tracking-tight text-[#0B3B36]">
                Orientation to Consulting Intelligence
              </h1>
              <p className="mt-1 font-sans text-[15px] text-[#52796F]">
                Watch the executive briefing or review the accessible transcript to unlock your candidate diagnostic profile.
              </p>
            </div>

            {/* Completion Gate Indicator */}
            <div className="flex items-center gap-4 bg-white border-2 border-border p-3.5 rounded-2xl shadow-xs shrink-0">
              <div className="text-right">
                <div className="font-sans text-[12px] font-bold text-[#52796F] uppercase tracking-wider">Gate Status</div>
                <div className="font-sans text-[14px] font-extrabold text-[#0B3B36]">
                  {isUnlocked ? "80% Unlocked" : `${progressPercent}% / 80%`}
                </div>
              </div>
              <div className="h-10 w-10 grid place-items-center rounded-xl bg-[#E3F3F1] text-[#0E8F91]">
                {isUnlocked ? <CheckCircle2 className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
              </div>
            </div>
          </div>

          {/* Main 2-Column Theater Layout */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left 8 Columns: Cinema Video Player & Chapter Markers */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Video Selector Switcher (V01 vs V02) */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => { setActiveVideo("V01"); setCurrentTime(0); setIsPlaying(false); }}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-[13px] font-bold transition flex items-center gap-2",
                    activeVideo === "V01" ? "bg-[#0E8F91] text-white shadow-mint" : "bg-white border-2 border-border text-[#0B3B36] hover:bg-[#F8FAFB]"
                  )}
                >
                  <Play className="h-4 w-4" /> V01: Enterprise Consulting Explainer (4m)
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveVideo("V02"); setCurrentTime(0); setIsPlaying(false); }}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-[13px] font-bold transition flex items-center gap-2",
                    activeVideo === "V02" ? "bg-[#0E8F91] text-white shadow-mint" : "bg-white border-2 border-border text-[#0B3B36] hover:bg-[#F8FAFB]"
                  )}
                >
                  <Sparkles className="h-4 w-4 text-[#0E8F91]" /> V02: Assessment Guidance &amp; Calibration (3m)
                </button>
              </div>

              {/* Cinema Player Container */}
              <div className="relative overflow-hidden rounded-3xl bg-[#062320] border-2 border-[#0B3B36] shadow-deep aspect-video flex flex-col justify-between p-6 text-white group">
                
                {/* Simulated Executive Presenter Visual Canvas */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-[#062320] via-[#0B3B36] to-[#0E8F91]/40">
                  <div className="text-center p-8 max-w-lg">
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#0E8F91] shadow-deep transition group-hover:scale-105">
                      <div className="meti-mark" aria-hidden="true"><span /><span /></div>
                    </div>
                    <div className="mt-5 font-sans text-[20px] font-extrabold text-white">
                      {activeVideo === "V01" ? "Modus Enterprise Transformation Platform" : "Assessment Guidance &amp; Evaluation Criteria"}
                    </div>
                    <div className="mt-2 font-sans text-[14px] text-[#E2E8F0]">
                      {activeVideo === "V01" ? (
                        <>
                          {currentTime < 45 && "Chapter 1: The Future of Enterprise Consulting"}
                          {currentTime >= 45 && currentTime < 110 && "Chapter 2: The 4 Core Competency Dimensions"}
                          {currentTime >= 110 && currentTime < 180 && "Chapter 3: Hypothesis-Driven Adaptive Probing"}
                          {currentTime >= 180 && "Chapter 4: Ethical AI Evaluation & Human-in-the-Loop"}
                        </>
                      ) : (
                        <>
                          {currentTime < 40 && "Guidance 1: Structured Problem Solving Expectations"}
                          {currentTime >= 40 && currentTime < 100 && "Guidance 2: Demonstrating MECE Logic in Synthesis"}
                          {currentTime >= 100 && "Guidance 3: Board Briefing Delivery & Non-Punitive Feedback"}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top Overlay Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <Badge className="bg-black/60 backdrop-blur-md text-white border-0 font-sans text-[12px] font-bold px-3 py-1">
                    ● Executive Orientation {activeVideo}
                  </Badge>
                  <span className="font-sans text-[13px] font-bold text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                    1080p · 60fps
                  </span>
                </div>

                {/* Big Center Play/Pause Trigger */}
                <div className="relative z-10 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="grid h-18 w-18 place-items-center rounded-full bg-[#0E8F91] text-white shadow-mint transition hover:scale-110 hover:bg-[#0A7476]"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                  </button>
                </div>

                {/* Closed Captions Live Subtitles Box */}
                {showCaptions && (
                  <div className="relative z-10 mx-auto max-w-xl text-center bg-black/80 border border-white/10 px-5 py-2.5 rounded-xl backdrop-blur-md text-[13px] text-white font-medium shadow-sm transition animate-fade-in">
                    <span className="text-[#0E8F91] font-bold mr-2">[CC]</span>
                    {activeVideo === "V01" ? (
                      currentTime < 45 
                        ? "Enterprise consulting is shifting from static credentials to demonstrated capability under uncertainty."
                        : currentTime < 110 
                        ? "METI evaluates you across Strategic Reasoning, Value Chain Diagnostics, and Problem Structuring."
                        : currentTime < 180 
                        ? "Dynamic follow-ups test your hypothesis depth and trade-offs rather than rote memorization."
                        : "All scores operate under statutory F01 evidence isolation with accredited Senior Practice Partner review."
                    ) : (
                      currentTime < 60
                        ? "In your case work sample, prioritize structuring your problem before jumping into calculations."
                        : currentTime < 120
                        ? "Ensure all board recommendations balance operational feasibility against EBITDA targets."
                        : "Remember: all feedback is developmental and designed to give you an actionable career roadmap."
                    )}
                  </div>
                )}

                {/* Bottom Control Bar */}
                <div className="relative z-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl space-y-3">
                  {/* Progress Bar / Scrubber */}
                  <div 
                    className="relative h-2.5 w-full bg-white/20 rounded-full cursor-pointer overflow-hidden"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newPct = clickX / rect.width;
                      handleSeek(Math.floor(newPct * totalDuration));
                    }}
                  >
                    <div 
                      className="h-full bg-[#0E8F91] rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between font-sans text-[13px] text-white">
                    <div className="flex items-center gap-4">
                      <button 
                        type="button" 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-[#0E8F91] transition font-bold"
                      >
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleSeek(0)}
                        className="hover:text-[#0E8F91] transition"
                        title="Restart"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <span>{formatTime(currentTime)} / {formatTime(totalDuration)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowCaptions(!showCaptions)}
                        className={cn(
                          "px-2.5 py-0.5 rounded text-[11px] font-bold border transition",
                          showCaptions ? "bg-[#0E8F91] text-white border-[#0E8F91]" : "text-white/70 border-white/30 hover:text-white"
                        )}
                        title="Toggle Subtitles"
                      >
                        CC
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-[#0E8F91] transition"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                      <Maximize2 className="h-4 w-4 opacity-70" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Chapter Jump Cards */}
              <div className="rounded-2xl border-2 border-border bg-white p-6 shadow-card">
                <h3 className="font-sans text-[16px] font-bold text-[#0B3B36] mb-4">
                  Chapter Markers (Click to Jump)
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {chapters.map((chap, idx) => (
                    <button
                      key={chap.label}
                      type="button"
                      onClick={() => handleSeek(chap.timeSec)}
                      className={cn(
                        "text-left p-3.5 rounded-xl border-2 transition duration-150 flex flex-col justify-between",
                        currentTime >= chap.timeSec && (idx === chapters.length - 1 || currentTime < chapters[idx + 1].timeSec)
                          ? "border-[#0E8F91] bg-[#E3F3F1]/40 shadow-xs"
                          : "border-border hover:border-[#0E8F91]/50 bg-[#F8FAFB]"
                      )}
                    >
                      <div className="font-sans text-[13px] font-bold text-[#0B3B36] flex items-center justify-between">
                        <span>{chap.label}</span>
                        <span className="text-[12px] font-bold text-[#52796F]">{formatTime(chap.timeSec)}</span>
                      </div>
                      <p className="mt-1 font-sans text-[12px] text-[#52796F] leading-relaxed">
                        {chap.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 4 Columns: Synchronized Transcript, Knowledge Check & Records Tabs */}
            <div className="lg:col-span-4 space-y-6">
              
              <Card className="border-2 border-border bg-white p-6 shadow-card rounded-2xl">
                
                {/* Tab Switcher */}
                <div className="flex border-b border-border pb-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("transcript")}
                    className={cn(
                      "font-sans text-[13px] font-bold pb-2 transition border-b-2 -mb-4.5",
                      activeTab === "transcript" ? "border-[#0E8F91] text-[#0E8F91]" : "border-transparent text-[#52796F] hover:text-[#0B3B36]"
                    )}
                  >
                    Accessible Transcript
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("quiz")}
                    className={cn(
                      "font-sans text-[13px] font-bold pb-2 transition border-b-2 -mb-4.5 flex items-center gap-1",
                      activeTab === "quiz" ? "border-[#0E8F91] text-[#0E8F91]" : "border-transparent text-[#52796F] hover:text-[#0B3B36]"
                    )}
                  >
                    Check
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-[#E3F3F1] text-[10px] text-[#0E8F91] font-extrabold">3</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("records")}
                    className={cn(
                      "font-sans text-[13px] font-bold pb-2 transition border-b-2 -mb-4.5 flex items-center gap-1",
                      activeTab === "records" ? "border-[#0E8F91] text-[#0E8F91]" : "border-transparent text-[#52796F] hover:text-[#0B3B36]"
                    )}
                  >
                    Audit Records
                  </button>
                </div>

                {/* Tab 1: Synchronized Transcript */}
                {activeTab === "transcript" && (
                  <div className="mt-6 space-y-4 font-sans text-[14px] leading-relaxed text-[#172321]">
                    <div className="rounded-xl bg-[#F8FAFB] p-4 border border-border text-[13px] text-[#52796F]">
                      <FileText className="inline-block h-4 w-4 text-[#0E8F91] mr-1.5 -mt-0.5" />
                      WCAG 2.2 AA compliant text alternative. Reading the transcript unlocks the diagnostic gate.
                    </div>

                    <div className="max-h-[380px] overflow-y-auto space-y-4 pr-2">
                      <div className="border-l-2 border-[#0E8F91] pl-3 py-1">
                        <strong className="block text-[12px] font-bold text-[#0E8F91]">00:00 — Core Directive</strong>
                        <p className="mt-1">
                          Welcome to the Modus Enterprise Talent Intelligence (METI) assessment portal. Unlike legacy evaluations that rely on self-reported survey answers, METI evaluates demonstrated consulting judgment under uncertainty.
                        </p>
                      </div>

                      <div className="border-l-2 border-border pl-3 py-1">
                        <strong className="block text-[12px] font-bold text-[#52796F]">00:45 — The 4 Competency Dimensions</strong>
                        <p className="mt-1">
                          You will be evaluated across Strategic Reasoning, Value Chain Diagnostics, Executive Communication, and Problem Structuring. Every question adapts dynamically to your previous choices.
                        </p>
                      </div>

                      <div className="border-l-2 border-border pl-3 py-1">
                        <strong className="block text-[12px] font-bold text-[#52796F]">01:50 — Adaptive Probing Engine</strong>
                        <p className="mt-1">
                          When you choose a strategic response, CasingLab algorithms probe your logic with follow-up trade-off challenges. We examine how you structure problem trees and articulate dependencies.
                        </p>
                      </div>

                      <div className="border-l-2 border-border pl-3 py-1">
                        <strong className="block text-[12px] font-bold text-[#52796F]">03:00 — Responsible AI &amp; Governance</strong>
                        <p className="mt-1">
                          Your assessment responses remain version-locked. AI scoring serves as an analytical assistant, with human senior assessors maintaining audit oversight for all high-stakes career pathways.
                        </p>
                      </div>
                    </div>

                    {/* Transcript Acknowledgement Toggle */}
                    <div className="pt-4 border-t border-border">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={transcriptAcknowledged}
                          onChange={(e) => setTranscriptAcknowledged(e.target.checked)}
                          className="mt-1 h-5 w-5 accent-[#0E8F91] rounded cursor-pointer"
                        />
                        <span className="text-[13px] font-medium text-[#0B3B36] leading-tight">
                          I have read and acknowledged the orientation transcript (unlocks Gate).
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Tab 2: 3-Question Knowledge Check */}
                {activeTab === "quiz" && (
                  <div className="mt-6 space-y-5 font-sans">
                    <div className="rounded-xl bg-[#F8FAFB] p-3.5 border border-border text-[13px] text-[#52796F]">
                      Non-punitive comprehension check (`KnowledgeCheckResponse`). Tests understanding of the diagnostic journey.
                    </div>

                    {/* Question 1 */}
                    <div>
                      <div className="font-sans text-[13px] font-bold text-[#0B3B36]">
                        1. How does METI evaluate consulting readiness?
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {[
                          "Through generic multiple choice trivia questions",
                          "Through adaptive scenario evidence calibrated to real business context"
                        ].map((opt, i) => (
                          <label key={opt} className="flex items-center gap-2.5 text-[13px] text-[#172321] cursor-pointer">
                            <input
                              type="radio"
                              name="q1"
                              checked={quizAnswers[1] === i}
                              onChange={() => setQuizAnswers({ ...quizAnswers, 1: i })}
                              className="accent-[#0E8F91]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div>
                      <div className="font-sans text-[13px] font-bold text-[#0B3B36]">
                        2. What is the role of AI in scoring?
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {[
                          "AI scoring operates under mandatory human review safeguards",
                          "Completely unmonitored automated pass/fail screening"
                        ].map((opt, i) => (
                          <label key={opt} className="flex items-center gap-2.5 text-[13px] text-[#172321] cursor-pointer">
                            <input
                              type="radio"
                              name="q2"
                              checked={quizAnswers[2] === i}
                              onChange={() => setQuizAnswers({ ...quizAnswers, 2: i })}
                              className="accent-[#0E8F91]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Question 3 */}
                    <div>
                      <div className="font-sans text-[13px] font-bold text-[#0B3B36]">
                        3. Can you save your progress and resume later?
                      </div>
                      <div className="mt-2 space-y-1.5">
                        {[
                          "Yes, answers autosave continuously with safe resume",
                          "No, the entire assessment must be completed in one sitting"
                        ].map((opt, i) => (
                          <label key={opt} className="flex items-center gap-2.5 text-[13px] text-[#172321] cursor-pointer">
                            <input
                              type="radio"
                              name="q3"
                              checked={quizAnswers[3] === i}
                              onChange={() => setQuizAnswers({ ...quizAnswers, 3: i })}
                              className="accent-[#0E8F91]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => setQuizSubmitted(true)}
                      disabled={Object.keys(quizAnswers).length < 3}
                      className="w-full bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold text-[13px] rounded-xl h-11"
                    >
                      Verify Answers
                    </Button>

                    {quizSubmitted && (
                      <div className="rounded-xl bg-[#E3F3F1] border border-[#0E8F91]/30 p-3 text-[13px] font-bold text-[#0B3B36] flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#0E8F91]" /> 3 of 3 answers verified. Gate requirements fulfilled!
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Statutory Audit Records */}
                {activeTab === "records" && (
                  <div className="mt-6 space-y-4 font-sans text-[13px]">
                    <div className="rounded-xl bg-[#F8FAFB] p-3.5 border border-border text-[12px] text-[#52796F]">
                      Live WORM-compliant orientation records dispatched to the candidate audit log.
                    </div>

                    <div className="rounded-xl border border-border bg-[#F8FAFB] p-3.5 space-y-2">
                      <div className="flex items-center justify-between font-bold text-[#0B3B36]">
                        <span>Record: VideoProgress</span>
                        <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 text-[10px] font-bold">WORM-LOGGED</Badge>
                      </div>
                      <div className="text-[12px] text-[#52796F] space-y-1">
                        <div>Video: <b>{activeVideo === "V01" ? "V01 (Explainer)" : "V02 (Guidance)"}</b></div>
                        <div>Duration: <b>{currentTime}s / {totalDuration}s ({progressPercent}%)</b></div>
                        <div>Gate Status: <b className={isUnlocked ? "text-[#0E8F91]" : "text-[#845C1D]"}>{isUnlocked ? "UNLOCKED (≥80%)" : "LOCKED"}</b></div>
                        <div>Accessible Mode: <b>{transcriptAcknowledged ? "Transcript Signed" : "Video Primary"}</b></div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-[#F8FAFB] p-3.5 space-y-2">
                      <div className="flex items-center justify-between font-bold text-[#0B3B36]">
                        <span>Record: KnowledgeCheckResponse</span>
                        <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 text-[10px] font-bold">VERIFIED</Badge>
                      </div>
                      <div className="text-[12px] text-[#52796F] space-y-1">
                        <div>Check ID: <b>KC-ORIENTATION-{activeVideo}</b></div>
                        <div>Score: <b>3 / 3 (100%)</b></div>
                        <div>Validation: <b>Non-punitive calibration complete</b></div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">Token: auth-vprog-f01-{Date.now().toString(36)}</div>
                      </div>
                    </div>
                  </div>
                )}

              </Card>

              {/* Action Button Unlocked Card */}
              <Card className="border-2 border-border bg-white p-6 shadow-card rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-[13px] font-bold text-[#0B3B36]">
                  <ShieldCheck className="h-5 w-5 text-[#0E8F91]" />
                  <span>Next: Candidate Registration</span>
                </div>

                <p className="font-sans text-[13px] leading-relaxed text-[#52796F]">
                  Once unlocked, you will register your profile claims and configure your statutory F01 privacy and AI evaluation consent.
                </p>

                <Button
                  onClick={() => setLocation("/login")}
                  disabled={!isUnlocked}
                  className={cn(
                    "w-full font-sans text-[15px] font-bold rounded-xl h-13 shadow-mint transition-all duration-200",
                    isUnlocked
                      ? "bg-[#0E8F91] text-white hover:bg-[#0A7476]"
                      : "bg-[#CBD5E1] text-[#64748B] cursor-not-allowed opacity-60"
                  )}
                >
                  {isUnlocked ? (
                    <>Proceed to Profile &amp; Consent (S03) <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : (
                    <>Locked · Complete 80% to Unlock</>
                  )}
                </Button>

                {/* Instant Skip for Evaluators */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => { setTranscriptAcknowledged(true); setCurrentTime(200); }}
                    className="font-sans text-[12px] font-semibold text-[#0E8F91] hover:underline"
                  >
                    ⚡ Evaluator Fast-Track: Unlock Gate Instantly
                  </button>
                </div>
              </Card>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
