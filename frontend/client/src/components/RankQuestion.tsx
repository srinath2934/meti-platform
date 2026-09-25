import { useState } from "react";
import { GripVertical, ArrowUp, ArrowDown, Sparkles, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface InitiativeItem {
  id: string;
  title: string;
  category: string;
  impact: string;
  effort: string;
  description: string;
}

const initialInitiatives: InitiativeItem[] = [
  {
    id: "init-1",
    title: "Operating Model & Decision Rights Realignment",
    category: "Organization & Governance",
    impact: "High (Enables execution)",
    effort: "Medium (4 months)",
    description: "Clarify decision boundaries, eliminate redundant approval layers, and align leadership incentives to target customer value streams."
  },
  {
    id: "init-2",
    title: "Customer Journey Quick-Wins & Working Capital Optimization",
    category: "Commercial & Liquidity",
    impact: "High ($15M cash generation)",
    effort: "Low (6 weeks)",
    description: "Address acute customer attrition friction points to generate immediate cash flow and fund subsequent transformation phases."
  },
  {
    id: "init-3",
    title: "Digital Core Modernization & Cloud Migration",
    category: "Technology Architecture",
    impact: "Transformational",
    effort: "High (14 months)",
    description: "Decommission legacy on-premise monolithic servers and transition data infrastructure to scalable cloud microservices."
  },
  {
    id: "init-4",
    title: "Enterprise Talent DNA & Agile Transformation Academy",
    category: "People & Culture",
    impact: "Sustained capability",
    effort: "Continuous (6 months)",
    description: "Upskill 650+ cross-functional leaders on hypothesis-driven problem solving and iterative delivery frameworks."
  }
];

export default function RankQuestion({ onComplete }: { onComplete?: (ranking: InitiativeItem[], rationale: string) => void }) {
  const [items, setItems] = useState<InitiativeItem[]>(initialInitiatives);
  const [rationale, setRationale] = useState("");
  const [saved, setSaved] = useState(false);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
    triggerAutoSave();
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems);
    triggerAutoSave();
  };

  const triggerAutoSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRationaleChange = (val: string) => {
    setRationale(val);
    triggerAutoSave();
  };

  const words = rationale.trim().length > 0 ? rationale.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-2xl border-2 border-border bg-white p-7 lg:p-9 shadow-card">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full border-0 bg-[#E3F3F1] px-3 py-1 font-sans text-[11px] font-bold text-[#0E8F91]">
              S07 Interactive Prioritization
            </Badge>
            <span className="font-sans text-[13px] font-semibold text-[#52796F]">Appendix B Question Catalogue</span>
          </div>
          <h3 className="mt-2 font-sans text-[22px] font-extrabold text-[#0B3B36] tracking-tight">
            Strategic Initiative Priority Ranking
          </h3>
        </div>

        <div className="flex items-center gap-2 font-sans text-[13px] text-[#0E8F91] font-bold">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>{saved ? "Rank saved" : "Autosave ready"}</span>
        </div>
      </div>

      {/* Scenario Brief */}
      <div className="mt-6 rounded-xl border border-border bg-[#F8FAFB] p-5 font-sans">
        <div className="flex items-center gap-2 font-bold text-[14px] text-[#0B3B36]">
          <FileText className="h-4 w-4 text-[#0E8F91]" /> Executive Scenario:
        </div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-[#172321]">
          A distressed Fortune 500 enterprise has severe change fatigue, constrained capital, and limited management bandwidth. 
          Use the <strong>Up / Down controls</strong> to prioritize the 4 strategic initiatives from <strong>Rank 1 (Immediate Execution)</strong> to <strong>Rank 4 (Deferred)</strong>.
        </p>
      </div>

      {/* Reorderable Initiative List */}
      <div className="mt-6 space-y-3.5">
        {items.map((item, index) => {
          const isRank1 = index === 0;
          const isRank4 = index === items.length - 1;

          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border-2 p-5 transition-all duration-200",
                isRank1 
                  ? "border-[#0E8F91] bg-gradient-to-r from-[#E3F3F1]/40 to-white shadow-sm ring-1 ring-[#0E8F91]/20" 
                  : "border-border bg-white hover:border-[#0E8F91]/40"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Rank Badge */}
                <div className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-xl font-sans font-extrabold text-[18px]",
                  isRank1 ? "bg-[#0E8F91] text-white shadow-mint" : "bg-[#EDF3F2] text-[#0B3B36]"
                )}>
                  #{index + 1}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-sans text-[16px] font-bold text-[#0B3B36]">
                      {item.title}
                    </h4>
                    <span className="rounded-full bg-[#EDF3F2] px-2.5 py-0.5 font-sans text-[11px] font-bold text-[#52796F]">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1 font-sans text-[14px] leading-relaxed text-[#172321] max-w-2xl">
                    {item.description}
                  </p>
                  <div className="mt-2.5 flex items-center gap-4 text-[12px] font-semibold text-[#52796F]">
                    <span>Expected Impact: <strong className="text-[#0B3B36]">{item.impact}</strong></span>
                    <span>·</span>
                    <span>Timeline: <strong className="text-[#0B3B36]">{item.effort}</strong></span>
                  </div>
                </div>
              </div>

              {/* Up / Down Controls (Keyboard Accessible WCAG 2.2 AA) */}
              <div className="flex sm:flex-col items-center justify-end gap-1.5 shrink-0 self-end sm:self-center border-t sm:border-t-0 sm:border-l border-border pt-3 sm:pt-0 sm:pl-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="h-9 w-9 p-0 rounded-lg border-2 border-border hover:border-[#0E8F91] hover:text-[#0E8F91] disabled:opacity-30"
                  aria-label={`Move ${item.title} up`}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => moveDown(index)}
                  disabled={index === items.length - 1}
                  className="h-9 w-9 p-0 rounded-lg border-2 border-border hover:border-[#0E8F91] hover:text-[#0E8F91] disabled:opacity-30"
                  aria-label={`Move ${item.title} down`}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trade-Off Synthesis Textarea */}
      <div className="mt-8 rounded-2xl border-2 border-border bg-[#F8FAFB] p-6">
        <div className="flex items-center justify-between">
          <label className="font-sans text-[15px] font-bold text-[#0B3B36]">
            Executive Trade-Off Rationale
          </label>
          <span className={cn("text-[12px] font-bold", words >= 25 ? "text-[#0E8F91]" : "text-[#52796F]")}>
            {words} words (recommended 25–60 words)
          </span>
        </div>
        <p className="mt-1 font-sans text-[13px] text-[#52796F]">
          Explicitly justify why your <strong>#1 priority ({items[0].title})</strong> takes precedence over your <strong>#4 priority ({items[3].title})</strong> under capital and organizational resistance constraints.
        </p>
        <textarea
          rows={3}
          value={rationale}
          onChange={(e) => handleRationaleChange(e.target.value)}
          placeholder="Articulate the strategic dependency, sequencing risk, and why this order protects enterprise value..."
          className="mt-3 w-full rounded-xl border-2 border-border bg-white p-4 font-sans text-[15px] text-[#172321] outline-none transition focus:border-[#0E8F91]"
        />
      </div>

      {/* Submission Row */}
      <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border pt-5">
        <span className="font-sans text-[13px] font-medium text-[#52796F]">
          Ranking and justification are recorded as immutable evidence artifacts.
        </span>
        <Button
          type="button"
          onClick={() => onComplete && onComplete(items, rationale)}
          className="bg-[#0E8F91] text-white hover:bg-[#0A7476] font-sans text-[14px] font-bold rounded-xl px-6 py-3 shadow-mint"
        >
          Confirm Priority Order &amp; Proceed →
        </Button>
      </div>

    </div>
  );
}
