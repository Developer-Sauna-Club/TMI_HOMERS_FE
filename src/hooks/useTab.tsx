import { useState } from 'react';
import { CURRENT_NEWS_TAB_KEY, CURRENT_PROFILE_TAB_KEY, TAB_CONSTANTS } from '@/constants/Tab';
import { getItemFromStorage, setItemToStorage } from '@/utils/localStorage';

const DEFAULT_TAB_VALUES: { [storageKey: string]: TAB_CONSTANTS } = {
  [CURRENT_NEWS_TAB_KEY]: TAB_CONSTANTS.NEWEST,
  [CURRENT_PROFILE_TAB_KEY]: TAB_CONSTANTS.SUBSCRIBED,
};
const useTab = (storageKey: string) => {
  const defaultTab = DEFAULT_TAB_VALUES[storageKey] || TAB_CONSTANTS.NEWEST;

  const [currentTab, setCurrentTab] = useState(getItemFromStorage(storageKey) || defaultTab);

  const changeTab = (newTab: string) => {
    setCurrentTab(newTab);
    setItemToStorage(storageKey, newTab);
  };

  return { currentTab, changeTab };
};

export default useTab;
