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