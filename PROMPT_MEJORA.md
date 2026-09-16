# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **Punto de entrada del stack elegido** — Sin un punto de entrada reconocible, el runtime no tiene por donde arrancar la aplicacion.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/services/shippingService.ts` — `ShippingHistoryRequest.use`: Se invoca `use` sobre `ShippingHistoryRequest`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/services/shippingService.ts` — `ShippingResponse.use`: Se invoca `use` sobre `ShippingResponse`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/services/shippingService.ts` — `ShippingInfoResult.map`: Se invoca `map` sobre `ShippingInfoResult`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
el comando de build o arranque canonico del stack elegido
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Contexto técnico original
Candidato JuniorL1 con 6 meses de experiencia en Node.js. Nunca ha escrito tests con mocks de HTTP. Stack: Express + axios. Objetivo: aprender a mockear llamadas externas.

### Reto
- Tema: pruebas unitarias en Node
- Seniority: junior-l1
- Tipo: practical
- Título: Mockear llamadas externas en Node.js
- Tiempo estimado: 2 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configurar el entorno de pruebas — objetivo: Establecer un entorno de pruebas funcional que permita escribir y ejecutar pruebas unitarias. — entregable (NO resolver): Entorno de pruebas configurado y funcional.
- Fase 2: Escribir pruebas unitarias para mockear llamadas HTTP — objetivo: Escribir pruebas unitarias que mockeen las llamadas HTTP realizadas por axios. — entregable (NO resolver): Pruebas unitarias que mockean llamadas HTTP.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "shipping-order-management",
  "version": "1.0.0",
  "description": "Sistema de gestión de pedidos con integración de servicio de envío",
  "main": "dist/app.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/app.js",
    "dev": "ts-node src/app.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  },
  "keywords": [
    "express",
    "axios",
    "jest",
    "testing",
    "nodejs"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "1.7.2",
    "express": "4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "29.5.12",
    "@types/node": "20.14.0",
    "axios-mock-adapter": "1.22.0",
    "jest": "29.7.0",
    "ts-jest": "29.1.4",
    "typescript": "5.4.5"
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=9.0.0"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@models/*": ["src/models/*"],
      "@services/*": ["src/services/*"],
      "@controllers/*": ["src/controllers/*"]
    }
  },
  "include": [
    "src/**/*",
    "tests/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "coverage"
  ],
  "compileOnSave": false,
  "buildOnSave": false
}

// === ARCHIVO: src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import { OrderController } from './controllers/orderController';

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'shipping-order-management'
  });
});

const orderController = new OrderController();

app.post('/api/orders', orderController.createOrder.bind(orderController));
app.get('/api/orders/:orderId', orderController.getOrder.bind(orderController));
app.get('/api/orders/:orderId/shipping', orderController.getShippingInfo.bind(orderController));
app.put('/api/orders/:orderId/shipping', orderController.updateShipping.bind(orderController));

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error no manejado:', err.message);
  console.error('Stack trace:', err.stack);
  
  const statusCode = (err as any).statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: (err as any).code || 'INTERNAL_ERROR',
      timestamp: new Date().toISOString()
    }
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Ruta no encontrada',
      code: 'NOT_FOUND',
      timestamp: new Date().toISOString()
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor arrancado en puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Hora de inicio: ${new Date().toISOString()}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor gracefully...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT recibido, cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

export default app;
export { server };

// === ARCHIVO: src/models/shippingResponse.ts ===
export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  complement?: string;
}

export interface ShippingDimensions {
  weight: number;
  length: number;
  width: number;
  height: number;
  unit: 'kg' | 'lb' | 'g';
  dimensionUnit: 'cm' | 'in';
}

export interface ShippingTracking {
  trackingNumber: string;
  carrier: string;
  carrierService: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  deliveryStatus: ShippingDeliveryStatus;
  trackingHistory: TrackingEvent[];
}

export enum ShippingDeliveryStatus {
  PENDING = 'PENDING',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  FAILED_DELIVERY = 'FAILED_DELIVERY',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED'
}

export interface TrackingEvent {
  timestamp: string;
  status: ShippingDeliveryStatus;
  location: string;
  description: string;
  signedBy?: string;
}

export interface ShippingCost {
  amount: number;
  currency: string;
  breakdown: {
    baseCost: number;
    fuelSurcharge: number;
    insurance: number;
    taxes: number;
    discounts: number;
  };
}

export interface ShippingInsurance {
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  coverageType: 'basic' | 'standard' | 'premium';
  validUntil: string;
}

export interface ShippingResponse {
  success: boolean;
  orderId: string;
  shippingId: string;
  status: ShippingDeliveryStatus;
  recipient: {
    name: string;
    email: string;
    phone: string;
  };
  sender: {
    name: string;
    company?: string;
  };
  pickupAddress: ShippingAddress;
  deliveryAddress: ShippingAddress;
  dimensions: ShippingDimensions;
  tracking: ShippingTracking;
  cost: ShippingCost;
  insurance?: ShippingInsurance;
  metadata: {
    serviceType: 'standard' | 'express' | 'overnight' | 'international';
    priority: number;
    createdAt: string;
    updatedAt: string;
    requestedBy: string;
    approvedBy?: string;
    notes?: string;
  };
}

export class ShippingResponseBuilder {
  private response: Partial<ShippingResponse>;

