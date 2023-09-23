import Circle from './Circle';
import Paragraph from './Paragraph';

export type UserSkeletonProps = {
  line?: number;
  size?: number;
  height?: number;
  className?: string;
};

const UserSkeleton = ({ line = 2, size = 3, height = 1.4 }: UserSkeletonProps) => {
  return (
    <div className="flex items-center gap-5">
      <Circle size={size} />
      <Paragraph line={line} height={height} />
    </div>
  );
};

export default UserSkeleton;
