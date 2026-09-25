import React from 'react';
import { 
  Home, 
  FileText, 
  Target, 
  BookOpen, 
  CheckCircle, 
  UserCheck, 
  Settings, 
  Video, 
  Briefcase,
  User,
  ShieldCheck,
  Circle
} from 'lucide-react';
import { storageAdapter } from '../../services/supabaseClient';

export default function Navbar({ activeRole, setActiveRole, currentTab, setCurrentTab }) {
  const navItems = [
    { id: 'start', label: 'Welcome / Start', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'assessment', label: 'Assessment', icon: FileText },
    { id: 'capabilities', label: 'Capabilities', icon: Target },
    { id: 'development', label: 'Development', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: CheckCircle },
    { id: 'video', label: 'Video & Pitch', icon: Video },
    { id: 'case', label: 'Case Workspace', icon: Briefcase },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row: Brand + Role Switcher + Employee Profile */}
        <div className="flex items-center justify-between h-16 border-b border-[#E5E7EB]">
          
          {/* Brand & Platform Identity */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('start')}>
              <span className="text-[#00B377] font-black text-xl leading-none">✱</span>
              <span className="font-black text-xl tracking-tight text-[#0B3B36]">
                METI
              </span>
              <span className="h-4 w-px bg-[#E5E7EB] hidden sm:block"></span>
              <span className="text-xs font-semibold text-[#526662] hidden sm:block">
                Enterprise Capability Intelligence
              </span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#0B3B36] border border-[#E5E7EB]">
              Consulting Track
            </span>
          </div>

          {/* Right Header Controls: Role Switcher & Employee Profile */}
          <div className="flex items-center gap-3">
            
            {/* System Role Selector */}
            <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-[#E5E7EB] text-xs font-semibold">
              <button
                onClick={() => { 
                  setActiveRole('CANDIDATE'); 
                  if (currentTab === 'assessor' || currentTab === 'admin') setCurrentTab('start'); 
                }}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeRole === 'CANDIDATE'
                    ? 'bg-white text-[#0B3B36] shadow-2xs font-bold'
                    : 'text-[#526662] hover:text-[#0B3B36]'
                }`}
              >
                ● Candidate
              </button>
              
              <button
                onClick={() => { setActiveRole('ASSESSOR'); setCurrentTab('assessor'); }}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeRole === 'ASSESSOR'
                    ? 'bg-white text-[#0B3B36] shadow-2xs font-bold'
                    : 'text-[#526662] hover:text-[#0B3B36]'
                }`}
              >
                Assessor
              </button>

              <button
                onClick={() => { setActiveRole('ADMIN'); setCurrentTab('admin'); }}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeRole === 'ADMIN'
                    ? 'bg-white text-[#0B3B36] shadow-2xs font-bold'
                    : 'text-[#526662] hover:text-[#0B3B36]'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Profile Avatar & Status */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#E5E7EB]">
              <div className="h-8 w-8 rounded-full bg-[#0B3B36] text-white text-xs font-bold flex items-center justify-center">
                SJ
              </div>
              <div className="text-left text-xs leading-tight">
                <p className="font-bold text-[#0B3B36]">Sarah Jenkins</p>
                <p className="text-[11px] text-[#526662]">AI Engineering</p>
              </div>
            </div>

          </div>
        </div>

        {/* Primary Navigation Rail */}
        {activeRole === 'CANDIDATE' && (
          <nav className="flex items-center space-x-1 sm:space-x-3 py-2 overflow-x-auto scrollbar-none" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || 
                (item.id === 'capabilities' && currentTab === 'results') ||
                (item.id === 'development' && currentTab === 'roadmap');

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'capabilities') setCurrentTab('results');
                    else if (item.id === 'development') setCurrentTab('roadmap');
                    else setCurrentTab(item.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-[#0B3B36] bg-[#F0FDF8] font-bold border border-[#00B377]/30'
                      : 'text-[#526662] hover:text-[#0B3B36] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#00B377]' : 'text-[#8E9F9C]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-[#526662]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#00B377]"></span>
              <span>Autosave active</span>
            </div>
          </nav>
        )}

      </div>
    </header>
  );
}
