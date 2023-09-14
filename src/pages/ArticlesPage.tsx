import { Post } from '@type/Post';
import { BsFire } from 'react-icons/bs';
import { MdOutlineSearch, MdStars } from 'react-icons/md';
import Article from '@components/Article';
import HeaderText from '@components/HeaderText';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import { TabConstants } from '@constants/Tab';
import { useArticles } from '@hooks/useArticles';
import { useFilteredArticles } from '@hooks/useFilteredArticles';

const ArticlesPage = () => {
  const { data, isFetching } = useArticles();
  const articles = data?.data;

  const newestArticles = useFilteredArticles(TabConstants.NEWEST, articles);
  // const hottestArticles = useFilteredArticles(TabConstants.HOTTEST, articles);
  // const subscribedArticles = useFilteredArticles(TabConstants.SUBSCRIBED, articles);

  const renderArticles = (articles: Post[] | undefined) => {
    return articles?.map((article) => {
      const { _id, title, author, createdAt, likes, image, comments } = article;
      const { fullName } = author;
      try {
        const { title: articleTitle } = JSON.parse(title);
        return (
          <Article
            key={_id}
            id={_id}
            title={articleTitle ? articleTitle : '제목이 없습니다.'}
            nickname={fullName ? `@${fullName}` : ''}
            postedDate={createdAt}
            hasImage={image !== undefined}
            likes={likes?.length || 0}
            comments={comments?.length || 0}
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
            {isFetching && <Loader />}
            {renderArticles(newestArticles)}
          </Tab.Item>
          <Tab.Item
            title={`${TabConstants.HOTTEST}`}
            index="item2"
            icon={<BsFire className="w-[1.5rem] h-[1.5rem]" />}
            width="8.625"
          >
            {/* {renderArticles(hottestArticles)} */}
            <Article
              title="(더미)이거슨 뜨거운 글이여."
              id={Math.random().toString()}
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
            {/* {renderArticles(subscribedArticles)} */}
            <div className="font-Cafe24SurroundAir">구독한 사람이 없습니다.</div>
          </Tab.Item>
        </Tab>
      </header>
    </section>
  );
};

export default ArticlesPage;
