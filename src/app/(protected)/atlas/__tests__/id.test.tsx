import type { ReactNode } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import AtlasRoute from '../[id]';
import { useAtlas } from '../../../../features/atlas/hooks/useAtlas';

jest.mock('../../../../features/atlas/hooks/useAtlas');

const mockUseRouter = jest.mocked(useRouter);
const mockUseLocalSearchParams = jest.mocked(useLocalSearchParams);
const mockUseAtlas = jest.mocked(useAtlas);

jest.mock('../../../../shared/ui/templates/MainContainer', () => ({
  MainContainer: ({ children }: { children: ReactNode }) => children,
}));

describe('AtlasRoute', () => {
  const back = jest.fn();
  const canGoBack = jest.fn();
  const replace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      back,
      canDismiss: jest.fn(),
      canGoBack,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
      dismissTo: jest.fn(),
      navigate: jest.fn(),
      push: jest.fn(),
      replace,
      setParams: jest.fn(),
    } as never);

    mockUseLocalSearchParams.mockReturnValue({
      farmName: 'Finca 4',
      id: '4',
    } as never);

    mockUseAtlas.mockReturnValue({
      atlasItems: [
        {
          batteryPercentage: 80,
          expiredDateLabel: 'Expira el 04 oct 2026',
          id: '77',
          imei: '123456789',
          name: 'Atlas Uno',
          signalPercentage: 55,
        },
      ],
      error: null,
      isError: false,
      isPending: false,
      pagination: {
        currentPage: 1,
        hasNextPage: true,
        hasPreviousPage: false,
        totalCount: 12,
        totalPages: 2,
      },
      refetch: jest.fn().mockResolvedValue(undefined),
    } as never);
  });

  it('renders atlas data and paginates to the next page', () => {
    render(<AtlasRoute />);

    expect(screen.getAllByText('Atlas')).toHaveLength(2);
    expect(screen.getByText('Atlas Uno')).toBeTruthy();
    expect(screen.getByText('12 Atlas conectados')).toBeTruthy();

    fireEvent.press(screen.getByText('Siguiente'));

    expect(mockUseAtlas).toHaveBeenLastCalledWith({
      id: '4',
      page: 2,
    });
  });

  it('retries loading atlas when the request fails', async () => {
    const refetch = jest.fn().mockResolvedValue(undefined);

    mockUseAtlas.mockReturnValue({
      atlasItems: [],
      error: new Error('Error de atlas'),
      isError: true,
      isPending: false,
      pagination: {
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0,
        totalPages: 0,
      },
      refetch,
    } as never);

    render(<AtlasRoute />);

    fireEvent.press(screen.getByText('Reintentar'));

    await waitFor(() => {
      expect(refetch).toHaveBeenCalledTimes(1);
    });
  });

  it('goes back when the back action is available', () => {
    canGoBack.mockReturnValue(true);

    render(<AtlasRoute />);

    fireEvent.press(screen.getByText('Volver'));

    expect(back).toHaveBeenCalledTimes(1);
    expect(replace).not.toHaveBeenCalled();
  });

  it('falls back to fincas when there is no navigation stack', () => {
    canGoBack.mockReturnValue(false);

    render(<AtlasRoute />);

    fireEvent.press(screen.getByText('Volver'));

    expect(replace).toHaveBeenCalledWith('/fincas');
  });
});
