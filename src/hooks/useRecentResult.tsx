import { useEffect, useMemo } from 'react';
import { MAX_RECENT_SEARCHES } from '@/constants/Search';
import { RecentResultParams } from '@/type/search';
import { setItemToStorage, getItemFromStorage } from '@utils/localStorage';

const useRecentResult = ({ isSuccess, keyword }: RecentResultParams) => {
  const recentResult = useMemo<string[]>(() => {
    const recentResultString = getItemFromStorage('recent');
    return recentResultString ? JSON.parse(recentResultString) : [];
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const isDuplication = recentResult.every((item) => item !== keyword);
      isDuplication && recentResult.unshift(keyword);
      recentResult.length > MAX_RECENT_SEARCHES && recentResult.pop();
      setItemToStorage('recent', JSON.stringify(recentResult));
    }
  }, [isSuccess, keyword, recentResult]);

  return recentResult;
};

export default useRecentResult;
