import { Meta } from '@storybook/react';
import { BsFire } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TabConstants } from '@constants/Tab';

export default {
  title: 'Tab',
  component: Tab,
  tags: ['autodocs'],
} as Meta;

export const Default = () => {
  return (
    <Tab maxWidth="25.875" active="item1">
      <TabItem title={`${TabConstants.NEWEST}`} index="item1" width="8.625">
        <Loader />
      </TabItem>
      <TabItem
        title={`${TabConstants.HOTTEST}`}
        index="item2"
        icon={<BsFire className="w-[1.5rem] h-[1.5rem]" />}
        width="8.625"
      />
      <TabItem
        title={`${TabConstants.SUBSCRIBED}`}
        index="item3"
        icon={<MdStars className="w-[1.7rem] h-[1.7rem]" />}
        width="8.625"
      />
    </Tab>
  );
};
