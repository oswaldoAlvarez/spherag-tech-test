export const routes = {
  login: '/login',
  fincas: '/fincas',
  atlas: (id: number | string, farmName?: string) => ({
    pathname: '/atlas/[id]' as const,
    params: farmName ? { id: String(id), farmName } : { id: String(id) },
  }),
} as const;
