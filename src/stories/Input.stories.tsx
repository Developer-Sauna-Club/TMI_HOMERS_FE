import { Meta, StoryObj } from '@storybook/react';
import Input from '@components/Input';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
