import { createContext, useState } from 'react';

interface TabContextProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabContext = createContext<TabContextProps>({
  activeTab: '',
  setActiveTab: () => {},
});

export const TabContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState('');

  return <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>;
};

export default TabContext;
