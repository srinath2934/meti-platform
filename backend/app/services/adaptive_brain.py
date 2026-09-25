import json
import logging
from typing import Dict, Any, Optional
from app.core.config import settings

logger = logging.getLogger(__name__)


DOMAIN_TEMPLATES = {
    "FINTECH": {
        "title": "Global Card Scheme & Real-Time A2A Settlement Migration",
        "context": "A tier-1 retail bank processes $140B in annual consumer payments across 18 markets. Interchange fees and scheme processing charges have surged 24% over 24 months, eroding acquiring margins from 1.8% to 1.1%. The board is split between a $180M overhaul to build proprietary Account-to-Account (A2A) payment rails and an aggressive scheme contract renegotiation with volume commitments.",
        "core_dilemma": "How do you evaluate the unit economics, merchant adoption incentives, and operational fraud risks to deliver a definitive recommendation to the Group Investment Committee?",
        "options": [
            {"id": "opt_a2a", "text": "Aggressive Phase 1 A2A rollout targeting top 50 high-volume enterprise merchants with zero-fee incentives for 12 months.", "risk": "High upfront capital expenditure and elevated initial chargeback fraud exposure."},
            {"id": "opt_scheme", "text": "Tiered scheme exclusivity renegotiation trading volume lock-in for a 35 bps fee reduction across Tier 1 corridors.", "risk": "Limits long-term strategic sovereignty and fails to build proprietary intellectual property."},
            {"id": "opt_hybrid", "text": "Hybrid coexistence model: launch A2A for low-risk recurring bills while preserving scheme routing for cross-border transactions.", "risk": "Architectural complexity and dual-pipeline settlement reconciliation overhead."}
        ],
        "key_metrics": ["Acquiring Gross Margin: 1.1%", "Annual Scheme Costs: $410M", "Projected A2A CapEx: $180M", "Target Payback: 2.8 Years"]
    },
    "HEALTHCARE": {
        "title": "Specialty Care Provider Network & Value-Based Care Restructuring",
        "context": "A regional integrated healthcare network operating 14 hospitals and 85 ambulatory clinics is shifting from fee-for-service to capitated value-based contracts. While commercial volume is up 8%, operating margins turned negative (-2.4%) due to rising clinician overtime, unhedged pharmaceutical costs, and suboptimal post-acute patient discharge lengths.",
        "core_dilemma": "Design an operational turnaround program that realigns clinical incentives, stabilizes cash flow, and protects patient outcome quality scores.",
        "options": [
            {"id": "opt_clin", "text": "Centralize clinical service lines into 3 specialized centers of excellence, divesting non-core community facilities.", "risk": "Community pushback and initial transition patient attrition."},
            {"id": "opt_tech", "text": "Deploy automated discharge coordination and remote patient monitoring to compress length of stay by 1.2 days.", "risk": "Requires rapid clinician protocol compliance and EHR integration."},
            {"id": "opt_contract", "text": "Renegotiate commercial payer risk corridors with downside risk caps for the first 24 months.", "risk": "Caps long-term shared-savings upside if performance targets are met early."}
        ],
        "key_metrics": ["Operating Margin: -2.4%", "Average Length of Stay: 5.6 Days", "Specialty Drug Cost Growth: +19%", "Readmission Rate: 13.8%"]
    },
    "RETAIL": {
        "title": "Omnichannel Retail Modernization & Store Fleet Unit Economics",
        "context": "A department store chain with 320 physical locations faces compounding margin decay as e-commerce fulfillment from central warehouses suffers from 31% return rates and escalated last-mile freight costs. Physical stores contribute 65% of revenue but have seen foot traffic decline 4% annually.",
        "core_dilemma": "How do you reconfigure the retail store footprint, inventory allocation, and fulfillment topology to restore consolidated EBITDA from 4.2% to 8.5%?",
        "options": [
            {"id": "opt_fleet", "text": "Rationalize 80 underperforming Tier-2 stores, converting 40 into micro-fulfillment dark stores.", "risk": "Severance liabilities, lease termination penalties, and localized market share loss."},
            {"id": "opt_ship_store", "text": "Equip all active stores with ship-from-store and click-and-collect capabilities to cut last-mile shipping by 40%.", "risk": "Store associate operational friction and stock inventory inaccuracies."},
            {"id": "opt_private", "text": "Pivot product merchandising toward high-margin private label apparel (45% gross margin vs 28% branded).", "risk": "Working capital tie-up and brand repositioning execution risk."}
        ],
        "key_metrics": ["Consolidated EBITDA: 4.2%", "E-commerce Return Rate: 31%", "Foot Traffic Trend: -4.1% YoY", "Target EBITDA: 8.5%"]
    },
    "LOGISTICS": {
        "title": "Supply Chain Network Decoupling & Freight Resilience",
        "context": "A global 3PL operator managing critical supply chains for automotive and industrial clients is battling extreme contract rate volatility and warehouse capacity crunches across major European logistics corridors. Operating ratio has weakened to 96.2%, and customer on-time delivery has dropped to 87%.",
        "core_dilemma": "Structure a 3-year network transformation that improves operating ratio to 91% while insulating the business against single-corridor disruptions.",
        "options": [
            {"id": "opt_dynamic", "text": "Implement dynamic algorithmic freight pricing and automated load-matching to eliminate empty backhaul miles.", "risk": "Shipper resistance during initial rate fluctuation transition."},
            {"id": "opt_hub", "text": "Consolidate into 4 automated mega-hubs connected by dedicated electric rail shuttles.", "risk": "Heavy long-term debt financing requirement ($320M CapEx)."},
            {"id": "opt_asset_light", "text": "Transition to an asset-light brokerage model for spot demand while retaining owned fleet exclusively for contracted anchor clients.", "risk": "Loss of asset control during peak capacity market squeezes."}
        ],
        "key_metrics": ["Operating Ratio: 96.2%", "On-Time Delivery: 87.4%", "Empty Backhaul Rate: 22%", "Target Operating Ratio: 91.0%"]
    },
    "GENERAL_STRATEGY": {
        "title": "Enterprise Operating Model & Capital Allocation Transformation",
        "context": "A diversified industrial conglomerate with $6.5B revenue across three legacy divisions is experiencing margin compression and shareholder activism. Operating divisions operate in functional silos with redundant shared services ($140M duplicated G&A), while capital is spread equally across units regardless of Return on Invested Capital (ROIC).",
        "core_dilemma": "Define a Target Operating Model (TOM) and capital reallocation strategy to unlock $90M in run-rate savings and lift corporate ROIC from 7.8% to 12.5%.",
        "options": [
            {"id": "opt_gbs", "text": "Establish a unified Global Business Services (GBS) organization consolidating Finance, IT, and Procurement into two low-cost centers.", "risk": "18-month execution lag and short-term service level disruption during knowledge transfer."},
            {"id": "opt_carve", "text": "Spin off or divest the lowest-margin capital goods division and concentrate all reinvestment into high-growth predictive maintenance software.", "risk": "Immediate top-line contraction and stranded corporate overhead costs."},
            {"id": "opt_decouple", "text": "Decouple operating units into autonomous business units with zero-based budgeting (ZBB) and market-rate internal transfer pricing.", "risk": "Cultural friction and loss of group purchasing economies of scale."}
        ],
        "key_metrics": ["Current ROIC: 7.8%", "Target ROIC: 12.5%", "Duplicated Shared Services G&A: $140M", "Run-Rate Savings Target: $90M"]
    }
}


