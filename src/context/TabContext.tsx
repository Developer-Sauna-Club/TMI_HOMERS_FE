import { createContext } from 'react';

interface TabContextProps {
  currentActive: string;
  setCurrentActive: React.Dispatch<React.SetStateAction<string>>;
}

const TabContext = createContext<TabContextProps>({
  currentActive: '',
  setCurrentActive: () => {},
});

export default TabContext;
