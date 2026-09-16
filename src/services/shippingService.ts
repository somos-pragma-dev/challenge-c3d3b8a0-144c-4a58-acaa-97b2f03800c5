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