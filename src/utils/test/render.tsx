/* eslint-disable no-console */
import React from 'react';
import { MemoryRouter, RouterProps } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export default async (component: React.ReactNode, options: { routerProps?: RouterProps }) => {
  const { routerProps } = options;
  const user = userEvent.setup();

  return {
    user,
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter {...routerProps}>{component}</MemoryRouter>
      </QueryClientProvider>,
    ),
  };
};
