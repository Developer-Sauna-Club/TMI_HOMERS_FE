import { Meta } from '@storybook/react';
import { BsFire } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import ErrorText from '@components/ErrorText';
import Input from '@components/Input';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import { TabConstants } from '@constants/Tab';

const meta = {
  title: 'Tab',
  component: Tab,
  tags: ['autodocs'],
} as Meta;

export default meta;

export const ArticleTab = () => {
  return (
    <Tab>
      <Tab.Item title={`${TabConstants.NEWEST}`} index="item1" width="8.625">
        <Loader />
      </Tab.Item>
      <Tab.Item
        title={`${TabConstants.HOTTEST}`}
        index="item2"
        icon={<BsFire className="w-[1.5rem] h-[1.5rem]" />}
        width="8.625"
      >
        <Input placeholder="값을 입력해보세요" />
      </Tab.Item>
      <Tab.Item
        title={`${TabConstants.SUBSCRIBED}`}
        index="item3"
        icon={<MdStars className="w-[1.7rem] h-[1.7rem]" />}
        width="8.625"
      >
        <ErrorText text="에러입니까? 킄크" />
      </Tab.Item>
    </Tab>
  );
};

export const TitleAndNicknameTab = () => {
  return (
    <Tab>
      <Tab.Item title={`${TabConstants.ARTICLE_TITLE}`} index="item1" width="11.6875">
        <Loader />
      </Tab.Item>
      <Tab.Item title={`${TabConstants.NICKNAME}`} index="item2" width="11.6875">
        <Input placeholder="값을 입력해보세요" />
      </Tab.Item>
    </Tab>
  );
};

export const SubscribeTab = () => {
  return (
    <Tab>
      <Tab.Item title={`${TabConstants.SUBSCRIBING}`} index="item1" width="11.6875">
        <Loader />
      </Tab.Item>
      <Tab.Item title={`${TabConstants.SUBSCRIBER}`} index="item2" width="11.6875">
        <Input placeholder="값을 입력해보세요" />
      </Tab.Item>
    </Tab>
  );
};
