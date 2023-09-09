import { AiOutlineClose } from 'react-icons/ai';

type CloseButtonProps = {
  mode?: 'large' | 'small';
  type?: 'button';
  onClick?: () => void;
};

const BASE_BUTTON_CLASSES = 'block bg-transparent rounded-md text-base hover:bg-stone-100';

const ModeClasses = {
  large: 'w-[1.083rem] h-[1.083rem]',
  small: 'w-[0.667rem] h-[0.667rem]',
};

const CloseButton = ({ mode = 'large', type = 'button', onClick, ...props }: CloseButtonProps) => {
  const computedClasses = ModeClasses[mode];

  return (
    <button
      className={`${BASE_BUTTON_CLASSES} ${computedClasses}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      <AiOutlineClose className="icon" size={`${computedClasses}`} color="black" />
    </button>
  );
};

export default CloseButton;
