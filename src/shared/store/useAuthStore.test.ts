import { useAuthStore } from './useAuthStore';
import type { AdminProfile } from '@/shared/types/admin.types';

const mockProfile = {
  id: 1,
  name: 'Test Admin',
} as unknown as AdminProfile;

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('has correct initial state', () => {
    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.profile).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('sets auth data and marks user as authenticated', () => {
    useAuthStore.getState().setAuth({
      accessToken: 'access-123',
      refreshToken: 'refresh-456',
      profile: mockProfile,
    });

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('access-123');
    expect(state.refreshToken).toBe('refresh-456');
    expect(state.profile).toEqual(mockProfile);
    expect(state.isAuthenticated).toBe(true);
  });

  it('clears auth data on logout', () => {
    useAuthStore.getState().setAuth({
      accessToken: 'access-123',
      refreshToken: 'refresh-456',
      profile: mockProfile,
    });

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.profile).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});