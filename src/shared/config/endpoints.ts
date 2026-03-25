const API_URL = 'https://api.spherag.com';
const API_CORE_URL = 'https://apicore.spherag.com';

export const endpoints = {
  login: `${API_URL}/Authentication/Login`,
  systemsList: `${API_CORE_URL}/System/List`,
  atlas: (id: number | string, init = 1, limit = 10) =>
    `${API_CORE_URL}/systems/${id}/Atlas/?Init=${init}&Limit=${limit}`,
  atlasDetail: (id: number | string, imei: string) =>
    `${API_CORE_URL}/systems/${id}/Atlas/${imei}`,
} as const;
