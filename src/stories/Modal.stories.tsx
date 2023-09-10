import { Meta, StoryObj } from '@storybook/react';
import Modal from '@/components/Modal';

const meta = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    warning: { control: 'boolean' },
    title: { control: 'text' },
    body: { control: 'text' },
    mode: { control: 'inline-radio', options: ['confirm', 'alert'] },
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
