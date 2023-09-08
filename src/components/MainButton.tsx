import { useMemo } from 'react';

type MainButtonProps = {
  label: string;
  mode?: 'filled' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

const BASE_BUTTON_CLASSES = 'block rounded-[5px] text-[16px] w-[294px] h-[50px]';

const getModeClasses = (mode: MainButtonProps['mode']) => {
  if (mode === 'filled') {
    return 'bg-footer-icon text-white font-Cafe24Surround hover:bg-wall-street';
  } else if (mode === 'outlined') {
    return 'bg-transparent border border-1 border-wall-street text-wall-street font-Cafe24SurroundAir hover:bg-footer-icon hover:border-none hover:text-white';
  }
};

const MainButton = ({
  label = '메인버튼',
  mode = 'filled',
  type = 'button',
  onClick,
  ...props
}: MainButtonProps) => {
  const computedClasses = useMemo(() => {
    return getModeClasses(mode);
  }, [mode]);

  return (
    <button
      className={`${BASE_BUTTON_CLASSES} ${computedClasses}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default MainButton;
