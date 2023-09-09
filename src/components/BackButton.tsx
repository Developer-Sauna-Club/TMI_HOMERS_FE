import { AiOutlineLeft } from 'react-icons/ai';

type BackButtonProps = {
  type?: 'button';
  onClick?: () => void;
};

const BackButton = ({ type = 'button', onClick, ...props }: BackButtonProps) => {
  return (
    <button
      className="block bg-grey rounded-md text-base w-[1.625rem] h-[1.625rem]"
      type={type}
      onClick={onClick}
      {...props}
    >
      <AiOutlineLeft className="icon" size="1.083rem" color="black" />
    </button>
  );
};

export default BackButton;
