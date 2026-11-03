---
title: "LLM as a judge: consistency is not validity — validate the evaluator"
slug: "llm-como-juiz-validar-o-avaliador"
excerpt: "LLM as a judge scales agent evaluation, but only if the judge itself is validated. See what the 21-judge study shows and how to test yours."
tldr: "LLM as a judge is a language model that grades the answers of another model or agent in place of human reviewers. It scales evaluation, but a judge can be perfectly consistent and still disagree with experts, through position bias or an inflated agreement metric. The fix is to treat the judge as a measuring instrument: calibrate it against human labels with kappa, swap the order of answers and measure run-to-run noise before comparing agents."
keywords: ["LLM as a judge", "LLM-as-a-judge", "AI agent evaluation", "position bias", "Cohen's kappa", "eval set"]
---

**LLM as a judge** looks like the obvious fix for the agent evaluation bottleneck. Reviewing 100 interactions a week with a specialist costs time; asking a model to grade the same 100 costs cents and takes minutes. The problem is the question almost nobody asks next: who evaluates the judge? A model that grades is a measuring instrument, and measuring instruments get calibrated. Without that, the quality dashboard shows a consistent opinion, not a fact.

The topic got data in June 2026, when a large-scale study measured the behavior of judges from several providers. The result is uncomfortable for anyone who has already automated evaluation: high consistency and low validity coexist in the same judge.

## What the 21-judge study shows

The paper [Reliability without Validity](https://arxiv.org/abs/2606.19544), by Norman, Rivera and Hughes, evaluated 21 judges from nine providers on three public benchmarks (MT-Bench, JudgeBench and RewardBench), across 118 runs and about 541,000 judgments. Three findings matter for anyone operating agents.

1. **Exact agreement inflates quality.** Counting how often the judge matches the human label does not discount chance agreement. On MT-Bench, the gap between exact agreement and Cohen's kappa was 33 to 41 percentage points across every judge. A judge that looks 80% accurate may be much closer to an average one.
2. **Consistent is not impartial.** Two judges already used in production had test-retest reliability above 0.95 and, at the same time, position bias above 0.10, that is, a tendency to prefer an answer because of the order in which it appears. Running the same judge twice and getting the same grade only proves it repeats the same mistake.
3. **Judge rankings change with the benchmark.** A judge's position moved by up to 14 places between benchmarks. Picking the "best judge" from a public ranking and carrying it to your domain is a bet.

There is an honest limit: the study uses static benchmarks, not real agent traces. Applying its conclusions to your agent is our inference, but a conservative one, because the agent adds variables (tools, multiple steps) that only increase noise.

> A judge that always repeats the same grade is not a reliable judge; it is a predictable one, and predictability does not correct bias.

## Where an LLM judge fails on agents

In the [fixed eval set protocol](/blog/en/avaliacao-de-agentes.html), the grade decides whether a release ships. If that grade comes from an unvalidated judge, the failures below enter the decision unnoticed.

**Position bias.** In pairwise comparisons (answer A against answer B), the judge tends to favor one of the positions. When you compare the new agent against the old one and the new one always appears second, part of the difference you measure belongs to the order, not the agent.

**A judge that grades the outcome and ignores the path.** The final answer may be right by luck, with a wrong tool call in the middle, or wrong because of an earlier step. A judge that only reads the final text does not see this. For the path, the instrument is the trace, as in [agent observability](/blog/en/observabilidade-de-agentes.html).

**A vague rubric.** "Is the answer useful?" gives the judge room to reward whatever sounds good. A verifiable criterion ("did it cite the right policy? did it return the right amount? did it escalate when it should?") reduces variance and makes disagreement with the human diagnosable.

**Same model family.** When the judge and the agent use the same model, there is a risk of style affinity: the judge recognizes and rewards its own way of writing. This is a working hypothesis, not a finding of the study, which is exactly why it is worth testing in your case.

## How to validate the judge before trusting the grade

Validating a judge costs a fraction of evaluating everything with humans, because humans only enter the calibration sample. The sequence we use on projects:

1. **Label a sample with specialists.** Between 100 and 200 real cases, with a human grade per criterion, from someone who knows the domain and did not build the agent.
2. **Measure agreement with kappa, not percentage.** Compare the judge's grades with the human ones using Cohen's kappa (or weighted kappa for ordinal scales). If the exact figure looks good and kappa is low, the judge is getting it right by chance.
3. **Swap the order in every pairwise comparison.** Run each pair twice, inverting positions, and count how often the verdict changes. An unstable verdict becomes a tie, not a win.
4. **Measure run-to-run noise.** Run the same set several times. The range of variation is the floor for a difference you can consider real; a gain smaller than the noise is noise.
5. **Reserve the human for edge cases.** Where the judge hesitates or disagrees with itself, route to human review. Human cost drops, and the human sees only what matters.
6. **Revalidate on every change.** Changed the judge, the rubric or the agent's model? Redo the calibration. It is the same care as any [context change, which should run the same suite before and after](/blog/en/engenharia-de-contexto-agentes-cache-compactacao.html).

A rule of thumb: if the kappa between judge and specialist is not clearly better than the kappa between two randomly chosen specialists, the judge is good for triage and alerts, not for deciding a release.

## Where an LLM judge is a good idea

None of this is an argument against automatic judges. It is an argument against using them without calibration. They work well for triage at volume (separating the 5% of suspicious answers for human review), for detecting gross regressions between releases and for checking objective criteria such as format, presence of a citation and adherence to a written policy.

They work poorly as the final arbiter of subjective quality and as the sole source of truth for ROI. The number that goes to the board needs a human label behind it; the [agent ROI math](/blog/en/roi-agente-ia-metricas-board.html) tolerates a bad metric for only a short time. An automatic judge is what lets you measure all the time; the human is what lets you believe the measurement.

## Questions that keep coming back

Common questions from teams that are automating agent evaluation.

## What is LLM as a judge?

LLM as a judge (LLM-as-a-judge) is the use of a language model to evaluate the answers of another model or agent, assigning grades or picking the better of two answers according to a rubric. It serves to scale evaluation beyond what human reviewers can cover, as long as the judge is calibrated against human labels.

## Does an LLM judge replace the human reviewer?

It does not replace the human; it changes the human's role. The judge covers volume and triage, and the specialist labels the calibration sample and reviews edge cases. The 21-judge study shows that apparent agreement can exceed real agreement by 33 to 41 percentage points, which makes human validation what holds the number up.

## How do I know if my judge is reliable?

Compare its grades with specialists' on 100 to 200 real cases using Cohen's kappa, run each pairwise comparison in both orders and measure variation across repeated runs. If kappa is low, if the verdict changes with the order or if the variation is larger than the differences you want to detect, the judge is not yet ready to decide a release.
