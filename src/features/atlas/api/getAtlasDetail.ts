import { fetchJson } from '../../../shared/api/fetchJson';
import { endpoints } from '../../../shared/config/endpoints';
import type { AtlasDetailApiResponse } from '../types';

const GET_ATLAS_DETAIL_ERROR =
  'No pudimos obtener el detalle del Atlas. Inténtalo nuevamente en unos segundos.';

type GetAtlasDetailParams = {
  id: number | string;
  imei: string;
};

export const getAtlasDetail = ({ id, imei }: GetAtlasDetailParams) =>
  fetchJson<AtlasDetailApiResponse>(endpoints.atlasDetail(id, imei), {
    requiresAuth: true,
    defaultErrorMessage: GET_ATLAS_DETAIL_ERROR,
  });
