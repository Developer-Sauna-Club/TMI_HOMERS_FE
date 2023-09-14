type outlineBtnProps = {
  color?: 'blue' | 'red' | 'violet';
  weight?: 'bold' | 'air';
  radius?: 'small' | 'medium';
  type: 'fill' | 'outline';
  width?: number;
  height?: number;
  children: React.ReactNode;
};

const outLineType = {
  blue: 'border-cooled-blue text-cooled-blue hover:bg-cooled-blue hover:text-white',
  red: 'border-error-red text-error-red hover:bg-error-red hover:text-white',
  violet: 'border-light-violet text-light-violet hover:bg-light-violet hover:text-white',
};

const fillType = {
  blue: 'bg-cooled-blue text-white hover:bg-opacity-75 border-0',
  red: 'bg-error-red text-white  hover:bg-opacity-75 border-0',
  violet: 'bg-light-violet text-white hover:bg-opacity-75 border-0',
};
const fontWeight = {
  bold: 'font-Cafe24Surround',
  air: 'font-Cafe24SurroundAir',
};
const borderRadius = {
  small: 'rounded-2xl',
  medium: 'rounded-3xl',
};

const SubOutlineButton = ({
  children,
  color = 'blue',
  weight = 'air',
  radius = 'small',
  type,
  width,
  height,
  ...props
}: outlineBtnProps) => {
  return (
    <button
      style={{ width: `${width}rem`, height: `${height}rem` }}
      className={`border-2 px-4 pt-2 pb-1 cursor-pointer transform transition duration-100 focus:scale-95 ${
        fontWeight[weight]
      } ${borderRadius[radius]} ${type === 'outline' ? outLineType[color] : fillType[color]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SubOutlineButton;
