import * as SecureStore from 'expo-secure-store';

import type { LoginResponse } from '../../features/auth/types';

const AUTH_SESSION_KEY = 'auth_session';

export const storeAuthSession = async (session: LoginResponse) => {
  await SecureStore.setItemAsync(AUTH_SESSION_KEY, JSON.stringify(session));
};

export const getAuthSession = async () => {
  const session = await SecureStore.getItemAsync(AUTH_SESSION_KEY);

  if (!session) {
    return null;
  }

  return JSON.parse(session) as LoginResponse;
};

export const clearAuthSession = async () => {
  await SecureStore.deleteItemAsync(AUTH_SESSION_KEY);
};
