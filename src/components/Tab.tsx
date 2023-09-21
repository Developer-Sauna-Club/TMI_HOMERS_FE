import React, { useEffect } from 'react';
import { TAB_CONSTANTS } from '@constants/Tab';
import { useTabContext } from '@hooks/useTabContext';
import { getKeyByValue } from '@utils/getKeyByValue';

type TabItemProps = {
  title: string;
  width: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type TabProps = {
  active?: string;
  maxWidth: string;
  defaultTab?: string;
  tabItems: TabItemProps[];
};

const Tab = ({ active, maxWidth, defaultTab, tabItems }: TabProps) => {
  const { activeTab, setActiveTab } = useTabContext();
  const activeIndex = getKeyByValue(TAB_CONSTANTS, activeTab);

  useEffect(() => {
    if (active) {
      setActiveTab(active);
    } else if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [active, setActiveTab, defaultTab]);

  return (
    <div className="flex" style={{ maxWidth: `${maxWidth}rem` }}>
      {tabItems.map((tabItem, index) => {
        const isActive = TAB_CONSTANTS[activeIndex as keyof typeof TAB_CONSTANTS] === tabItem.title;
        return (
          <div
            key={index}
            style={{ width: `${tabItem.width}rem` }}
            className={`font-Cafe24Surround cursor-pointer flex items-center justify-center h-[2.5rem] text-[1.125rem] border-b-2 ${
              isActive ? 'text-cooled-blue border-cooled-blue' : 'text-lazy-gray'
            }`}
            onClick={() => {
              tabItem.onClick?.();
              setActiveTab(tabItem.title);
            }}
          >
            <span className={`${isActive ? 'text-cooled-blue' : 'text-lazy-gray'}`}>
              {tabItem.icon}
            </span>
            <span className={`${isActive ? 'text-cooled-blue' : 'text-lazy-gray'}`}>
              {tabItem.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
