import { HiThumbUp } from 'react-icons/hi';
import { MdStars } from 'react-icons/md';

type SubButtonProps = {
  color: 'blue' | 'red' | 'violet';
  weight?: 'bold' | 'air';
  radius?: 'small' | 'medium';
  size?: 'small' | 'medium' | 'large';
  type: 'fill' | 'outline';
  label: string;
  icon?: 'good' | 'star' | 'none';
  onClick?: () => void;
};

const OUTLINE_TYPE = {
  blue: 'border-cooled-blue hover:bg-cooled-blue text-cooled-blue bg-white hover:text-input-white dark:bg-transparent dark:hover:bg-cooled-blue',
  red: 'border-error-red hover:bg-error-red text-error-red bg-white hover:text-input-white dark:bg-transparent dark:hover:bg-error-red',
  violet:
    'border-light-violet hover:bg-light-violet text-light-violet bg-white hover:text-input-white dark:bg-transparent dark:hover:bg-light-violet',
};

const FILL_TYPE = {
  blue: 'bg-cooled-blue border-none hover:bg-cooled-blue hover:bg-opacity-75 text-input-white',
  red: 'bg-error-red border-none hover:bg-error-red hover:bg-opacity-75 text-input-white',
  violet: 'bg-light-violet border-none hover:bg-light-violet hover:bg-opacity-75 text-input-white',
};
const FONT_WEIGHT = {
  bold: 'font-Cafe24Surround',
  air: 'font-Cafe24SurroundAir',
};

const BORDER_RADIUS = {
  small: 'rounded-xl',
  medium: 'rounded-3xl',
};

const BUTTON_SIZE = {
  small: 'px-3 h-[1.9rem] text-[0.8rem]',
  medium: 'px-[1.3rem] h-[2.3rem] text-[0.8rem]',
  large: 'px-[2.1rem] text-[1.1rem] h-[2.3rem] min-h-[2.3rem]',
};

const ICON_STYLE = {
  good: <HiThumbUp className="w-4 h-4 mr-1" />,
  star: <MdStars className="w-5 h-5 mr-1" />,
  none: '',
};

const SubButton = ({
  label = '팔로우',
  color,
  weight = 'air',
  radius = 'small',
  type,
  size = 'medium',
  icon = 'none',
  onClick,
  ...props
}: SubButtonProps) => {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <button
      className={`border transform transition duration-100 active:scale-90 flex items-center text-[0.75rem] ${
        FONT_WEIGHT[weight]
      } ${BORDER_RADIUS[radius]} ${type === 'outline' ? OUTLINE_TYPE[color] : FILL_TYPE[color]} ${
        BUTTON_SIZE[size]
      }`}
      onClick={handleClick}
      {...props}
    >
      <div className="pb-[0.1rem]">{ICON_STYLE[icon]}</div>
      {label}
    </button>
  );
};

export default SubButton;
