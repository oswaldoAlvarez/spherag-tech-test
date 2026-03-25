import { fetchJson } from '../../../shared/api/fetchJson';
import { endpoints } from '../../../shared/config/endpoints';
import type { AtlasApiResponse } from '../types';

const GET_ATLAS_ERROR =
  'No pudimos obtener los Atlas. Inténtalo nuevamente en unos segundos.';

type GetAtlasParams = {
  id: number | string;
  limit?: number;
  page: number;
};

export const getAtlas = ({ id, limit = 10, page }: GetAtlasParams) =>
  fetchJson<AtlasApiResponse>(endpoints.atlas(id, page, limit), {
    requiresAuth: true,
    defaultErrorMessage: GET_ATLAS_ERROR,
  });
