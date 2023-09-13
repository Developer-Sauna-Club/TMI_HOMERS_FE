import { MemoryRouter as Router } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { BsFire } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import Article from '@components/Article';
import ErrorText from '@components/ErrorText';
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
    <Router>
      <Tab maxWidth="25.875">
        <Tab.Item title={`${TabConstants.NEWEST}`} index="item1" width="8.625">
          <Loader />
        </Tab.Item>
        <Tab.Item
          title={`${TabConstants.HOTTEST}`}
          index="item2"
          icon={<BsFire className="w-[1.5rem] h-[1.5rem]" />}
          width="8.625"
        >
          <Article
            id="1"
            title="되겠지?"
            nickname="@wukdddang"
            postedDate="2023-08-29T09:28:39.390Z"
            hasImage={false}
            likes={10}
            comments={42}
          />
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
    </Router>
  );
};

export const TitleAndNicknameTab = () => {
  return (
    <Router>
      <Tab maxWidth="23.375">
        <Tab.Item title={`${TabConstants.ARTICLE_TITLE}`} index="item1" width="11.6875">
          <Loader />
        </Tab.Item>
        <Tab.Item title={`${TabConstants.NICKNAME}`} index="item2" width="11.6875">
          <Article
            id="2"
            title="되겠지?"
            nickname="@wukdddang"
            postedDate="2023-08-29T09:28:39.390Z"
            hasImage={false}
            likes={10}
            comments={42}
          />
        </Tab.Item>
      </Tab>
    </Router>
  );
};

export const SubscribeTab = () => {
  return (
    <Router>
      <Tab maxWidth="23.375">
        <Tab.Item title={`${TabConstants.SUBSCRIBING}`} index="item1" width="11.6875">
          <Loader />
        </Tab.Item>
        <Tab.Item title={`${TabConstants.SUBSCRIBER}`} index="item2" width="11.6875">
          <Article
            id="3"
            title="되겠지?"
            nickname="@wukdddang"
            postedDate="2023-08-29T09:28:39.390Z"
            hasImage={false}
            likes={10}
            comments={42}
          />
        </Tab.Item>
      </Tab>
    </Router>
  );
};
