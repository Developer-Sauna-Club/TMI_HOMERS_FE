import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '@components/Skeleton';

const meta = {
  title: 'Skeleton',
  component: Skeleton.UserSkeleton,
  tags: ['autodocs'],
  argTypes: {
    line: { control: 'number' },
    height: { control: 'number' },
    size: { control: 'number' },
  },
  args: {
    line: 3,
    height: 1.4,
    size: 3,
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Paragraph: Story = {
  render: (args) => <Skeleton.Paragraph {...args} />,
  argTypes: {
    line: { control: 'number' },
    height: { control: 'number' },
  },
  args: {
    line: 3,
    height: 1.4,
  },
};

export const Box: Story = {
  render: (args) => <Skeleton.Box {...args} />,
  argTypes: {
    height: { control: 'number' },
  },
  args: {
    height: 1.4,
  },
};

export const Circle: Story = {
  render: (args) => <Skeleton.Circle {...args} />,
  argTypes: {
    size: { control: 'number' },
  },
  args: {
    size: 3,
  },
};
