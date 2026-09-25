import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Target, Award, Info } from "lucide-react";

export interface CompetencyDataPoint {
  code: string;
  name: string;
  pillar: string;
  candidateScore: number;
  benchmarkScore: number;
}

const DEFAULT_COMPETENCIES: CompetencyDataPoint[] = [
  { code: "C01", name: "Problem Structuring", pillar: "Structuring", candidateScore: 89, benchmarkScore: 80 },
  { code: "C02", name: "Hypothesis Formulation", pillar: "Structuring", candidateScore: 88, benchmarkScore: 78 },
  { code: "C03", name: "MECE Decomposition", pillar: "Structuring", candidateScore: 86, benchmarkScore: 82 },
  { code: "C04", name: "Root-Cause Synthesis", pillar: "Structuring", candidateScore: 87, benchmarkScore: 80 },
  
  { code: "C05", name: "Target Operating Model", pillar: "Operating Model", candidateScore: 85, benchmarkScore: 75 },
  { code: "C06", name: "Value Chain Architecture", pillar: "Operating Model", candidateScore: 84, benchmarkScore: 75 },
  { code: "C07", name: "Capability Mapping", pillar: "Operating Model", candidateScore: 82, benchmarkScore: 70 },
  { code: "C08", name: "Process Optimization", pillar: "Operating Model", candidateScore: 83, benchmarkScore: 72 },
  
  { code: "C09", name: "Unit Economics", pillar: "Quant Rigor", candidateScore: 88, benchmarkScore: 80 },
  { code: "C10", name: "Margin & EBITDA Bridge", pillar: "Quant Rigor", candidateScore: 86, benchmarkScore: 78 },
  { code: "C11", name: "Capital Allocation", pillar: "Quant Rigor", candidateScore: 82, benchmarkScore: 70 },
  { code: "C12", name: "Risk & Sensitivity", pillar: "Quant Rigor", candidateScore: 84, benchmarkScore: 75 },
  
  { code: "C13", name: "Change Management", pillar: "Governance", candidateScore: 80, benchmarkScore: 75 },
  { code: "C14", name: "Org Design & Governance", pillar: "Governance", candidateScore: 79, benchmarkScore: 70 },
  { code: "C15", name: "Digital Modernization", pillar: "Governance", candidateScore: 91, benchmarkScore: 85 },
  { code: "C16", name: "Stakeholder Alignment", pillar: "Governance", candidateScore: 85, benchmarkScore: 75 },
  
  { code: "C17", name: "Executive Presence", pillar: "Communication", candidateScore: 92, benchmarkScore: 80 },
  { code: "C18", name: "Pyramid Framing", pillar: "Communication", candidateScore: 88, benchmarkScore: 78 },
  { code: "C19", name: "Client Rapport", pillar: "Communication", candidateScore: 86, benchmarkScore: 75 },
  { code: "C20", name: "High-Stakes Defense", pillar: "Communication", candidateScore: 89, benchmarkScore: 70 },
];

