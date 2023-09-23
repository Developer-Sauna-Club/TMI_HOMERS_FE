import Loader from '@components/Loader';

type MainButtonProps = {
  label: string;
  mode?: 'filled' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  onClick?: VoidFunction;
  isLoading?: boolean;
  className?: string;
};

const BASE_BUTTON_CLASSES = 'rounded-md text-base w-[18.375rem] h-[3.125rem]';
const modeClasses = {
  filled: 'bg-footer-icon text-white font-Cafe24Surround hover:bg-wall-street',
  outlined:
    'bg-transparent border border-1 border-wall-street text-wall-street font-Cafe24SurroundAir hover:bg-footer-icon hover:border-none hover:text-white',
};

const MainButton = ({
  label = '메인버튼',
  mode = 'filled',
  type = 'button',
  isLoading = false,
  onClick,
  ...props
}: MainButtonProps) => {
  const computedClasses = modeClasses[mode];

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button
      className={`${BASE_BUTTON_CLASSES} ${computedClasses}`}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? <Loader /> : label}
    </button>
  );
};

export default MainButton;
