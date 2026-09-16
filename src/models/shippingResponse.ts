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