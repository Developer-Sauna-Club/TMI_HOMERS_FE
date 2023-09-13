import Base from './Base';

type CircleProps = {
  size?: number;
};

const Circle = ({ size = 3 }: CircleProps) => {
  return (
    <Base>
      <div
        style={{ width: `${size}rem`, height: `${size}rem` }}
        className="rounded-full bg-slate-200"
      />
    </Base>
  );
};

export default Circle;
