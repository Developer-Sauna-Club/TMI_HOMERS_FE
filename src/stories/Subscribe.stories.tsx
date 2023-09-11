import { Meta, StoryObj } from '@storybook/react';
import Subscribe from '@/components/Subscribe';

const meta = {
  title: 'Subscribe',
  component: Subscribe,
  tags: ['autodocs'],
  argTypes: {
    subscriber: { control: 'number' },
    subscribing: { control: 'number' },
  },
  args: {
    subscriber: 32,
    subscribing: 24,
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
