---
title: "LLM como juez: consistencia no es validez — valida al evaluador"
slug: "llm-como-juiz-validar-o-avaliador"
excerpt: "LLM como juez escala la evaluación de agentes, pero solo vale si el propio juez se valida. Mira qué muestra el estudio de 21 jueces y cómo probar el tuyo."
tldr: "LLM como juez es un modelo de lenguaje que califica las respuestas de otro modelo o agente en lugar de revisores humanos. Escala la evaluación, pero un juez puede ser perfectamente consistente y aun así discrepar de los especialistas, por sesgo de posición o por una métrica de concordancia inflada. La salida es tratar al juez como un instrumento de medición: calibrarlo contra etiquetas humanas con kappa, invertir el orden de las respuestas y medir el ruido entre ejecuciones antes de comparar agentes."
keywords: ["LLM como juez", "LLM-as-a-judge", "evaluación de agentes de IA", "sesgo de posición", "kappa de Cohen", "eval set"]
---

**LLM como juez** parece la solución obvia al cuello de botella de la evaluación de agentes. Revisar 100 interacciones por semana con un especialista cuesta tiempo; pedirle a un modelo que califique las mismas 100 cuesta centavos y termina en minutos. El problema es la pregunta que casi nadie hace después: ¿quién evalúa al juez? Un modelo que califica es un instrumento de medición, y los instrumentos de medición se calibran. Sin eso, el panel de calidad muestra una opinión consistente, no un hecho.

El tema ganó datos en junio de 2026, cuando un estudio a gran escala midió el comportamiento de jueces de varios proveedores. El resultado es incómodo para quien ya automatizó la evaluación: alta consistencia y baja validez conviven bien en el mismo juez.

## Qué muestra el estudio de 21 jueces

