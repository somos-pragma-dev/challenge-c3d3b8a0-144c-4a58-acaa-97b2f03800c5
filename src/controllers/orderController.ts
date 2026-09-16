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