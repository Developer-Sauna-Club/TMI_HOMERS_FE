type outlineBtnProps = {
  color: 'blue' | 'red' | 'violet';
  weight: 'bold' | 'air';
  radius: 'small' | 'medium';
  type: 'fill' | 'outline';
  width: number;
  height: number;
  children: React.ReactNode;
};

const outLineType = {
  blue: 'border-cooled-blue text-cooled-blue',
  red: 'border-warning-red text-warning-red',
  violet: 'border-light-violet text-light-violet',
};

const fillType = {
  blue: 'bg-cooled-blue text-white hover:bg-opacity-75',
  red: 'bg-warning-red text-white  hover:bg-opacity-75',
  violet: 'bg-light-violet text-white hover:bg-opacity-75',
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
  color,
  weight,
  radius,
  type,
  width,
  height,
  ...props
}: outlineBtnProps) => {
  return (
    <button
      style={{ width: `${width}rem`, height: `${height}rem` }}
      className={`border-[2px] px-4 pt-2 pb-1 cursor-pointer transform transition duration-100 focus:scale-95 ${
        fontWeight[weight]
      } ${borderRadius[radius]} ${type === 'outline' ? outLineType[color] : fillType[color]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SubOutlineButton;
