import { Meta, StoryObj } from '@storybook/react';
import Toast from '@/components/Toast';
import { ToastContextProvider } from '@/context/ToastContext';

const meta = {
  title: 'Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    mode: { control: 'inline-radio', options: ['info', 'success', 'error'] },
  },
  render: ({ message, mode, onClick }) => (
    <ToastContextProvider>
      <Toast mode={mode} message={message} onClick={onClick} />
    </ToastContextProvider>
  ),
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LoginSuccess: Story = {
  args: {
    children: '로그인에 성공했습니다.',
    mode: 'success',
  },
};

export const EditSuccess: Story = {
  args: {
    children: '성공적으로 수정되었습니다.',
    mode: 'success',
  },
};

export const LoginError: Story = {
  args: {
    children: '로그인에 실패했습니다.',
    mode: 'error',
  },
};

export const Info: Story = {
  args: {
    children: '잠시 후 서버 점검이 예정되어 있습니다.',
  },
};
