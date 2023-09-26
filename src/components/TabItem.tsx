import { useTabContext } from '@hooks/useTabContext';

type TabItemProps = {
  index: string;
  children: React.ReactNode;
};

const TabItem = ({ index, children }: TabItemProps) => {
  const { activeTab } = useTabContext();
  return <>{activeTab === index && children}</>;
};

export default TabItem;
