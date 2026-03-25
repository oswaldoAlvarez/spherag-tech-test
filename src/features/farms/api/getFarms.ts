import { fetchJson } from '../../../shared/api/fetchJson';
import { endpoints } from '../../../shared/config/endpoints';
import type { FarmApiItem } from '../types';

const GET_FARMS_ERROR =
  'No pudimos obtener las fincas. Inténtalo nuevamente en unos segundos.';

export const getFarms = () =>
  fetchJson<FarmApiItem[]>(endpoints.systemsList, {
    requiresAuth: true,
    defaultErrorMessage: GET_FARMS_ERROR,
  });
