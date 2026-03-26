import { useQuery } from '@tanstack/react-query';

import { getAtlasDetail } from '../api/getAtlasDetail';
import type { AtlasDetail, AtlasDetailApiResponse } from '../types';

const ATLAS_DETAIL_STALE_TIME = 1000 * 60 * 5;
const ATLAS_DETAIL_GC_TIME = 1000 * 60 * 10;

type UseAtlasDetailParams = {
  id: string;
  imei: string;
};

export const useAtlasDetail = ({ id, imei }: UseAtlasDetailParams) => {
  const atlasDetailQuery = useQuery({
    gcTime: ATLAS_DETAIL_GC_TIME,
    enabled: Boolean(id) && Boolean(imei),
    queryKey: ['atlas-detail', id, imei],
    queryFn: () => getAtlasDetail({ id, imei }),
    staleTime: ATLAS_DETAIL_STALE_TIME,
  });

  return {
    ...atlasDetailQuery,
    atlasDetail: atlasDetailQuery.data
      ? mapAtlasDetail(atlasDetailQuery.data)
      : undefined,
  };
};

const mapAtlasDetail = (atlas: AtlasDetailApiResponse): AtlasDetail => ({
  batteryPercentage: atlas.batteryPercentage,
  expiredDateLabel: formatExpiredDate(atlas.expiredDate),
  imei: atlas.imei,
  latitude: parseCoordinate(atlas.latitude),
  longitude: parseCoordinate(atlas.longitude),
  name: atlas.name,
  productTypeName: atlas.productTypeName,
  signalPercentage: atlas.signalPercentage,
});

const parseCoordinate = (value: string) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
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
