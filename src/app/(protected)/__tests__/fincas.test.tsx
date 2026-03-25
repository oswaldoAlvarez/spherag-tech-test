import type { ReactNode } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import FincasRoute from '../fincas';
import { useFarms } from '../../../features/farms/hooks/useFarms';
import { clearAuthSession } from '../../../shared/lib/authSession';
import { createQueryWrapper } from '../../../../test/createQueryWrapper';

jest.mock('../../../features/farms/hooks/useFarms');
jest.mock('../../../shared/lib/authSession');

const mockUseRouter = jest.mocked(useRouter);
const mockUseFarms = jest.mocked(useFarms);
const mockClearAuthSession = jest.mocked(clearAuthSession);

jest.mock('../../../shared/ui/templates/MainContainer', () => ({
  MainContainer: ({ children }: { children: ReactNode }) => children,
}));

describe('FincasRoute', () => {
  const push = jest.fn();
  const replace = jest.fn();

  const farms = [
    {
      accent: 'green',
      createdDateLabel: 'Creada el 20 Mar 2026',
      id: '1',
      isFavorite: true,
      name: 'Finca 1',
    },
    {
      accent: 'blue',
      createdDateLabel: 'Creada el 22 Mar 2026',
      id: '2',
      isFavorite: false,
      name: 'Finca 2',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      back: jest.fn(),
      canDismiss: jest.fn(),
      canGoBack: jest.fn(),
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
      dismissTo: jest.fn(),
      navigate: jest.fn(),
      push,
      replace,
      setParams: jest.fn(),
    } as never);

    mockUseFarms.mockReturnValue({
      error: null,
      farms,
      isError: false,
      isPending: false,
      refetch: jest.fn().mockResolvedValue(undefined),
    } as never);
  });

  it('renders the farms list and filters favorites', () => {
    const { Wrapper, queryClient } = createQueryWrapper();

    render(<FincasRoute />, { wrapper: Wrapper });

    expect(screen.getByText('2 fincas conectadas')).toBeTruthy();
    expect(screen.getByText('Finca 1')).toBeTruthy();
    expect(screen.getByText('Finca 2')).toBeTruthy();

    fireEvent.press(screen.getByText('Favoritas'));

    expect(screen.getByText('Finca 1')).toBeTruthy();
    expect(screen.queryByText('Finca 2')).toBeNull();

    queryClient.clear();
  });

  it('navigates to atlas when selecting a farm', () => {
    const { Wrapper, queryClient } = createQueryWrapper();

    render(<FincasRoute />, { wrapper: Wrapper });

    fireEvent.press(screen.getByText('Finca 1'));

    expect(push).toHaveBeenCalledWith({
      params: {
        farmName: 'Finca 1',
        id: '1',
      },
      pathname: '/atlas/[id]',
    });

    queryClient.clear();
  });

  it('retries loading farms when the request fails', async () => {
    const refetch = jest.fn().mockResolvedValue(undefined);

    mockUseFarms.mockReturnValue({
      error: new Error('Algo salió mal'),
      farms: [],
      isError: true,
      isPending: false,
      refetch,
    } as never);

    const { Wrapper, queryClient } = createQueryWrapper();

    render(<FincasRoute />, { wrapper: Wrapper });

    fireEvent.press(screen.getByText('Reintentar'));

    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(1);
    });

    queryClient.clear();
  });

  it('clears the session and returns to login on logout', async () => {
    mockClearAuthSession.mockResolvedValue(undefined);

    const { Wrapper, queryClient } = createQueryWrapper();
    const clearSpy = jest.spyOn(queryClient, 'clear');

    render(<FincasRoute />, { wrapper: Wrapper });

    fireEvent.press(screen.getByText('Salir'));

    await waitFor(() => {
      expect(mockClearAuthSession).toHaveBeenCalledTimes(1);
    });
    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith('/login');

    queryClient.clear();
  });
});
