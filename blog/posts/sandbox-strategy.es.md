---
title: "Sandbox strategy: cómo evitar \"el último refresh de sandbox fue hace 4 meses\""
slug: "sandbox-strategy"
pillar: "sf"
date: "2026-03-25"
readMinutes: 6
excerpt: "El sandbox de Salesforce es gratis — en licencia. Caro en disciplina. Empresa que no trata el sandbox como producto envía bugs a producción y descubre que nadie actualiza el ambiente hace meses."
tldr: "El sandbox en Salesforce no es solo ambiente de prueba — es el sistema operativo de cualquier rollout serio. Sin estrategia clara (cuántos sandboxes, para qué cada uno, quién mantiene actualizado), el equipo va a probar en producción sin saberlo. Cuatro tipos de sandbox, tres reglas de operación, y la señal de que la estrategia está rota."
keywords: ["Salesforce", "sandbox", "DevOps", "ambiente de prueba", "Salesforce DX"]
---

La pregunta que todo equipo de Salesforce evita responder con sinceridad: *¿cuándo fue la última vez que el sandbox se actualizó con dato de producción?* Respuesta típica: "unos 4 meses, tal vez 6". Traducción práctica: nadie está probando en ambiente que refleje la realidad. Los bugs llegan a producción, son descubiertos por usuarios, el equipo apaga incendio. La dirección pregunta qué pasó y la respuesta técnica es "pasó el QA en el sandbox". Verdad incompleta — pasó en el sandbox que estaba 6 meses atrás de producción.

Este texto va sobre estrategia de sandbox en Salesforce. No es tutorial de tipos — es decisión arquitectónica que separa empresa que entrega con previsibilidad de empresa que vive en modo apaga-fuego.

## Los cuatro tipos y dónde encaja cada uno

Salesforce ofrece cuatro tipos de sandbox, con diferencias que mucha gente olvida bajo presión de plazo.

**Developer Sandbox.** Solo metadata (sin dato), 200MB. Ideal para dev individual haciendo desarrollo aislado. Refresh frecuente (semanal). Costo: cero, incluido en las licencias.

**Developer Pro Sandbox.** Metadata + 1GB de dato. Bueno para test unitario funcional con dato mínimo. Mismo perfil de uso que Developer, con más espacio.

**Partial Copy Sandbox.** Metadata + muestra de dato (subset configurable). Refresh cada 5 días. Ideal para UAT (user acceptance test) con dato representativo. Es donde la mayoría de los proyectos medianos debería vivir — equilibrio entre realismo y costo de mantenimiento.

**Full Sandbox.** Copia completa de producción (metadata + dato integral). Refresh cada 29 días. Único ambiente que refleja producción fielmente. Caro en licencia, pero indispensable para test de carga, regresión completa, capacitación que necesita escenario real.

Cada proyecto serio usa al menos tres de esos. Quien usa solo Developer Sandbox ahorra licencia y descubre los bugs en producción.

## La estrategia que funciona en empresa de tamaño medio

La configuración que veo dar bien en la mayoría de los clientes Salesforce de tamaño medio:

**Una pila de Developer Sandboxes por desarrollador.** Uno por dev, refresh bajo demanda. El dev hace sus cambios aislados, no traba a nadie.

**Una Partial Copy de integración continua.** Recibe merge de todos los Developer Sandboxes vía Git/Salesforce DX. Donde se prueba interacción entre features. Refresh cada 5 días con muestra realista.

**Una Full Sandbox de UAT/staging.** Espeja producción. Donde el cliente prueba antes de aprobar el deploy. Refresh cada 29 días.

**Producción.** Donde el usuario trabaja.

Ese pipeline cubre el 95% de las necesidades. Empresa que mezcla todo en un único sandbox compartido tiene dev pisando el cambio del colega, UAT con dato desactualizado, y bug en producción como rutina.

> El sandbox en Salesforce no es detalle operativo. Es el sistema operativo del rollout. Empresa sin estrategia clara opera a oscuras — y lo descubre cuando el usuario reporta el bug en producción.

## Las tres reglas que separan pipeline saludable de teatro

Tener los tipos correctos no es suficiente. Tres disciplinas operativas.

1. **Cadencia de refresh planificada y respetada.** Partial Copy refresh jueves a la mañana, semana sí semana no. Full Sandbox refresh primer domingo del mes. Agendado, anunciado, con ventana de mantenimiento definida. Sin cadencia, el refresh ocurre cuando alguien se acuerda — generalmente tarde.
2. **Dueños nominales por sandbox.** Cada sandbox tiene un responsable humano. Cuando degrada (el dato envejece, la metadata diverge, la integración deja de funcionar), hay nombre para cobrar. "Equipo entero responsable" = nadie responsable.
3. **Política de uso por sandbox.** Quién puede tocar qué. Developer Sandbox = dev libre. Partial Copy = solo CI/CD o cambio aprobado. Full Sandbox = solo UAT, sin dev raw. Sin esa política, cualquiera sobrescribe el trabajo del otro y la confiabilidad del ambiente cae a cero.

Esos tres combinados separan pipeline que entrega previsible de pipeline que vive en modo emergencia.

## Los síntomas de estrategia rota

Antes de la catástrofe completa, tres señales de que la estrategia está moribunda:

