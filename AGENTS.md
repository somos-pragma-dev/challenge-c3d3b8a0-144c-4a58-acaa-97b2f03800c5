# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Mockear llamadas externas en Node.js**.

| | |
|---|---|
| Tema | pruebas unitarias en Node |
| Nivel | junior-l1 |
| Chapter | Generico |
| Especialidad | Inferido del contexto |
| Stack | TypeScript / Jest 29.7 |
| Patron arquitectonico | capas estándar |
| Tiempo estimado | 2 horas |

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `el comando de build o arranque canonico del stack elegido` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `el comando de build o arranque canonico del stack elegido` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configurar el entorno de pruebas**: Entorno de pruebas configurado y funcional.
- **Fase 2 — Escribir pruebas unitarias para mockear llamadas HTTP**: Pruebas unitarias que mockean llamadas HTTP.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Boilerplate del stack (1)

Sin esto el proyecto no compila ni arranca. **Es tu trabajo crearlo**, y no toca nada de lo pedagogico: es andamiaje del stack.

- [ ] **Punto de entrada del stack elegido** — Sin un punto de entrada reconocible, el runtime no tiene por donde arrancar la aplicacion.

### 2. Referencias colgando (3)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/services/shippingService.ts` — `ShippingHistoryRequest.use`
      Se invoca `use` sobre `ShippingHistoryRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/services/shippingService.ts` — `ShippingResponse.use`
      Se invoca `use` sobre `ShippingResponse`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/services/shippingService.ts` — `ShippingInfoResult.map`
      Se invoca `map` sobre `ShippingInfoResult`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (9)

- `package.json`
- `tsconfig.json`
- `src/app.ts`
- `src/models/shippingResponse.ts`
- `jest.config.js`
- `src/controllers/orderController.ts`
- `src/services/shippingService.ts`
- `tests/__mocks__/axios.ts`
- `tests/unit/shippingService.test.ts`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src`
- `src/controllers`
- `src/services`
- `src/models`
- `tests`
- `tests/unit`

## Verificacion

```bash
el comando de build o arranque canonico del stack elegido
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Brecha que el reto ataca: Candidato JuniorL1 con 6 meses de experiencia en Node.js. Nunca ha escrito tests con mocks de HTTP. Stack: Express + axios. Objetivo: aprender a mockear llamadas externas.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
