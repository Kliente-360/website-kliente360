---
title: "Salesforce Flow vs Apex: cuándo el código vale más que el clic"
slug: "flow-vs-apex"
pillar: "sf"
date: "2026-03-04"
readMinutes: 6
excerpt: "Salesforce dice usar Flow siempre que sea posible. La regla es buena — hasta que se vuelve dogma y el equipo configura Flow gigante donde 30 líneas de Apex lo resolverían en la mitad del tiempo."
tldr: "Flow ganó como herramienta default de automatización en Salesforce, con razón. Pero \"low-code primero\" se volvió dogma que cuesta caro en casos específicos. Cuatro patrones donde Apex sigue siendo la elección correcta, tres trampas de Flow gigante que nadie te cuenta en el pitch."
keywords: ["Salesforce", "Flow", "Apex", "automatización", "low-code"]
---

La directriz oficial de Salesforce desde 2022 es simple: usá Flow siempre que sea posible, Apex solo cuando no haya forma. En teoría tiene sentido — Flow es declarativo, más fácil de mantener, sobrevive a upgrade, cualquier admin entiende. Pero en 2026, en casi todo cliente Salesforce maduro, veo el mismo patrón repetirse: Flow gigante de 40 elementos intentando resolver problema que 30 líneas de Apex bien escritas resolverían en la mitad del tiempo, con la mitad de la complejidad visual, y con mejor gobernanza.

La directriz "Flow primero" se volvió dogma. Y dogma en arquitectura de Salesforce cuesta caro. Este texto va sobre cuándo funciona, y los cuatro patrones donde Apex sigue siendo la elección correcta en 2026.

## Por qué Flow ganó (y la ganancia es real)

La ventaja que Flow trajo es estructural. Cuatro cosas concretas:

- **Mantenimiento sin dependencia de dev.** Admin sénior consigue leer, alterar y debuguear Flow. Apex exige consultor con licencia de developer o contratación externa.
- **Sobrevive al release.** Flow es declarativo, Salesforce lo migra automáticamente en upgrade. Apex necesita revalidación en cada major release, especialmente API version.
- **Test coverage automático.** Flow no exige 75% de coverage manual como Apex. En proyectos chicos, eso ahorra semanas.
- **Auditable visualmente.** Mirar el Flow y entender lo que hace es más rápido que leer 200 líneas de Apex bien escrito (y infinitamente más rápido que leer Apex mal escrito).

Esos cuatro son reales. En 60–70% de los casos de automatización típica — actualizar campo cuando otro cambia, crear registro relacionado, mandar mail, validar dato — Flow es la elección correcta. Sin debate.

El problema empieza en el otro 30–40%.

## Cuatro patrones donde Apex todavía gana

Los contextos donde insistir en Flow cuesta más de lo que admite el pitch.

1. **Lógica compleja con muchos caminos condicionales.** Cuando el proceso tiene 8–15 ramificaciones, cada una con 3–5 acciones condicionales, el Flow se vuelve árbol visual gigante. 40+ elementos en una pantalla que nadie entiende. La misma lógica en Apex entra en 80–150 líneas legibles. El mantenimiento se vuelve más fácil en código que en árbol visual a partir de cierto tamaño.
2. **Operación masiva con performance crítica.** Flow está optimizado para registros únicos o pocos. Cuando hace falta procesar 10k+ registros en batch, Apex con SOQL optimizado es 10–50× más rápido — y entra en los límites de governor sin hack. Intentar hacer batch grande en Flow es la fuente número uno de "Too many SOQL queries" en el log.
3. **Integración con sistema externo vía callout.** Flow tiene HTTP callout, pero la interfaz es primitiva para manejo de error, retry, parsing complejo, autenticación no trivial. Apex con clases bien diseñadas lo encapsula bien. Intentar integración seria vía Flow genera código no-código difícil de testear.
4. **Lógica que otros sistemas van a consumir.** Cuando la lógica va a ser llamada por Sales Cloud, Service Cloud, Marketing Cloud y API externa — Apex con Invocable Methods es más limpio. Cada caller invoca el mismo método, sin duplicación. En Flow, la lógica termina copiada en 3 flujos distintos que divergen con el tiempo.

Esos cuatro patrones cubren la mayoría de los casos donde los equipos caen en la trampa del "lo hacemos en Flow porque es la directriz".

## Tres trampas de Flow gigante

Cuando Flow excede su alcance natural, tres problemas aparecen. Vale catalogar.

**Límites de governor invisibles.** Flow cuenta SOQL, DML, CPU igual que Apex. Pero la cuenta no es transparente — no sabés cuántas queries está haciendo tu Flow hasta que el error llega a producción. Apex te obliga a ser explícito; Flow lo esconde hasta que rompe.

**Performance que degrada en silencio.** Flow es interpretado, no compilado. En loop con 1.000 iteraciones, cada elemento agrega overhead que en Apex sería cero. Operación que corría en 2s pasa a 12s, y nadie entiende por qué. Diagnosticar exige Flow Debug, que no da métricas comparables.

**Mantenimiento que se vuelve laberinto.** Flow visual en 5 elementos es mejor que Apex en 50 líneas. Flow visual en 40 elementos es peor que Apex en 200 líneas. El punto de inflexión está entre 15 y 20 elementos. Cuando el Flow crece más allá, mantener se vuelve pesadilla — y la tentación de copiar Flow entero para hacer pequeña variación acelera el caos.

