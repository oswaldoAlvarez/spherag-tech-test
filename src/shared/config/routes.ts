export const routes = {
  login: '/login',
  fincas: '/fincas',
  atlas: (id: number | string, farmName?: string) => ({
    pathname: '/atlas/[id]' as const,
    params: farmName ? { id: String(id), farmName } : { id: String(id) },
  }),
  atlasDetail: (id: number | string, imei: string, farmName?: string) => ({
    pathname: '/atlas/[id]/[imei]' as const,
    params: farmName
      ? { id: String(id), imei, farmName }
      : { id: String(id), imei },
  }),
} as const;
