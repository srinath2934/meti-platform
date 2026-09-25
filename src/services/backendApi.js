// Frontend API Service connecting to FastAPI Backend (port 8000)
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api/v1';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.detail?.message || `HTTP ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[BackendApi] Error calling ${endpoint}:`, err.message);
    throw err;
  }
}

export const backendApi = {
  // Health
  checkHealth: () => fetch('http://localhost:8000/health').then(r => r.json()),

  // Candidate
  getCandidate: () => request('/candidates/me'),
  getCandidateDashboard: () => request('/candidates/me/dashboard'),
  updateProfile: (profileData) =>
    request('/candidates/me/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    }),
  parseResume: ({ resume_text, linkedin_url }) =>
    request('/candidates/me/parse-resume', {
      method: 'POST',
      body: JSON.stringify({ resume_text, linkedin_url })
    }),

  // Assessment & Attempts
  getActiveAssessment: () => request('/assessments/active'),
  evaluateVideo: ({ transcript, speech_metrics, written_memo }) =>
    request('/assessments/video-evaluation', {
      method: 'POST',
      body: JSON.stringify({ transcript, speech_metrics, written_memo })
    }),
  startAttempt: (candidateId, assessmentId = null) => 
    request(`/assessments/${assessmentId || 'active'}/attempts`, {
      method: 'POST',
      body: JSON.stringify({ candidate_id: candidateId, assessment_id: assessmentId })
    }),
  getAttemptState: (attemptId) => request(`/attempts/${attemptId}`),
  saveResponse: (attemptId, questionId, responseValue, isFinal = false) =>
    request(`/attempts/${attemptId}/responses/${questionId}`, {
      method: 'PUT',
      body: JSON.stringify({ response_value: responseValue, is_final: isFinal })
    }),
  getAdaptiveNext: ({ step, last_answer, confidence, ux_signals, response_time_ms }) =>
    request('/assessments/adaptive-next', {
      method: 'POST',
      body: JSON.stringify({ step, last_answer, confidence, ux_signals, response_time_ms })
    }),
  submitAttempt: (attemptId) =>
    request(`/attempts/${attemptId}/submit`, { method: 'POST' }),

  // Scores & Roadmap
  getScores: () => request('/candidates/me/scores'),
  getRoadmap: () => request('/candidates/me/roadmap'),

  // Cases (Work-Sample)
  getCaseStudy: (caseId = 'cs_omni_turnaround') => request(`/cases/${caseId}`),
  startCaseAttempt: (caseId, candidateId) =>
    request(`/cases/${caseId}/attempts?candidate_id=${candidateId}`, { method: 'POST' }),
  getCaseAttempt: (attemptId) => request(`/case-attempts/${attemptId}`),
  autosaveCase: (attemptId, deliverables) =>
    request(`/case-attempts/${attemptId}`, {
      method: 'PUT',
      body: JSON.stringify(deliverables)
    }),
  submitCase: (attemptId) =>
    request(`/case-attempts/${attemptId}/submit`, { method: 'POST' }),

  // Assessor Review & Calibration
  getAssessorQueue: () => request('/assessor/reviews'),
  submitAssessorOverride: (attemptId, { finalCci, finalCri, reason, reviewerId = 'lead_assessor_modus' }) =>
    request(`/assessor/reviews/${attemptId}/override`, {
      method: 'POST',
      body: JSON.stringify({
        reviewer_id: reviewerId,
        final_cci: finalCci,
        final_cri: finalCri,
        reason: reason
      })
    })
};
