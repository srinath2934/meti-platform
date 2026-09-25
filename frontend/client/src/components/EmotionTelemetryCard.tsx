import { Activity, Volume2, Brain, CheckCircle2, Video, Eye, Award, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface EmotionTelemetryData {
  composure: number;
  cadenceWpm: number;
  sentiment: string;
  fillerWordCount: number;
  focusStability: number;
  durationSeconds: number;
}

export default function EmotionTelemetryCard({
  telemetry = {
    composure: 92,
    cadenceWpm: 142,
    sentiment: "+0.84",
    fillerWordCount: 2,
    focusStability: 89,
    durationSeconds: 120
  }
}: {
  telemetry?: EmotionTelemetryData;
}) {
  return (
    <div className="rounded-2xl border-2 border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-[#0B3B36] text-[#0E8F91] flex items-center justify-center font-bold">
            <Radio className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91]">
              Multimodal Neural Telemetry &amp; Video Audit
            </span>
            <h3 className="text-[18px] font-extrabold text-[#0B3B36] mt-0.5">
              Oral Defense &amp; Facial Composure Intelligence
            </h3>
          </div>
        </div>

        <Badge className="bg-[#10B981] text-white border-0 font-bold px-3 py-1 self-start sm:self-auto">
          Partner Presence: 92% (Exemplary)
        </Badge>
      </div>

      <p className="text-[13px] text-[#52796F] mb-5 leading-relaxed">
        Continuous frame-by-frame computer vision and acoustic spectrum processing captured during the 2-minute executive video briefing. Calibrated against senior partner and C-suite oral presentation rubrics.
      </p>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        
        {/* Composure */}
        <div className="bg-[#F2FBF7] border border-[#BCE8D7] rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91] mb-1">
            <Activity className="h-3.5 w-3.5" /> Composure
          </div>
          <strong className="text-[26px] font-extrabold text-[#0B3B36] leading-none block my-1">
            {telemetry.composure}%
          </strong>
          <span className="text-[11px] text-[#0E8F91] font-bold">Calm &amp; Authoritative</span>
        </div>

        {/* Speaking Cadence */}
        <div className="bg-[#F8FAFB] border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#52796F] mb-1">
            <Volume2 className="h-3.5 w-3.5 text-[#0E8F91]" /> Cadence
          </div>
          <strong className="text-[26px] font-extrabold text-[#0B3B36] leading-none block my-1">
            {telemetry.cadenceWpm}
          </strong>
          <span className="text-[11px] text-[#10B981] font-bold">WPM · Optimal Pace</span>
        </div>

        {/* Sentiment Conviction */}
        <div className="bg-[#F8FAFB] border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#52796F] mb-1">
            <Brain className="h-3.5 w-3.5 text-[#0E8F91]" /> Conviction
          </div>
          <strong className="text-[26px] font-extrabold text-[#0B3B36] leading-none block my-1">
            {telemetry.sentiment}
          </strong>
          <span className="text-[11px] text-[#0E8F91] font-bold">Decisive Formulation</span>
        </div>

        {/* Filler Word Ratio */}
        <div className="bg-[#F8FAFB] border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#52796F] mb-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" /> Filler Density
          </div>
          <strong className="text-[26px] font-extrabold text-[#0B3B36] leading-none block my-1">
            0.8%
          </strong>
          <span className="text-[11px] text-[#10B981] font-bold">Partner-Grade (2 count)</span>
        </div>

      </div>

      {/* Audit Telemetry Footnote */}
      <div className="rounded-xl bg-[#F8FAFB] p-3.5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
        <div className="flex items-center gap-2 text-[#52796F]">
          <Video className="h-4 w-4 text-[#0E8F91]" />
          <span>Synchronized 1080p recording archived in local evidence repository (duration: 120s).</span>
        </div>
        <div className="flex items-center gap-2 text-[#0B3B36] font-semibold">
          <Eye className="h-3.5 w-3.5 text-[#0E8F91]" />
          <span>Eye-Level Gaze Stability: <strong>89% Direct Engagement</strong></span>
        </div>
      </div>
    </div>
  );
}