**Señal 1: el dev pide acceso a producción para "probar algo rápido".** Cuando eso se vuelve recurrente, el sandbox ya no es útil. El dev sabe que no refleja la realidad, así que lo saltea. Investigar eso es diagnóstico del pipeline.

**Señal 2: el refresh de la Full Sandbox es evento traumático.** Se vuelve proyecto de una semana, con prep, plan, escalación. Señal de que se está haciendo rara vez, y todo acumuló. Refresh saludable es evento de 4–6 horas, automatizado, nadie pierde sueño.

**Señal 3: el equipo no sabe dónde probar un cambio específico.** "Hacelo en sandbox X". "No, hacelo en Y". "Esperá, ¿Z es la actualizada?". Confusión sobre qué sandbox usar = falta de estrategia clara. Se resuelve documentando, no improvisando.

## Cómo integrar sandbox con gobernanza de cambio

El sandbox es solo una pieza. El resto de la gobernanza importa igual:

**Git como fuente de la verdad.** La metadata vive en Git, no en los sandboxes. Los sandboxes reflejan el estado de Git. [Como en cualquier proyecto Salesforce serio](/blog/es/sales-cloud-cinco-antipadroes.html), el versionado es base.

**CI/CD con deploy entre sandboxes.** Push a la rama deploya en Partial Copy. Merge a main deploya en Full Sandbox. Aprobación manual final a producción. Pipeline automatizado evita el "esquema a mano".

**Scratch Orgs para exploración aislada.** Cuando el dev necesita explorar cambio radical sin afectar a nadie, Scratch Org (parte de Salesforce DX) es más barato que sandbox dedicado. Vida útil corta, creación en minutos.

**Política clara de Flow vs Apex.** Aplicada en sandbox antes de volverse regla en producción. [La elección entre Flow y Apex](/blog/es/flow-vs-apex.html) se prueba primero en ambiente realista.

## La decisión para 2026

Si tu organización Salesforce tiene síntomas de estrategia rota — bug recurrente en producción, refresh atrasado, equipo inseguro sobre dónde probar — tres movimientos prácticos:

**Definí la pila de sandbox formalmente.** Cuántos, de qué tipo, con qué dueño, con qué cadencia de refresh. Documento de 2 páginas, aprobado por sponsor de TI + arquitecto Salesforce.

**Implementá Salesforce DX si todavía no tenés.** Git como fuente de la verdad, CI/CD entre sandboxes, Scratch Orgs para exploración. Es estándar moderno y elimina el 70% del caos operativo.

**Auditoría semestral.** Cada 6 meses, el equipo mira: sandboxes activas, dueño nominal, último refresh, uso real. Jubila las obsoletas (cada una cuesta licencia), reorganiza las activas. Sin esa rutina, se vuelve cementerio.

El sandbox en Salesforce es el ambiente donde tenés derecho a equivocarte. Empresa que opera bien en el sandbox entrega con previsibilidad. Empresa que opera mal — o saltea el sandbox por apuro — descubre el error en el primer lugar donde no tiene derecho: producción. La diferencia entre los dos mundos es estrategia, no talento técnico.

## Preguntas que siempre vuelven

Antes de cerrar, las tres dudas que más aparecen cuando el tema sandbox entra en la conversación.

## ¿Cuántos sandboxes necesita mi empresa?

Para empresa de tamaño medio, la pila que funciona tiene tres capas antes de producción: un Developer Sandbox por desarrollador (refresh bajo demanda, cada dev trabaja aislado sin trabar a nadie), una Partial Copy de integración continua que recibe el merge de todos vía Git/Salesforce DX, y una Full Sandbox de UAT/staging que espeja producción, donde el cliente prueba antes de aprobar el deploy. Ese pipeline cubre el 95% de las necesidades.

El error común es ahorrar mezclando todo en un único sandbox compartido: el dev pisa el cambio del colega, el UAT corre con dato viejo y el bug en producción se vuelve rutina. Quien usa solo Developer Sandbox ahorra licencia — y descubre los bugs en el único lugar donde no tenés derecho a equivocarte.

## ¿Vale la pena pagar por una Full Sandbox?

Vale, si el proyecto es serio — es el único ambiente que refleja producción fielmente, con copia completa de metadata y dato integral. Para test de carga, regresión completa y capacitación con escenario real no hay sustituto: la Partial Copy trabaja con muestra de dato, no con el volumen verdadero.

El costo en licencia es real, pero el costo de no tenerla es mayor: aprobar deploys probando en un ambiente que está meses atrás de producción es la receta del "pasó el QA en el sandbox" — la verdad incompleta que la dirección escucha después del incendio. El límite práctico es el refresh cada 29 días, así que necesita cadencia disciplinada para no degradar.

## ¿Cada cuánto conviene hacer refresh de los sandboxes?

Con cadencia planificada y agendada, no cuando alguien se acuerda. La referencia: Developer Sandbox cada semana, Partial Copy cada 5 días (por ejemplo, jueves a la mañana, semana sí semana no), Full Sandbox en su ciclo de 29 días — primer domingo del mes, con ventana de mantenimiento anunciada. Sin cadencia, el refresh llega tarde y el equipo vuelve al escenario de los "4 meses, tal vez 6".

Un termómetro útil: el refresh saludable de la Full Sandbox es evento de 4–6 horas, automatizado, nadie pierde sueño. Cuando se vuelve proyecto de una semana con prep, plan y escalación, es señal de que se hace rara vez y todo acumuló.
