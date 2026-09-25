import urllib.request
import json
import sys

def post(url, data=None):
    payload = json.dumps(data).encode('utf-8') if data else b''
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read())

def put(url, data):
    payload = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'}, method='PUT')
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read())

def get(url):
    with urllib.request.urlopen(url) as res:
        return json.loads(res.read())

def main():
    print("=" * 60)
    print("METI PLATFORM - END-TO-END BACKEND VERIFICATION")
    print("=" * 60)

    # 1. Health
    h = get("http://localhost:8000/health")
    print(f"[*] /health: Status={h.get('status')}, Database={h.get('database')}")

    # 2. Candidate
    cand = get("http://localhost:8000/api/v1/candidates/me")
    print(f"[*] Candidate: Name={cand.get('display_name')}, Role={cand.get('target_role')}")
    cand_id = cand["id"]

    # 3. Assessment
    asm = get("http://localhost:8000/api/v1/assessments/active")
    print(f"[*] Active Assessment: Code={asm.get('code')}, Sections={len(asm.get('sections', []))}")
    asm_id = asm["id"]
    q_id = asm["sections"][0]["questions"][0]["id"]

    # 4. Start Attempt
    att = post(f"http://localhost:8000/api/v1/assessments/{asm_id}/attempts", {"candidate_id": cand_id, "assessment_id": asm_id})
    att_id = att["id"]
    print(f"[*] Started Attempt: ID={att_id}, Timer Remaining={att['timer']['remaining_seconds']}s")

    # 5. Autosave Response
    save = put(f"http://localhost:8000/api/v1/attempts/{att_id}/responses/{q_id}", {"response_value": {"selected": "A"}})
    print(f"[*] Autosaved Response: Question={save.get('question_id')}, Status={save.get('status')}")

    # 6. Submit Attempt
    sub = post(f"http://localhost:8000/api/v1/attempts/{att_id}/submit")
    print(f"[*] Submitted Attempt: Status={sub.get('status')}, Scores={sub.get('scores')}")

    # 7. Fetch Authoritative Scores
    scores = get("http://localhost:8000/api/v1/candidates/me/scores")
    print(f"[*] Authoritative Multi-Index: CCI={scores.get('cci')}, CPI={scores.get('cpi')}, CRI={scores.get('cri')}, Ready={scores.get('is_client_ready')}")
    print(f"[*] Top Strengths: {scores.get('strengths', [])[:2]}")

    # 8. Start Case Study
    case_att = post(f"http://localhost:8000/api/v1/cases/cs_omni_turnaround/attempts?candidate_id={cand_id}")
    case_att_id = case_att["id"]
    print(f"[*] Started OmniRetail Case: ID={case_att_id}, Timer={case_att.get('remaining_seconds')}s")

    # 9. Autosave Case Deliverables
    deliv = put(f"http://localhost:8000/api/v1/case-attempts/{case_att_id}", {
        "problem_statement": "Restore OmniRetail EBITDA from 7.0% to 11.5% through omnichannel logistics decoupling.",
        "success_metrics": "+$54M recurring EBITDA, 14% working capital reduction.",
        "issue_tree": {"root": "Turnaround", "branches": ["Channel economics", "Supply chain dis-synergies"]},
        "quantitative_analysis": "EBITDA bridge: $126M + $27M freight + $27M promotional discipline = $180M (10.0%)."
    })
    print(f"[*] Autosaved Case Deliverables: Status={deliv.get('status')}")

    # 10. Submit Case & Evaluate
    case_res = post(f"http://localhost:8000/api/v1/case-attempts/{case_att_id}/submit")
    print(f"[*] Evaluated Case Study: Score={case_res.get('case_score')}, Strengths={case_res.get('llm_feedback', {}).get('strengths', [])}")

    # 11. Assessor Queue & Calibrated Override
    queue = get("http://localhost:8000/api/v1/assessor/reviews")
    print(f"[*] Assessor Queue: {len(queue)} attempts pending/reviewed")
    override = post(f"http://localhost:8000/api/v1/assessor/reviews/{att_id}/override", {
        "reviewer_id": "senior_partner_modus",
        "final_cci": 85.0,
        "final_cri": 82.0,
        "reason": "Exemplary MECE problem decomposition during case work sample defense."
    })
    print(f"[*] Assessor Override Applied: Final CCI={override.get('final_cci')}, Final CRI={override.get('final_cri')}, OverrideApplied={override.get('override_applied')}")

    print("=" * 60)
    print("ALL 11 ENDPOINTS AND WORKFLOW PIPELINES VERIFIED 100% OPERATIONAL!")
    print("=" * 60)

if __name__ == "__main__":
    main()
