import { useTabContext } from '@hooks/useTabContext';

type TabItemProps = {
  title: string;
  index: string;
  children: React.ReactNode;
};

const TabItem = ({ index, children }: TabItemProps) => {
  const { activeTab } = useTabContext();
  return <div>{activeTab === index && children}</div>;
};

export default TabItem;
