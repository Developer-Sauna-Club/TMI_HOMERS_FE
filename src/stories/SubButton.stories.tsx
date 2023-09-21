import { Meta, StoryObj } from '@storybook/react';
import SubButton from '@components/SubButton';

const meta = {
  title: 'SubButton',
  component: SubButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['blue', 'red', 'violet'],
      control: 'radio',
    },
    weight: {
      options: ['bold', 'air'],
      control: 'radio',
    },
    radius: {
      options: ['small', 'medium'],
      control: 'radio',
    },
    type: {
      options: ['fill', 'outline'],
      control: 'radio',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: 'radio',
    },
    icon: {
      options: ['good', 'star', 'none'],
      control: 'radio',
    },
    label: { control: 'text' },
  },
  args: {
    radius: 'small',
    weight: 'air',
    type: 'fill',
    label: '팔로우',
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