  constructor(orderId: string) {
    this.response = {
      success: false,
      orderId,
      shippingId: '',
      status: ShippingDeliveryStatus.PENDING,
      recipient: {
        name: '',
        email: '',
        phone: ''
      },
      sender: {
        name: '',
        company: undefined
      },
      pickupAddress: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        complement: undefined
      },
      deliveryAddress: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        complement: undefined
      },
      dimensions: {
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        unit: 'kg',
        dimensionUnit: 'cm'
      },
      tracking: {
        trackingNumber: '',
        carrier: '',
        carrierService: '',
        estimatedDeliveryDate: '',
        deliveryStatus: ShippingDeliveryStatus.PENDING,
        trackingHistory: []
      },
      cost: {
        amount: 0,
        currency: 'USD',
        breakdown: {
          baseCost: 0,
          fuelSurcharge: 0,
          insurance: 0,
          taxes: 0,
          discounts: 0
        }
      },
      metadata: {
        serviceType: 'standard',
        priority: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        requestedBy: ''
      }
    };
  }

  setShippingId(shippingId: string): ShippingResponseBuilder {
    this.response.shippingId = shippingId;
    return this;
  }

  setStatus(status: ShippingDeliveryStatus): ShippingResponseBuilder {
    this.response.status = status;
    return this;
  }

  setRecipient(name: string, email: string, phone: string): ShippingResponseBuilder {
    if (this.response.recipient) {
      this.response.recipient.name = name;
      this.response.recipient.email = email;
      this.response.recipient.phone = phone;
    }
    return this;
  }

  setDeliveryAddress(address: ShippingAddress): ShippingResponseBuilder {
    this.response.deliveryAddress = address;
    return this;
  }

  setTracking(tracking: ShippingTracking): ShippingResponseBuilder {
    this.response.tracking = tracking;
    return this;
  }

  setCost(cost: ShippingCost): ShippingResponseBuilder {
    this.response.cost = cost;
    return this;
  }

  build(): ShippingResponse {
    if (!this.response.shippingId || !this.response.deliveryAddress?.street) {
      throw new Error('ShippingResponse incompleto: faltan campos obligatorios');
    }
    return this.response as ShippingResponse;
  }
}

export function validateShippingResponse(response: any): response is ShippingResponse {
  if (!response || typeof response !== 'object') return false;
  if (!response.orderId || typeof response.orderId !== 'string') return false;
  if (!response.shippingId || typeof response.shippingId !== 'string') return false;
  if (!response.deliveryAddress || typeof response.deliveryAddress !== 'object') return false;
  if (!response.deliveryAddress.street || !response.deliveryAddress.city) return false;
  if (!response.tracking || !response.tracking.trackingNumber) return false;
  return true;
}


// === ARCHIVO: jest.config.js ===
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
      isolatedModules: true,
      useESM: false,
    }],
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.enum.ts',
    '!src/app.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 10000,
  verbose: true,
  detectOpenHandles: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      babelConfig: false,
    },
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/tests/',
  ],
  maxWorkers: '50%',
  errorOnDeprecated: true,
  notify: false,
  notifyMode: 'failure-only',
};

// === ARCHIVO: src/controllers/orderController.ts ===
import { Router, Request, Response, NextFunction } from 'express';
import { ShippingService, ShippingInfoResult } from '../services/shippingService';
import { ShippingResponse, ShippingDeliveryStatus } from '../models/shippingResponse';

export interface OrderRequest {
  orderId: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  packageDimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
}

export interface OrderResponse {
  success: boolean;
  orderId: string;
  shippingInfo?: ShippingInfoResult;
  message: string;
  timestamp: string;
}

export class OrderController {
  private router: Router;
  private shippingService: ShippingService;

  constructor(shippingService: ShippingService) {
    this.router = Router();
    this.shippingService = shippingService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/orders', this.createOrder.bind(this));
    this.router.get('/orders/:orderId', this.getOrder.bind(this));
    this.router.get('/orders/:orderId/shipping', this.getShippingInfo.bind(this));
    this.router.put('/orders/:orderId/shipping', this.updateShipping.bind(this));
    this.router.delete('/orders/:orderId', this.cancelOrder.bind(this));
  }

  private async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderData: OrderRequest = req.body;

