import { MemoryRouter as Router } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContextProvider } from '@/context/ToastContext';
import BottomNavigation from '@components/BottomNavigation';

const queryClient = new QueryClient();

const meta = {
  title: 'BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
} as Meta;

export default meta;

export const Default = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContextProvider>
          <BottomNavigation currentPage="/home" />
        </ToastContextProvider>
      </Router>
    </QueryClientProvider>
  );
};
