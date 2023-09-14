import React from 'react';
import { useTabContext } from '@hooks/useTabContext';

interface TabItemProps {
  title: string;
  index: string;
  icon?: React.ReactNode;
  width: string;
  children?: React.ReactNode; // 여기에 children 추가
}

const TabItem: React.FC<TabItemProps> = ({ title, index, icon, width, children }) => {
  const { currentActive, setCurrentActive } = useTabContext();
  const active = index === currentActive;
  const activeText = active ? 'text-cooled-blue' : 'text-lazy-gray';

  return (
    <div className="flex flex-col">
      <div
        style={{ width: `${width}rem` }}
        className={`inline-block cursor-pointer mb-2 font-Cafe24Surround ${
          active ? 'border-b-2 border-cooled-blue text-cooled-blue' : 'border-b-2'
        }`}
        onClick={() => setCurrentActive(index)}
      >
        <div className="flex items-center justify-center mb-1 h-[1.5rem] text-lazy-gray">
          {icon && <span className={`mb-1 ${activeText}`}>{icon}</span>}
          <span
            style={{ fontWeight: active ? 'bold' : 'normal' }}
            className={`text-[1.125rem] ${activeText}`}
          >
            {title}
          </span>
        </div>
      </div>
      {active && children}
    </div>
  );
};

export default TabItem;
