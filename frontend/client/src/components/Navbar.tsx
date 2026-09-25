import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, UserCheck, ShieldCheck, Award, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const isCandidate = location === "/app" || location === "/case" || location === "/studio";
  const isEvaluator = location === "/evaluator" || location === "/assessor";
  const isAdmin = location === "/admin";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        
        {/* Brand Wordmark */}
        <Link href="/" className="flex items-center gap-3.5 transition hover:opacity-90">
          <div className="meti-mark" aria-hidden="true">
            <span />
            <span />
          </div>
          <div>
            <div className="font-sans text-[22px] font-extrabold tracking-[0.12em] text-[#0B3B36] leading-none">METI</div>
            <div className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#52796F] mt-1">Capability intelligence</div>
          </div>
        </Link>

        {/* Desktop Nav Links (Clean, No raw spec codes) */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/video" className="font-sans text-[14px] font-semibold text-[#172321] transition hover:text-[#0E8F91]">
            Orientation
          </Link>
          <Link href="/checkout" className="font-sans text-[14px] font-semibold text-[#172321] transition hover:text-[#0E8F91]">
            Assessments &amp; Pricing
          </Link>
          <Link href="/case" className="font-sans text-[14px] font-semibold text-[#172321] transition hover:text-[#0E8F91]">
            Case Study
          </Link>
          <Link href="/studio" className="font-sans text-[14px] font-semibold text-[#172321] transition hover:text-[#0E8F91]">
            Executive Studio
          </Link>
        </nav>

        {/* Executive Portal Switcher & Action CTAs */}
        <div className="hidden sm:flex items-center gap-4">
          


          <button
            type="button"
            onClick={() => setLocation("/login")}
            className="font-sans text-[14px] font-bold text-[#0B3B36] px-2 py-2 transition hover:text-[#0E8F91]"
          >
            Sign in
          </button>
          <Button
            onClick={() => setLocation("/checkout")}
            className="bg-[#0E8F91] font-sans text-[14px] font-bold text-white hover:bg-[#0A7476] rounded-xl px-5 py-2.5 shadow-mint transition-all duration-200"
          >
            Start Assessment <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-700 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-border bg-white px-6 py-6 lg:hidden animate-fade-in space-y-4">
          


          <nav className="flex flex-col gap-3 font-sans text-[15px] font-semibold text-[#172321] pt-2">
            <Link href="/video" onClick={() => setMobileOpen(false)}>Orientation</Link>
            <Link href="/checkout" onClick={() => setMobileOpen(false)}>Assessments &amp; Pricing</Link>
            <Link href="/case" onClick={() => setMobileOpen(false)}>Case Study</Link>
            <Link href="/studio" onClick={() => setMobileOpen(false)}>Executive Studio</Link>
          </nav>

          <div className="pt-4 border-t border-border flex flex-col gap-2.5">
            <Button
              onClick={() => { setMobileOpen(false); setLocation("/checkout"); }}
              className="w-full bg-[#0E8F91] font-sans text-[14px] font-bold text-white h-11"
            >
              Start Assessment
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
