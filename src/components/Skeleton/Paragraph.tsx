import type { UserSkeletonProps } from './UserSkeleton';
import Box from './Box';

const Paragraph = ({ line = 2, height }: Omit<UserSkeletonProps, "size">) => {
  return (
    <div className="w-full">
      {Array.from(Array(line), (_, index) =>
        index !== line - 1 ? (
          <Box height={height} key={index} />
        ) : (
          <Box height={height} width={60} key={index} />
        ),
      )}
    </div>
  );
};

export default Paragraph;
