import { useQuery } from '@tanstack/react-query';
import { Post } from '@type/Post';
import { AxiosResponse } from 'axios';
import { BsFire } from 'react-icons/bs';
import { MdOutlineSearch, MdStars } from 'react-icons/md';
import { axiosClient } from '@api/axiosClient';
import Article from '@components/Article';
import HeaderText from '@components/HeaderText';
import Tab from '@components/Tab';
import { HOTTEST_ARTICLE_LIKES_THRESHOLD, CHANNEL_ID } from '@constants/Article';
import { TabConstants } from '@constants/Tab';

const ArticlesPage = () => {
  const getArticles = async () => {
    const response = await axiosClient.get(`/posts/channel/${CHANNEL_ID}`);
    return response;
  };

  const { data } = useQuery<AxiosResponse<Post[]>>(['articles'], getArticles);
  const articles = data?.data;

  const filterArticles = (tabFilter: TabConstants) => {
    if (tabFilter === TabConstants.HOTTEST) {
      return articles?.filter((article) => article.likes.length >= HOTTEST_ARTICLE_LIKES_THRESHOLD);
    } else if (tabFilter === TabConstants.SUBSCRIBED) {
      // TODO: 현재 사용자의 정보가 있어야 한다. (User 타입의 following)
    } else {
      return articles;
    }
  };

  const renderArticles = (tabFilter: TabConstants) => {
    const filteredArticles = filterArticles(tabFilter);
    return filteredArticles?.map((article) => {
      const { _id, title, author, createdAt, likes, image, comments } = article;
      const { fullName } = author;
      try {
        const { title: articleTitle } = JSON.parse(title);
        return (
          <Article
            key={_id}
            title={articleTitle}
            nickname={`@${fullName}`}
            postedDate={createdAt}
            hasImage={image !== undefined}
            likes={likes.length}
            comments={comments.length}
          />
        );
      } catch (error) {
        // TODO: title의 JSON.stringify가 제대로 되지 않은 경우 어떻게 처리할까...
      }
    });
  };

  return (
    <section className="max-w-[25.875rem] mx-auto mt-[2.75rem]">
      <header className="flex flex-col">
        <div className="flex justify-between mb-[1.75rem] ml-[2.44rem] mr-[1.56rem]">
          <HeaderText label="뉴스" />
          <MdOutlineSearch className="w-[1.8rem] h-[1.8rem]" />
        </div>
        <Tab>
          <Tab.Item title={`${TabConstants.NEWEST}`} index="item1" width="8.625">
            {renderArticles(TabConstants.NEWEST)}
          </Tab.Item>
          <Tab.Item
            title={`${TabConstants.HOTTEST}`}
            index="item2"
            icon={<BsFire className="w-[1.5rem] h-[1.5rem]" />}
            width="8.625"
          >
            {/* {renderArticles(TabConstants.HOTTEST)} */}
            <Article
              title="(더미)이거슨 뜨거운 글이여."
              nickname="@hot-guy"
              postedDate="2023-09-03T14:00:00.000Z"
              hasImage={true}
              likes={15}
              comments={3}
            />
          </Tab.Item>
          <Tab.Item
            title={`${TabConstants.SUBSCRIBED}`}
            index="item3"
            icon={<MdStars className="w-[1.7rem] h-[1.7rem]" />}
            width="8.625"
          >
            <Article
              title="(더미)구독한 채널의 게시글이 없습니다."
              nickname=""
              postedDate=""
              hasImage={false}
              likes={0}
              comments={0}
            />
          </Tab.Item>
        </Tab>
      </header>
    </section>
  );
};

export default ArticlesPage;
