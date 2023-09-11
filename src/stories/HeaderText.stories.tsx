import { Meta, StoryObj } from '@storybook/react';
import HeaderText from '@/components/HeaderText';

const meta = {
  title: 'HeaderText',
  component: HeaderText,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: { control: 'inline-radio', options: ['small', 'normal', 'large'] },
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '뉴스',
    size: 'normal',
  },
};

export const Small: Story = {
  args: {
    children: '프로필 수정',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: '비밀번호 변경',
    size: 'large',
  },
};
