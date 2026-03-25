import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type CreateQueryWrapperOptions = {
  queryClient?: QueryClient;
};

export const createQueryWrapper = ({
  queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
        retry: false,
      },
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  }),
}: CreateQueryWrapperOptions = {}) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'QueryTestWrapper';

  return {
    Wrapper,
    queryClient,
  };
};
