---
title: "Dato limpio es un mito: cómo convivir con calidad imperfecta sin trabar el roadmap"
slug: "dado-limpo-e-um-mito"
pillar: "data"
date: "2026-01-07"
readMinutes: 6
excerpt: "Esperar dato 100% limpio para empezar es la forma más elegante de nunca entregar. Lo que separa empresas que avanzan de las que quedan en proyecto eterno de calidad."
tldr: "Dato limpio, en sentido absoluto, no existe en empresa que opera. Existe dato *bueno suficiente para la decisión X*. Quien entiende esa diferencia mueve el roadmap; quien espera limpieza universal queda en proyecto eterno de calidad. Tres reglas prácticas para dejar de trabarse."
keywords: ["calidad de datos", "data quality", "gobierno de datos", "roadmap de datos", "MDM"]
---

La frase más cara de una reunión de datos es "antes tenemos que limpiar la base". Suena responsable. Suena maduro. Y es, la mayoría de las veces, el argumento que mata el proyecto de analytics, de Salesforce, de IA — sin que nadie note que lo mató. Porque la base nunca termina de limpiarse. Siempre hay un campo más, una duplicidad más, un sistema legado más. Y la empresa que decidió esperar sigue tomando decisiones en el Excel paralelo mientras el "proyecto de calidad" entra en su tercer año.

Este texto va contra el mito de que el dato tiene que estar limpio para ser útil. No va contra la calidad — la calidad importa, y mucho. Va contra la *forma de buscar calidad* que paraliza al resto de la operación.

## El mito y por qué sobrevive

El mito tiene tres pilares. Vale nombrarlos uno por uno, porque mientras quedan implícitos, el argumento no cambia.

El primero es el **mito de la limpieza absoluta**. La idea de que existe un estado final de dato correcto — sin duplicidades, sin campos vacíos, sin inconsistencia entre sistemas. Ese estado no existe en empresa que sigue operando. Toda operación genera entropía: el cliente cambia de dirección, el vendedor tipea mal, el sistema externo manda basura. La limpieza es trabajo continuo, no una fase con fin.

El segundo es el **mito de la universalidad**. La idea de que si el dato de cliente está sucio, entonces todo proyecto que toque cliente tiene que esperar. Falso. Un dashboard de churn necesita calidad alta en el campo "fecha de cancelación" y tolera ruido en "teléfono secundario". Un agente de cobranza necesita calidad alta en "monto abierto" y tolera ruido en "segmento de mercado". *La calidad es siempre relativa al uso.*

El tercero es el **mito de la secuencia**. La idea de que primero se limpia y después se usa. En la práctica, es el uso lo que revela qué suciedad importa. La empresa que limpia antes de usar limpia lo que el equipo técnico cree que importa — y descubre, seis meses después, que limpió las cosas equivocadas. La que usa primero ve qué duele y ataca lo que duele.

> Dato limpio en lo absoluto no existe. Existe dato bueno suficiente para la decisión X. Todo lo demás es proyecto sin fin disfrazado de gobierno.

El mito sobrevive porque es cómodo. Posterga la decisión difícil, terceriza responsabilidad a "la base", y le da al equipo una sensación de rigor. El costo aparece en silencio: oportunidades no tomadas, proyectos cancelados, decisiones hechas en planilla paralela con dato peor que el del sistema oficial.

## Tres reglas para convivir con la imperfección

La boutique de datos decente trabaja así. Sin magia, sin herramienta nueva.

