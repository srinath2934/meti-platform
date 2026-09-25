import { ShieldCheck, LockKeyhole, FileText, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#0B3B36] bg-[#0B3B36] text-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3.5">
              <div className="meti-mark" aria-hidden="true">
                <span />
                <span />
              </div>
              <div>
                <div className="font-sans text-[22px] font-extrabold tracking-[0.12em] text-white leading-none">METI</div>
                <div className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#0E8F91] mt-1">Capability intelligence</div>
              </div>
            </div>
            <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-[#CBD5E1]">
              Modus Enterprise Talent Intelligence (METI) assesses and certifies business and management consulting readiness through context-aware profile evaluation, adaptive case diagnostics, and demonstrated problem solving.
            </p>
            <div className="mt-6 flex items-center gap-3 font-sans text-[14px] font-semibold text-[#0E8F91]">
              <ShieldCheck className="h-5 w-5" />
              <span>Consent-backed evaluation · Human-in-the-loop audit</span>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-[13px] font-extrabold uppercase tracking-[0.14em] text-white">Pillars &amp; Framework</h4>
            <ul className="mt-4 space-y-3 font-sans text-[14px] text-[#CBD5E1]">
              <li><a href="#pillars" className="transition hover:text-white">Profile &amp; Context Ingestion</a></li>
              <li><a href="#pillars" className="transition hover:text-white">Adaptive Scenario Diagnostic</a></li>
              <li><a href="#pillars" className="transition hover:text-white">Demonstrated Case Solving</a></li>
              <li><a href="#competencies" className="transition hover:text-white">Competency Dimensions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[13px] font-extrabold uppercase tracking-[0.14em] text-white">Governance &amp; Trust</h4>
            <ul className="mt-4 space-y-3 font-sans text-[14px] text-[#CBD5E1]">
              <li className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-[#0E8F91]" /> Evidence Isolation Policy</li>
              <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#0E8F91]" /> AI Assessment Consent (F01)</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#0E8F91]" /> Non-Punitive Feedback</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center font-sans text-[13px] text-[#CBD5E1]">
          <div>© 2026 Modus Enterprise Talent Intelligence. All rights reserved.</div>
          <div className="flex gap-6 font-medium">
            <span>Enterprise Benchmark v1.0</span>
            <span>Calibrated against 1,200+ consulting profiles</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
