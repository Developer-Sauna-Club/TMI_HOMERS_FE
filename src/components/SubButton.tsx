type SubButtonProps = {
  color: 'blue' | 'red' | 'violet';
  weight?: 'bold' | 'air';
  radius?: 'small' | 'medium';
  size?: 'small' | 'medium' | 'large';
  type: 'fill' | 'outline';
  label: string;
  onClick?: () => void;
};

const OUTLINE_TYPE = {
  blue: 'border-cooled-blue text-cooled-blue bg-white dark:bg-transparent',
  red: 'border-error-red dark:bg-transparent',
  violet: 'border-light-violet text-light-violet bg-white dark:bg-transparent',
};

const FILL_TYPE = {
  blue: 'bg-cooled-blue border-none text-input-white',
  red: 'bg-error-red border-none text-input-white',
  violet: 'bg-light-violet border-none text-input-white',
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
  small: 'px-4 h-[1.9rem] min-h-[1.9rem] text-[0.8rem]',
  medium: 'px-[1.3rem]h-[2.3rem] min-h-[2.3rem] text-[0.8rem]',
  large: 'px-[2.1rem] text-[1.1rem] h-[2.3rem] min-h-[2.3rem]',
};

const SubButton = ({
  label = '팔로우',
  color,
  weight = 'air',
  radius = 'small',
  type,
  size = 'medium',
  onClick,
  ...props
}: SubButtonProps) => {
  const handleClick = () => {
    onClick && onClick();
  };
  return (
    <button
      className={`normal-case ${FONT_WEIGHT[weight]} ${BORDER_RADIUS[radius]} ${
        type === 'outline' ? OUTLINE_TYPE[color] : FILL_TYPE[color]
      } ${BUTTON_SIZE[size]}`}
      onClick={handleClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default SubButton;
