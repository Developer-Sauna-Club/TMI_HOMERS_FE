import { AiOutlineClose } from 'react-icons/ai';

type CloseButtonProps = {
  mode?: 'large' | 'small';
  onClick?: VoidFunction;
};

const BASE_BUTTON_CLASSES = 'block bg-transparent rounded-md cursor-pointer hover:bg-lazy-gray/50';

const ModeClasses = {
  large: 'w-[1.083rem] h-[1.083rem] fill-tricorn-black dark:fill-white',
  small: 'w-[0.667rem] h-[0.667rem] fill-lazy-gray',
};

const CloseButton = ({ mode = 'large', onClick, ...props }: CloseButtonProps) => {
  return (
    <button
      type="button"
      className={`${BASE_BUTTON_CLASSES} ${ModeClasses[mode]}`}
      onClick={onClick}
      {...props}
    >
      <AiOutlineClose className={`icon ${ModeClasses[mode]}`} />
    </button>
  );
};

export default CloseButton;