1. **Definí el "suficientemente bueno" para cada caso de uso.** Antes de cualquier proyecto, escribí: para esta decisión, ¿qué campos tienen que estar correctos en qué porcentaje de registros? Para un dashboard ejecutivo de ingresos, 98% en `monto` y `fecha de cierre` alcanza. Para una campaña de e-mail, 90% en `e-mail principal` alcanza. Para un modelo de churn, depende — pero necesitás el número antes de arrancar.
2. **Usá dato real sucio en paralelo con la limpieza.** No trabes el caso de uso esperando limpieza. Corré el reporte, armá el agente, publicá la campaña — con lo que hay. La primera ejecución va a mostrar exactamente dónde el ruido molesta. *Ahí* limpiás. Es diez veces más barato que limpiar a ciegas.
3. **Hacé de la observabilidad la pieza permanente, no de la limpieza.** La limpieza es evento. La observabilidad es proceso. Armá alertas para "% de registros sin CUIT en el objeto Cuenta pasó de 5% a 12%", "monto promedio del estado Propuesta cayó 30% sin variación en el funnel". Esas alertas te dicen qué limpiar, cuándo, y el impacto real en el negocio.

Las empresas que aplican esas tres reglas pasan a tratar la calidad como práctica operativa, no como proyecto. Y el proyecto de calidad clásico — el de seis meses, con consultora, con paquete de "limpieza inicial" — se vuelve lo que siempre debería haber sido: una excepción para problemas específicos, no la regla general.

## Dónde la limpieza seria sigue teniendo sentido

No confundir el argumento. Hay casos en los que la limpieza upfront es necesaria y vale el costo.

**Migración de sistema.** Cambiar de CRM, consolidar dos ERPs tras una fusión, mudarse de planilla a warehouse. Acá la limpieza es parte de la migración — no querés cargar basura histórica al sistema nuevo y resucitar problemas muertos. Pero incluso acá, "limpio" significa *limpio para ese uso* — registros que van a operar de ahora en adelante, no los 15 años de historia que nadie va a abrir.

**Identidad de cliente.** Cuando el problema es genuinamente de identidad — "¿este cliente es el mismo del otro sistema?" — vale un proyecto serio de master data con reglas de matching, deduplicación, golden record. Sin eso, todo caso de uso downstream sufre, del dashboard al agente. Pero esto es excepción, no regla. La mayoría de las empresas no necesita MDM completo; necesita reglas de matching buenas en 3–5 entidades críticas.

**Regulatorio.** Sector financiero, salud, dato personal sensible. Acá no hay opción — la calidad es compliance, y compliance no negocia. Pero el alcance es estrecho: los campos que el regulador mira. El resto de la base sigue la regla del "suficientemente bueno".

Fuera de esos tres contextos, el proyecto de limpieza universal es casi siempre fuga de la decisión de hacer.

## El costo invisible de esperar

La cuenta que nadie hace en la reunión de gobierno: mientras el proyecto de limpieza corre, *las decisiones se siguen tomando*. No paran porque el dato esté sucio. Simplemente migran al Excel paralelo del gerente, al reporte que el pasante arma a mano, a la intuición del director con 20 años en la empresa.

Ese costo invisible tiene tres componentes. Tiempo de personas sénior reinventando análisis que el sistema debería entregar — fácilmente 10–20% de la semana de los mandos medios. Decisiones con dato peor que el del sistema oficial, porque el paralelo nunca tiene la misma historia ni las mismas reglas. Y pérdida de credibilidad del área de datos, que se vuelve "ese equipo que tarda en entregar" mientras el resto de la empresa improvisa.

Cuando sumás esos tres por seis meses de "limpiemos antes", llegás a un número que suele ser mayor que el costo del propio proyecto de uso que estaba esperando.

## Qué cambiar en la próxima conversación

En la próxima reunión donde alguien diga "antes tenemos que limpiar la base", la pregunta que destraba es simple: *limpiar para qué*. Si la respuesta es vaga ("tener una base confiable", "garantizar calidad"), el proyecto no está listo — no falta limpieza, falta caso de uso. Si la respuesta es específica ("para correr ese dashboard con confianza en el `valor de contrato`"), entonces el alcance de limpieza también es específico: ese campo, en esos registros, con ese umbral.

Dato bueno no es dato limpio. Es dato adecuado al uso. La empresa que entiende esa diferencia mueve el roadmap. La que sigue persiguiendo limpieza universal va a entregar su tercer plan de gobierno en 2027 — y va a seguir tomando decisiones en planilla.
