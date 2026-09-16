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