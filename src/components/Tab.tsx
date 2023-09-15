import React, { useEffect } from 'react';
import { useTabContext } from '@hooks/useTabContext';

type TabItem = {
  title: string;
  width: string;
  icon?: React.ReactNode;
};

type TabProps = {
  active?: string;
  maxWidth: string;
  tabItems: TabItem[];
};

const Tab = ({ active, maxWidth, tabItems }: TabProps) => {
  const { activeTab, setActiveTab } = useTabContext();
  const activeIndex = Number(activeTab.slice(-1)) - 1;

  useEffect(() => {
    if (active) {
      setActiveTab(active);
    }
  }, [active, setActiveTab]);

  return (
    <div className="flex" style={{ maxWidth: `${maxWidth}rem` }}>
      {tabItems.map((tabItem, index) => (
        <div
          key={index}
          style={{ width: `${tabItem.width}rem` }}
          className={`font-Cafe24Surround cursor-pointer flex items-center justify-center h-[2.5rem] text-[1.125rem] border-b-2 ${
            activeIndex === index ? 'text-cooled-blue border-cooled-blue' : 'text-lazy-gray'
          }`}
          onClick={() => setActiveTab(`item${index + 1}`)}
        >
          <span className={`${activeIndex === index ? 'text-cooled-blue' : 'text-lazy-gray'}`}>
            {tabItem.icon}
          </span>
          <span className={`${activeIndex === index ? 'text-cooled-blue' : 'text-lazy-gray'}`}>
            {tabItem.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tab;
