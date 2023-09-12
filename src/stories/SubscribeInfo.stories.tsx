import { Meta, StoryObj } from '@storybook/react';
import SubscribeInfo from '@/components/SubscribeInfo';

const meta = {
  title: 'SubscribeInfo',
  component: SubscribeInfo,
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
