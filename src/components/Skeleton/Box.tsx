import Base from './Base';

type BoxProps = {
  height?: number;
  width?: number;
};

const Box = ({ height = 1.4, width, ...props }: BoxProps) => {
  return (
    <Base>
      <div className="flex-1 space-y-6 py-1">
        <div
          style={{ height: `${height}rem`, width: `${width}%` }}
          className=" bg-slate-200 rounded-lg dark:bg-wall-street"
          {...props}
        />
      </div>
    </Base>
  );
};

export default Box;
