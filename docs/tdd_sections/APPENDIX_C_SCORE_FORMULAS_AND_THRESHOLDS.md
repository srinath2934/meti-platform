# Appendix C: Score Formulas and Threshold Logic

## Mathematical Formulations

### Question Score
$$\text{normalised\_question} = \text{clamp}\left(\frac{\text{raw} - \text{min\_possible}}{\text{max\_possible} - \text{min\_possible}} \times 100,\, 0,\, 100\right)$$

### Competency Score
$$\text{competency} = \frac{\sum (\text{normalised\_evidence} \times \text{evidence\_confidence} \times \text{mapping\_weight})}{\sum (\text{evidence\_confidence} \times \text{mapping\_weight})}$$

### Evidence Confidence (EC)
EC combines:
* `objective_evidence_ratio`
* `completion`
* `recency/provenance`
* `model_confidence`
* `human_agreement`
* `cross_assessment_consistency`

### Role Match
$$\text{role\_fit} = \text{weighted\_similarity}(\mathbf{candidate\_competency\_vector},\, \mathbf{role\_requirement\_vector}) \times \text{mandatory\_gate\_factor}$$

### Client Readiness Gate
$$\text{client\_facing} = (\text{CCI} \ge \text{threshold}) \land (\text{Communication} \ge \text{threshold}) \land (\text{Judgement} \ge \text{threshold}) \land (\text{EC} \ge \text{threshold}) \land (\text{no critical risk flags}) \land (\text{human\_review} = \text{approved})$$

### Values Profile Rule
Values are **not** included in CCI/CRI gates. They influence coaching narrative, preferred development style and optional team-working insights only.
