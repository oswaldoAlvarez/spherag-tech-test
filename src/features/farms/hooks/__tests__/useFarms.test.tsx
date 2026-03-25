import { waitFor, renderHook } from '@testing-library/react-native';

import { createQueryWrapper } from '../../../../../test/createQueryWrapper';
import { useFarms } from '../useFarms';
import { getFarms } from '../../api/getFarms';

jest.mock('../../api/getFarms');

const mockGetFarms = jest.mocked(getFarms);

describe('useFarms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('maps the API response into farms for the UI', async () => {
    mockGetFarms.mockResolvedValue([
      {
        id: 1,
        name: 'Finca 1',
        favourite: true,
        createdDate: '2026-03-20T00:00:00Z',
      },
      {
        id: 2,
        name: 'Finca 2',
        favourite: false,
        createdDate: 'invalid-date',
      },
    ]);

    const { Wrapper, queryClient } = createQueryWrapper();
    const { result, unmount } = renderHook(() => useFarms(), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.farms).toEqual([
      {
        accent: 'green',
        createdDateLabel: 'Creada el 20 Mar 2026',
        id: '1',
        isFavorite: true,
        name: 'Finca 1',
      },
      {
        accent: 'blue',
        createdDateLabel: 'Fecha no disponible',
        id: '2',
        isFavorite: false,
        name: 'Finca 2',
      },
    ]);

    unmount();
    queryClient.clear();
  });
});