class AdaptiveBrain:
    @staticmethod
    def resolve_domain(industry_str: str) -> str:
        """Maps freeform candidate industry string to calibrated domain archetype."""
        ind = (industry_str or "").upper()
        if any(k in ind for k in ["FIN", "BANK", "PAY", "INVEST", "FINTECH", "INSUR"]):
            return "FINTECH"
        elif any(k in ind for k in ["HEALTH", "PHARMA", "MED", "BIOTECH", "HOSPITAL", "CLINIC"]):
            return "HEALTHCARE"
        elif any(k in ind for k in ["RETAIL", "E-COMMERCE", "COMMERCE", "CPG", "CONSUMER", "STORE"]):
            return "RETAIL"
        elif any(k in ind for k in ["LOGISTIC", "SUPPLY", "FREIGHT", "TRANSPORT", "WAREHOUSE", "AUTOMOTIVE"]):
            return "LOGISTICS"
        return "GENERAL_STRATEGY"

    @classmethod
    def generate_scenario(cls, profile_context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Synthesizes a tailored, high-stakes consulting dilemma based on candidate CV and profile.
        Prioritizes live LLM call if NVIDIA NIM or Gemini key is configured, else falls back to domain templates.
        """
        industry = profile_context.get("industry", "Financial Services")
        seniority = profile_context.get("seniority_level", "Senior Consultant / Engagement Manager")
        years_exp = profile_context.get("experience_years", 5)
        domain_key = cls.resolve_domain(industry)
        base_template = DOMAIN_TEMPLATES.get(domain_key, DOMAIN_TEMPLATES["GENERAL_STRATEGY"])

        api_key = settings.NVIDIA_API_KEY.strip() if hasattr(settings, "NVIDIA_API_KEY") else ""
        if api_key and api_key != "your_nvidia_api_key_here":
            try:
                return cls._generate_scenario_llm(profile_context, base_template, api_key)
            except Exception as e:
                logger.warning(f"LLM scenario generation failed ({e}). Using deterministic calibrated domain template.")

        return {
            "scenario_id": f"ADAPT_{domain_key}_{years_exp}Y",
            "domain": domain_key,
            "calibrated_for": f"{industry} · {seniority}",
            "title": base_template["title"],
            "context": base_template["context"],
            "core_dilemma": base_template["core_dilemma"],
            "strategic_options": base_template["options"],
            "key_metrics": base_template["key_metrics"],
            "prompt_guidance": "Formulate your strategic hypothesis. Detail: 1) Primary value driver, 2) Trade-offs considered, 3) 90-day implementation priorities.",
            "source": "ADAPTIVE_BRAIN_ENGINE"
        }

    @classmethod
    def generate_probe(cls, scenario: Dict[str, Any], candidate_approach: str, selected_option_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Dynamically analyzes the candidate's strategic hypothesis and triggers an on-the-fly probe
        challenging their specific blind spots, risk assumptions, or unit economic trade-offs.
        """
        approach_lower = (candidate_approach or "").lower()
        domain = scenario.get("domain", "GENERAL_STRATEGY")

        api_key = settings.NVIDIA_API_KEY.strip() if hasattr(settings, "NVIDIA_API_KEY") else ""
        if api_key and api_key != "your_nvidia_api_key_here":
            try:
                return cls._generate_probe_llm(scenario, candidate_approach, selected_option_id, api_key)
            except Exception as e:
                logger.warning(f"LLM probe generation failed ({e}). Using calibrated probe matrix.")

        if "cost" in approach_lower or "reduction" in approach_lower or "g&a" in approach_lower:
            probe_question = "Your proposal leans aggressively on cost containment. However, key enterprise clients have flagged that previous service-level cutbacks resulted in a 9% customer churn spike. How do you ring-fence core client experience while capturing your targeted cost savings?"
            challenge_focus = "Customer Experience vs Cost Realignment"
        elif "tech" in approach_lower or "digital" in approach_lower or "automation" in approach_lower or "platform" in approach_lower:
            probe_question = "Your recommendation assumes rapid technology replatforming. Historical ERP and core platform implementations in this sector experience a 45% schedule slippage in Year 1. What bridge mechanisms will protect operating cash flow if the digital rollout is delayed by 6 months?"
            challenge_focus = "Implementation Slippage & Working Capital Buffer"
        elif "price" in approach_lower or "margin" in approach_lower or "revenue" in approach_lower:
            probe_question = "You prioritize price renegotiation and margin capture. In a tightening macroeconomic environment where major competitors are aggressively discounting to protect market share, how do you defend against volume erosion if your price floor is enforced?"
            challenge_focus = "Price Elasticity & Competitive Response"
        else:
            probe_question = "You have proposed a multifaceted transformation approach. To ensure board buy-in, the Chairman demands a single gating metric to measure progress by Day 45. What is that primary metric, and what specific contingency plan triggers if it misses target by 15%?"
            challenge_focus = "Executive Accountability & Day-45 Governance"

        return {
            "probe_id": f"PROBE_{domain}_{abs(hash(candidate_approach)) % 10000}",
            "challenge_focus": challenge_focus,
            "probe_question": probe_question,
            "prompt_guidance": "Deliver a concise executive response (2-3 sentences) addressing the specific trade-off or risk highlighted above.",
            "source": "ADAPTIVE_PROBE_GENERATOR"
        }

    @staticmethod
    def _generate_scenario_llm(profile_context: Dict[str, Any], base_template: Dict[str, Any], api_key: str) -> Dict[str, Any]:
        from openai import OpenAI
        client = OpenAI(base_url=settings.NVIDIA_BASE_URL, api_key=api_key)

        prompt = f"""
You are a Senior Partner at a top-tier management consultancy (McKinsey, Bain, BCG).
Generate a custom, highly specific, high-stakes consulting dilemma for a candidate with this profile:
- Industry: {profile_context.get('industry', 'Financial Services')}
- Seniority: {profile_context.get('seniority_level', 'Engagement Manager')}
- Experience: {profile_context.get('experience_years', 5)} years
- Skills: {profile_context.get('skills', [])}

Output ONLY valid JSON matching this schema:
{{
  "title": "Short title",
  "context": "Rich 2-3 sentence business situation with realistic metrics",
  "core_dilemma": "Clear strategic choice confronting the C-Suite",
  "strategic_options": [
    {{"id": "opt_1", "text": "Option 1 description", "risk": "Primary trade-off or downside"}},
    {{"id": "opt_2", "text": "Option 2 description", "risk": "Primary trade-off or downside"}},
    {{"id": "opt_3", "text": "Option 3 description", "risk": "Primary trade-off or downside"}}
  ],
  "key_metrics": ["Metric 1", "Metric 2", "Metric 3"]
}}
"""
        response = client.chat.completions.create(
            model=settings.NVIDIA_MODEL,
            messages=[
                {"role": "system", "content": "You are an elite consulting assessment architect. Return JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.4,
            max_tokens=700
        )
        raw = response.choices[0].message.content.strip()
        if raw.startswith("```json"):
            raw = raw[7:]
        if raw.endswith("```"):
            raw = raw[:-3]
        parsed = json.loads(raw.strip())
        parsed["scenario_id"] = f"LLM_{profile_context.get('industry', 'GEN')[:3].upper()}"
        parsed["calibrated_for"] = f"{profile_context.get('industry')} · {profile_context.get('seniority_level')}"
        parsed["prompt_guidance"] = "Formulate your strategic hypothesis. Detail: 1) Primary value driver, 2) Trade-offs considered, 3) 90-day implementation priorities."
        parsed["source"] = "LIVE_LLM_ADAPTIVE_BRAIN"
        return parsed

    @staticmethod
    def _generate_probe_llm(scenario: Dict[str, Any], candidate_approach: str, selected_option_id: Optional[str], api_key: str) -> Dict[str, Any]:
        from openai import OpenAI
        client = OpenAI(base_url=settings.NVIDIA_BASE_URL, api_key=api_key)

        prompt = f"""
You are an Executive Partner interviewing a management consultant candidate.
Scenario: {scenario.get('title')}
Candidate's Initial Strategic Approach: {candidate_approach}
Selected Option ID: {selected_option_id}

Challenge their weakest assumption or biggest risk with a sharp, professional 2-sentence probe.
Output ONLY valid JSON:
{{
  "challenge_focus": "Specific risk area (e.g. Working Capital Drain, Merchant Pushback)",
  "probe_question": "Sharp executive question probing this risk directly."
}}
"""
        response = client.chat.completions.create(
            model=settings.NVIDIA_MODEL,
            messages=[
                {"role": "system", "content": "You are a sharp C-Suite interviewer. Output JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=300
        )
        raw = response.choices[0].message.content.strip()
        if raw.startswith("```json"):
            raw = raw[7:]
        if raw.endswith("```"):
            raw = raw[:-3]
        parsed = json.loads(raw.strip())
        parsed["probe_id"] = f"LLM_PROBE_{abs(hash(candidate_approach)) % 10000}"
        parsed["prompt_guidance"] = "Deliver a concise executive response (2-3 sentences) addressing the specific trade-off or risk highlighted above."
        parsed["source"] = "LIVE_LLM_PROBE"
        return parsed
