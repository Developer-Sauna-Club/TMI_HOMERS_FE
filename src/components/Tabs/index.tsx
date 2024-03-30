import { ReactNode, createContext, useState } from 'react';
import List from './List';
import Panel from './Panel';
import Tab from './Tab';

type TabsContext = {
  selectedIndex: string;
  setSelectedIndex: React.Dispatch<React.SetStateAction<string>>;
};

export const TabsContext = createContext<TabsContext>({
  selectedIndex: '',
  setSelectedIndex: () => {},
});

type TabsProps = {
  defaultValue: string;
  children: ReactNode;
};

const Base = ({ defaultValue, children }: TabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultValue);

  const context = { selectedIndex, setSelectedIndex };

  return <TabsContext.Provider value={context}>{children}</TabsContext.Provider>;
};

const Tabs = Object.assign(Base, {
  List: List,
  Tab: Tab,
  Panel: Panel,
});

export default Tabs;