export default function CompetencyRadar({
  data = DEFAULT_COMPETENCIES,
  candidateName = "Sarah Jenkins"
}: {
  data?: CompetencyDataPoint[];
  candidateName?: string;
}) {
  const [hoveredPoint, setHoveredPoint] = useState<CompetencyDataPoint | null>(null);

  const size = 440;
  const center = size / 2;
  const radius = 160;
  const totalPoints = data.length;

  // Coordinate math
  const getCoordinates = (index: number, score: number) => {
    const angle = (Math.PI * 2 / totalPoints) * index - Math.PI / 2;
    const r = (score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate candidate polygon
  const candidateCoords = data.map((d, i) => getCoordinates(i, d.candidateScore));
  const candidatePath = candidateCoords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ") + " Z";

  // Generate benchmark polygon
  const benchmarkCoords = data.map((d, i) => getCoordinates(i, d.benchmarkScore));
  const benchmarkPath = benchmarkCoords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ") + " Z";

  return (
    <div className="rounded-2xl border-2 border-border bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0E8F91] flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5" />
            20-Competency Ontology Radar (C01–C20)
          </span>
          <h3 className="text-[18px] font-extrabold text-[#0B3B36] mt-0.5">
            Peer Benchmark Comparison (Candidate vs Tier-1 Partners)
          </h3>
          <p className="text-[13px] text-[#52796F]">
            Evaluated against the top decile management consulting leadership standards.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[12px] font-bold">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#0E8F91]" />
            <span className="text-[#0B3B36]">{candidateName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 border-[#C58A32] bg-[#C58A32]/20" />
            <span className="text-[#845C1D]">Tier-1 Benchmark</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-6">
        {/* SVG Radar Visualizer */}
        <div className="relative flex justify-center">
          <svg width={size} height={size} className="overflow-visible select-none max-w-full">
            {/* Background concentric rings (20%, 40%, 60%, 80%, 100%) */}
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius * level}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth={level === 0.8 ? "1.5" : "1"}
                strokeDasharray={level === 0.8 ? "4 4" : undefined}
              />
            ))}

            {/* Radial axes */}
            {data.map((_, i) => {
              const { x, y } = getCoordinates(i, 100);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                />
              );
            })}

            {/* Benchmark Polygon */}
            <path
              d={benchmarkPath}
              fill="#C58A32"
              fillOpacity="0.12"
              stroke="#C58A32"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Candidate Polygon */}
            <path
              d={candidatePath}
              fill="#0E8F91"
              fillOpacity="0.30"
              stroke="#0E8F91"
              strokeWidth="2.5"
            />

            {/* Interactive Data Points */}
            {data.map((point, i) => {
              const cCoord = getCoordinates(i, point.candidateScore);
              const labelCoord = getCoordinates(i, 114);
              const isHovered = hoveredPoint?.code === point.code;

              return (
                <g key={point.code} onMouseEnter={() => setHoveredPoint(point)} onMouseLeave={() => setHoveredPoint(null)}>
                  {/* Point circle */}
                  <circle
                    cx={cCoord.x}
                    cy={cCoord.y}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? "#0B3B36" : "#0E8F91"}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="cursor-pointer transition-all duration-150"
                  />

                  {/* Competency code label */}
                  <text
                    x={labelCoord.x}
                    y={labelCoord.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                      isHovered ? "fill-[#0B3B36] font-extrabold" : "fill-[#52796F]"
                    }`}
                  >
                    {point.code}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Center Target Indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
            <span className="text-[10px] font-extrabold text-[#0B3B36]/60">88%</span>
            <span className="block text-[8px] uppercase tracking-wider text-[#52796F]">CCI</span>
          </div>
        </div>

        {/* Hover / Pillar Breakdown Cards */}
        <div className="space-y-4">
          {hoveredPoint ? (
            <div className="rounded-xl border-2 border-[#0E8F91] bg-[#F2FBF7] p-4 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[12px] font-bold text-[#0E8F91]">{hoveredPoint.code}</span>
                <Badge className="bg-[#0B3B36] text-white text-[10px]">{hoveredPoint.pillar}</Badge>
              </div>
              <h4 className="font-bold text-[15px] text-[#0B3B36]">{hoveredPoint.name}</h4>
              <div className="mt-3 flex items-center justify-between text-[13px] font-bold">
                <span className="text-[#0E8F91]">Evaluated: {hoveredPoint.candidateScore}%</span>
                <span className="text-[#845C1D]">Benchmark: {hoveredPoint.benchmarkScore}%</span>
                <span className="text-[#10B981]">+{hoveredPoint.candidateScore - hoveredPoint.benchmarkScore}% Delta</span>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-[#F8FAFB] p-4 text-center">
              <Info className="h-4 w-4 text-[#52796F] mx-auto mb-1" />
              <p className="text-[12px] text-[#52796F]">
                Hover over any radar axis (C01–C20) to view individual competency scores and peer deltas.
              </p>
            </div>
          )}

          {/* 4 Pillars Summary Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#F8FAFB] border border-border p-3 rounded-xl">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#52796F]">Structuring</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-[18px] font-bold text-[#0B3B36]">88%</strong>
                <span className="text-[11px] text-[#10B981] font-bold">(+8% vs Tier-1)</span>
              </div>
            </div>

            <div className="bg-[#F8FAFB] border border-border p-3 rounded-xl">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#52796F]">Operating Model</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-[18px] font-bold text-[#0B3B36]">84%</strong>
                <span className="text-[11px] text-[#10B981] font-bold">(+11% vs Tier-1)</span>
              </div>
            </div>

            <div className="bg-[#F8FAFB] border border-border p-3 rounded-xl">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#52796F]">Quantitative Rigor</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-[18px] font-bold text-[#0B3B36]">85%</strong>
                <span className="text-[11px] text-[#10B981] font-bold">(+9% vs Tier-1)</span>
              </div>
            </div>

            <div className="bg-[#F8FAFB] border border-border p-3 rounded-xl">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#52796F]">Executive Presence</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-[18px] font-bold text-[#0B3B36]">89%</strong>
                <span className="text-[11px] text-[#10B981] font-bold">(+13% vs Tier-1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
