/**
 * @fileoverview HTTP Client Service
 * Infrastructure service for making HTTP requests
 */

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

export interface HttpClient {
  get<T>(url: string, config?: Omit<HttpRequestConfig, 'method'>): Promise<HttpResponse<T>>;
  post<T>(url: string, data?: unknown, config?: Omit<HttpRequestConfig, 'method' | 'body'>): Promise<HttpResponse<T>>;
  put<T>(url: string, data?: unknown, config?: Omit<HttpRequestConfig, 'method' | 'body'>): Promise<HttpResponse<T>>;
  delete<T>(url: string, config?: Omit<HttpRequestConfig, 'method'>): Promise<HttpResponse<T>>;
  patch<T>(url: string, data?: unknown, config?: Omit<HttpRequestConfig, 'method' | 'body'>): Promise<HttpResponse<T>>;
}

class FetchHttpClient implements HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '', defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  private async request<T>(
    url: string,
    config: HttpRequestConfig = {}
  ): Promise<HttpResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = 30000,
    } = config;

    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      
      throw new Error('Unknown error occurred');
    }
  }

  async get<T>(url: string, config?: Omit<HttpRequestConfig, 'method'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  async post<T>(url: string, data?: unknown, config?: Omit<HttpRequestConfig, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'POST', body: data });
  }

  async put<T>(url: string, data?: unknown, config?: Omit<HttpRequestConfig, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PUT', body: data });
  }

  async delete<T>(url: string, config?: Omit<HttpRequestConfig, 'method'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }

  async patch<T>(url: string, data?: unknown, config?: Omit<HttpRequestConfig, 'method' | 'body'>): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'PATCH', body: data });
  }

  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }
}

// Default HTTP client instance
export const httpClient = new FetchHttpClient('http://localhost:4001');

export { FetchHttpClient };