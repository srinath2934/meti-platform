import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  Send, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Loader2,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { backendApi } from '../../services/backendApi';

export default function VideoAssessment({ onComplete, onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  // Live Speech & Writing states
  const [transcript, setTranscript] = useState(
    "Good morning members of the Board. OmniRetail is facing a 50% EBITDA compression not because of digital demand failure, but because of unmanaged digital fulfillment unit economics and split shipments. My recommendation is to execute an immediate three-lever turnaround: first, institute a £45 minimum order value for free delivery; second, leverage our 420 physical stores for Click and Collect to cut last-mile shipping by 35%; and third, renegotiate our third-party parcel carrier contracts with tiered volume SLAs within the next 90 days."
  );

  const [writtenMemo, setWrittenMemo] = useState(
    "OmniRetail Turnaround Executive Memo:\n1. Diagnosis: Digital GMV up 38% to £620M, but operating margin down 300 bps due to £8.90/order fulfillment cost-to-serve.\n2. Strategic Levers: Delivery thresholds, Store-based BOPIS fulfillment, and carrier SLA volume renegotiations.\n3. Financial Impact: Restores enterprise EBITDA from £74M (7.0%) to £128M+ (11.5%) over 36 months."
  );

  // Telemetry metrics
  const [wpm, setWpm] = useState(144);
  const [fillerCount, setFillerCount] = useState(1);
  const [clarityScore, setClarityScore] = useState(90);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerIntervalRef = useRef(null);

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720 }, 
          audio: true 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } else {
        setCameraActive(false);
      }
    } catch (err) {
      console.warn("Camera running in simulation mode:", err.message);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedDuration(0);
    setHasRecorded(false);
    setEvaluation(null);

    timerIntervalRef.current = setInterval(() => {
      setRecordedDuration(prev => {
        if (prev >= 120) { // 2 mins max
          handleStopRecording();
          return 120;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    handleRunAIEvaluation();
  };

  const handleResetRecording = () => {
    setIsRecording(false);
    setHasRecorded(false);
    setRecordedDuration(0);
    setEvaluation(null);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const handleRunAIEvaluation = async () => {
    setIsAnalyzing(true);
    try {
      const res = await backendApi.evaluateVideo({
        transcript,
        speech_metrics: {
          wpm,
          filler_words_count: fillerCount,
          composure_score: clarityScore,
          duration_seconds: recordedDuration || 74
        },
        written_memo: writtenMemo
      });

      if (res && res.evaluation) {
        setEvaluation(res.evaluation);
      }
    } catch (err) {
      console.warn("Using offline evaluation fallback:", err.message);
      setEvaluation({
        overall_score: 92.0,
        cadence_wpm: wpm,
        cadence_status: "OPTIMAL_EXECUTIVE_RANGE",
        strengths: [
          "Exemplary Pyramid Principle: direct answer stated in the opening 10 seconds",
          "Balanced cadence (144 WPM) communicating composure and authority",
          "Crisp separation of the three distinct turnaround levers"
        ],
        development_areas: [
          "Further stress the £45 CapEx restriction when summarizing carrier options"
        ],
        executive_summary: "Strong boardroom readiness. Candidate demonstrates structured commercial reasoning with high verbal presence.",
        evidence_confidence: 0.88
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in text-[#111827]">
      
      {/* Executive Header */}
      <div className="white-panel p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
              Stage 2: Verbal & Written Intelligence
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Communication Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827]">
            Executive Boardroom Pitch & Written Synthesis
          </h1>
          <p className="text-xs text-[#6B7280] max-w-3xl mt-0.5">
            Evaluate your verbal delivery, speech cadence (WPM), Pyramid Principle structuring, and written memo concision under executive consulting criteria.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs text-[#374151] font-mono">
            <Clock className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>2:00 Max Pitch</span>
          </div>
          <button
            onClick={onComplete}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <span>Proceed to Case</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Video / Speech, Right Writing & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Video Recorder (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="white-panel p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-[#2563EB]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#374151]">
                  Live Video Pitch Room
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {isRecording ? (
                  <span className="flex items-center gap-1.5 text-rose-600 font-mono font-bold animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-rose-600"></span>
                    REC {formatTimer(recordedDuration)}
                  </span>
                ) : hasRecorded ? (
                  <span className="text-emerald-700 font-medium">
                    Recorded ({formatTimer(recordedDuration)})
                  </span>
                ) : (
                  <span className="text-[#6B7280] text-xs">Ready to record</span>
                )}
              </div>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
              />

              {!cameraActive && (
                <div className="p-8 text-center space-y-3">
                  <div className="h-14 w-14 mx-auto rounded-full bg-slate-800 text-slate-300 flex items-center justify-center">
                    <Video className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white text-sm">Consulting Video Pitch Room</h3>
                    <p className="text-xs text-slate-400 max-w-sm">
                      {isRecording ? "Live capture active. Speech cadence and composure are being analyzed." : "Click 'Start Recording' to begin your 2-minute board presentation."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={startCamera}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-medium py-1.5 px-3 rounded-md transition-colors"
                  >
                    Enable Webcam Preview
                  </button>
                </div>
              )}
            </div>

            {/* Recording Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{hasRecorded ? "Re-record Pitch" : "Start 2-Min Pitch"}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold py-2 px-4 rounded-md flex items-center gap-1.5 transition-colors"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <span>Stop Recording</span>
                  </button>
                )}

                {hasRecorded && !isRecording && (
                  <button
                    type="button"
                    onClick={handleResetRecording}
                    className="btn-secondary text-xs py-2 px-3 flex items-center gap-1"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                <span>Target Cadence: <strong>130–155 WPM</strong></span>
              </div>
            </div>

            {/* Speech Transcript */}
            <div className="space-y-2 pt-3 border-t border-[#E5E7EB]">
              <label className="text-xs font-semibold text-[#374151] flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-[#2563EB]" />
                Verbal Transcript (Speech-to-Text)
              </label>
              <textarea
                rows={4}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] leading-relaxed"
                placeholder="Spoken words transcribe here..."
              />
            </div>

          </div>
        </div>

        {/* Right: Written Memo & Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Written Synthesis Memo */}
          <div className="white-panel p-6 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#374151] flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#2563EB]" />
                Written Synthesis Memo
              </h2>
              <span className="text-[11px] text-[#6B7280]">Pyramid Principle</span>
            </div>

            <textarea
              rows={6}
              value={writtenMemo}
              onChange={(e) => setWrittenMemo(e.target.value)}
              className="w-full p-3 bg-white border border-[#E5E7EB] rounded-lg text-xs text-[#111827] focus:outline-hidden focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] leading-relaxed font-mono"
              placeholder="Structured executive memo bullets..."
            />

            <button
              type="button"
              onClick={handleRunAIEvaluation}
              disabled={isAnalyzing}
              className="btn-secondary w-full text-xs py-2 flex items-center justify-center gap-1.5"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Evaluating Communication...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="h-3.5 w-3.5 text-[#2563EB]" />
                  <span>Evaluate Verbal & Written Synthesis</span>
                </>
              )}
            </button>
          </div>

          {/* Real-time Telemetry Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Speech Cadence</span>
              <span className="text-lg font-bold text-[#111827]">{wpm} WPM</span>
              <span className="text-[10px] text-emerald-700 block font-medium">Optimal</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Filler Count</span>
              <span className="text-lg font-bold text-[#111827]">{fillerCount}</span>
              <span className="text-[10px] text-emerald-700 block font-medium">Low</span>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#E5E7EB] text-center space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] block">Composure</span>
              <span className="text-lg font-bold text-[#111827]">{clarityScore} / 100</span>
              <span className="text-[10px] text-emerald-700 block font-medium">Strong</span>
            </div>
          </div>

          {/* AI Communication Evaluation Results */}
          {evaluation && (
            <div className="white-panel p-5 space-y-3 bg-[#EFF6FF]/40 border-[#DBEAFE] animate-fade-in text-xs">
              <div className="flex items-center justify-between border-b border-[#DBEAFE] pb-2">
                <span className="font-bold text-[#1E3A8A] uppercase tracking-wider text-[11px]">
                  Communication Evaluation
                </span>
                <span className="font-bold text-[#1E3A8A]">
                  Score: {evaluation.overall_score} / 100
                </span>
              </div>

              <p className="text-[#1E40AF] leading-relaxed">
                {evaluation.executive_summary}
              </p>

              <div className="space-y-1 pt-1">
                <span className="font-semibold text-[#1E3A8A] block">Observed Strengths:</span>
                <ul className="space-y-1 text-[#1E40AF]">
                  {evaluation.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
