import React, { useState } from 'react';
import { 
  Settings, 
  Layers, 
  Database, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Eye, 
  Plus,
  BarChart,
  GitBranch,
  Sliders,
  Filter,
  Search,
  Activity,
  Users,
  Check,
  Download
} from 'lucide-react';
import { adminAssessmentMeta, assessmentQuestions, candidateCompetencies } from '../../data/mockMetiData';

export default function AdminConsole() {
  const [activeTab, setActiveTab] = useState('Assessment Builder');
  const [filterQuery, setFilterQuery] = useState('');

  const adminTabs = [
    'Assessment Builder',
    'Question Bank',
    'Competency Model',
    'Adaptive Rules',
    'Scoring',
    'Reports',
    'Calibration',
    'Users',
    'Audit'
  ];

  const questions = [
    { id: 'Q-001', domain: 'Problem Structuring', type: 'Single Choice', difficulty: '0.68', status: 'ACTIVE', updated: '2026-09-21' },
    { id: 'Q-002', domain: 'Hypothesis Formation', type: 'Scenario Dilemma', difficulty: '0.74', status: 'ACTIVE', updated: '2026-09-22' },
    { id: 'Q-003', domain: 'Commercial Thinking', type: 'Trade-off Matrix', difficulty: '0.82', status: 'ACTIVE', updated: '2026-09-23' },
    { id: 'Q-004', domain: 'Stakeholder Alignment', type: 'Executive Escalation', difficulty: '0.61', status: 'ACTIVE', updated: '2026-09-24' },
    { id: 'Q-005', domain: 'Market Dynamics', type: 'Channel Sizing', difficulty: '0.70', status: 'REVIEW', updated: '2026-09-20' }
  ];

  const auditEvents = [
    { timestamp: '2026-09-24 14:32:10 UTC', user: 'dstirling@modus.com', action: 'ASSESSOR_OVERRIDE', target: 'cand_sarah_jenkins', status: 'SUCCESS' },
    { timestamp: '2026-09-24 11:15:00 UTC', user: 'system_nim_ai', action: 'BAYESIAN_CALIBRATION_RUN', target: 'batch_2026_q3', status: 'SUCCESS' },
    { timestamp: '2026-09-23 18:22:45 UTC', user: 'admin_rpatel', action: 'ADAPTIVE_RULE_UPDATE', target: 'rule_min_information_gain', status: 'AUDITED' },
    { timestamp: '2026-09-23 09:04:12 UTC', user: 'compliance_officer', action: 'DEMOGRAPHIC_PARITY_AUDIT', target: 'track_consulting_v1.1', status: 'PASSED' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in text-slate-900">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Enterprise Governance & Operations
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              ISO/IEC 27001 Audited
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            ADMINISTRATION & GOVERNANCE CONSOLE
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Configure competency models, manage item banks, calibrate adaptive algorithms, and maintain compliance audit logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-400 block">Definition Version</span>
            <span className="font-mono font-bold text-slate-900">MC-A v1.1 • PUBLISHED</span>
          </div>
        </div>
      </div>

      {/* Section 16: Denser Tab Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-medium scrollbar-none">
        {adminTabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-t-lg transition-all whitespace-nowrap border-b-2 font-semibold ${
                isActive
                  ? 'border-slate-900 text-slate-900 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Information-Dense Tab Contents */}
      <div className="white-panel p-6 space-y-6">
        
        {/* Question Bank Tab */}
        {activeTab === 'Question Bank' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Filter by question ID or domain..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-hidden focus:border-slate-900 w-64"
                  />
                </div>
                <span className="text-xs text-slate-500">Showing 5 active items</span>
              </div>

              <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                <span>New Item</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Item ID</th>
                    <th className="py-2.5 px-3">Competency Domain</th>
                    <th className="py-2.5 px-3">Question Type</th>
                    <th className="py-2.5 px-3">Difficulty (IRT b)</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Last Calibrated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {questions.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{q.id}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{q.domain}</td>
                      <td className="py-2.5 px-3 text-slate-600">{q.type}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">{q.difficulty}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{q.updated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Audit Tab */}
        {activeTab === 'Audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Immutable Compliance Audit Trail
              </h3>
              <button className="btn-secondary text-xs py-1 px-2.5 flex items-center gap-1.5">
                <Download className="h-3 w-3" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Actor / User</th>
                    <th className="py-2.5 px-3">Action Type</th>
                    <th className="py-2.5 px-3">Target Subject</th>
                    <th className="py-2.5 px-3">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {auditEvents.map((evt, i) => (
                    <tr key={i} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 text-slate-600">{evt.timestamp}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-900">{evt.user}</td>
                      <td className="py-2.5 px-3 text-blue-700 font-semibold">{evt.action}</td>
                      <td className="py-2.5 px-3 text-slate-700">{evt.target}</td>
                      <td className="py-2.5 px-3">
                        <span className="text-[11px] font-bold text-emerald-700">✓ {evt.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Default View (Assessment Builder & Overview) */}
        {activeTab !== 'Question Bank' && activeTab !== 'Audit' && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {activeTab} Management
              </h3>
              <span className="text-slate-500">Tenancy: Enterprise Global</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block">Configured Thresholds</span>
                <span className="text-lg font-bold text-slate-900">CRI Benchmark: 70%</span>
                <p className="text-[11px] text-slate-500">Deployable for Associate Consultant engagements</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block">Bayesian Prior Weight</span>
                <span className="text-lg font-bold text-slate-900">0.25 Resume / 0.75 Evidence</span>
                <p className="text-[11px] text-slate-500">Regulates against CV credential bias</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 block">Protected Trait Isolation</span>
                <span className="text-lg font-bold text-emerald-700">Zero-Leakage Verified</span>
                <p className="text-[11px] text-slate-500">Demographic parity audit score: 0.99</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-2">
              <span className="font-semibold text-slate-900 block">Active Competency Taxonomy</span>
              <p className="text-slate-600 leading-relaxed">
                Management Consulting Track v1.1 utilizes 5 foundational competency pillars (Problem Solving, Strategic Thinking, Quantitative Analysis, Executive Communication, Client Leadership) decomposed into 15 behavioral anchors.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
