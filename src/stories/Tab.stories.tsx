import { MemoryRouter as Router } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { BsFire } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import Article from '@components/Article';
import ErrorText from '@components/ErrorText';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TAB_CONSTANTS } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';

export default {
  title: 'Tab',
  component: Tab,
  tags: ['autodocs'],
} as Meta;

export const Default = () => {
  return (
    <Router>
      <TabContextProvider>
        <Tab
          maxWidth="25.875"
          tabItems={[
            { title: `${TAB_CONSTANTS.NEWEST}`, width: '8.625' },
            {
              title: `${TAB_CONSTANTS.HOTTEST}`,
              width: '8.625',
              icon: <BsFire className="w-[1.3rem] h-[1.3rem]" />,
            },
            {
              title: `${TAB_CONSTANTS.SUBSCRIBED}`,
              width: '8.625',
              icon: <MdStars className="w-[1.5rem] h-[1.5rem]" />,
            },
          ]}
        />
        <TabItem title={`${TAB_CONSTANTS.NEWEST}`} index="item1">
          <Loader />
        </TabItem>
        <TabItem title={`${TAB_CONSTANTS.HOTTEST}`} index="item2">
          <Article
            id="1"
            title="(임시)이거슨 뜨겁다."
            nickname="@hot-guys"
            postedDate="2023-09-14T09:28:39.390Z"
            hasImage={false}
            likes={15}
            comments={42}
          />
        </TabItem>
        <TabItem title={`${TAB_CONSTANTS.SUBSCRIBED}`} index="item3">
          <Article
            id="1"
            title="(임시)이거슨 구독이다."
            nickname="@sub-scriber"
            postedDate="2023-09-14T09:28:39.390Z"
            hasImage={false}
            likes={12}
            comments={42}
          />
        </TabItem>
      </TabContextProvider>
    </Router>
  );
};

export const TitleAndNicknameTab = () => {
  return (
    <Router>
      <TabContextProvider>
        <Tab
          maxWidth="23.375"
          tabItems={[
            { title: `${TAB_CONSTANTS.ARTICLE_TITLE}`, width: '11.6875' },
            { title: `${TAB_CONSTANTS.NICKNAME}`, width: '11.6875' },
          ]}
        />
        <TabItem title={`${TAB_CONSTANTS.NEWEST}`} index="item1">
          <Loader />
        </TabItem>
        <TabItem title={`${TAB_CONSTANTS.SUBSCRIBED}`} index="item2">
          <ErrorText text="아직 구독한 사용자가 없습니다." />
        </TabItem>
      </TabContextProvider>
    </Router>
  );
};

export const SubscribeTab = () => {
  return (
    <Router>
      <TabContextProvider>
        <Tab
          maxWidth="23.375"
          tabItems={[
            { title: `${TAB_CONSTANTS.SUBSCRIBER}`, width: '11.6875' },
            { title: `${TAB_CONSTANTS.SUBSCRIBING}`, width: '11.6875' },
          ]}
        />
        <TabItem title={`${TAB_CONSTANTS.SUBSCRIBER}`} index="item1">
          <Loader />
        </TabItem>
        <TabItem title={`${TAB_CONSTANTS.SUBSCRIBING}`} index="item2">
          <Article
            id="1"
            title="(임시)이거슨 구독이다."
            nickname="@sub-scriber"
            postedDate="2023-09-14T09:28:39.390Z"
            hasImage={false}
            likes={12}
            comments={42}
          />
        </TabItem>
      </TabContextProvider>
    </Router>
  );
};
