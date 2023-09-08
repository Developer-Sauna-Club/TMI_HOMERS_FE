import { Meta, StoryObj } from '@storybook/react';
import MainButton from '@/components/MainButton';

const meta = {
  title: 'MainButton',
  component: MainButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    mode: { control: 'inline-radio', options: ['filled', 'outlined'] },
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SignUp: Story = {
  args: {
    label: '회원가입',
    mode: 'outlined',
  },
};

export const Login: Story = {
  args: {
    label: '로그인',
    mode: 'filled',
  },
};
