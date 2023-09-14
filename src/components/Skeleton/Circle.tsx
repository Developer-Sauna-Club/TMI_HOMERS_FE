import type { UserSkeletonProps } from './UserSkeleton';
import Base from './Base';

const Circle = ({ size = 3, ...props }: Pick<UserSkeletonProps, "size">) => {
  return (
    <Base>
      <div
        style={{ width: `${size}rem`, height: `${size}rem` }}
        className="rounded-full bg-slate-200"
        {...props}
      />
    </Base>
  );
};

export default Circle;
