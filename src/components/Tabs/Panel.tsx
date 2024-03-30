import { ReactNode, useContext } from 'react';
import { TabsContext } from '.';

type PanelProps = {
  value: string;
  children: ReactNode;
};

const Panel = ({ value, children }: PanelProps) => {
  const { selectedIndex } = useContext(TabsContext);

  return <>{selectedIndex === value && children}</>;
};

export default Panel;
