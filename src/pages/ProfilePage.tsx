import { Post } from '@type/Post';
import Article from '@components/Article';
import Avatar from '@components/Avatar';
import BackButton from '@components/BackButton';
import Loader from '@components/Loader';
import SubscribeInfo from '@components/SubscribeInfo';
import Tab from '@components/Tab';
import TabItem from '@components/TabItem';
import { TabConstants } from '@constants/Tab';
import { TabContextProvider } from '@context/TabContext';
import { useArticles } from '@hooks/useArticles';
import { useFilteredArticles } from '@hooks/useFilteredArticles';

const ProfilePage = () => {
  const { data, isFetching } = useArticles();
  const articles = data?.data;

  const newestArticles = useFilteredArticles(TabConstants.NEWEST, articles);
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
    <div className="flex justify-center min-h-screen">
      <section className="fixed max-w-[25.875rem] mx-auto mt-[3.75rem] font-Cafe24SurroundAir">
        <TabContextProvider>
          <header className="z-50">
            <div className="flex flex-start justify-between">
              <BackButton />
              <div className="h-[1.5rem] p-[1rem] flex items-center justify-center border-[0.05rem] rounded-lg text-[0.875rem]">
                로그아웃
              </div>
            </div>
            <div className="flex justify-center pb-8 mb-[1.2rem] border-b-[0.01rem] border-tertiory-gray">
              <div className="flex flex-col items-center">
                <div>
                  <Avatar width={8} profileImage="" isLoggedIn={true} />
                </div>
                <div className="flex items-center mt-2 mb-[0.3rem]">
                  <span className="w-[7.3125rem] h-[1.8125rem] font-Cafe24Surround text-[1.375rem] -tracking-[0.01875rem] mr-2">
                    홍길동1234
                  </span>
                  <span className="w-[1.6875rem] h-[1.125rem] text-[0.875rem] text-lazy-gray">
                    기자
                  </span>
                </div>
                <SubscribeInfo subscriber={32} subscribing={24} />
                <span className="text-center px-[2.8rem] mt-[1rem]">
                  안녕하세요? 저는 홍길동입니다. 저는 홍길동입니다. 저는 홍길동입니다. 저는
                </span>
              </div>
            </div>
            <Tab
              maxWidth="25.875"
              tabItems={[
                { title: '작성한 기사', width: '12.9375' },
                { title: '응원한 기사', width: '12.9375' },
              ]}
            />
          </header>
          <div className="overflow-y-auto max-h-[38rem]">
            <article>
              <TabItem title="작성한 기사" index="item1">
                {/* User(사용자)의 기사가 들어와야 합니다! 일단 임시로 useArticles에서 가져오겠습니당 */}
                {isFetching ? (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                ) : (
                  renderArticles(newestArticles)
                )}
              </TabItem>
              <TabItem title="응원한 기사" index="item2">
                응원한 기사
              </TabItem>
            </article>
          </div>
        </TabContextProvider>
      </section>
    </div>
  );
};

export default ProfilePage;
