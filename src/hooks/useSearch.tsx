import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/type/Post';
import type { SearchParams } from '@/type/search';
import type { User } from '@/type/User';
import { searchKeyword } from '@api/search';

const useSearch = ({ type = 'all', keyword }: SearchParams) => {
  const { data, isFetching } = useQuery<(User | Post)[]>(
    ['search', type, keyword],
    () => searchKeyword({ type, keyword }),
    {
      enabled: !!keyword,
    },
  );
  return { data, isFetching };
};

export default useSearch;
