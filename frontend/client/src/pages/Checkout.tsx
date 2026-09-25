import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Check, CheckCircle2, ArrowRight, ShieldCheck, Tag, Sparkles, Building, 
  HelpCircle, CreditCard, Lock, ArrowLeft, Star, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

type ProductId = "personality" | "consulting" | "bundle";

interface ProductPlan {
  id: ProductId;
  name: string;
  tagline: string;
  priceUSD: number;
  isPopular?: boolean;
  ctaText: string;
  buyerFeel: string;
  features: string[];
  entitlements: string[];
}

const products: ProductPlan[] = [
  {
    id: "personality",
    name: "Professional Personality & Values Assessment",
    tagline: "Understand how you naturally work, lead, communicate, learn, and make decisions in a professional environment.",
    priceUSD: 120,
    ctaText: "Start Professional Profile",
    buyerFeel: "Affordable, useful, and professionally relevant",
    features: [
      "Enterprise Talent DNA profile",
      "Schwartz-informed values profile",
      "Professional strengths and preferences",
      "Development themes",
      "Summary of Findings",
      "Save-and-resume access"
    ],
    entitlements: ["ENT_TALENT_DNA", "ENT_SCHWARTZ_VALUES", "ENT_SUMMARY_FINDINGS"]
  },
  {
    id: "consulting",
    name: "Management Consulting Assessment",
    tagline: "Demonstrate how you structure ambiguous problems, interpret business evidence, and communicate recommendations under pressure.",
    priceUSD: 150,
    ctaText: "Start Consulting Assessment",
    buyerFeel: "A serious assessment of the work I want to do",
    features: [
      "Adaptive consulting diagnostic",
      "Written consulting work sample",
      "Executive video briefing",
      "Capability Index",
      "Evidence Confidence score",
      "Consulting strengths and gaps",
      "Summary of Findings",
      "Recommended consulting pathway"
    ],
    entitlements: ["ENT_CONSULTING_CORE", "ENT_WORK_SAMPLE_S09", "ENT_SUMMARY_FINDINGS", "ENT_CAPABILITY_INDEX"]
  },
  {
    id: "bundle",
    name: "Combined Intelligence Bundle",
    tagline: "See the complete picture of how you think, work, communicate, and perform in consulting situations.",
    priceUSD: 250,
    isPopular: true,
    ctaText: "Choose Complete Bundle",
    buyerFeel: "Complete picture · Clearly the best-value option",
    features: [
      "Management Consulting Assessment",
      "Professional Personality & Values Assessment",
      "One shared profile with no duplicate questions",
      "Capability and values interpretation",
      "Combined Summary of Findings",
      "Detailed Intelligence Report",
      "Personalized 16-week Roadmap",
      "Human-calibrated review"
    ],
    entitlements: [
      "ENT_CONSULTING_CORE", 
      "ENT_TALENT_DNA", 
      "ENT_SCHWARTZ_VALUES", 
      "ENT_DETAILED_ROADMAP_S10", 
      "ENT_ASSESSOR_REVIEW_S11"
    ]
  }
];

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<ProductId>("bundle");
  const [addD250Roadmap, setAddD250Roadmap] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherError, setVoucherError] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"selection" | "payment" | "confirmation">("selection");
  const [paymentError, setPaymentError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlan = products.find((p) => p.id === selectedProduct) || products[2];
  const d250Price = (selectedProduct !== "bundle" && addD250Roadmap) ? 250 : 0;
  const rawTotal = currentPlan.priceUSD + d250Price;
  const finalPrice = voucherApplied ? 0 : rawTotal;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError("");
    const cleaned = voucherCode.trim().toUpperCase();
    if (cleaned === "MODUS-EXEC-2026" || cleaned === "ENTERPRISE-SPONSOR" || cleaned === "HACKATHON-VIP") {
      setVoucherApplied(true);
    } else {
      setVoucherError("Invalid corporate voucher code. Try 'MODUS-EXEC-2026'.");
    }
  };

  const handleProceedToPayment = () => {
    if (finalPrice === 0) {
      handleFinalizeActivation();
    } else {
      setCheckoutStep("payment");
    }
  };

  const handleSimulatePayment = (success: boolean) => {
    setIsProcessing(true);
    setPaymentError("");
    setTimeout(() => {
      setIsProcessing(false);
      if (success) {
        handleFinalizeActivation();
      } else {
        setPaymentError("Your card was declined. Please try a different payment method.");
      }
    }, 1000);
  };

  const handleFinalizeActivation = () => {
    setIsProcessing(true);
    const entitlementData = {
      product: selectedProduct,
      entitlements: currentPlan.entitlements,
      hasD250: selectedProduct === "bundle" || addD250Roadmap || voucherApplied,
      isSponsored: voucherApplied,
      voucherCode: voucherApplied ? voucherCode : null,
      activatedAt: new Date().toISOString()
    };
    localStorage.setItem("meti_entitlement", JSON.stringify(entitlementData));

    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep("confirmation");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-[#172321] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <span className="eyebrow">Program Enrollment · Assessment Selection</span>
              <Badge className="bg-[#E3F3F1] text-[#0E8F91] border-0 rounded-full px-3 py-0.5 text-[11px] font-bold">
                Step 3 of 4
              </Badge>
            </div>
            <h1 className="mt-3 font-sans text-[clamp(32px,3.8vw,46px)] font-extrabold tracking-tight text-[#0B3B36]">
              {checkoutStep === "selection" && "Select Your Assessment Program"}
              {checkoutStep === "payment" && "Secure Payment"}
              {checkoutStep === "confirmation" && "Activation Complete"}
            </h1>
            <p className="mt-3 font-sans text-[16px] leading-relaxed text-[#172321]">
              {checkoutStep === "selection" && "METI supports distinct modular tracks. Choose either Consulting Readiness, Enterprise Talent DNA & Values, or the Combined Executive Assessment."}
              {checkoutStep === "payment" && "Complete your purchase to activate your assessment workspace."}
              {checkoutStep === "confirmation" && "Your entitlements have been securely provisioned to your profile."}
            </p>
          </div>

          {checkoutStep === "selection" && (
            <>
              {/* 3-Tier Product Cards */}
              <div className="mt-12 grid gap-8 lg:grid-cols-3 items-stretch">
            {products.map((plan) => {
              const isSelected = selectedProduct === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedProduct(plan.id)}
                  className={cn(
                    "relative flex flex-col justify-between rounded-3xl border-2 p-8 transition-all duration-200 cursor-pointer bg-white",
                    isSelected 
                      ? "border-[#0E8F91] shadow-deep ring-2 ring-[#0E8F91]/20 -translate-y-1" 
                      : "border-border shadow-card hover:border-[#0E8F91]/40 hover:-translate-y-0.5",
                    plan.isPopular && "lg:-mt-2 lg:mb-2"
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#0B3B36] text-white px-4 py-1 font-sans text-[11px] font-extrabold uppercase tracking-[0.14em] shadow-md flex items-center gap-1.5">
                      <Star className="h-3 w-3 text-[#C58A32] fill-[#C58A32]" /> Recommended Bundle
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-sans text-[12px] font-bold text-[#52796F] uppercase tracking-wider">
                        {plan.id === "bundle" ? "Complete Intelligence" : "Specialized Track"}
                      </div>
                      <input
                        type="radio"
                        name="plan"
                        checked={isSelected}
                        onChange={() => setSelectedProduct(plan.id)}
                        className="h-5 w-5 accent-[#0E8F91] cursor-pointer"
                      />
                    </div>

                    <h2 className="mt-3 font-sans text-[22px] font-bold text-[#0B3B36] leading-tight">
                      {plan.name}
                    </h2>
                    <p className="mt-2 font-sans text-[14px] text-[#52796F] leading-relaxed">
                      {plan.tagline}
                    </p>

                    <div className="mt-5 flex items-baseline gap-1 border-y border-border py-4">
                      <span className="font-sans text-[18px] font-bold text-[#0B3B36]">$</span>
                      <strong className="font-sans text-[46px] font-extrabold text-[#0B3B36] leading-none">
                        {plan.priceUSD}
                      </strong>
                      <span className="font-sans text-[14px] font-medium text-[#52796F] ml-1">USD · single candidate</span>
                    </div>

                    <div className="mt-3 rounded-lg bg-[#F8FAFB] px-3 py-1.5 text-[12px] font-semibold text-[#0E8F91] border border-border/80">
                      &ldquo;{plan.buyerFeel}&rdquo;
                    </div>

                    {/* Features list */}
                    <div className="mt-5 font-sans text-[12px] font-bold uppercase tracking-wider text-[#52796F]">
                      Includes:
                    </div>
                    <ul className="mt-2 space-y-2.5 font-sans text-[14px] text-[#172321]">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-[#0E8F91] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <Button
                      type="button"
                      onClick={() => setSelectedProduct(plan.id)}
                      className={cn(
                        "w-full rounded-xl h-12 font-sans text-[14px] font-bold transition-all duration-200",
                        isSelected
                          ? "bg-[#0E8F91] text-white hover:bg-[#0A7476] shadow-mint"
                          : "border-2 border-border bg-[#F8FAFB] text-[#0B3B36] hover:border-[#0E8F91]"
                      )}
                    >
                      {isSelected ? `${plan.ctaText} (Selected)` : plan.ctaText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Emotional Promise Banner */}
          <div className="mt-10 rounded-2xl border border-[#BCE8D7] bg-[#F2FBF7] p-5 text-center max-w-4xl mx-auto shadow-xs">
            <p className="font-sans text-[14px] text-[#0B3B36] font-medium">
              <strong className="font-bold text-[#0E8F91]">The METI Commitment:</strong> &ldquo;I have been seen accurately, evaluated fairly, and given a credible next move.&rdquo;
            </p>
            <span className="mt-1 block text-[12px] text-[#52796F]">
              Every assessment is calibrated by accredited consulting practice leaders. No hidden paywalls, no artificial scoring.
            </span>
          </div>

          {/* Checkout & Corporate Sponsorship Module */}
          <div className="mt-10 rounded-3xl border-2 border-border bg-white p-8 lg:p-10 shadow-card max-w-4xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              
              {/* Left Column: Corporate Voucher Code */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2 font-sans text-[15px] font-bold text-[#0B3B36]">
                  <Building className="h-5 w-5 text-[#0E8F91]" />
                  <span>Corporate Sponsor or Employer Voucher</span>
                </div>
                <p className="font-sans text-[14px] text-[#52796F] leading-relaxed">
                  If your firm or academic sponsor provided an entitlement voucher, enter it below to apply 100% employer subsidy.
                </p>

                <form onSubmit={handleApplyVoucher} className="flex gap-3">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="e.g. MODUS-EXEC-2026"
                    className="h-12 flex-1 rounded-xl border-2 border-border bg-[#F8FAFB] px-4 font-sans text-[14px] font-bold text-[#0B3B36] outline-none transition focus:border-[#0E8F91] focus:bg-white uppercase tracking-wider"
                  />
                  <Button
                    type="submit"
                    className="bg-[#0B3B36] text-white hover:bg-[#062320] font-sans text-[13px] font-bold rounded-xl px-5 h-12"
                  >
                    Apply Code
                  </Button>
                </form>

                {voucherApplied && (
                  <div className="rounded-xl bg-[#E3F3F1] border border-[#0E8F91]/40 p-3.5 text-[13px] font-bold text-[#0B3B36] flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#0E8F91] shrink-0" />
                    <span>Voucher <strong>{voucherCode.toUpperCase()}</strong> applied! 100% Enterprise Subsidy ($0.00 Due).</span>
                  </div>
                )}

                {voucherError && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-[13px] font-bold text-red-700">
                    {voucherError}
                  </div>
                )}

                {/* Pre-fill suggestion badge */}
                {!voucherApplied && (
                  <button
                    type="button"
                    onClick={() => { setVoucherCode("MODUS-EXEC-2026"); setVoucherApplied(true); }}
                    className="font-sans text-[12px] font-semibold text-[#0E8F91] hover:underline flex items-center gap-1.5"
                  >
                    <Tag className="h-3.5 w-3.5" /> ⚡ Click to auto-apply demo voucher: <strong>MODUS-EXEC-2026</strong>
                  </button>
                )}

                {/* Human Calibration Box */}
                <div className="mt-6 rounded-2xl border border-border bg-[#F8FAFB] p-4.5 space-y-2">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-[#0B3B36]">
                    <ShieldCheck className="h-4 w-4 text-[#0E8F91]" />
                    <span>Human-Calibrated Assessment Desk</span>
                  </div>
                  <p className="text-[12px] text-[#52796F] leading-relaxed">
                    Evaluated against real consulting benchmarks. Candidate submissions are reviewed with Senior Partner calibration to ensure qualitative fidelity and actionable development paths.
                  </p>
                </div>
              </div>

              {/* Right Column: Order Summary & Deliverables Verification */}
              <div className="lg:col-span-6 rounded-2xl bg-[#F8FAFB] border-2 border-border p-6 flex flex-col justify-between">
                <div>
                  <div className="font-sans text-[12px] font-bold uppercase tracking-wider text-[#52796F]">
                    Order Summary &amp; Deliverables
                  </div>
                  <h3 className="mt-1 font-sans text-[18px] font-bold text-[#0B3B36]">
                    {currentPlan.name}
                  </h3>
                  
                  {/* Exact Feedback Deliverables Message */}
                  <div className="mt-4 rounded-xl bg-white border border-border p-4 space-y-2.5">
                    <p className="text-[13px] font-bold text-[#0B3B36]">
                      You are purchasing {currentPlan.name} for USD {currentPlan.priceUSD}.
                    </p>
                    <div className="text-[13px] text-[#172321] space-y-1.5">
                      <span className="text-[12px] font-bold uppercase text-[#52796F]">You will receive:</span>
                      <ul className="space-y-1 pl-1">
                        {currentPlan.id === "bundle" && (
                          <>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Both assessments.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> A combined professional profile.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Evidence-based capability findings.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> A detailed intelligence report.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> A personalized development roadmap.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Access to human-calibrated review.</li>
                          </>
                        )}
                        {currentPlan.id === "consulting" && (
                          <>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Adaptive consulting diagnostic.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Written consulting work sample.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Executive video briefing.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Capability Index &amp; Confidence score.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Summary of Findings.</li>
                          </>
                        )}
                        {currentPlan.id === "personality" && (
                          <>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Enterprise Talent DNA profile.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Schwartz-informed values profile.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Professional strengths and preferences.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Development themes.</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-[#0E8F91]" /> Summary of Findings.</li>
                          </>
                        )}
                      </ul>
                      <p className="pt-2 text-[11px] text-[#52796F] italic border-t border-border/60">
                        Payment note: Your access begins immediately. You can save and resume each assessment at any time.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-b border-border pb-3 font-sans text-[14px]">
                    <span className="text-[#52796F]">Subtotal</span>
                    <span className="font-bold text-[#0B3B36]">${currentPlan.priceUSD}.00</span>
                  </div>

                  {voucherApplied && (
                    <div className="flex items-center justify-between border-b border-border py-2.5 font-sans text-[14px] text-[#0E8F91] font-bold">
                      <span>Enterprise Subsidy</span>
                      <span>-${rawTotal}.00</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 font-sans">
                    <strong className="text-[16px] font-bold text-[#0B3B36]">Total Due</strong>
                    <strong className="text-[28px] font-extrabold text-[#0B3B36]">
                      ${finalPrice}.00
                    </strong>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={isProcessing}
                    className="w-full bg-[#0E8F91] text-white hover:bg-[#0A7476] font-sans text-[15px] font-bold rounded-xl h-13 shadow-mint transition-all duration-200"
                  >
                    {isProcessing ? "Activating Entitlements..." : voucherApplied ? "Activate Sponsored Entitlement →" : "Proceed to Payment ($" + finalPrice + ") →"}
                  </Button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-[#52796F] font-semibold">
                    <ShieldCheck className="h-4 w-4 text-[#0E8F91]" />
                    <span>Instant access · Save &amp; resume anytime</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
            </>
          )}

          {checkoutStep === "payment" && (
            <div className="mt-12 max-w-lg mx-auto bg-white rounded-3xl border-2 border-border shadow-card p-8">
              <h2 className="text-[20px] font-bold text-[#0B3B36] mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#0E8F91]" /> Payment Details
              </h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-[13px] font-bold text-[#0B3B36] mb-1.5">Card Information (Simulated)</label>
                  <input type="text" placeholder="Card number" className="w-full h-12 rounded-xl border border-border px-4 text-[14px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="w-full h-12 rounded-xl border border-border px-4 text-[14px]" />
                  <input type="text" placeholder="CVC" className="w-full h-12 rounded-xl border border-border px-4 text-[14px]" />
                </div>
              </div>

              {paymentError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold">
                  {paymentError}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => handleSimulatePayment(true)}
                  disabled={isProcessing}
                  className="w-full h-12 bg-[#0E8F91] text-white hover:bg-[#0A7476] font-bold rounded-xl shadow-mint"
                >
                  {isProcessing ? "Processing..." : `Pay $${finalPrice}.00 (Simulate Success)`}
                </Button>
                <Button 
                  onClick={() => handleSimulatePayment(false)}
                  disabled={isProcessing}
                  variant="outline"
                  className="w-full h-12 border-2 border-border text-[#0B3B36] font-bold rounded-xl"
                >
                  Simulate Payment Failure
                </Button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep("selection")}
                  className="mt-2 text-[13px] font-bold text-[#52796F] hover:text-[#0B3B36]"
                >
                  ← Go back to product selection
                </button>
              </div>
            </div>
          )}

          {checkoutStep === "confirmation" && (
            <div className="mt-12 max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#0E8F91]/20 shadow-deep p-10 text-center">
              <div className="mx-auto w-16 h-16 bg-[#E3F3F1] text-[#0E8F91] rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-[28px] font-extrabold text-[#0B3B36] mb-2">
                Your {currentPlan.name} is Active
              </h2>
              <p className="text-[14px] text-[#52796F] max-w-lg mx-auto mb-6">
                Your access begins immediately. You can save and resume each assessment module at any time.
              </p>
              
              <div className="bg-[#F8FAFB] border border-border rounded-2xl p-6 text-left mb-8 space-y-4">
                <h3 className="font-bold text-[15px] text-[#0B3B36] border-b border-border pb-2">Activated Deliverables</h3>
                
                {selectedProduct === "bundle" ? (
                  <div className="space-y-3">
                    <p className="text-[13px] text-[#52796F]">
                      You have access to both:
                    </p>
                    <div className="space-y-2 pl-1 text-[14px] text-[#0B3B36] font-semibold">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0E8F91]" /> Management Consulting Assessment
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0E8F91]" /> Professional Personality &amp; Values Assessment
                      </div>
                    </div>
                    <p className="text-[13px] text-[#52796F] pt-2 border-t border-border/80">
                      Your results will combine demonstrated consulting capability with professional behaviour, values, and development preferences.
                    </p>
                    <div className="space-y-1.5 text-[13px] pt-1">
                      <div className="flex items-center gap-2 text-[#0E8F91] font-bold">
                        <Check className="h-4 w-4" /> Evidence-based capability findings
                      </div>
                      <div className="flex items-center gap-2 text-[#0E8F91] font-bold">
                        <Check className="h-4 w-4" /> Detailed Intelligence Report
                      </div>
                      <div className="flex items-center gap-2 text-[#0E8F91] font-bold">
                        <Check className="h-4 w-4" /> Personalized 16-Week Transformation Roadmap
                      </div>
                      <div className="flex items-center gap-2 text-[#0E8F91] font-bold">
                        <Check className="h-4 w-4" /> Senior Partner Human-Calibrated Review
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-[#0E8F91]" />
                      <span className="text-[14px] text-[#172321]">{currentPlan.name} Access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-[#0E8F91]" />
                      <span className="text-[14px] text-[#172321]">Included Summary of Findings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-[#0E8F91]" />
                      <span className="text-[14px] text-[#172321]">Save-and-resume modular progress</span>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={() => setLocation("/app")}
                className="w-full h-14 bg-[#0B3B36] text-white hover:bg-[#172321] font-bold rounded-xl text-[16px] shadow-sm"
              >
                Next Step: Continue Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
