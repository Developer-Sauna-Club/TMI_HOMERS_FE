import { Meta, StoryObj } from '@storybook/react';
import BackButton from '@/components/BackButton';

const meta = {
  title: 'BackButton',
  component: BackButton,
  tags: ['autodocs'],
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
