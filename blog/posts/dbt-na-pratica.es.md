---
title: "dbt en la práctica: el truco es la documentación, no el modelo"
slug: "dbt-na-pratica"
pillar: "data"
date: "2026-01-20"
readMinutes: 6
excerpt: "Los equipos adoptan dbt por el SQL versionado y los tests — y descubren seis meses después que el valor real vive en otro lado: en la documentación que mantiene vivo al warehouse."
tldr: "dbt entrega versionado, tests y modularidad en SQL. Pero la ganancia que distingue el uso amateur del uso maduro vive en la disciplina de documentar — descripciones, contratos, ownership. Sin eso, dbt es ETL con sintaxis nueva. Con eso, se vuelve el sistema operativo del warehouse."
keywords: ["dbt", "data warehouse", "data engineering", "documentación de datos", "modelado de datos"]
---

La primera reacción al adoptar dbt suele ser técnica y justa: SQL versionado, tests que corren en el CI, lineage automático, modularidad que reemplaza ese script de 800 líneas. Todo eso es real y vale el esfuerzo de migrar. Pero seis meses después, el equipo mira atrás y nota que la ganancia que cambió el juego fue otra — y casi nadie vendió dbt desde ese ángulo en la adopción. El verdadero truco es la **documentación**: la columna `description`, el schema YAML, la obligación cultural de describir qué significa un modelo antes de que entre en producción.

Este texto va sobre por qué la documentación en dbt vale más que cualquier otro recurso, y qué hacer para extraer ese valor a propósito — no por accidente.

## Lo que dbt entrega de fábrica

Antes de ir a la documentación, vale reconocer el paquete técnico que dbt entrega — tiene valor real. SQL en archivos versionados en Git reemplaza scripts sueltos en el editor del warehouse. Tests declarativos (`unique`, `not_null`, `accepted_values`, `relationships`) capturan regresiones antes de que rompa el dashboard. Macros y Jinja permiten reuso sin copiar SQL. `ref()` resuelve dependencias automáticamente — fin del `DROP TABLE` en el lugar equivocado. El CI genera el lineage y corre tests en cada PR.

Todo eso ya justifica la adopción. Pero es el piso, no el techo. El equipo que se queda en ese paquete tiene una versión mejor del mismo ETL que tenía antes. El que avanza hacia la documentación tiene otra cosa.

## Por qué la documentación cambia el juego

Toda empresa de tamaño medio tiene el mismo problema con el warehouse: nadie sabe qué significa cada tabla. La columna `status` en `orders` significa qué — flujo logístico, financiero, comercial? Puede tener tres significados en tres schemas, y el analista elige uno por intuición. Resultado: reportes que parecen correctos pero miden cosas distintas, métricas que divergen entre áreas, y seis meses al año gastados en "¿por qué este número es distinto en aquel dashboard?".

dbt no resuelve este problema solo — provee la *infraestructura* para resolverlo. Cada modelo tiene un archivo `.yml` con descripción del modelo, descripción de cada columna, tests asociados, owner. Cada columna puede tener `meta` con tags de dominio, sensibilidad, fuente. `dbt docs` genera un sitio navegable con lineage visual + descripciones + tests + freshness. Cuando está completo, ese sitio se vuelve el **diccionario canónico** del warehouse — [resolviendo el 80% de lo que un Data Catalog premium intentaría entregar](/blog/es/data-catalog-ninguem-usa.html), sin la licencia anual.

> dbt sin documentación es ETL con sintaxis nueva. dbt con documentación es el sistema operativo del warehouse — el lugar donde la empresa se pone de acuerdo sobre qué significa cada número.

La diferencia operativa aparece tres meses después: nuevo analista entra, lee el `dbt docs`, entiende qué hace cada modelo. Métrica que parecía divergente se resuelve en 5 minutos en el lineage. El equipo de producto pregunta "¿qué cuenta como cliente activo?" y la respuesta está en el `description` del modelo, escrita por el dueño. Conversación que antes duraba una reunión ahora dura 2 minutos.

