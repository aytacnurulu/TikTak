import type { InternalAxiosRequestConfig } from 'axios';

interface InterceptorManagerHandler<T> {
  fulfilled: (value: T) => T;
}

describe('apiClient', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('does not add Authorization header and defaults language to "az" before configureApiClient is called', async () => {
    const { apiClient } = await import('./index');
    const handler = (
      apiClient.interceptors.request as unknown as {
        handlers: InterceptorManagerHandler<InternalAxiosRequestConfig>[];
      }
    ).handlers[0];

    const config = { headers: {} } as InternalAxiosRequestConfig;
    const result = handler.fulfilled(config);

    expect(result.headers.Authorization).toBeUndefined();
    expect(result.headers['Accept-Language']).toBe('az');
  });

  it('adds Authorization header and configured language after configureApiClient is called', async () => {
    const { apiClient, configureApiClient } = await import('./index');

    configureApiClient({
      baseURL: 'https://api.example.com',
      getToken: () => 'my-token',
      getLanguage: () => 'en',
    });

    const handler = (
      apiClient.interceptors.request as unknown as {
        handlers: InterceptorManagerHandler<InternalAxiosRequestConfig>[];
      }
    ).handlers[0];

    const config = { headers: {} } as InternalAxiosRequestConfig;
    const result = handler.fulfilled(config);

    expect(apiClient.defaults.baseURL).toBe('https://api.example.com');
    expect(result.headers.Authorization).toBe('Bearer my-token');
    expect(result.headers['Accept-Language']).toBe('en');
  });

  it('does not add Authorization header when getToken returns null', async () => {
    const { apiClient, configureApiClient } = await import('./index');

    configureApiClient({
      baseURL: 'https://api.example.com',
      getToken: () => null,
    });

    const handler = (
      apiClient.interceptors.request as unknown as {
        handlers: InterceptorManagerHandler<InternalAxiosRequestConfig>[];
      }
    ).handlers[0];

    const config = { headers: {} } as InternalAxiosRequestConfig;
    const result = handler.fulfilled(config);

    expect(result.headers.Authorization).toBeUndefined();
  });
});