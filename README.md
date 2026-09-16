# Mockear llamadas externas en Node.js

El sistema de gestión de pedidos debe interactuar con un servicio externo para obtener información de envío. Para ello, se utilizan las bibliotecas Express y axios. El objetivo es escribir pruebas unitarias que mockeen las llamadas HTTP realizadas por axios, asegurando que el sistema de gestión de pedidos funcione correctamente sin depender del servicio externo.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | pruebas unitarias en Node |
| **Nivel** | junior-l1 |
| **Tipo** | practical |
| **Tiempo estimado** | 2 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configurar el entorno de pruebas

**Objetivo:** Establecer un entorno de pruebas funcional que permita escribir y ejecutar pruebas unitarias.

**Tiempo estimado:** 30 minutos

**Instrucciones:**

- Configurar Jest para ejecutar pruebas unitarias en el proyecto.
- Verificar que las pruebas unitarias se ejecutan correctamente y que no hay errores de configuración.

**Entregable:** Entorno de pruebas configurado y funcional.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que Jest es una herramienta para escribir y ejecutar pruebas unitarias en JavaScript.
- La configuración inicial de Jest suele requerir la instalación de algunas dependencias y la creación de un archivo de configuración.

</details>

### Fase 2: Escribir pruebas unitarias para mockear llamadas HTTP

**Objetivo:** Escribir pruebas unitarias que mockeen las llamadas HTTP realizadas por axios.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Identificar las llamadas HTTP realizadas por axios en el sistema de gestión de pedidos.
- Escribir pruebas unitarias que mockeen estas llamadas utilizando Jest y la biblioteca axios-mock-adapter.
- Verificar que las pruebas unitarias se ejecutan correctamente y que los mocks funcionan como se espera.

**Entregable:** Pruebas unitarias que mockean llamadas HTTP.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que los mocks son simulaciones de comportamiento que permiten probar el código sin depender de servicios externos.
- La biblioteca axios-mock-adapter es una herramienta útil para mockear llamadas HTTP realizadas por axios.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es Jest y para qué se utiliza en el contexto de este reto?
- **paraQueSirve**: ¿Por qué es importante mockear llamadas HTTP en las pruebas unitarias?
- **comoSeUsa**: ¿Cómo se utiliza axios-mock-adapter para mockear llamadas HTTP en las pruebas unitarias?
- **erroresComunes**: ¿Qué errores comunes pueden ocurrir al mockear llamadas HTTP y cómo se pueden evitar?

## Criterios de Evaluacion

- Configuración correcta del entorno de pruebas con Jest.
- Escritura de pruebas unitarias que mockean llamadas HTTP utilizando axios-mock-adapter.
- Verificación de que las pruebas unitarias se ejecutan correctamente y que los mocks funcionan como se espera.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
el comando de build o arranque canonico del stack elegido
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
