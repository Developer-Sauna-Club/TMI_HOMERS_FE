import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/type/Post';
import type { SearchParams } from '@/type/search';
import type { User } from '@/type/User';
import { searchKeyword } from '@api/search';

const useSearch = ({ keyword }: SearchParams) => {
  const { data, isFetching, isSuccess } = useQuery<(User | Post)[]>(
    ['search', keyword],
    () => searchKeyword({ keyword }),
    {
      enabled: !!keyword,
    },
  );
  return { data, isFetching, isSuccess };
};

export default useSearch;
