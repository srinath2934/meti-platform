import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { 
  Video, Mic, MicOff, Camera, RefreshCw, Play, Square, CheckCircle2, 
  AlertCircle, ShieldCheck, Clock, Sparkles, Volume2, ArrowRight, ArrowLeft,
  Sliders, Eye, HelpCircle, AlertTriangle, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

type StudioState = "preflight" | "prep" | "recording" | "review";

export default function VideoRecorder() {
  const [, setLocation] = useLocation();
  const [studioState, setStudioState] = useState<StudioState>("preflight");
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [recordTimeLeft, setRecordTimeLeft] = useState(120); // 2 minutes
  const [micLevel, setMicLevel] = useState(42);
  const [cameraActive, setCameraActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [retriesLeft, setRetriesLeft] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [consentGiven, setConsentGiven] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Initialize camera preview
  useEffect(() => {
    let stream: MediaStream | null = null;
    async function setupCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn("Hardware camera unavailable or restricted, using executive studio simulation mode.", err);
      }
    }
    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Mic level simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (micActive) {
        setMicLevel(Math.floor(25 + Math.random() * 55));
      } else {
        setMicLevel(0);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [micActive]);

  // Prep Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (studioState === "prep" && prepTimeLeft > 0) {
      timer = setTimeout(() => setPrepTimeLeft((prev) => prev - 1), 1000);
    } else if (studioState === "prep" && prepTimeLeft === 0) {
      setStudioState("recording");
    }
    return () => clearTimeout(timer);
  }, [studioState, prepTimeLeft]);

  // Record Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (studioState === "recording" && recordTimeLeft > 0) {
      timer = setTimeout(() => setRecordTimeLeft((prev) => prev - 1), 1000);
    } else if (studioState === "recording" && recordTimeLeft === 0) {
      setStudioState("review");
    }
    return () => clearTimeout(timer);
  }, [studioState, recordTimeLeft]);

  const handleStartPrep = () => {
    setPrepTimeLeft(60);
    setStudioState("prep");
  };

  const handleStartRecording = () => {
    setRecordTimeLeft(120);
    setStudioState("recording");
  };

  const handleStopRecording = () => {
    setStudioState("review");
  };

  const handleRetry = () => {
    if (retriesLeft > 0) {
      setRetriesLeft(retriesLeft - 1);
      setPrepTimeLeft(45);
      setRecordTimeLeft(120);
      setStudioState("prep");
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate upload progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        
        // Save submission to localStorage
        const videoEvidence = {
          submittedAt: new Date().toISOString(),
          durationSeconds: 120 - recordTimeLeft,
          compositeScore: 86,
          aiConfidence: 0.91,
          status: "verified"
        };
        localStorage.setItem("meti_video_evidence", JSON.stringify(videoEvidence));

        setTimeout(() => {
          setIsSubmitting(false);
          setLocation("/case"); // Back to case workspace
        }, 500);
      }
    }, 400);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          {/* Breadcrumbs & Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
            <div className="flex items-center gap-3 text-[14px]">
              <Link href="/app" className="font-semibold text-[#52796F] hover:text-[#0B3B36] flex items-center gap-1.5">
                <ArrowLeft className="h-4 w-4" /> Workspace
              </Link>
              <span className="text-[#CBD5E1]">/</span>
              <span className="font-bold text-[#0B3B36]">Executive Video Briefing</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 font-bold px-3 py-1">
                Standardized Simulation
              </Badge>
              <span className="text-[13px] font-semibold text-[#52796F]">
                Take: <strong>{2 - retriesLeft} of 2</strong>
              </span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] items-start">
            
            {/* Left Column: Video Studio Canvas */}
            <div className="space-y-6">
              
              <Card className="overflow-hidden border-2 border-border bg-[#0B3B36] text-white shadow-card rounded-2xl relative">
                
                {/* Top Video Overlay Bar */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {studioState === "recording" ? (
                      <span className="flex items-center gap-2 rounded-full bg-red-600/90 px-3.5 py-1 text-[12px] font-extrabold uppercase tracking-widest text-white shadow-lg animate-pulse">
                        <span className="h-2.5 w-2.5 rounded-full bg-white animate-ping" />
                        REC {formatTime(recordTimeLeft)}
                      </span>
                    ) : studioState === "prep" ? (
                      <span className="flex items-center gap-2 rounded-full bg-[#C58A32]/90 px-3.5 py-1 text-[12px] font-bold text-white shadow-lg">
                        <Clock className="h-3.5 w-3.5" /> Prep: {prepTimeLeft}s
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[12px] font-semibold text-white">
                        <Video className="h-3.5 w-3.5 text-[#0E8F91]" /> 1080p Studio Stream
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setMicActive(!micActive)} 
                      className={cn("p-2 rounded-full backdrop-blur-md transition", micActive ? "bg-white/20 text-white" : "bg-red-500 text-white")}
                      title={micActive ? "Mute Microphone" : "Unmute Microphone"}
                    >
                      {micActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </button>
                    <button 
                      onClick={() => setCameraActive(!cameraActive)} 
                      className={cn("p-2 rounded-full backdrop-blur-md transition", cameraActive ? "bg-white/20 text-white" : "bg-red-500 text-white")}
                      title={cameraActive ? "Turn Off Camera" : "Turn On Camera"}
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Video Viewport */}
                <div className="relative aspect-[16/10] w-full bg-black/40 flex items-center justify-center overflow-hidden">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={cn("h-full w-full object-cover", (!cameraActive || studioState === "review") && "hidden")}
                  />
                  
                  {/* Fallback / Studio Avatar if webcam is off or review mode */}
                  {(!cameraActive || studioState === "review") && !isSubmitting && (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="h-24 w-24 rounded-full bg-[#135048] border-4 border-[#0E8F91] flex items-center justify-center text-white text-[28px] font-bold shadow-2xl">
                        AR
                      </div>
                      <h4 className="mt-4 font-sans text-[18px] font-bold text-white">Alex Rivera</h4>
                      <p className="mt-1 font-sans text-[13px] text-[#CBD5E1]">
                        {studioState === "review" ? "Recording Captured · Ready for Submission" : "Simulated Studio Video Feed (Hardware Camera Standby)"}
                      </p>
                      {studioState === "review" && (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0E8F91]/20 border border-[#0E8F91] px-4 py-1.5 text-[13px] font-bold text-[#E3F3F1]">
                          <Play className="h-4 w-4 text-[#0E8F91] fill-current" /> Playback Review (01:54)
                        </div>
                      )}
                    </div>
                  )}

                  {/* Uploading Simulation Overlay */}
                  {isSubmitting && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-center">
                      <RefreshCw className="h-10 w-10 text-[#0E8F91] animate-spin mb-4" />
                      <h4 className="font-sans text-[20px] font-bold text-white">Securely Uploading Video</h4>
                      <p className="mt-2 text-[14px] text-[#CBD5E1]">Encrypting and transmitting work sample...</p>
                      <div className="mt-6 w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#0E8F91] transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <span className="mt-2 text-[12px] font-bold text-white">{uploadProgress}% Complete</span>
                    </div>
                  )}

                  {/* Realtime Audio VU Visualizer Meter */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3 rounded-xl bg-black/60 backdrop-blur-md p-3">
                    <Volume2 className="h-4 w-4 text-[#0E8F91] shrink-0" />
                    <div className="flex-1 flex gap-1 h-3 items-center">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const active = (i / 24) * 100 <= micLevel;
                        const isHigh = i > 18;
                        return (
                          <div 
                            key={i} 
                            className={cn(
                              "flex-1 h-full rounded-sm transition-all duration-75",
                              active 
                                ? (isHigh ? "bg-[#C58A32]" : "bg-[#0E8F91]") 
                                : "bg-white/10"
                            )} 
                          />
                        );
                      })}
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#CBD5E1] shrink-0">
                      {micActive ? `${micLevel}%` : "MUTED"}
                    </span>
                  </div>
                </div>

                {/* Studio Control Action Panel */}
                <div className="p-6 bg-[#082A26] border-t border-white/10">
                  {studioState === "preflight" && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <strong className="block text-[15px] font-bold text-white">Pre-flight Hardware Status</strong>
                        <p className="text-[13px] text-[#CBD5E1]">Microphone &amp; camera calibrated. Teleprompter prompt loaded.</p>
                        <label className="flex items-start gap-2.5 cursor-pointer mt-4">
                          <input 
                            type="checkbox" 
                            className="mt-0.5 accent-[#0E8F91] h-4 w-4" 
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                          />
                          <span className="text-[12px] text-[#CBD5E1] leading-relaxed">
                            I consent to video and audio recording for the purpose of capability assessment and AI-assisted evaluation.
                          </span>
                        </label>
                      </div>
                      <Button 
                        onClick={handleStartPrep} 
                        disabled={!consentGiven}
                        className="bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold text-[14px] px-6 py-3 rounded-xl shadow-mint shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Enter 60s Preparation <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {studioState === "prep" && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full border-4 border-[#C58A32] flex items-center justify-center font-bold text-[16px] text-[#C58A32]">
                          {prepTimeLeft}s
                        </div>
                        <div>
                          <strong className="block text-[15px] font-bold text-white">Synthesize Your Thoughts</strong>
                          <p className="text-[13px] text-[#CBD5E1]">Recording starts automatically when timer expires.</p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleStartRecording} 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-[14px] px-6 py-3 rounded-xl shadow-lg shrink-0"
                      >
                        <Square className="mr-2 h-4 w-4 fill-current" /> Start Recording Now
                      </Button>
                    </div>
                  )}

                  {studioState === "recording" && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="h-3.5 w-3.5 rounded-full bg-red-500 animate-ping" />
                        <div>
                          <strong className="block text-[15px] font-bold text-white">Executive Briefing in Progress</strong>
                          <p className="text-[13px] text-[#CBD5E1]">Aim for concise structure: Headline &rarr; Evidence &rarr; Next steps.</p>
                        </div>
                      </div>
                      <Button 
                        onClick={handleStopRecording} 
                        className="bg-white text-[#0B3B36] hover:bg-[#F8FAFB] font-bold text-[14px] px-6 py-3 rounded-xl shadow-lg shrink-0"
                      >
                        <Square className="mr-2 h-4 w-4 fill-current text-red-600" /> Finish &amp; Review (01:54)
                      </Button>
                    </div>
                  )}

                  {studioState === "review" && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-[#10B981]" />
                        <div>
                          <strong className="block text-[15px] font-bold text-white">Recording Captured Successfully</strong>
                          <p className="text-[13px] text-[#CBD5E1]">Duration: 01:54 · Initializing Evaluation...</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {retriesLeft > 0 && (
                          <Button 
                            onClick={handleRetry} 
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10 font-semibold text-[13px] rounded-xl"
                          >
                            <RefreshCw className="mr-2 h-3.5 w-3.5" /> Re-record (1 left)
                          </Button>
                        )}
                        <Button 
                          onClick={handleSubmit} 
                          disabled={isSubmitting}
                          className="bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold text-[14px] px-6 py-3 rounded-xl shadow-mint"
                        >
                          {isSubmitting ? "Uploading Video..." : "Submit Work Sample & Calibrate"} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

              </Card>

              {/* Objective Evaluation Standard */}
              <div className="rounded-2xl border border-[#CBD5E1] bg-white p-5 shadow-xs flex items-start gap-3.5 text-[#52796F]">
                <ShieldCheck className="h-5 w-5 text-[#0E8F91] shrink-0 mt-0.5" />
                <div className="text-[13px] leading-relaxed">
                  <strong className="font-bold text-[#0B3B36]">Objective Evaluation Standard:</strong> METI evaluates observable communication structure, business reasoning, and executive concision with zero scoring based on accent, appearance, attire, or camera hardware.
                </div>
              </div>

            </div>

            {/* Right Column: Scenario Briefing & AI Rubric Inspection */}
            <div className="space-y-6">
              
              {/* Executive Scenario Card */}
              <Card className="border-2 border-border bg-white p-7 shadow-card rounded-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0E8F91]">
                      Client Board Simulation
                    </span>
                    <h2 className="mt-2 font-sans text-[22px] font-extrabold tracking-tight text-[#0B3B36]">
                      Nexus Global Freight: Board Briefing on Digital Core Migration
                    </h2>
                  </div>
                  <Badge className="bg-[#FDF5E8] text-[#845C1D] border-0 font-bold px-3 py-1">
                    2 Minutes Max
                  </Badge>
                </div>

                <div className="mt-4 rounded-xl bg-[#F8FAFB] border border-border p-4.5 text-[14px] leading-relaxed text-[#172321]">
                  <strong className="font-bold text-[#0B3B36]">The Situation:</strong> You are the Engagement Lead presenting to the Nexus Board. The board is divided: the CFO demands a 25% immediate freeze on capital expenditure, while the COO warns that delaying ERP consolidation risks customer cargo tracking blackouts during peak Q4.
                </div>

                <div className="mt-4 space-y-2.5">
                  <strong className="block text-[13px] font-bold text-[#0B3B36] uppercase tracking-[0.08em]">
                    Your Board Briefing Objectives:
                  </strong>
                  <ul className="space-y-2 text-[13px] text-[#172321]">
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#E3F3F1] text-[#0E8F91] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">1</span>
                      <span><strong>State headline recommendation:</strong> Balance cash preservation with high-risk cutover stabilization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#E3F3F1] text-[#0E8F91] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">2</span>
                      <span><strong>Synthesize 3 critical risks:</strong> Vendor SLA breach, warehouse staff resistance, and customer API deprecation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#E3F3F1] text-[#0E8F91] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">3</span>
                      <span><strong>Propose $14M phased budget compromise:</strong> Fund Phase 1 core reliability now; defer non-critical analytics to FY27.</span>
                    </li>
                  </ul>
                </div>
              </Card>

              {/* The evaluation rubric and AI scores have been moved to the Evaluator Desk */}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
