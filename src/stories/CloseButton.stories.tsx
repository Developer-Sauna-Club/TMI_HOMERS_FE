import { Meta, StoryObj } from '@storybook/react';
import CloseButton from '@/components/CloseButton';

const meta = {
  title: 'CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'inline-radio', options: ['large', 'small'] },
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CloseButtonLarge: Story = {
  args: {
    mode: 'large',
  },
};

export const CloseButtonSmall: Story = {
  args: {
    mode: 'small',
  },
};
