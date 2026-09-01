import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { axiosInstance } from './axios';
import { notifyError } from './notify';

jest.mock('../store/useAuthStore');
jest.mock('./notify');
jest.mock('../constants/api.constant', () => ({
  API: { ADMIN: { AUTH: { LOGIN: '/admin/auth/login' } } },
}));

interface InterceptorManagerHandler<T> {
  fulfilled: (value: T) => T;
  rejected: (error: AxiosError) => Promise<never>;
}

const requestHandlers = (
  axiosInstance.interceptors.request as unknown as {
    handlers: InterceptorManagerHandler<InternalAxiosRequestConfig>[];
  }
).handlers[0];

const responseHandlers = (
  axiosInstance.interceptors.response as unknown as {
    handlers: InterceptorManagerHandler<unknown>[];
  }
).handlers[0];

describe('axiosInstance request interceptor', () => {
  beforeEach(() => jest.clearAllMocks());

  it('adds Authorization header when token exists', () => {
    (useAuthStore.getState as jest.Mock).mockReturnValue({ accessToken: 'abc123' });
    const config = { headers: {} } as InternalAxiosRequestConfig;
    const result = requestHandlers.fulfilled(config);
    expect(result.headers.Authorization).toBe('Bearer abc123');
  });

  it('does not add Authorization header when token is missing', () => {
    (useAuthStore.getState as jest.Mock).mockReturnValue({ accessToken: null });
    const config = { headers: {} } as InternalAxiosRequestConfig;
    const result = requestHandlers.fulfilled(config);
    expect(result.headers.Authorization).toBeUndefined();
  });
});

describe('axiosInstance response interceptor', () => {
  const logout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore.getState as jest.Mock).mockReturnValue({ logout });
  });

  it('logs out and notifies on 401 (non-login request)', async () => {
    const error = {
      response: { status: 401 },
      config: { url: '/admin/campaigns' },
    } as AxiosError;
    await expect(responseHandlers.rejected(error)).rejects.toEqual(error);
    expect(logout).toHaveBeenCalled();
    expect(notifyError).toHaveBeenCalledWith('Sessiya bitdi. Yenidən daxil olun.');
  });

  it('does not log out on 401 from login request itself', async () => {
    const error = {
      response: { status: 401 },
      config: { url: '/admin/auth/login' },
    } as AxiosError;
    await expect(responseHandlers.rejected(error)).rejects.toEqual(error);
    expect(logout).not.toHaveBeenCalled();
  });

  it('shows notifyError for non-401 errors', async () => {
    const error = {
      response: { status: 500 },
      config: { url: '/admin/campaigns' },
    } as AxiosError;
    await expect(responseHandlers.rejected(error)).rejects.toEqual(error);
    expect(notifyError).toHaveBeenCalled();
  });
});