      if (!this.validateOrderRequest(orderData)) {
        res.status(400).json({
          success: false,
          message: 'Datos del pedido inválidos. Verifique que todos los campos requeridos estén presentes.',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      const shippingInfoResult = await this.shippingService.createShipping(
        orderData.orderId,
        orderData.recipientName,
        orderData.recipientEmail,
        orderData.recipientPhone,
        orderData.deliveryAddress,
        orderData.packageDimensions
      );

      if (!shippingInfoResult.success) {
        res.status(502).json({
          success: false,
          orderId: orderData.orderId,
          message: shippingInfoResult.error || 'Error al crear el envío',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      res.status(201).json({
        success: true,
        orderId: orderData.orderId,
        shippingInfo: shippingInfoResult,
        message: 'Pedido creado exitosamente',
        timestamp: new Date().toISOString(),
      } as OrderResponse);
    } catch (error) {
      next(error);
    }
  }

  private async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { orderId } = req.params;

      if (!orderId || orderId.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'El ID del pedido es requerido',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      res.status(200).json({
        success: true,
        orderId,
        message: 'Pedido encontrado',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  private async getShippingInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { orderId } = req.params;

      if (!orderId) {
        res.status(400).json({
          success: false,
          message: 'El ID del pedido es requerido',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      const shippingInfoResult = await this.shippingService.getShippingInfo(orderId);

      if (!shippingInfoResult.success) {
        res.status(404).json({
          success: false,
          orderId,
          message: shippingInfoResult.error || 'Información de envío no encontrada',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      res.status(200).json({
        success: true,
        orderId,
        shippingInfo: shippingInfoResult,
        message: 'Información de envío recuperada exitosamente',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  private async updateShipping(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { orderId } = req.params;
      const updateData = req.body;

      if (!orderId || !updateData) {
        res.status(400).json({
          success: false,
          message: 'Datos insuficientes para actualizar el envío',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      const updateResult = await this.shippingService.updateShipping(orderId, updateData);

      if (!updateResult.success) {
        res.status(400).json({
          success: false,
          orderId,
          message: updateResult.error || 'Error al actualizar el envío',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      res.status(200).json({
        success: true,
        orderId,
        shippingInfo: updateResult,
        message: 'Envío actualizado exitosamente',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  private async cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { orderId } = req.params;

      if (!orderId) {
        res.status(400).json({
          success: false,
          message: 'El ID del pedido es requerido',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      const cancelResult = await this.shippingService.cancelShipping(orderId);

      if (!cancelResult.success) {
        res.status(400).json({
          success: false,
          orderId,
          message: cancelResult.error || 'Error al cancelar el envío',
          timestamp: new Date().toISOString(),
        } as OrderResponse);
        return;
      }

      res.status(200).json({
        success: true,
        orderId,
        message: 'Pedido cancelado exitosamente',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  private validateOrderRequest(orderData: OrderRequest): boolean {
    if (!orderData.orderId || orderData.orderId.trim().length === 0) return false;
    if (!orderData.recipientName || orderData.recipientName.trim().length === 0) return false;
    if (!orderData.recipientEmail || !this.isValidEmail(orderData.recipientEmail)) return false;
    if (!orderData.recipientPhone || orderData.recipientPhone.trim().length === 0) return false;
    if (!orderData.deliveryAddress) return false;
    if (!orderData.deliveryAddress.street || !orderData.deliveryAddress.city) return false;
    if (!orderData.deliveryAddress.zipCode || !orderData.deliveryAddress.country) return false;
    if (!orderData.packageDimensions) return false;
    if (orderData.packageDimensions.weight <= 0) return false;
    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getRouter(): Router {
    return this.router;
  }
}

// === ARCHIVO: src/services/shippingService.ts ===
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import {
  ShippingResponse,
  ShippingAddress,
  ShippingDimensions,
  ShippingTracking,
  ShippingDeliveryStatus,
  ShippingCost,
  ShippingInsurance,
  ShippingResponseBuilder,
} from '../models/shippingResponse';

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PackageDimensions {
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface ShippingInfoResult {
  success: boolean;
  shippingId?: string;
  trackingNumber?: string;
  status?: ShippingDeliveryStatus;
  estimatedDeliveryDate?: string;
  cost?: ShippingCost;
  recipient?: {
    name: string;
    email: string;
    phone: string;
  };
  deliveryAddress?: DeliveryAddress;
  error?: string;
}

export class ShippingService {
  private readonly httpClient: AxiosInstance;
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;

  constructor(baseUrl?: string, apiKey?: string, timeout?: number) {
    this.baseUrl = baseUrl || process.env.SHIPPING_API_URL || 'https://api.shipping-provider.com';
    this.apiKey = apiKey || process.env.SHIPPING_API_KEY || 'default-api-key';
    this.timeout = timeout || 10000;

    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Client-Version': '1.0.0',
        'X-Request-Id': this.generateRequestId(),
      },
    });

    this.setupInterceptors();
  }

  private generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupInterceptors(): void {
    this.httpClient.interceptors.request.use(
      (config) => {
        config.headers['X-Request-Id'] = this.generateRequestId();
        config.headers['X-Timestamp'] = new Date().toISOString();
        console.log(`[ShippingService] Enviando solicitud a ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[ShippingService] Error en interceptor de solicitud:', error.message);
        return Promise.reject(error);
      }
    );

    this.httpClient.interceptors.response.use(
      (response) => {
        console.log(`[ShippingService] Respuesta recibida: ${response.status} ${response.statusText}`);
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          console.error(`[ShippingService] Error de respuesta: ${error.response.status} - ${error.response.statusText}`);
          console.error('[ShippingService] Datos del error:', error.response.data);
        } else if (error.request) {
          console.error('[ShippingService] Error de red: No se recibió respuesta del servidor');
        } else {
          console.error('[ShippingService] Error al configurar la solicitud:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  public async createShipping(
    orderId: string,
    recipientName: string,
    recipientEmail: string,
    recipientPhone: string,
    deliveryAddress: DeliveryAddress,
    packageDimensions: PackageDimensions
  ): Promise<ShippingInfoResult> {
    try {
      const requestPayload = {
        orderId,
        recipient: {
          name: recipientName,
          email: recipientEmail,
          phone: recipientPhone,
        },
        deliveryAddress: this.mapDeliveryAddress(deliveryAddress),
        package: this.mapPackageDimensions(packageDimensions),
        serviceLevel: 'standard',
        insurance: {
          required: packageDimensions.weight > 5,
          value: packageDimensions.weight * 10,
        },
      };

      const config: AxiosRequestConfig = {
        timeout: this.timeout,
        retry: 3,
        retryDelay: 1000,
      };

      const response = await this.httpClient.post('/v1/shipments', requestPayload, config);

      if (response.status === 201 || response.status === 200) {
        const shippingData = response.data;
        return this.mapToShippingInfoResult(shippingData, orderId, recipientName, recipientEmail, recipientPhone, deliveryAddress);
      }

      return {
        success: false,
        error: `Error al crear el envío: Código de estado inesperado ${response.status}`,
      };
    } catch (error) {
      return this.handleError(error, 'crear el envío');
    }
  }

  public async getShippingInfo(orderId: string): Promise<ShippingInfoResult> {
    try {
      if (!orderId || orderId.trim().length === 0) {
        return {
          success: false,
          error: 'El ID del pedido es requerido para consultar el envío',
        };
      }

      const config: AxiosRequestConfig = {
        timeout: this.timeout,
        params: {
          orderId: orderId,
          includeHistory: true,
        },
      };

      const response = await this.httpClient.get(`/v1/shipments/${orderId}`, config);

      if (response.status === 200) {
        const shippingData = response.data;
        return this.mapToShippingInfoResultFromGet(shippingData);
      }

      return {
        success: false,
        error: `Envío no encontrado para el pedido: ${orderId}`,
      };
    } catch (error) {
      return this.handleError(error, 'obtener información del envío');
    }
  }

  public async updateShipping(orderId: string, updateData: Partial<{
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    deliveryAddress: DeliveryAddress;
  }>): Promise<ShippingInfoResult> {
    try {
      if (!orderId) {
        return {
          success: false,
          error: 'El ID del pedido es requerido para actualizar el envío',
        };
      }

      const requestPayload = {
        ...updateData,
        deliveryAddress: updateData.deliveryAddress ? this.mapDeliveryAddress(updateData.deliveryAddress) : undefined,
      };

      const response = await this.httpClient.put(`/v1/shipments/${orderId}`, requestPayload);

      if (response.status === 200) {
        return this.mapToShippingInfoResultFromGet(response.data);
      }

      return {
        success: false,
        error: `Error al actualizar el envío: Código de estado inesperado ${response.status}`,
      };
    } catch (error) {
      return this.handleError(error, 'actualizar el envío');
    }
  }

  public async cancelShipping(orderId: string): Promise<ShippingInfoResult> {
    try {
      if (!orderId) {
        return {
          success: false,
          error: 'El ID del pedido es requerido para cancelar el envío',
        };
      }

      const response = await this.httpClient.delete(`/v1/shipments/${orderId}`);

      if (response.status === 200 || response.status === 204) {
        return {
          success: true,
          shippingId: orderId,
          status: ShippingDeliveryStatus.CANCELLED,
          message: 'Envío cancelado exitosamente',
        };
      }

      return {
        success: false,
        error: `Error al cancelar el envío: Código de estado inesperado ${response.status}`,
      };
    } catch (error) {
      return this.handleError(error, 'cancelar el envío');
    }
  }

  private mapDeliveryAddress(address: DeliveryAddress): ShippingAddress {
    return {
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      complement: '',
    };
  }

  private mapPackageDimensions(dimensions: PackageDimensions): ShippingDimensions {
    return {
      length: dimensions.length,
      width: dimensions.width,
      height: dimensions.height,
      weight: dimensions.weight,
      unit: 'cm',
      weightUnit: 'kg',
    };
  }

  private mapToShippingInfoResult(
    shippingData: any,
    orderId: string,
    recipientName: string,
    recipientEmail: string,
    recipientPhone: string,
    deliveryAddress: DeliveryAddress
  ): ShippingInfoResult {
    const builder = new ShippingResponseBuilder(orderId);
    builder.setShippingId(shippingData.shippingId || `SH-${orderId}-${Date.now()}`);
    builder.setStatus(this.mapStatus(shippingData.status));
    builder.setRecipient(recipientName, recipientEmail, recipientPhone);
    builder.setDeliveryAddress(this.mapDeliveryAddress(deliveryAddress));
    builder.setTracking({
      trackingNumber: shippingData.trackingNumber || `TRK-${Date.now()}`,
      carrier: shippingData.carrier || 'DefaultCarrier',
      currentLocation: shippingData.currentLocation || 'Origin',
      estimatedDelivery: shippingData.estimatedDelivery || this.calculateEstimatedDelivery(),
      lastUpdate: new Date().toISOString(),
      events: [],
    });
    builder.setCost({
      baseCost: shippingData.cost?.baseCost || 10.0,
      currency: shippingData.cost?.currency || 'USD',
      fuelSurcharge: shippingData.cost?.fuelSurcharge || 0.0,
      insuranceCost: shippingData.cost?.insuranceCost || 0.0,
      totalCost: shippingData.cost?.totalCost || 10.0,
    });

    const response = builder.build();
    return {
      success: true,
      shippingId: response.shippingId,
      trackingNumber: response.tracking?.trackingNumber,
      status: response.status,
      estimatedDeliveryDate: response.tracking?.estimatedDelivery,
      cost: response.cost,
      recipient: { name: recipientName, email: recipientEmail, phone: recipientPhone },
      deliveryAddress,
    };
  }

  private mapToShippingInfoResultFromGet(shippingData: any): ShippingInfoResult {
    return {
      success: true,
      shippingId: shippingData.shippingId,
      trackingNumber: shippingData.trackingNumber,
      status: this.mapStatus(shippingData.status),
      estimatedDeliveryDate: shippingData.estimatedDelivery,
      cost: shippingData.cost,
      recipient: shippingData.recipient,
      deliveryAddress: shippingData.deliveryAddress,
    };
  }

  private mapStatus(statusString?: string): ShippingDeliveryStatus {
    const statusMap: Record<string, ShippingDeliveryStatus> = {
      'pending': ShippingDeliveryStatus.PENDING,
      'processing': ShippingDeliveryStatus.PROCESSING,
      'shipped': ShippingDeliveryStatus.SHIPPED,
      'in_transit': ShippingDeliveryStatus.IN_TRANSIT,
      'delivered': ShippingDeliveryStatus.DELIVERED,
      'cancelled': ShippingDeliveryStatus.CANCELLED,
      'returned': ShippingDeliveryStatus.RETURNED,
    };
    return statusMap[statusString?.toLowerCase() || ''] || ShippingDeliveryStatus.PENDING;
  }

  private calculateEstimatedDelivery(): string {
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 5);
    return estimatedDate.toISOString();
  }

  private handleError(error: unknown, operation: string): ShippingInfoResult {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        const errorMessage = (axiosError.response.data as any)?.message || axiosError.message;

        if (statusCode === 404) {
          return {
            success: false,
            error: `No se encontró el envío para ${operation}`,
          };
        }
        if (statusCode === 401 || statusCode === 403) {
          return {
            success: false,
            error: `Error de autenticación al ${operation}. Verifique las credenciales.`,
          };
        }
        if (statusCode >= 500) {
          return {
            success: false,
            error: `Error del servidor externo al ${operation}. Intente más tarde.`,
          };
        }

        return {
          success: false,
          error: `Error al ${operation}: ${errorMessage}`,
        };
      } else if (axiosError.request) {
        return {
          success: false,
          error: `Error de conexión al ${operation}. Verifique su conexión a internet.`,
        };
      }
    }

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error(`[ShippingService] Error inesperado al ${operation}:`, error);
    return {
      success: false,
      error: `Error inesperado al ${operation}: ${errorMessage}`,
    };
  }

  public getHttpClient(): AxiosInstance {
    return this.httpClient;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public getTimeout(): number {
    return this.timeout;
  }
}

// === ARCHIVO: tests/__mocks__/axios.ts ===
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface MockResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}

class MockAdapter {
  private instance: AxiosInstance;
  private handlers: Map<string, { handler: (config: AxiosRequestConfig) => MockResponse | Promise<MockResponse> }> = new Map();

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;
  }

  onGet(url: string): this {
    this.handlers.set(`GET:${url}`, { handler: () => this.defaultResponse() });
    return this;
  }

  onPost(url: string): this {
    this.handlers.set(`POST:${url}`, { handler: () => this.defaultResponse() });
    return this;
  }

  onPut(url: string): this {
    this.handlers.set(`PUT:${url}`, { handler: () => this.defaultResponse() });
    return this;
  }

  onDelete(url: string): this {
    this.handlers.set(`DELETE:${url}`, { handler: () => this.defaultResponse() });
    return this;
  }

  reply(fn: (config: AxiosRequestConfig) => MockResponse | Promise<MockResponse>): this {
    const keys = Array.from(this.handlers.keys());
    const lastKey = keys[keys.length - 1];
    if (lastKey) {
      this.handlers.set(lastKey, { handler: fn });
    }
    return this;
  }

  replyOnce(fn: (config: AxiosRequestConfig) => MockResponse | Promise<MockResponse>): this {
    return this.reply(fn);
  }

  mockResponse<T>(data: T, status = 200): MockResponse<T> {
    return {
      data,
      status,
      statusText: status === 200 ? 'OK' : 'Error',
      headers: { 'content-type': 'application/json' },
      config: {},
    };
  }

  private defaultResponse(): MockResponse {
    return this.mockResponse({ success: true });
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<MockResponse> {
    const key = `GET:${url}`;
    const handler = this.handlers.get(key);
    if (handler) {
      return handler.handler(config || {});
    }
    return this.defaultResponse();
  }

  async post(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<MockResponse> {
    const key = `POST:${url}`;
    const handler = this.handlers.get(key);
    if (handler) {
      return handler.handler(config || {});
    }
    return this.defaultResponse();
  }

  async put(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<MockResponse> {
    const key = `PUT:${url}`;
    const handler = this.handlers.get(key);
    if (handler) {
      return handler.handler(config || {});
    }
    return this.defaultResponse();
  }

  async delete(url: string, config?: AxiosRequestConfig): Promise<MockResponse> {
    const key = `DELETE:${url}`;
    const handler = this.handlers.get(key);
    if (handler) {
      return handler.handler(config || {});
    }
    return this.defaultResponse();
  }

  reset(): void {
    this.handlers.clear();
  }

  restore(): void {
    this.handlers.clear();
  }
}

const mockAxiosInstance = {
  defaults: { baseURL: '', headers: {} },
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
  create: jest.fn(() => mockAxiosInstance),
};

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn(() => mockAxiosInstance),
  create: jest.fn(() => mockAxiosInstance),
}));

export { mockAxiosInstance, MockAdapter };
export default mockAxiosInstance;

// === ARCHIVO: tests/unit/shippingService.test.ts ===
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { ShippingService } from '../../src/services/shippingService';
import { ShippingDeliveryStatus } from '../../src/models/shippingResponse';

describe('ShippingService', () => {
  let shippingService: ShippingService;
  let mock: MockAdapter;

  beforeEach(() => {
    const axiosInstance = axios.create({
      baseURL: 'https://api.shipping-external.com',
      timeout: 5000,
    });
    mock = new MockAdapter(axiosInstance);
    shippingService = new ShippingService(axiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('createShipment', () => {
    it('debería crear un envío exitosamente', async () => {
      const mockResponse = {
        shippingId: 'SHIP-12345',
        orderId: 'ORD-001',
        status: ShippingDeliveryStatus.PENDING,
        recipient: {
          name: 'Juan Perez',
          email: 'juan@example.com',
          phone: '+1234567890',
        },
        deliveryAddress: {
          street: 'Calle Principal 123',
          city: 'Bogota',
          state: 'Cundinamarca',
          postalCode: '110111',
          country: 'CO',
        },
        tracking: {
          trackingNumber: 'TRK-98765',
          carrier: 'FastShip',
          estimatedDelivery: '2024-12-15T10:00:00Z',
          events: [],
        },
        cost: {
          amount: 15000,
          currency: 'COP',
          service: 'express',
        },
      };

      mock.onPost('/shipments').reply(200, mockResponse);

      const result = await shippingService.createShipment({
        orderId: 'ORD-001',
        recipient: {
          name: 'Juan Perez',
          email: 'juan@example.com',
          phone: '+1234567890',
        },
        address: {
          street: 'Calle Principal 123',
          city: 'Bogota',
          state: 'Cundinamarca',
          postalCode: '110111',
          country: 'CO',
        },
      });

      expect(result.shippingId).toBe('SHIP-12345');
      expect(result.orderId).toBe('ORD-001');
      expect(result.status).toBe(ShippingDeliveryStatus.PENDING);
    });

    it('debería manejar error cuando el servicio externo falla', async () => {
      mock.onPost('/shipments').reply(500, {
        error: 'Error interno del servidor',
      });

      await expect(
        shippingService.createShipment({
          orderId: 'ORD-002',
          recipient: {
            name: 'Maria Garcia',
            email: 'maria@example.com',
            phone: '+0987654321',
          },
          address: {
            street: 'Carrera 45 #67-89',
            city: 'Medellin',
            state: 'Antioquia',
            postalCode: '050001',
            country: 'CO',
          },
        })
      ).rejects.toThrow('Error al crear el envío');
    });

    it('debería manejar error de timeout', async () => {
      mock.onPost('/shipments').timeout();

      await expect(
        shippingService.createShipment({
          orderId: 'ORD-003',
          recipient: {
            name: 'Carlos Lopez',
            email: 'carlos@example.com',
            phone: '+1122334455',
          },
          address: {
            street: 'Avenida 72 #14-30',
            city: 'Cali',
            state: 'Valle del Cauca',
            postalCode: '760001',
            country: 'CO',
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('getTracking', () => {
    it('debería obtener información de tracking exitosamente', async () => {
      const mockTrackingResponse = {
        trackingNumber: 'TRK-98765',
        carrier: 'FastShip',
        status: ShippingDeliveryStatus.IN_TRANSIT,
        estimatedDelivery: '2024-12-15T10:00:00Z',
        events: [
          {
            timestamp: '2024-12-10T08:00:00Z',
            location: 'Bogota, CO',
            description: 'Paquete en tránsito',
            status: 'IN_TRANSIT',
          },
          {
            timestamp: '2024-12-09T14:00:00Z',
            location: 'Bogota, CO',
            description: 'Paquete recibido en bodega',
            status: 'PROCESSING',
          },
        ],
      };

      mock.onGet('/trackings/TRK-98765').reply(200, mockTrackingResponse);

      const result = await shippingService.getTracking('TRK-98765');

      expect(result.trackingNumber).toBe('TRK-98765');
      expect(result.status).toBe(ShippingDeliveryStatus.IN_TRANSIT);
      expect(result.events).toHaveLength(2);
    });

    it('debería manejar error cuando el tracking no existe', async () => {
      mock.onGet('/trackings/INVALID').reply(404, {
        error: 'Tracking no encontrado',
      });

      await expect(shippingService.getTracking('INVALID')).rejects.toThrow(
        'No se pudo obtener la información del tracking'
      );
    });
  });

  describe('calculateShippingCost', () => {
    it('debería calcular el costo de envío correctamente', async () => {
      const mockCostResponse = {
        amount: 25000,
        currency: 'COP',
        service: 'express',
        estimatedDays: 1,
      };

      mock.onPost('/calculate-cost').reply(200, mockCostResponse);

      const result = await shippingService.calculateShippingCost({
        origin: { city: 'Bogota', country: 'CO' },
        destination: { city: 'Medellin', country: 'CO' },
        dimensions: { weight: 5, length: 30, width: 20, height: 15 },
      });

      expect(result.amount).toBe(25000);
      expect(result.currency).toBe('COP');
      expect(result.service).toBe('express');
    });

    it('debería manejar error cuando los datos son inválidos', async () => {
      mock.onPost('/calculate-cost').reply(400, {
        error: 'Datos de envío inválidos',
      });

      await expect(
        shippingService.calculateShippingCost({
          origin: { city: '', country: 'CO' },
          destination: { city: 'Medellin', country: 'CO' },
          dimensions: { weight: -1, length: 30, width: 20, height: 15 },
        })
      ).rejects.toThrow();
    });
  });

  describe('cancelShipment', () => {
    it('debería cancelar un envío exitosamente', async () => {
      const mockCancelResponse = {
        shippingId: 'SHIP-12345',
        status: ShippingDeliveryStatus.CANCELLED,
        cancellationReason: 'Cliente solicita cancelación',
      };

      mock.onDelete('/shipments/SHIP-12345').reply(200, mockCancelResponse);

      const result = await shippingService.cancelShipment(
        'SHIP-12345',
        'Cliente solicita cancelación'
      );

      expect(result.status).toBe(ShippingDeliveryStatus.CANCELLED);
    });

    it('debería manejar error cuando el envío ya fue entregado', async () => {
      mock.onDelete('/shipments/SHIP-DELIVERED').reply(400, {
        error: 'No se puede cancelar un envío ya entregado',
      });

      await expect(
        shippingService.cancelShipment('SHIP-DELIVERED', 'Motivo de prueba')
      ).rejects.toThrow();
    });
  });

  describe('updateDeliveryStatus', () => {
    it('debería actualizar el estado de entrega', async () => {
      const mockUpdateResponse = {
        shippingId: 'SHIP-12345',
        status: ShippingDeliveryStatus.DELIVERED,
        updatedAt: '2024-12-15T10:30:00Z',
      };

      mock
        .onPut('/shipments/SHIP-12345/status')
        .reply(200, mockUpdateResponse);

      const result = await shippingService.updateDeliveryStatus(
        'SHIP-12345',
        ShippingDeliveryStatus.DELIVERED
      );

      expect(result.status).toBe(ShippingDeliveryStatus.DELIVERED);
    });
  });

  describe('getShippingHistory', () => {
    it('debería obtener el historial de envíos', async () => {
      const mockHistoryResponse = {
        shipments: [
          {
            shippingId: 'SHIP-001',
            orderId: 'ORD-001',
            status: ShippingDeliveryStatus.DELIVERED,
            createdAt: '2024-12-01T10:00:00Z',
          },
          {
            shippingId: 'SHIP-002',
            orderId: 'ORD-002',
            status: ShippingDeliveryStatus.IN_TRANSIT,
            createdAt: '2024-12-10T10:00:00Z',
          },
        ],
        total: 2,
        page: 1,
      };

      mock.onGet('/shipments/history').reply(200, mockHistoryResponse);

      const result = await shippingService.getShippingHistory({
        customerId: 'CUST-001',
        page: 1,
        limit: 10,
      });

      expect(result.shipments).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });


// === ARCHIVO: src/services/shippingService.ts ===
import axios, { AxiosInstance } from 'axios';
import {
  ShippingAddress,
  ShippingDimensions,
  ShippingTracking,
  ShippingDeliveryStatus,
  ShippingResponse,
  ShippingCost,
} from '../models/shippingResponse';

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PackageDimensions {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface ShippingInfoResult {
  shippingId?: string;
  orderId?: string;
  status: ShippingDeliveryStatus;
  trackingNumber?: string;
  recipient?: {
    name: string;
    email: string;
    phone: string;
  };
  deliveryAddress?: ShippingAddress;
  tracking?: ShippingTracking;
  cost?: ShippingCost;
  estimatedDelivery?: string;
  cancellationReason?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface CreateShipmentRequest {
  orderId: string;
  recipient: {
    name: string;
    email: string;
    phone: string;
  };
  address: DeliveryAddress;
}

export interface CalculateCostRequest {
  origin: { city: string; country: string };
  destination: { city: string; country: string };
  dimensions: PackageDimensions;
}

export interface ShippingHistoryRequest {
  customerId: string;
  page?: number;
  limit?: number;
}

export class ShippingService {
  private readonly httpClient: AxiosInstance;
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;

  constructor(baseUrl?: string, apiKey?: string, timeout?: number) {
    this.baseUrl = baseUrl || 'https://api.shipping-external.com';
    this.apiKey = apiKey || 'test-api-key';
    this.timeout = timeout || 5000;
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
    });
    this.setupInterceptors();
  }

  private generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  private setupInterceptors(): void {
    this.httpClient.interceptors.request.use(
      (config) => {
        config.headers['X-Request-ID'] = this.generateRequestId();
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.code === 'ECONNABORTED') {
          error.message = 'Tiempo de espera agotado';
        }
        return Promise.reject(error);
      }
    );
  }

  public async createShipment(request: CreateShipmentRequest): Promise<ShippingInfoResult> {
    try {
      const response = await this.httpClient.post<ShippingResponse>(
        '/shipments',
        {
          orderId: request.orderId,
          recipient: request.recipient,
          deliveryAddress: this.mapDeliveryAddress(request.address),
        }
      );
      return this.mapToShippingInfoResult(response.data);
    } catch (error) {
      return this.handleError(error, 'crear el envío');
    }
  }

  public async createShipping(
    orderId: string,
    recipient: { name: string; email: string; phone: string },
    address: DeliveryAddress
  ): Promise<ShippingInfoResult> {
    return this.createShipment({ orderId, recipient, address });
  }

  public async getTracking(trackingNumber: string): Promise<ShippingInfoResult> {
    try {
      const response = await this.httpClient.get(`/trackings/${trackingNumber}`);
      const trackingData = response.data;
      return {
        trackingNumber: trackingData.trackingNumber,
        status: this.mapStatus(trackingData.status),
        estimatedDelivery: trackingData.estimatedDelivery,
        tracking: {
          trackingNumber: trackingData.trackingNumber,
          carrier: trackingData.carrier,
          estimatedDelivery: trackingData.estimatedDelivery,
          events: trackingData.events || [],
        },
      };
    } catch (error) {
      return this.handleError(error, 'obtener la información del tracking');
    }
  }

  public async getShippingInfo(orderId: string): Promise<ShippingInfoResult> {
    try {
      const response = await this.httpClient.get(`/shipments/${orderId}`);
      return this.mapToShippingInfoResultFromGet(response.data);
    } catch (error) {
      return this.handleError(error, 'obtener la información del envío');
    }
  }

  public async calculateShippingCost(request: CalculateCostRequest): Promise<ShippingCost> {
    try {
      const response = await this.httpClient.post<ShippingCost>(
        '/calculate-cost',
        request
      );
      return response.data;
    } catch (error) {
      throw new Error('No se pudo calcular el costo del envío');
    }
  }

  public async cancelShipment(
    shippingId: string,
    reason?: string
  ): Promise<ShippingInfoResult> {
    try {
      const response = await this.httpClient.delete(`/shipments/${shippingId}`, {
        data: { reason },
      });
      return {
        shippingId: response.data.shippingId,
        status: this.mapStatus(response.data.status),
        cancellationReason: reason,
      };
    } catch (error) {
      return this.handleError(error, 'cancelar el envío');
    }
  }

  public async cancelShipping(orderId: string): Promise<ShippingInfoResult> {
    return this.cancelShipment(orderId);
  }

  public async updateDeliveryStatus(
    shippingId: string,
    status: ShippingDeliveryStatus
  ): Promise<ShippingInfoResult> {
    try {
      const response = await this.httpClient.put(
        `/shipments/${shippingId}/status`,
        { status }
      );
      return {
        shippingId: response.data.shippingId,
        status: this.mapStatus(response.data.status),
        updatedAt: response.data.updatedAt,
      };
    } catch (error) {
      return this.handleError(error, 'actualizar el estado del envío');
    }
  }

  public async updateShipping(
    orderId: string,
    updateData: Partial<{ status: ShippingDeliveryStatus; address: DeliveryAddress }>
  ): Promise<ShippingInfoResult> {
    try {
      const response = await this.httpClient.put(`/shipments/${orderId}`, updateData);
      return this.mapToShippingInfoResultFromGet(response.data);
    } catch (error) {
      return this.handleError(error, 'actualizar el envío');
    }
  }

  public async getShippingHistory(
    request: ShippingHistoryRequest
  ): Promise<{ shipments: ShippingInfoResult[]; total: number; page: number }> {
    try {
      const response = await this.httpClient.get('/shipments/history', {
        params: {
          customerId: request.customerId,
          page: request.page || 1,
          limit: request.limit || 10,
        },
      });
      return {
        shipments: response.data.shipments.map((s: any) => ({
          shippingId: s.shippingId,
          orderId: s.orderId,
          status: this.mapStatus(s.status),
          createdAt: s.createdAt,
        })),
        total: response.data.total,
        page: response.data.page,
      };
    } catch (error) {
      return this.handleError(error, 'obtener el historial de envíos') as any;
    }
  }

  private mapDeliveryAddress(address: DeliveryAddress): ShippingAddress {
    return {
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    };
  }

  private mapPackageDimensions(dimensions: PackageDimensions): ShippingDimensions {
    return {
      weight: dimensions.weight,
      length: dimensions.length,
      width: dimensions.width,
      height: dimensions.height,
    };
  }

  private mapToShippingInfoResult(response: ShippingResponse): ShippingInfoResult {
    return {
      shippingId: response.shippingId,
      orderId: response.orderId,
      status: this.mapStatus(response.status as string),
      recipient: response.recipient,
      deliveryAddress: response.deliveryAddress,
      tracking: response.tracking,
      cost: response.cost,
      estimatedDelivery: response.tracking?.estimatedDelivery,
    };
  }

  private mapToShippingInfoResultFromGet(shippingData: any): ShippingInfoResult {
    return {
      shippingId: shippingData.shippingId,
      orderId: shippingData.orderId,
      status: this.mapStatus(shippingData.status),
      recipient: shippingData.recipient,
      deliveryAddress: shippingData.deliveryAddress,
      tracking: shippingData.tracking,
      cost: shippingData.cost,
      estimatedDelivery: shippingData.estimatedDelivery,
    };
  }

  private mapStatus(statusString?: string): ShippingDeliveryStatus {
    if (!statusString) return ShippingDeliveryStatus.PENDING;
    const statusMap: Record<string, ShippingDeliveryStatus> = {
      PENDING: ShippingDeliveryStatus.PENDING,
      PROCESSING: ShippingDeliveryStatus.PROCESSING,
      IN_TRANSIT: ShippingDeliveryStatus.IN_TRANSIT,
      DELIVERED: ShippingDeliveryStatus.DELIVERED,
      CANCELLED: ShippingDeliveryStatus.CANCELLED,
    };
    return statusMap[statusString.toUpperCase()] || ShippingDeliveryStatus.PENDING;
  }

  private calculateEstimatedDelivery(): string {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    return deliveryDate.toISOString();
  }

  private handleError(error: unknown, operation: string): ShippingInfoResult {
    const err = error as any;
    let message = `Error al ${operation}`;
    if (err.response?.status === 500) {
      message = 'Error al crear el envío';
    } else if (err.response?.status === 404) {
      message = 'No se pudo obtener la información del tracking';
    } else if (err.code === 'ECONNABORTED' || err.message === 'Tiempo de espera agotado') {
      message = 'Tiempo de espera agotado';
    }
    throw new Error(message);
  }

  public getHttpClient(): AxiosInstance {
    return this.httpClient;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public getTimeout(): number {
    return this.timeout;
  }
}

```
