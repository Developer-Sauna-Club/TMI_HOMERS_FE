import { Meta, StoryObj } from '@storybook/react';
import BottomNavigation from '@components/BottomNavigation';

const meta = {
  title: 'BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
