import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getAtlas } from '../api/getAtlas';
import type { AtlasApiItem, AtlasApiResponse, AtlasDevice } from '../types';

const DEFAULT_PAGE_SIZE = 10;
const ATLAS_STALE_TIME = 1000 * 60 * 5;
const ATLAS_GC_TIME = 1000 * 60 * 10;

type UseAtlasParams = {
  id: string;
  page: number;
};

export const useAtlas = ({ id, page }: UseAtlasParams) => {
  const queryClient = useQueryClient();
  const atlasQuery = useQuery({
    gcTime: ATLAS_GC_TIME,
    enabled: Boolean(id),
    queryKey: ['atlas', id, page],
    queryFn: () =>
      getAtlas({
        id,
        page,
        limit: DEFAULT_PAGE_SIZE,
      }),
    staleTime: ATLAS_STALE_TIME,
  });

  useEffect(() => {
    if (!id || !atlasQuery.data?.hasNextPage) {
      return;
    }

    const nextPage = page + 1;

    void queryClient.prefetchQuery({
      gcTime: ATLAS_GC_TIME,
      queryKey: ['atlas', id, nextPage],
      queryFn: () =>
        getAtlas({
          id,
          page: nextPage,
          limit: DEFAULT_PAGE_SIZE,
        }),
      staleTime: ATLAS_STALE_TIME,
    });
  }, [atlasQuery.data?.hasNextPage, id, page, queryClient]);

  return {
    ...atlasQuery,
    atlasItems: (atlasQuery.data?.items ?? []).map(mapAtlasDevice),
    pagination: mapPagination(atlasQuery.data),
  };
};

const mapAtlasDevice = (atlas: AtlasApiItem): AtlasDevice => ({
  id: String(atlas.id),
  imei: atlas.imei,
  name: atlas.name,
  batteryPercentage: atlas.batteryPercentage,
  signalPercentage: atlas.signalPercentage,
  expiredDateLabel: formatExpiredDate(atlas.expiredDate),
});

const mapPagination = (data?: AtlasApiResponse) => {
  return {
    currentPage: data?.pageNumber ?? 1,
    hasNextPage: data?.hasNextPage ?? false,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
  };
};

const formatExpiredDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Expiración no disponible';
  }

  const formatted = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);

  return `Expira el ${formatted}`;
};
