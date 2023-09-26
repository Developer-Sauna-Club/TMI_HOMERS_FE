import { MemoryRouter as Router } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import ArticleDetail from '@/components/ArticleDetail';

const meta = {
  title: 'ArticleDetail',
  component: ArticleDetail,
  tags: ['autodocs'],
  argTypes: {
    nickname: { control: 'text' },
    postedDate: { control: 'text' },
  },
  args: {
    nickname: '@khakhiD',
    postedDate: '2023-08-29T09:28:39.390Z',
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Router>
      <ArticleDetail nickname="@khakhiD" postedDate="2023-08-29T09:28:39.390Z" postUserId="1" />
    </Router>
  ),
};