> Flow es excelente en escala chica y media. En escala grande, Apex es más legible, más performático y más auditable. La directriz "Flow primero" no debería ser "Flow siempre".

## Cómo decidir, caso a caso

La regla que aplicamos antes de implementar automatización:

1. **¿Cuántos elementos va a tener el Flow?** Estimación rápida. Si pasa de 20, considerar Apex. Si pasa de 35, casi siempre Apex.
2. **¿Cuántos registros va a procesar por ejecución?** Hasta ~200, Flow ok. Más que eso, evaluar bulkificación seria — frecuentemente Apex.
3. **¿Necesita integración con sistema externo?** Callout simple, Flow. Callout con retry, OAuth complejo, parsing pesado, Apex.
4. **¿Velocidad esperada de cambio?** Si es regla que va a cambiar toda semana, Flow (admin altera). Si es regla estable de largo plazo, Apex bien escrito gana en legibilidad.
5. **¿Quién va a mantener en 12 meses?** Admin = Flow. Dev = Apex. Si la empresa tiene ambos, elegir por criterio técnico, no por cargo.

Quien responde los cinco sin dudar sabe elegir. Quien sigue regla única (siempre Flow / siempre Apex) está optimizando por ideología, no por resultado.

## La trampa del "refactorizamos después"

La frase que parece pragmática: "empezamos con Flow simple, si queda grande migramos a Apex". Migrar Flow ya en producción a Apex es proyecto serio — reescribir lógica, actualizar todos los puntos de invocación, testear paridad, congelar cambios durante la transición. Típicamente 4–8 semanas para Flow de complejidad media.

La versión menos cara: elegir en la arquitectura inicial, en base a los 5 criterios de arriba. Refactorizar Flow a Apex después es caro; elegir Apex desde el inicio cuesta solo el trabajo de desarrollar, sin el pasivo de migración.

[Como argumenté en los antipatrones de Sales Cloud](/blog/es/sales-cloud-cinco-antipadroes.html), la tentación de hacer "lo básico" y ajustar después es fuente recurrente de retrabajo. Vale igual en Flow vs Apex.

## La decisión para 2026

Un Salesforce Architect maduro elige por la necesidad, no por la directriz. Flow ganó su espacio — en 60–70% de los casos es la elección correcta. Pero tratar "Flow primero" como dogma es la forma más lenta de descubrir que aquellos otros 30–40% pedían Apex desde el principio.

La pregunta correcta no es "Flow o Apex". Es: *cuál es la lógica, cuál el volumen, cuál el ciclo de cambio, quién mantiene*. Respondidas esas, la elección aparece. Sin responder, la elección se vuelve religión — y religión en Salesforce se vuelve proyecto eterno.

[Como en cualquier rollout serio](/blog/es/mapear-processos-antes-do-salesforce.html), el discovery vale más que la elección técnica. Equipo que hace discovery bien rara vez se equivoca en Flow vs Apex. Equipo que salta a la implementación descubre el error en el tercer mes de producción.

## Preguntas que siempre vuelven

Antes de cerrar, las dudas que más aparecen cuando este tema entra en la mesa.

## ¿Cuándo usar Apex en vez de Flow?

En cuatro patrones: lógica compleja con muchos caminos condicionales (a partir de 8–15 ramificaciones, el Flow se vuelve un árbol de 40+ elementos que nadie entiende, mientras lo mismo en Apex entra en 80–150 líneas legibles); operaciones masivas con performance crítica; integraciones externas que exigen retry, OAuth complejo o parsing pesado; y lógica que varios sistemas van a consumir — Apex con Invocable Methods evita la duplicación en tres Flows que divergen con el tiempo.

Fuera de esos patrones, Flow sigue siendo la elección correcta en el 60–70% de la automatización típica. La regla rápida: si la estimación pasa de 20 elementos, considerá Apex; si pasa de 35, es casi siempre Apex.

## ¿Flow aguanta procesar miles de registros?

No bien. Flow está optimizado para registros únicos o pocos — hasta unos 200 por ejecución funciona; arriba de eso, toca evaluar bulkificación seria. En batches de 10k+ registros, Apex con SOQL optimizado es 10–50× más rápido y entra en los límites de governor sin hacks. Batch grande en Flow es la fuente número uno de "Too many SOQL queries" en producción.

Hay un agravante: Flow cuenta SOQL, DML y CPU exactamente como Apex, pero sin transparencia — no sabés cuántas queries está haciendo tu Flow hasta que el error llega a producción. Apex te obliga a ser explícito; Flow lo esconde hasta que se rompe.

## ¿Se puede empezar con Flow y migrar a Apex después si crece?

Se puede, pero sale caro — y la frase "si crece, migramos" suele ser la parte cara del proyecto. Migrar un Flow en producción a Apex significa reescribir la lógica, actualizar todos los puntos de invocación, testear paridad y congelar cambios durante la transición: típicamente 4–8 semanas para un Flow de complejidad media.

El camino más barato es decidir en la arquitectura inicial, con base en cinco criterios: cuántos elementos, cuántos registros por ejecución, si hay integración externa, qué tan rápido cambia la regla y quién lo mantiene en 12 meses. Elegir Apex desde el inicio cuesta solo el desarrollo — sin el pasivo de migración.
