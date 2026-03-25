import type { LoginCredentials, LoginResponse } from '../types';
import { endpoints } from '../../../shared/config/endpoints';
import { fetchJson } from '../../../shared/api/fetchJson';

const GENERIC_LOGIN_ERROR =
  'No pudimos iniciar sesión. Revisa tus credenciales e inténtalo otra vez.';

export const login = ({
  email,
  password,
}: LoginCredentials): Promise<LoginResponse> =>
  fetchJson<LoginResponse>(endpoints.login, {
    method: 'POST',
    body: {
      username: email,
      password,
    },
    defaultErrorMessage: GENERIC_LOGIN_ERROR,
  });
