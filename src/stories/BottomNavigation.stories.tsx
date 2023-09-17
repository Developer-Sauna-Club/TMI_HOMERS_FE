import { MemoryRouter as Router } from 'react-router-dom';
import { Meta } from '@storybook/react';
import BottomNavigation from '@components/BottomNavigation';

const meta = {
  title: 'BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
} as Meta;

export default meta;

export const Default = () => {
  return (
    <Router>
      <BottomNavigation currentPage="/home" />
    </Router>
  );
};
