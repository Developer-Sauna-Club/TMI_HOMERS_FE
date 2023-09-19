import { ReactNode } from 'react';
import { AiFillCheckCircle, AiFillInfoCircle } from 'react-icons/ai';
import { BiSolidErrorCircle } from 'react-icons/bi';

type ToastProps = {
  children: ReactNode;
  mode?: 'info' | 'success' | 'error';
  onClick?: () => void;
};

const TOAST_ICON = {
  info: <AiFillInfoCircle size={24} className="fill-wall-street" />,
  success: <AiFillCheckCircle size={24} className="fill-cooled-blue" />,
  error: <BiSolidErrorCircle size={24} className="fill-error-red" />,
};

const BORDER_COLOR_CLASSES = {
  info: 'border-lazy-gray',
  success: 'border-cooled-blue',
  error: 'border-error-red',
};

const Toast = ({ mode = 'info', children = 'default content', onClick }: ToastProps) => {
  return (
    <div className="toast toast-top mt-10 toast-center cursor-pointer" onClick={onClick}>
      <div
        className={`flex flex-start rounded-lg p-3 gap-2 items-center bg-white border ${BORDER_COLOR_CLASSES[mode]} shadow-md`}
      >
        {TOAST_ICON[mode]}
        <p className="text-wall-street font-Cafe24SurroundAir text-[0.825rem] font-bold tracking-tighter mr-1 whitespace-pre">
          {children}
        </p>
      </div>
    </div>
  );
};

export default Toast;
