import { useTabContext } from '@hooks/useTabContext';

interface TabItemProps {
  title: string;
  index: string;
  children: React.ReactNode;
}

const TabItem = ({ index, children }: TabItemProps) => {
  const { activeTab } = useTabContext();
  return <div>{activeTab === index && children}</div>;
};

export default TabItem;
