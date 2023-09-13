import { Meta, StoryObj } from '@storybook/react';
import ArticleInfoIcon from '@/components/ArticleInfoIcon';

const meta = {
  title: 'ArticleInfoIcon',
  component: ArticleInfoIcon,
  tags: ['autodocs'],
  argTypes: {
    likes: { control: 'number' },
    comments: { control: 'number' },
    mode: { control: 'inline-radio', options: ['list', 'post'] },
  },
  args: {
    likes: 0,
    comments: 0,
    mode: 'list',
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ArticleInfoIconInList: Story = {
  args: {
    mode: 'list',
  },
};

export const ArticleInfoIconInPost: Story = {
  args: {
    mode: 'post',
  },
};
