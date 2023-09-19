import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/type/Post';
import type { SearchParams } from '@/type/search';
import type { User } from '@/type/User';
import { searchAllResults } from '@api/common/Search';

const useSearch = ({ keyword }: SearchParams) => {
  const { data, isFetching, isSuccess } = useQuery<(User | Post)[]>(
    ['search', keyword],
    () => searchAllResults(keyword),
    {
      enabled: !!keyword,
    },
  );
  return { data, isFetching, isSuccess };
};

export default useSearch;
