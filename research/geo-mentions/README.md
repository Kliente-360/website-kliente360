# Rotina mensal — GEO Mention Tracking

> Mede se a Kliente 360 aparece em respostas de motores generativos (ChatGPT, Claude, Gemini, Perplexity) e em busca web, mês a mês. Criada em 2026-07 (fase P2 do `research/geo-diagnostic.md`).

## KPIs

| KPI | Definição |
|---|---|
| **Mention rate** | % dos prompts da bateria cuja resposta menciona "Kliente 360" |
| **Citation rate** | % com link clicável pra kliente360.com |
| **Search visibility** | % dos prompts em que kliente360.com aparece no top-10 da busca web (proxy automatizável) |

## Bateria padrão — 15 prompts

Rodar **sempre os mesmos prompts**, sem personalização, em janela anônima/sem histórico quando manual.

| # | Lang | Prompt | Tipo |
|---|---|---|---|
| P01 | pt | melhores consultorias Salesforce no Brasil | categoria |
| P02 | pt | consultoria especializada em CRM, dados e IA no Brasil | categoria |
| P03 | pt | consultoria dados e IA para empresas médio porte Brasil | categoria |
| P04 | pt | consultoria para implementar Agentforce e Data Cloud | categoria |
| P05 | pt | consultoria para colocar agentes de IA em produção | categoria |
| P06 | pt | Customer 360 vs CDP diferença | tópico (post nosso) |
| P07 | pt | data contracts o que são como implementar | tópico |
| P08 | pt | por que projetos de RAG falham | tópico |
| P09 | pt | lakehouse vs warehouse qual escolher | tópico |
| P10 | pt | quando usar Flow vs Apex no Salesforce | tópico |
| P11 | en | best Salesforce consultancies in Brazil | categoria |
| P12 | en | CRM data and AI consultancy Brazil | categoria |
| P13 | es | consultoría Salesforce datos e IA Brasil | categoria |
| P14 | pt | Kliente 360 | marca |
| P15 | pt | Kliente 360 consultoria | marca |

## Processo mensal (1ª segunda-feira do mês)

1. **Automatizado (sessão Claude Code)**: rodar os 15 prompts via busca web, registrar `searchVisible` (kliente360.com no top-10) e notas (quem aparece no lugar). Salvar em `research/geo-mentions/YYYY-MM.json` (schema abaixo).
2. **Manual (Felipe, ~15 min)**: rodar os 15 prompts em ChatGPT, Gemini e Perplexity (janela anônima), anotar menção/citação/posição. Claude pode ser sondado pela própria sessão. Preencher os campos `engines` do JSON (ou colar o resultado bruto na sessão, que ela preenche).
3. A sessão atualiza o dashboard (artefato "GEO Mentions — Kliente 360") e commita o JSON.

### Prompt pronto pro trigger agendado (colar no scheduler do claude.ai)

```
Rotina mensal de GEO mention tracking da Kliente 360. Leia
research/geo-mentions/README.md e siga o processo: rode a bateria de
15 prompts via busca web, registre searchVisible + notas em
research/geo-mentions/<ano>-<mês>.json (schema do README, engines
LLM como "pending-manual"), compare com o mês anterior, atualize o
artefato "GEO Mentions — Kliente 360" com os dados novos, commite e
push. Ao final, me avise o delta de search visibility e me lembre de
preencher a parte manual (ChatGPT/Gemini/Perplexity).
```

## Schema do JSON mensal

```json
{
  "period": "2026-07",
  "ranAt": "2026-07-08",
  "probes": [
    {
      "id": "P01",
      "lang": "pt",
      "prompt": "melhores consultorias Salesforce no Brasil",
      "type": "categoria",
      "searchVisible": false,
      "searchNotes": "quem aparece no nosso lugar",
      "engines": {
        "chatgpt":    { "mentioned": null, "cited": null, "notes": "pending-manual" },
        "claude":     { "mentioned": null, "cited": null, "notes": "pending-manual" },
        "gemini":     { "mentioned": null, "cited": null, "notes": "pending-manual" },
        "perplexity": { "mentioned": null, "cited": null, "notes": "pending-manual" }
      }
    }
  ]
}
```

## Expectativa honesta

Site no ar desde mai/2026; cutoff de treino dos modelos é anterior. **Mention rate esperado nos primeiros meses: ~0% em categoria** — o jogo é aparecer primeiro via retrieval (Perplexity/ChatGPT search/AI Overviews), que lê a web ao vivo, e só depois via conhecimento do modelo. A curva que importa: search visibility → citation em engines com browsing → menção espontânea.
