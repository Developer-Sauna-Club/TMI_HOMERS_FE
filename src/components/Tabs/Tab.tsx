import { ReactNode, useContext } from 'react';
import { TabsContext } from '.';

type TabProps = {
  value: string;
  children: ReactNode;
};

const Tab = ({ value, children }: TabProps) => {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext);
  const isActive = selectedIndex === value;

  const handleOnClick = () => {
    setSelectedIndex(value);
  };

  return (
    <div
      className={`cursor-pointer flex items-center justify-center h-[2.5rem] text-[1.125rem] border-b-2 w-full ${
        isActive ? 'text-cooled-blue border-cooled-blue' : 'text-lazy-gray'
      }`}
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
};

export default Tab;
