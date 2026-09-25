import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  CheckCircle2, Compass, Play, BookOpen, BarChart3, Video, FileText, 
  Award, Sparkles, ChevronRight, Zap, Layers, RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type EntitlementType = "consulting" | "personality" | "bundle";

export default function CandidateJourneyBar() {
  const [location, setLocation] = useLocation();
  const [activeEntitlement, setActiveEntitlement] = useState<EntitlementType>("bundle");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("meti_entitlement");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.product) {
          setActiveEntitlement(parsed.product);
        }
      }
    } catch (e) {
      console.warn("Could not read entitlement", e);
    }
  }, [location]);

  const switchEntitlement = (type: EntitlementType) => {
    setActiveEntitlement(type);
    const entitlementMap = {
      consulting: {
        product: "consulting",
        name: "Management Consulting Assessment (MC-A)",
        entitlements: ["ENT_CONSULTING_CORE", "ENT_WORK_SAMPLE_S09", "ENT_SUMMARY_FINDINGS"],
        hasD250: false,
      },
      personality: {
        product: "personality",
        name: "Professional Personality & Values (PV-A)",
        entitlements: ["ENT_TALENT_DNA", "ENT_SCHWARTZ_VALUES", "ENT_SUMMARY_FINDINGS"],
        hasD250: false,
      },
      bundle: {
        product: "bundle",
        name: "Combined Executive Transformation Bundle (COMBO-A)",
        entitlements: ["ENT_CONSULTING_CORE", "ENT_TALENT_DNA", "ENT_SCHWARTZ_VALUES", "ENT_DETAILED_ROADMAP_S10", "ENT_ASSESSOR_REVIEW_S11"],
        hasD250: true,
      }
    };
    localStorage.setItem("meti_entitlement", JSON.stringify(entitlementMap[type]));
    // trigger custom storage event for sync
    window.dispatchEvent(new Event("storage"));
  };

  const stages = [
    {
      num: "0",
      label: "Free Orientation",
      sub: "V01/V02 Explainer",
      route: "/video",
      active: location === "/video"
    },
    {
      num: "1",
      label: "Entitlements & Assessment",
      sub: "MC-A / PV-A / Bundle",
      route: "/checkout",
      active: location === "/checkout"
    },
    {
      num: "2",
      label: "Core Diagnosis & Rank",
      sub: "Adaptive Probing (S06/S07)",
      route: "/app",
      active: location === "/app"
    },
    {
      num: "3A",
      label: "Executive Video Studio",
      sub: "Board Briefing (S08)",
      route: "/studio",
      active: location === "/studio"
    },
    {
      num: "3B",
      label: "Case Work Sample",
      sub: "P&L & Exhibits (S09)",
      route: "/case",
      active: location === "/case"
    },
    {
      num: "3C",
      label: "Assessor Review Desk",
      sub: "Partner Calibration (S11)",
      route: "/assessor",
      active: location === "/assessor"
    }
  ];

  return (
    <div className="border-b border-[#0B3B36]/10 bg-[#082A26] text-white">
      <div className="mx-auto max-w-[1700px] px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
          
          {/* Left: Journey Stages Breadcrumb Ribbon */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none text-[12px]">
            <span className="font-sans font-extrabold uppercase tracking-wider text-[#0E8F91] text-[11px] shrink-0 mr-1.5 flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 fill-current" /> Executive Journey:
            </span>

            {stages.map((stage, idx) => (
              <div key={stage.route} className="flex items-center shrink-0">
                <Link
                  href={stage.route}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition font-sans",
                    stage.active 
                      ? "bg-[#0E8F91] text-white font-bold shadow-xs" 
                      : "text-[#CBD5E1] hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className={cn(
                    "grid h-4 w-4 place-items-center rounded-full text-[10px] font-extrabold",
                    stage.active ? "bg-white text-[#0E8F91]" : "bg-white/20 text-white"
                  )}>
                    {stage.num}
                  </span>
                  <span>{stage.label}</span>
                </Link>
                {idx < stages.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-white/30 mx-0.5 shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Right: Evaluator Entitlement Decoupler Switcher */}
          <div className="flex items-center gap-2 self-start xl:self-auto shrink-0 text-[12px]">
            <span className="text-[#CBD5E1] font-medium hidden sm:inline">Active Entitlement:</span>
            <div className="flex rounded-lg bg-black/30 p-0.5 border border-white/10">
              <button
                type="button"
                onClick={() => switchEntitlement("consulting")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-bold transition",
                  activeEntitlement === "consulting" 
                    ? "bg-[#0E8F91] text-white" 
                    : "text-[#CBD5E1] hover:text-white"
                )}
                title="Only Management Consulting Assessment active"
              >
                MC-A Consulting ($150)
              </button>
              <button
                type="button"
                onClick={() => switchEntitlement("personality")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-bold transition",
                  activeEntitlement === "personality" 
                    ? "bg-[#0E8F91] text-white" 
                    : "text-[#CBD5E1] hover:text-white"
                )}
                title="Only Personality & Values Assessment active"
              >
                PV-A Values ($120)
              </button>
              <button
                type="button"
                onClick={() => switchEntitlement("bundle")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-bold transition",
                  activeEntitlement === "bundle" 
                    ? "bg-[#0E8F91] text-white" 
                    : "text-[#CBD5E1] hover:text-white"
                )}
                title="Combined Executive Transformation Bundle with USD 250 Roadmap"
              >
                COMBO-A Bundle + D250 ($250)
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
