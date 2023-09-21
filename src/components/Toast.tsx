import { AiFillCheckCircle, AiFillInfoCircle } from 'react-icons/ai';
import { BiSolidErrorCircle } from 'react-icons/bi';
import { useToastContext } from '@/hooks/useToastContext';
import Portal from './Modals/Portal';

type ToastProps = {
  message: string;
  mode?: 'info' | 'success' | 'error';
  onClick?: () => void;
};

const TOAST_ICON = {
  info: <AiFillInfoCircle size={24} className="fill-wall-street dark:fill-white" />,
  success: <AiFillCheckCircle size={24} className="fill-cooled-blue" />,
  error: <BiSolidErrorCircle size={24} className="fill-error-red" />,
};

const BORDER_COLOR_CLASSES = {
  info: 'border-lazy-gray dark:border-profile-bg',
  success: 'border-cooled-blue',
  error: 'border-error-red',
};

const Toast = ({ mode = 'info', message = 'default content', onClick }: ToastProps) => {
  const { hideToast } = useToastContext();

  const handleToastClick = () => {
    if (onClick) {
      onClick();
      hideToast();
    } else {
      hideToast();
    }
  };

  return (
    <Portal>
      <div
        className="toast toast-top mt-10 toast-center cursor-pointer w-[75%] max-w-[90%] drop-shadow-md z-[100]"
        onClick={handleToastClick}
      >
        <div
          className={`flex flex-start rounded-lg p-3 gap-2 items-center bg-white dark:bg-tricorn-black border ${BORDER_COLOR_CLASSES[mode]} w-full`}
        >
          {TOAST_ICON[mode]}
          <p className="text-wall-street dark:text-white font-Cafe24SurroundAir w-full text-[0.9rem] font-bold mr-1 whitespace-pre-line tracking-toast text-center">
            {message}
          </p>
        </div>
      </div>
    </Portal>
  );
};

export default Toast;