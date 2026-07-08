---
title: "Service Cloud: el SLA no es decoración — medir capacidad antes de prometer"
slug: "service-cloud-sla-nao-e-decoracao"
pillar: "sf"
date: "2026-01-27"
readMinutes: 6
excerpt: "La empresa promete SLA de 4 horas y descubre que el equipo entrega en 14. La causa casi nunca es Service Cloud — es el número que nadie calculó antes."
tldr: "SLA es promesa medida en capacidad. La mayoría de las empresas configura Service Cloud con el SLA pedido por el cliente, no el calculado por la operación. Resultado: violación crónica, fila olvidada, NPS en caída. Cómo calcular capacidad real, y cómo negociar SLA que encaja."
keywords: ["Service Cloud", "Salesforce", "SLA", "atención al cliente", "capacidad operativa"]
---

La reunión de revisión de Service Cloud casi siempre tiene el mismo gráfico: SLA prometido en 4 horas, SLA realizado en 14, con pico de 28 los martes. La dirección pregunta "¿por qué el sistema no está cumpliendo lo que prometimos?". El equipo de TI tiene la respuesta correcta, pero suele quedarse en silencio: el sistema cumple lo que se puede cumplir. El problema es que el número prometido nunca se calculó — se eligió en reunión comercial, antes de que la operación fuera medida.

SLA no es decoración en el contrato. Es promesa medida en capacidad. Este texto va sobre el error más caro y más común en la implantación de Service Cloud: configurar reglas de SLA sin haber calculado la capacidad real del equipo que va a atender.

## La genealogía del SLA ficticio

Casi todo SLA mal calibrado en Service Cloud nace del mismo lugar: comercial cerró un deal prometiendo "atención en 4 horas" porque el competidor prometía 6. Fue al contrato. El equipo de operación se enteró seis meses después. La configuración en Service Cloud refleja la promesa, no la realidad — Entitlements, Milestones, Escalation Rules todo apuntando a una meta que nadie probó contra la capacidad.

La consecuencia tiene tres caras. Primera: violación crónica de SLA. El dashboard queda rojo permanente, todos aprenden a ignorarlo — y cuando ocurre una violación importante, se disuelve en el ruido. Segunda: equipo de atención bajo presión constante, con burnout previsible en 6–12 meses. Tercera: NPS que cae en el segundo trimestre, sin explicación clara — porque el cliente percibe el SLA no cumplido como ruptura de promesa, no como problema de configuración.

> Un SLA mal calibrado contamina al Service Cloud entero. Cuando todo case está en violación, ningún case está. El sistema se vuelve semáforo permanentemente roto.

## El cálculo que nadie hace antes

La cuenta para calibrar SLA es razonablemente simple, y casi nadie la hace antes de la implementación. Cinco números bastan para tener el piso.

1. **Volumen medio diario de casos.** Histórico de 3–6 meses de tickets que entraron (cualquier canal). Distribuido por hora del día, día de la semana.
2. **Tiempo medio de atención (TMA) por tipo.** No el promedio general — promedio *por categoría*. Caso simple (10 min), caso medio (40 min), caso complejo (3h). Categorizar antes hace diferencia de dos veces en el cálculo final.
3. **Tiempo productivo del atendente.** No 8 horas. Descontar capacitación, reunión, intervalo, herramienta lenta, escalamiento que paraliza. Realista: 5–6 horas de trabajo efectivo por jornada.
4. **Pico vs. promedio.** Operación dimensionada por el promedio rompe en el pico. Calcular pico semanal/mensual y dimensionar para cubrir 80–90% de los picos, no el promedio.
5. **% de casos que escalan.** Casos que paran en la fila del nivel 2/3 cuentan distinto — el tiempo de atención explota, y la capacidad efectiva cae.

Con esos cinco, se puede calcular *capacidad efectiva por hora* y *SLA alcanzable por categoría*. Típicamente el número que sale es más alto que el prometido, y a veces mucho más. Aceptar eso antes de implementar evita el resto.

## Cómo configurar Service Cloud sobre capacidad real

Cuando el cálculo está hecho, Service Cloud entrega lo que debe. Cuatro decisiones de configuración que importan.

**SLA por categoría, no SLA único.** Caso simple tiene SLA de 2 horas. Caso medio, 8 horas. Caso complejo, 24 horas. Entitlements y Milestones lo soportan nativamente. Promesa única para todo es el camino más rápido para fallar.

**Ruteo que respeta skill, no solo disponibilidad.** Omni-Channel con queues por skill, no fila única. El atendente que sabe resolver el problema termina en 30 minutos; el que no sabe escala en 2 horas. SLA por skill es más realista que SLA por canal.

**Escalation basada en tiempo *y* en síntoma.** No solo "pasó de X horas, escalá". También "el cliente respondió dos veces sin resolución, escalá". Esa segunda regla captura el caso malo antes de que el SLA reviente — generalmente cuando el atendente ya entró en ciclo improductivo.

