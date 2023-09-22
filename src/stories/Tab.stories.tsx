import { MemoryRouter as Router } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { BsFire } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import Article from '@components/Article';
import ErrorText from '@components/ErrorText';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { CURRENT_NEWS_TAB_KEY, CURRENT_SEARCH_TAB_KEY, TAB_CONSTANTS } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import useTab from '@hooks/useTab';

export default {
  title: 'Tab',
  component: Tab,
  tags: ['autodocs'],
} as Meta;

export const Default = () => {
  const { changeTab } = useTab(CURRENT_NEWS_TAB_KEY);
  return (
    <Router>
      <TabContextProvider>
        <Tab
          maxWidth="25.875"
          defaultTab={`${TAB_CONSTANTS.NEWEST}`}
          tabItems={[
            {
              title: `${TAB_CONSTANTS.NEWEST}`,
              width: '8.625',
              onClick: () => changeTab(TAB_CONSTANTS.NEWEST),
            },
            {
              title: `${TAB_CONSTANTS.HOTTEST}`,
              width: '8.625',
              icon: <BsFire className="w-[1.3rem] h-[1.3rem]" />,
              onClick: () => changeTab(TAB_CONSTANTS.HOTTEST),
            },
            {
              title: `${TAB_CONSTANTS.SUBSCRIBED}`,
              width: '8.625',
              icon: <MdStars className="w-[1.5rem] h-[1.5rem]" />,
              onClick: () => changeTab(TAB_CONSTANTS.SUBSCRIBED),
            },
          ]}
        />
        <TabItem index={`${TAB_CONSTANTS.NEWEST}`}>
          <Loader />
        </TabItem>
        <TabItem index={`${TAB_CONSTANTS.HOTTEST}`}>
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
        <TabItem index={`${TAB_CONSTANTS.SUBSCRIBED}`}>
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
  const { changeTab } = useTab(CURRENT_SEARCH_TAB_KEY);
  return (
    <Router>
      <TabContextProvider>
        <Tab
          maxWidth="23.375"
          defaultTab={`${TAB_CONSTANTS.ARTICLE_TITLE}`}
          tabItems={[
            {
              title: `${TAB_CONSTANTS.ARTICLE_TITLE}`,
              width: '11.6875',
              onClick: () => changeTab(TAB_CONSTANTS.ARTICLE_TITLE),
            },
            {
              title: `${TAB_CONSTANTS.NICKNAME}`,
              width: '11.6875',
              onClick: () => changeTab(TAB_CONSTANTS.NICKNAME),
            },
          ]}
        />
        <TabItem index={`${TAB_CONSTANTS.ARTICLE_TITLE}`}>
          <Loader />
        </TabItem>
        <TabItem index={`${TAB_CONSTANTS.NICKNAME}`}>
          <ErrorText text="아직 구독한 사용자가 없습니다." />
        </TabItem>
      </TabContextProvider>
    </Router>
  );
};
