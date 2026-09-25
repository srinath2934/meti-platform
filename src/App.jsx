import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import PersonalizedAssessmentStart from './components/candidate/PersonalizedAssessmentStart';
import CandidateDashboard from './components/candidate/CandidateDashboard';
import AssessmentRunner from './components/candidate/AssessmentRunner';
import VideoAssessment from './components/candidate/VideoAssessment';
import CaseWorkspace from './components/candidate/CaseWorkspace';
import ResultsView from './components/candidate/ResultsView';
import RoadmapView from './components/candidate/RoadmapView';
import ProgressJourneyView from './components/candidate/ProgressJourneyView';
import AssessorDesk from './components/assessor/AssessorDesk';
import AdminConsole from './components/admin/AdminConsole';

export default function App() {
  const [activeRole, setActiveRole] = useState('CANDIDATE');
  // Default to Screen 01: Personalized Assessment Start as mandated
  const [currentTab, setCurrentTab] = useState('start');

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#171717] selection:bg-[#2563EB] selection:text-white font-sans">
      
      {/* Universal Executive Navigation Header (shown on workspaces; subtle on start) */}
      {currentTab !== 'start' && (
        <Navbar 
          activeRole={activeRole} 
          setActiveRole={setActiveRole} 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
        />
      )}

      {/* Main Workspace Area */}
      <main className="flex-1">
        
        {/* Candidate / Employee Experience */}
        {activeRole === 'CANDIDATE' && (
          <>
            {/* Screen 01: Personalized Assessment Start */}
            {currentTab === 'start' && (
              <PersonalizedAssessmentStart 
                onStartAssessment={() => setCurrentTab('assessment')} 
              />
            )}

            {/* Employee Workspace / Dashboard */}
            {currentTab === 'dashboard' && (
              <CandidateDashboard onNavigate={(target) => setCurrentTab(target)} />
            )}

            {/* Screen 02 & 03: Adaptive Assessment Sequence */}
            {currentTab === 'assessment' && (
              <AssessmentRunner 
                onComplete={() => setCurrentTab('video')} 
                onExit={() => setCurrentTab('start')} 
              />
            )}

            {/* Multimodal Video & Voice Pitch */}
            {currentTab === 'video' && (
              <VideoAssessment 
                onComplete={() => setCurrentTab('case')}
                onBack={() => setCurrentTab('assessment')}
              />
            )}

            {/* Consulting Case Work Sample */}
            {currentTab === 'case' && (
              <CaseWorkspace 
                onSubmitCase={() => setCurrentTab('results')} 
              />
            )}

            {/* Evidence-First Capabilities */}
            {currentTab === 'results' && (
              <ResultsView 
                onOpenRoadmap={() => setCurrentTab('roadmap')} 
              />
            )}

            {currentTab === 'capabilities' && (
              <ResultsView 
                onOpenRoadmap={() => setCurrentTab('roadmap')} 
              />
            )}

            {/* Action-Oriented Development Plan */}
            {currentTab === 'roadmap' && (
              <RoadmapView 
                onNavigateToPractice={(target) => setCurrentTab(target)}
              />
            )}

            {currentTab === 'development' && (
              <RoadmapView 
                onNavigateToPractice={(target) => setCurrentTab(target)}
              />
            )}

            {/* Capability Journey Progress */}
            {currentTab === 'progress' && (
              <ProgressJourneyView 
                onNavigate={(target) => setCurrentTab(target)}
              />
            )}
          </>
        )}

        {/* Assessor Calibration Desk */}
        {activeRole === 'ASSESSOR' && (
          <AssessorDesk />
        )}

        {/* Admin Governance Experience */}
        {activeRole === 'ADMIN' && (
          <AdminConsole />
        )}

      </main>

      {/* Enterprise Quiet Footer */}
      {currentTab !== 'start' && (
        <footer className="border-t border-[#E5E7EB] bg-white py-6 px-4 text-center text-xs text-[#667085]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>
              METI — Modus Enterprise Talent Intelligence Platform • Consulting Track v1.1
            </span>
            <div className="flex items-center gap-4 text-[#667085]">
              <span>WCAG 2.2 AA Certified</span>
              <span>•</span>
              <span>Zero Protected-Trait Bias</span>
              <span>•</span>
              <span>ISO/IEC 27001 Audited</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
