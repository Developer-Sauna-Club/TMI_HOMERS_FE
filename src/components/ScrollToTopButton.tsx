import { AiOutlineArrowUp } from 'react-icons/ai';

type ScrollToTopButtonProps = {
  show: boolean;
  onClick: () => void;
};

const ScrollToTopButton = ({ show, onClick }: ScrollToTopButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={!show}
      className={`absolute p-2 flex items-center justify-center text-white w-[3.5rem] h-[3.5rem] bg-cooled-blue drop-shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.25)] transition-opacity duration-300 ease-in-out ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } rounded-full bottom-24 right-4`}
    >
      <AiOutlineArrowUp className="w-[1.5rem] h-[1.5rem]" />
    </button>
  );
};

export default ScrollToTopButton;
