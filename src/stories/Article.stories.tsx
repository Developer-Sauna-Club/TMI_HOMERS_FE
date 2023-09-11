import { Meta, StoryObj } from '@storybook/react';
import Article from '@components/Article';

const meta = {
  title: 'Article',
  component: Article,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    nickname: { control: 'text' },
    postedDate: { control: 'text' },
    hasImage: { control: 'boolean' },
    likes: { control: 'number' },
    comments: { control: 'number' },
  },
  args: {
    title: '되겠냐?',
    nickname: '@khakhiD',
    postedDate: '2023-08-29T09:28:39.390Z',
    hasImage: true,
    likes: 0,
    comments: 1,
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
