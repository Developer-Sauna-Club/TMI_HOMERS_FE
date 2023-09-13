import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '@components/Skeleton';

const meta = {
  title: 'Skeleton',
  component: Skeleton.Paragraph,
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

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
