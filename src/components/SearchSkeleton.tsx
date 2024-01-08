import Skeleton from '@components/Skeleton';
import { NUMBER_OF_SKELETON } from '@constants/Search';
import UserSkeleton from './Skeleton/UserSkeleton';

type SkeletonTypeParams = {
  SkeletonType: 'user' | 'title';
};

const SearchSkeleton = ({ SkeletonType }: SkeletonTypeParams) => {
  return (
    <>
      <div className="max-w-[22.375rem] pl-4 pr-3 pb-[0.625rem] pt-[0.25rem] mb-[0.8rem] mt-[0.5rem] mx-auto">
        {Array.from({ length: NUMBER_OF_SKELETON }, (_, index) => (
          <div key={index} className="pt-5">
            {SkeletonType === 'user' ? <UserSkeleton /> : <Skeleton.Paragraph />}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchSkeleton;
