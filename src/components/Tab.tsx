import React, { useState, useEffect } from 'react';
import TabContext from '@context/TabContext';

type TabProps = {
  children: React.ReactNode;
  active?: string;
  maxWidth: string;
};

const Tab: React.FC<TabProps> = ({ children, active, maxWidth }) => {
  const [currentActive, setCurrentActive] = useState(active || '');

  useEffect(() => {
    if (active) {
      setCurrentActive(active);
    }
  }, [active]);

  return (
    <TabContext.Provider value={{ currentActive, setCurrentActive }}>
      <div className="flex">{children}</div>
      <div style={{ maxWidth: `${maxWidth}rem` }} />
    </TabContext.Provider>
  );
};

export default Tab;
