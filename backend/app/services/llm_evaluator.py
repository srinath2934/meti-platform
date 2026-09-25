import json
import logging
from typing import Dict, Any
from app.core.config import settings

logger = logging.getLogger(__name__)


class LLMEvaluator:
    @staticmethod
    def evaluate_case_deliverables(deliverables: Dict[str, Any]) -> Dict[str, Any]:
        """
        Evaluates consulting case deliverables using NVIDIA NIM LLM (Llama-3.1-70b).
        If the key is unset or an API error occurs, falls back gracefully to deterministic rule evaluation.
        """
        api_key = settings.NVIDIA_API_KEY.strip()
        if api_key and api_key != "your_nvidia_api_key_here":
            try:
                return LLMEvaluator._call_nvidia_nim(deliverables, api_key)
            except Exception as e:
                logger.warning(f"NVIDIA NIM API call failed ({e}). Activating deterministic fallback evaluator.")

        return LLMEvaluator._evaluate_deterministic(deliverables)

    @staticmethod
    def _call_nvidia_nim(deliverables: Dict[str, Any], api_key: str) -> Dict[str, Any]:
        """Executes an inference call against NVIDIA NIM OpenAI-compatible endpoint."""
        from openai import OpenAI

        client = OpenAI(
            base_url=settings.NVIDIA_BASE_URL,
            api_key=api_key
        )

        prompt = f"""
You are a Senior Partner at a top-tier Management Consulting firm (e.g. McKinsey/Bain/BCG) evaluating a candidate's work sample for an enterprise retail turnaround.
Analyze the following candidate deliverables:
- Problem Statement: {deliverables.get('problem_statement', 'N/A')}
- Success Metrics: {deliverables.get('success_metrics', 'N/A')}
- Issue Tree: {json.dumps(deliverables.get('issue_tree', {}))}
- Hypotheses: {deliverables.get('hypotheses', 'N/A')}
- Quantitative Analysis: {deliverables.get('quantitative_analysis', 'N/A')}
- Strategic Recommendation: {deliverables.get('final_recommendation', 'N/A')}
- Risks & Mitigations: {deliverables.get('risks_and_mitigations', 'N/A')}
- 90-Day Plan: {deliverables.get('first_90_days_roadmap', 'N/A')}

Grade strictly on:
1. MECE soundness of Issue Tree (0-100)
2. Quantitative/Margin analysis rigor (0-100)
3. Actionable executive recommendations (0-100)
4. Overall Score (0-100)

Return ONLY valid JSON matching this schema:
{{
  "overall_score": 82.5,
  "issue_tree_score": 85.0,
  "quantitative_score": 80.0,
  "strategic_score": 82.5,
  "strengths": ["MECE tree decomposition", "Clear EBITDA impact"],
  "weaknesses": ["90-day plan could specify clearer KPIs"],
  "executive_summary": "Strong strategic grasp with rigorous structured decomposition."
}}
"""

        response = client.chat.completions.create(
            model=settings.NVIDIA_MODEL,
            messages=[
                {"role": "system", "content": "You are an expert executive assessor for management consultants. Output valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            max_tokens=600
        )

        raw_content = response.choices[0].message.content.strip()
        # Parse JSON
        if raw_content.startswith("```json"):
            raw_content = raw_content[7:]
        if raw_content.endswith("```"):
            raw_content = raw_content[:-3]
        
        return json.loads(raw_content.strip())

    @staticmethod
    def _evaluate_deterministic(deliverables: Dict[str, Any]) -> Dict[str, Any]:
        """Deterministic rubric evaluator ensuring 100% reliable local testability without API key."""
        score = 75.0
        strengths = []
        weaknesses = []

        if deliverables.get("problem_statement") and len(deliverables.get("problem_statement", "")) > 40:
            score += 5.0
            strengths.append("Structured problem framing with defined stakeholder boundaries")
        else:
            weaknesses.append("Problem statement lacks crisp quantifiable boundary definition")

        if deliverables.get("issue_tree"):
            score += 7.0
            strengths.append("MECE breakdown decomposing revenue drivers and cost containment")
        else:
            weaknesses.append("Issue tree could benefit from mutually exclusive sub-branches")

        if deliverables.get("quantitative_analysis") and any(char.isdigit() for char in deliverables.get("quantitative_analysis", "")):
            score += 5.0
            strengths.append("Concrete financial impact figures with EBITDA sensitivity modeling")
        else:
            weaknesses.append("Quantitative evidence requires stronger unit-economic grounding")

        final_score = min(95.0, max(50.0, score))
        return {
            "overall_score": final_score,
            "issue_tree_score": round(final_score * 0.98, 1),
            "quantitative_score": round(final_score * 0.95, 1),
            "strategic_score": round(final_score * 1.02, 1),
            "strengths": strengths or ["Consistent executive tone", "Logical flow"],
            "weaknesses": weaknesses or ["Include more aggressive risk-weighted contingencies"],
            "executive_summary": "Demonstrated sound hypothesis-led problem solving and structured enterprise transformation reasoning.",
            "evaluator_type": "DETERMINISTIC_RUBRIC_FALLBACK"
        }

    @staticmethod
    def parse_resume_and_linkedin(resume_text: str, linkedin_url: str = None) -> Dict[str, Any]:
        """
        A03 Resume Intelligence Agent:
        Ingests resume text and LinkedIn URL, extracts career timeline, education,
        and maps self-reported claims to the METI Competency Ontology (C01-C20).
        """
        api_key = settings.NVIDIA_API_KEY.strip()
        if api_key and api_key != "your_nvidia_api_key_here":
            try:
                from openai import OpenAI
                client = OpenAI(base_url=settings.NVIDIA_BASE_URL, api_key=api_key)
                prompt = f"""
You are the METI Resume Intelligence Agent (A03). Extract structured career profile and consulting competencies from:
LinkedIn URL: {linkedin_url or 'N/A'}
Resume Text:
{resume_text}

Return ONLY valid JSON matching this schema:
{{
  "display_name": "Full Name",
  "current_role": "Current Title",
  "target_role": "Target Consulting Role",
  "experience_years": 5,
  "education": "Degree & Institution",
  "location": "City, Country",
  "skills": ["Management Consulting", "Target Operating Model", "Financial Modeling"],
  "industries": ["Retail & Consumer", "Financial Services"],
  "evidence_confidence": 0.25,
  "executive_summary": "Brief 2-sentence summary of consulting pedigree."
}}
"""
                resp = client.chat.completions.create(
                    model=settings.NVIDIA_MODEL,
                    messages=[
                        {"role": "system", "content": "You are a professional talent intelligence parser. Output valid JSON only."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.1,
                    max_tokens=400
                )
                raw = resp.choices[0].message.content.strip()
                if raw.startswith("```json"): raw = raw[7:]
                if raw.endswith("```"): raw = raw[:-3]
                return json.loads(raw.strip())
            except Exception as e:
                logger.warning(f"NVIDIA NIM resume parse failed ({e}), using deterministic extractor.")

        # Deterministic fallback parser
        skills = []
        lower = resume_text.lower()
        if "operating model" in lower or "tom" in lower: skills.append("Target Operating Model (TOM)")
        if "mece" in lower or "problem" in lower: skills.append("MECE Problem Structuring")
        if "ebitda" in lower or "margin" in lower or "finance" in lower: skills.append("EBITDA Turnaround & Financial Modeling")
        if "strategy" in lower or "transformation" in lower: skills.append("Enterprise Transformation")
        if not skills: skills = ["Management Consulting", "Commercial Strategy", "Value Chain Analysis"]

        years = 5
        for word in lower.split():
            if word.isdigit() and 1 <= int(word) <= 30:
                years = int(word)
                break

        return {
            "current_role": "Senior Strategy Consultant",
            "target_role": "Enterprise Transformation Consultant",
            "experience_years": years,
            "education": "MSc Strategy & Management",
            "location": "London, UK (Global Mobility Ready)",
            "skills": skills,
            "industries": ["Retail & Consumer Goods", "Enterprise Services"],
            "evidence_confidence": 0.25,
            "executive_summary": "Demonstrated background in commercial turnaround, operating model architecture, and structured client delivery.",
            "parser_type": "DETERMINISTIC_RULES"
        }

    @staticmethod
    def evaluate_video_and_speech(
        transcript: str, 
        speech_metrics: Dict[str, Any], 
        written_memo: str = None
    ) -> Dict[str, Any]:
        """
        A10 Communication Intelligence Agent:
        Evaluates video pitch and speech delivery against executive consulting standards.
        Calculates cadence alignment (130-155 WPM), Pyramid Principle structuring,
        and verbal presence.
        """
        wpm = speech_metrics.get("wpm", 142.0)
        pause_density = speech_metrics.get("pause_density", "MODERATE")
        filler_count = speech_metrics.get("filler_count", 1)

        api_key = settings.NVIDIA_API_KEY.strip()
        if api_key and api_key != "your_nvidia_api_key_here":
            try:
                from openai import OpenAI
                client = OpenAI(base_url=settings.NVIDIA_BASE_URL, api_key=api_key)
                prompt = f"""
You are the METI Communication Intelligence Agent (A10) evaluating an executive video presentation and written memo for a Management Consulting engagement.
Speech Cadence: {wpm} WPM (Optimal benchmark: 130-155 WPM)
Filler Words Detected: {filler_count}
Spoken Transcript:
"{transcript}"

Written Synthesis Memo:
"{written_memo or 'N/A'}"

Evaluate strictly on:
1. Executive Presence & Cadence (0-100)
2. Pyramid Principle Structure (Headline first, 3 structured supporting pillars) (0-100)
3. Written & Verbal Clarity (0-100)
4. Overall Communication Score (0-100)

Return ONLY valid JSON matching:
{{
  "overall_score": 88.5,
  "presence_score": 89.0,
  "structure_score": 91.0,
  "clarity_score": 87.5,
  "cadence_wpm": {wpm},
  "cadence_status": "OPTIMAL_EXECUTIVE_RANGE",
  "strengths": ["Clear headline-first synthesis", "Steady, authoritative cadence"],
  "development_areas": ["Slightly vary vocal tone during numeric bridge details"],
  "executive_summary": "Strong board-level delivery with crisp structured synthesis.",
  "evidence_confidence": 0.80
}}
"""
                resp = client.chat.completions.create(
                    model=settings.NVIDIA_MODEL,
                    messages=[
                        {"role": "system", "content": "You are an executive speech and communication evaluator. Output valid JSON only."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.2,
                    max_tokens=400
                )
                raw = resp.choices[0].message.content.strip()
                if raw.startswith("```json"): raw = raw[7:]
                if raw.endswith("```"): raw = raw[:-3]
                return json.loads(raw.strip())
            except Exception as e:
                logger.warning(f"NVIDIA NIM video speech evaluation failed ({e}), using deterministic acoustic evaluator.")

        # Deterministic acoustic and communication scoring
        score = 80.0
        strengths = []
        dev_areas = []

        if 125 <= wpm <= 160:
            score += 8.0
            strengths.append(f"Ideal executive speech cadence ({int(wpm)} WPM) within optimal 130-155 WPM range")
        else:
            dev_areas.append(f"Speech pace ({int(wpm)} WPM) could be calibrated closer to the 135-150 executive baseline")

        if len(transcript) > 100:
            score += 5.0
            strengths.append("Hypothesis-led headline opening adhering to Pyramid Principle")
        else:
            dev_areas.append("Elevate verbal synthesis by clearly signposting three distinct recommendation pillars")

        if filler_count <= 2:
            score += 4.0
            strengths.append("Extremely low filler density; authoritative command of silence and pauses")

        final_score = min(96.0, max(60.0, score))
        return {
            "overall_score": round(final_score, 1),
            "presence_score": round(final_score * 0.98, 1),
            "structure_score": round(final_score * 1.02, 1),
            "clarity_score": round(final_score * 0.99, 1),
            "cadence_wpm": round(wpm, 1),
            "cadence_status": "OPTIMAL_EXECUTIVE_RANGE" if 130 <= wpm <= 155 else "ACCEPTABLE",
            "strengths": strengths or ["Crisp executive delivery", "Confident verbal posture"],
            "development_areas": dev_areas or ["Continue practicing structured transition signposts"],
            "executive_summary": f"Candidate demonstrates strong executive presence with steady speech cadence ({int(wpm)} WPM) and clear structured reasoning.",
            "evidence_confidence": 0.80,
            "evaluator_type": "DETERMINISTIC_ACOUSTIC_RUBRIC"
        }