## Cinco reglas para extraer el valor real

La diferencia entre equipo que aprovecha dbt y equipo que no es disciplina. Cinco reglas que vemos funcionar.

1. **Description bloquea el PR.** Modelo sin descripción no pasa el CI. Columna sin descripción en modelo `mart` (la capa que el negocio consume) no pasa el CI. Suena rígido — es rígido a propósito. Sin esa regla, la descripción se vuelve backlog perpetuo.
2. **Owner explícito en el `.yml`.** Cada modelo tiene un humano responsable (tag `owner` en `meta`). Cuando algo se rompe, está claro a quién llamar. Sin owner, un modelo huérfano se vuelve modelo abandonado en 6 meses.
3. **Source freshness como test.** Definir `freshness` en cada `source` (Salesforce, Stripe, Segment, etc.) con SLA explícito. Cuando la fuente atrasa, el equipo se entera antes de que el dashboard salga mal. Es uno de los tests más subvalorados de dbt.
4. **Capas explícitas: staging / intermediate / marts.** Staging es raw renombrado y tipado. Intermediate es lógica reutilizable. Marts es lo que el negocio consume. Mezclar capas es la forma más rápida de que el warehouse se vuelva un quilombo. dbt facilita la separación — usarla es disciplina.
5. **Exposures documentadas.** El tag `exposure` apunta al dashboard o aplicación que consume el modelo. Cuando alguien va a cambiar el modelo, ve qué va a romper aguas abajo. Combinado con lineage, cierra el ciclo entre warehouse y [BI que activa decisión](/blog/es/tableau-linguagem-executiva.html).

Cinco reglas simples — ninguna exige plugin nuevo. Exigen cultura. Sin ellas, dbt se vuelve repositorio con SQL lindo y diccionario vacío.

## El argumento en contra: "documentamos después"

La objeción predecible en todo proyecto: "primero armamos los modelos, después documentamos". Suena pragmático. En tres meses, nadie documentó. En seis meses, el equipo se olvidó de por qué existe ese modelo. En doce meses, el analista nuevo recrea un modelo paralelo porque no confía en el existente.

Documentar después no funciona por la misma razón que [esperar el dato limpio antes de usarlo no funciona](/blog/es/dado-limpo-e-um-mito.html) — es trabajo continuo, no fase con fin. La diferencia es que dbt ya tiene el lugar para poner la descripción. No escribirla al momento de crear el modelo es dejar deuda naciendo capitalizada. Cinco minutos en el PR ahorran tres meses al próximo trimestre.

## Cómo empezar bien

Si estás adoptando dbt ahora, tres movimientos prácticos que rinden más que elegir la versión de `dbt-core`:

**Setup con schema YAML obligatorio desde el día 1.** Configurar el CI para fallar cuando un modelo `mart` no tiene description completo. Pelearte con el equipo una vez al inicio es más barato que recuperar documentación seis meses después.

**Empezá por mart, no por staging.** Definí qué necesita consumir el negocio, escribí la descripción antes de crear el modelo, después construí las capas que lo alimentan. Disciplinariamente hacia atrás es más barato que técnicamente hacia adelante.

**Tratá `dbt docs` como producto interno.** Presentalo en reunión de área, dejá el link en la intranet, capacitá al analista para usarlo antes del warehouse. Documentación que nadie abre es overhead. Documentación que se vuelve primer recurso de consulta paga seis veces el esfuerzo de mantener.

dbt sin esa disciplina es solo una versión mejor del ETL viejo — y mejor ETL ya es algo. Con esa disciplina, se vuelve la pieza que hace que el warehouse deje de ser una caja negra. La diferencia entre los dos usos es una cultura, no una feature. ([En el mapa de qué sobrevivió del Modern Data Stack en 2026](/blog/es/modern-data-stack-2026.html), transformación versionada como código es una de las tres piezas que pasaron la prueba — y dbt fue quien probó la tesis.)
