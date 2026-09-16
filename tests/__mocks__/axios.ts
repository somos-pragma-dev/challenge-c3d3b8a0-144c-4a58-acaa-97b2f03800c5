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