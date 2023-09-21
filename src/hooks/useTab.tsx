import { useState } from 'react';
import { LOCAL_STORAGE_CURRENT_TAB_KEY, TAB_CONSTANTS } from '@/constants/Tab';
import { getItemFromStorage, setItemToStorage } from '@/utils/localStorage';

const useTab = () => {
  const changeTab = (newTab: string) => {
    setCurrentTab(newTab);
    setItemToStorage(LOCAL_STORAGE_CURRENT_TAB_KEY, newTab);
  };
  const [currentTab, setCurrentTab] = useState(
    getItemFromStorage(LOCAL_STORAGE_CURRENT_TAB_KEY) || TAB_CONSTANTS.NEWEST,
  );

  return { currentTab, changeTab };
};

export default useTab;
