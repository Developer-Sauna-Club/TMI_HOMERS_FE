import { Meta, StoryObj } from '@storybook/react';
import HeaderText from '@/components/HeaderText';

const meta = {
  title: 'HeaderText',
  component: HeaderText,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: { control: 'inline-radio', options: ['small', 'normal', 'large'] },
    label: { control: 'text' },
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

export const SmallWithChildren: Story = {
  args: {
    children: '프로필 수정',
    size: 'small',
  },
};

export const LargeWithChildren: Story = {
  args: {
    children: '비밀번호 변경',
    size: 'large',
  },
};

export const SmallWithLabel: Story = {
  args: {
    label: '스몰',
    size: 'small',
  },
};

export const NormalWithLabel: Story = {
  args: {
    label: '노말',
  },
};

export const LargeWithLabel: Story = {
  args: {
    label: '라지',
    size: 'large',
  },
};
