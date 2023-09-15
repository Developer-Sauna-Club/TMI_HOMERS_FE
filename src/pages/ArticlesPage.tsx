import { Post } from '@type/Post';
import { BsFire } from 'react-icons/bs';
import { MdOutlineSearch, MdStars } from 'react-icons/md';
import Article from '@components/Article';
import HeaderText from '@components/HeaderText';
import Loader from '@components/Loader';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TabConstants } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
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
    <TabContextProvider>
      <section className="max-w-[25.875rem] mx-auto fixed">
        <header className="flex flex-col bg-white pt-[2.75rem]">
          <div className="flex justify-between mb-[1.75rem] ml-[2.44rem] mr-[1.56rem]">
            <HeaderText label="뉴스" />
            <MdOutlineSearch className="w-[1.8rem] h-[1.8rem]" />
          </div>
          <Tab
            active="item1"
            maxWidth="25.875"
            tabItems={[
              { title: `${TabConstants.NEWEST}`, width: '8.625' },
              {
                title: `${TabConstants.HOTTEST}`,
                icon: <BsFire className="w-[1.3rem] h-[1.3rem]" />,
                width: '8.625',
              },
              {
                title: `${TabConstants.SUBSCRIBED}`,
                icon: <MdStars className="w-[1.5rem] h-[1.5rem]" />,
                width: '8.625',
              },
            ]}
          />
        </header>
        <article>
          <TabItem title={`${TabConstants.NEWEST}`} index="item1">
            {isFetching ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              renderArticles(newestArticles)
            )}
          </TabItem>
          <TabItem title={`${TabConstants.HOTTEST}`} index="item2">
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
          <TabItem title={`${TabConstants.SUBSCRIBED}`} index="item3">
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
        </article>
      </section>
    </TabContextProvider>
  );
};

export default ArticlesPage;
