import { Meta, StoryObj } from '@storybook/react';
import ErrorText from '@components/ErrorText';

const meta = {
  title: 'ErrorText',
  component: ErrorText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    text: '에러메시지입니다.',
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
