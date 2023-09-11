import { AiOutlineLeft } from 'react-icons/ai';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton = ({ onClick, ...props }: BackButtonProps) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md w-[1.625rem] h-[1.625rem] hover:bg-lazy-gray/50"
      onClick={onClick}
      {...props}
    >
      <AiOutlineLeft className="icon" size="1.083rem" color="tricorn-black" />
    </button>
  );
};

export default BackButton;
