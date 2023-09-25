import { AiOutlineLeft } from 'react-icons/ai';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton = ({ onClick, ...props }: BackButtonProps) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md w-[1.625rem] h-[1.625rem] cursor-pointer hover:bg-lazy-gray/50"
      onClick={onClick}
      {...props}
    >
      <AiOutlineLeft className="icon fill-footer-icon dark:fill-lazy-gray" size="1.083rem" />
    </button>
  );
};

export default BackButton;
