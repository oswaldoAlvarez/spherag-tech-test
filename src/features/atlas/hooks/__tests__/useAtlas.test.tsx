import { waitFor, renderHook } from '@testing-library/react-native';
import { QueryClient } from '@tanstack/react-query';

import { createQueryWrapper } from '../../../../../test/createQueryWrapper';
import { useAtlas } from '../useAtlas';
import { getAtlas } from '../../api/getAtlas';

jest.mock('../../api/getAtlas');

const mockGetAtlas = jest.mocked(getAtlas);

describe('useAtlas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('maps atlas items and pagination for the UI', async () => {
    mockGetAtlas.mockResolvedValue({
      hasNextPage: false,
      hasPreviousPage: false,
      items: [
        {
          batteryPercentage: 85,
          expiredDate: '2026-10-04T00:00:00Z',
          id: 77,
          imei: '123456789',
          isAtlasTwo: false,
          mainProductType: 1,
          name: 'Atlas Uno',
          signalPercentage: 52,
          status: 1,
        },
      ],
      pageNumber: 1,
      totalCount: 1,
      totalPages: 1,
    });

    const { Wrapper, queryClient } = createQueryWrapper();
    const { result, unmount } = renderHook(
      () => useAtlas({ id: '3', page: 1 }),
      {
        wrapper: Wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.atlasItems).toEqual([
      {
        batteryPercentage: 85,
        expiredDateLabel: 'Expira el 04 oct 2026',
        id: '77',
        imei: '123456789',
        name: 'Atlas Uno',
        signalPercentage: 52,
      },
    ]);
    expect(result.current.pagination).toEqual({
      currentPage: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      totalCount: 1,
      totalPages: 1,
    });

    unmount();
    queryClient.clear();
  });

  it('prefetches the next page when another page is available', async () => {
    mockGetAtlas.mockResolvedValue({
      hasNextPage: true,
      hasPreviousPage: false,
      items: [],
      pageNumber: 1,
      totalCount: 25,
      totalPages: 3,
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: Infinity,
          retry: false,
        },
      },
    });
    const prefetchSpy = jest.spyOn(queryClient, 'prefetchQuery');
    const { Wrapper } = createQueryWrapper({ queryClient });

    const { unmount } = renderHook(() => useAtlas({ id: '4', page: 1 }), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(prefetchSpy).toHaveBeenCalled();
    });

    expect(prefetchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['atlas', '4', 2],
      })
    );

    unmount();
    queryClient.clear();
  });
});