El artículo [Reliability without Validity](https://arxiv.org/abs/2606.19544), de Norman, Rivera y Hughes, evaluó 21 jueces de nueve proveedores en tres benchmarks públicos (MT-Bench, JudgeBench y RewardBench), en 118 ejecuciones y cerca de 541 mil juicios. Tres hallazgos importan para quien opera agentes.

1. **La concordancia exacta infla la calidad.** Contar cuántas veces el juez coincide con la etiqueta humana no descuenta el acierto por azar. En MT-Bench, la diferencia entre concordancia exacta y kappa de Cohen estuvo entre 33 y 41 puntos porcentuales en todos los jueces. Un juez que parece acertar el 80% puede estar mucho más cerca de uno mediano.
2. **Consistente no es imparcial.** Dos jueces ya usados en producción tuvieron confiabilidad de retest superior a 0,95 y, al mismo tiempo, sesgo de posición superior a 0,10, es decir, tendencia a preferir una respuesta por el orden en que aparece. Correr el mismo juez dos veces y obtener la misma nota solo prueba que repite el mismo error.
3. **El ranking de jueces cambia con el benchmark.** La posición de un juez varió hasta 14 lugares entre benchmarks. Elegir al "mejor juez" por un ranking público y llevarlo a tu dominio es una apuesta.

Hay un límite honesto: el estudio usa benchmarks estáticos, no trazas de agentes reales. Aplicar sus conclusiones a tu agente es inferencia nuestra, pero conservadora, porque el agente agrega variables (herramientas, varios pasos) que solo aumentan el ruido.

> Un juez que siempre repite la misma nota no es un juez confiable; es un juez predecible, y la predictibilidad no corrige el sesgo.

## Dónde falla el juez LLM en agentes

En el [protocolo de eval set fijo](/blog/es/avaliacao-de-agentes.html), la nota decide si una release sale o no. Si esa nota viene de un juez no validado, las fallas siguientes entran en la decisión sin que nadie lo note.

**Sesgo de posición.** En comparaciones por pares (respuesta A contra respuesta B), el juez tiende a favorecer una de las posiciones. Cuando comparas el agente nuevo contra el anterior y el nuevo siempre aparece en segundo lugar, parte de la diferencia que mides es del orden, no del agente.

**Un juez que evalúa el resultado e ignora el camino.** La respuesta final puede estar correcta por suerte, con una llamada de herramienta errada en el medio, o errada por un paso anterior. El juez que solo lee el texto final no ve eso. Para el camino, el instrumento es la traza, como en la [observabilidad de agentes](/blog/es/observabilidade-de-agentes.html).

**Rúbrica vaga.** "¿La respuesta es útil?" le da al juez libertad para premiar lo que suena bien. Un criterio verificable ("¿citó la política correcta? ¿devolvió el valor correcto? ¿escaló cuando debía?") reduce la varianza y vuelve diagnosticable la discrepancia con el humano.

**Misma familia de modelo.** Cuando el juez y el agente usan el mismo modelo, existe el riesgo de afinidad de estilo: el juez reconoce y premia su propia forma de escribir. Es una hipótesis de trabajo, no un hallazgo del estudio, y justamente por eso vale probarla en tu caso.

## Cómo validar al juez antes de confiar en la nota

Validar un juez cuesta una fracción de lo que cuesta evaluar todo con humanos, porque el humano entra solo en la muestra de calibración. La secuencia que usamos en proyectos:

1. **Etiqueta una muestra con especialistas.** Entre 100 y 200 casos reales, con nota humana por criterio, hecha por alguien que conoce el dominio y no construyó el agente.
2. **Mide la concordancia con kappa, no con porcentaje.** Compara las notas del juez con las humanas usando kappa de Cohen (o kappa ponderado, para escalas ordinales). Si la cifra exacta parece buena y el kappa es bajo, el juez acierta por azar.
3. **Invierte el orden en toda comparación por pares.** Corre cada par dos veces, invirtiendo las posiciones, y cuenta cuántas veces cambia el veredicto. Un veredicto inestable se vuelve empate, no victoria.
4. **Mide el ruido entre ejecuciones.** Corre el mismo conjunto varias veces. El rango de variación es el piso de diferencia que puedes considerar real; una ganancia menor que el ruido es ruido.
5. **Reserva al humano para los casos de frontera.** Donde el juez duda o discrepa de sí mismo, deriva a revisión humana. El costo humano baja, y el humano ve solo lo que importa.
6. **Revalida en cada cambio.** ¿Cambió el juez, la rúbrica o el modelo del agente? Rehaz la calibración. Es el mismo cuidado de cualquier [cambio de contexto, que debe correr la misma suite antes y después](/blog/es/engenharia-de-contexto-agentes-cache-compactacao.html).

Una regla práctica: si el kappa entre juez y especialista no es claramente mejor que el kappa entre dos especialistas elegidos al azar, el juez sirve para triaje y alertas, no para decidir una release.

## Dónde el juez LLM es una buena idea

Nada de esto es un argumento contra usar jueces automáticos. Es un argumento contra usarlos sin calibración. Funcionan bien para triaje en volumen (separar el 5% de respuestas sospechosas para revisión humana), para detectar regresiones gruesas entre releases y para verificar criterios objetivos, como formato, presencia de cita y adherencia a una política escrita.

Funcionan mal como árbitro final de calidad subjetiva y como única fuente de verdad para el ROI. El número que va al board necesita una etiqueta humana detrás; la [cuenta de ROI de un agente](/blog/es/roi-agente-ia-metricas-board.html) aguanta una mala métrica por poco tiempo. El juez automático es lo que permite medir siempre; el humano es lo que permite creer en la medición.

## Preguntas que siempre vuelven

Dudas comunes de equipos que están automatizando la evaluación de agentes.

## ¿Qué es LLM como juez?

LLM como juez (LLM-as-a-judge) es el uso de un modelo de lenguaje para evaluar las respuestas de otro modelo o agente, asignando notas o eligiendo la mejor entre dos respuestas según una rúbrica. Sirve para escalar la evaluación más allá de lo que los revisores humanos pueden cubrir, siempre que el juez esté calibrado contra etiquetas humanas.

## ¿El juez LLM reemplaza al revisor humano?

No lo reemplaza; cambia su papel. El juez cubre volumen y triaje, y el especialista etiqueta la muestra de calibración y revisa los casos de frontera. El estudio de 21 jueces muestra que la concordancia aparente puede superar a la real en 33 a 41 puntos porcentuales, lo que convierte a la validación humana en lo que sostiene el número.

## ¿Cómo saber si mi juez es confiable?

Compara sus notas con las de especialistas en 100 a 200 casos reales usando kappa de Cohen, corre cada comparación por pares en los dos órdenes y mide la variación entre ejecuciones repetidas. Si el kappa es bajo, si el veredicto cambia con el orden o si la variación es mayor que las diferencias que quieres detectar, el juez aún no está listo para decidir una release.