**Dashboard de capacidad, no solo de SLA.** Service Cloud entrega [dashboard ejecutivo de capacidad](/blog/es/tableau-linguagem-executiva.html) en pocos clics: casos abiertos por atendente, edad media de la fila, proyección de SLA en la próxima hora. Ese tablero ayuda al gerente a redistribuir antes de la violación — no después.

## La conversación difícil: renegociar SLA con el cliente

Cuando el cálculo muestra que el SLA prometido es imposible, el camino honesto es renegociar — no fingir que el sistema va a alcanzar. La conversación funciona mejor en tres pasos.

**Mostrar el cálculo, no la excusa.** El cliente respeta número, no justificación. Presentar: "operamos con X atendentes, capacidad real de Y casos/día, pico semanal de Z, SLA alcanzable en 90% de los casos es de W horas, no 4". Argumento numérico es difícil de refutar.

**Ofrecer SLA por categoría.** El cliente rara vez necesita 4 horas en *todo*. Necesita 4 horas en casos críticos, y tolera 12 en rutinarios. SLA escalonado por severidad resuelve la tensión entre costo y expectativa.

**Vincular SLA más agresivo a inversión.** Si el cliente *realmente* necesita SLA agresivo general, eso cambia el dimensionamiento de la operación — más atendentes, herramienta especializada, [Agentforce absorbiendo lo que puede ser automatizado en atención](/blog/es/agentforce-atendimento-humano.html). Ahí cambia el precio. SLA es costo, no promesa gratis.

## Dónde Service Cloud no resuelve

Vale decir lo que el SLA bien configurado no arregla. No arregla proceso torcido — atendente sin autoridad para resolver sigue escalando, [como argumenté sobre proceso antes de la herramienta](/blog/es/mapear-processos-antes-do-salesforce.html). No arregla producto malo — si el cliente tiene 30% de tickets sobre el mismo bug, SLA más apretado no cambia la cantidad de tickets, solo los hace llegar más rápido. No reemplaza IA cuando el volumen lo justifica — en operación grande, agente automatizado en [casos donde el dato alcanza](/blog/es/quando-agente-e-resposta.html) absorbe 30–50% del volumen y libera capacidad.

Service Cloud bien implantado es una de las mejores plataformas de atención del mercado. Pero es plataforma — y plataforma exige número antes de promesa. Empresa que acepta esa lógica entrega SLA confiable y cliente confiado. Empresa que sigue eligiendo SLA en reunión comercial va a gastar los próximos dos años explicando dashboard rojo.

## Preguntas que siempre vuelven

Para cerrar, las dudas que más escucho cuando el SLA entra en la agenda.

## ¿Cómo sé qué SLA puede cumplir mi operación?

Haciendo la cuenta antes de prometer — cinco números bastan para tener el piso. Volumen medio diario de casos (histórico de 3–6 meses, distribuido por hora y día de la semana), tiempo medio de atención por categoría (no el promedio general — separar caso simple, medio y complejo hace diferencia de dos veces en el cálculo), tiempo productivo real del atendente (5–6 horas efectivas por jornada, no 8), pico vs. promedio (dimensionar para cubrir 80–90% de los picos) y el porcentaje de casos que escalan al nivel 2/3.

Con esos cinco, sale la capacidad efectiva por hora y el SLA alcanzable por categoría. Típicamente el número es más alto que el prometido — y aceptar eso antes de implementar es lo que evita el dashboard rojo permanente después.

## ¿Conviene un SLA único o SLA por categoría?

Por categoría, siempre. Promesa única para todo es el camino más rápido para fallar: el caso simple puede tener SLA de 2 horas, el medio de 8, el complejo de 24 — y Entitlements y Milestones lo soportan nativamente en Service Cloud. El cliente rara vez necesita 4 horas en todo; necesita 4 horas en los casos críticos y tolera 12 en los rutinarios.

El escalonamiento por severidad también desarma la tensión comercial: en vez de rechazar el SLA agresivo, lo restringís a donde importa — y si el cliente realmente necesita agresividad general, eso cambia el dimensionamiento y el precio. SLA es costo, no promesa gratis.

## ¿Qué hago cuando el SLA prometido en el contrato es imposible de cumplir?

Renegociá con el número sobre la mesa, no finjas que el sistema va a alcanzar. El cliente respeta cálculo, no excusa: "operamos con X atendentes, capacidad real de Y casos/día, pico semanal de Z, SLA alcanzable en 90% de los casos es de W horas, no 4". El argumento numérico es difícil de refutar — y es más honesto que configurar Entitlements apuntando a una meta que nadie probó contra la capacidad.

Dejarlo como está sale más caro: violación crónica que todos aprenden a ignorar (y la violación importante se disuelve en el ruido), burnout previsible del equipo en 6–12 meses y NPS cayendo en el segundo trimestre, porque el cliente lee el SLA reventado como ruptura de promesa, no como problema de configuración.
