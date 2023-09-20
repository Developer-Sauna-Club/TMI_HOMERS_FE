import { Meta, StoryObj } from '@storybook/react';
import Avatar from '@components/Avatar';

const meta = {
  title: 'Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'number' },
    profileImage: { control: 'text' },
    isLoggedIn: { control: 'boolean' },
  },
  args: {
    width: 8,
    profileImage:
      'https://res.cloudinary.com/learnprogrammers/image/upload/v1695140341/user/cf8cb689-e446-4440-ae2b-a00494badc30.png',
    isLoggedIn: false,
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
