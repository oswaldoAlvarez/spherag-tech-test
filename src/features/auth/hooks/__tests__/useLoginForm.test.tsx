import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react-native';

import { useLoginForm } from '../useLoginForm';
import { login } from '../../api/login';
import { storeAuthSession } from '../../../../shared/lib/authSession';

jest.mock('../../api/login');
jest.mock('../../../../shared/lib/authSession');

const mockLogin = jest.mocked(login);
const mockStoreAuthSession = jest.mocked(storeAuthSession);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
        retry: false,
      },
      queries: {
        gcTime: Infinity,
      },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'UseLoginFormTestWrapper';

  return { Wrapper, queryClient };
};

describe('useLoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submits trimmed credentials and persists the session', async () => {
    const session = {
      accessToken: {
        token: 'access-token',
        expiration: '2026-03-26T00:00:00Z',
      },
      refreshToken: {
        token: 'refresh-token',
        expiration: '2026-04-26T00:00:00Z',
      },
    };
    const onLoginSuccess = jest.fn();

    mockLogin.mockResolvedValue(session);

    const { Wrapper, queryClient } = createWrapper();
    const { result, unmount } = renderHook(
      () => useLoginForm({ onLoginSuccess }),
      {
        wrapper: Wrapper,
      }
    );

    act(() => {
      result.current.setEmail('  apppruebatecnica@spherag.com  ');
      result.current.setPassword('Usuario2026!');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(mockLogin).toHaveBeenCalledWith(
      {
        email: 'apppruebatecnica@spherag.com',
        password: 'Usuario2026!',
      },
      expect.objectContaining({
        client: expect.any(Object),
      })
    );
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockStoreAuthSession).toHaveBeenCalledWith(session);
    expect(onLoginSuccess).toHaveBeenCalledTimes(1);

    unmount();
    queryClient.clear();
  });

  it('surfaces an error message when the login request fails', async () => {
    mockLogin.mockRejectedValue(new Error('Credenciales inválidas'));

    const { Wrapper, queryClient } = createWrapper();
    const { result, unmount } = renderHook(() => useLoginForm(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setEmail('wrong@spherag.com');
      result.current.setPassword('bad-password');
    });

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Credenciales inválidas');

    unmount();
    queryClient.clear();
  });
});
