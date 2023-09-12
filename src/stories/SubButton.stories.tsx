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
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
  },
  args: {
    children: '응원하기',
    radius: 'small',
    weight: 'air',
    width: 8,
    height: 3,
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
