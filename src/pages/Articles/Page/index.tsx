import { BsFire } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import { Header } from '@/components';
import BottomNavigation from '@/components/BottomNavigation';
import Tabs from '@/components/Tabs';
import RenderHottestArticles from '@/pages/ArticlesPage/RenderHottestArticles';
import RenderArticles from '../RenderArticles';

const ArticlesPage = () => {
  return (
    <Tabs defaultValue="newest">
      <section className="max-w-[25.875rem] mx-auto h-screen w-screen flex flex-col relative overflow-hidden">
        <header className="flex flex-col pt-[2.75rem] gap-5">
          <div className="pl-7 pr-7">
            <Header label="news" type="search" path="/search" />
          </div>
          <Tabs.List>
            <Tabs.Tab value="newest">최신의</Tabs.Tab>
            <Tabs.Tab value="hottest">
              <BsFire className="w-[1.3rem] h-[1.3rem]" />
              뜨거운
            </Tabs.Tab>
            <Tabs.Tab value="subscribed">
              <MdStars className="w-[1.5rem] h-[1.5rem]" />
              구독한
            </Tabs.Tab>
          </Tabs.List>
        </header>
        <article className="flex-grow overflow-y-auto">
          <Tabs.Panel value="newest">
            <RenderArticles type="newest" />
          </Tabs.Panel>
          <Tabs.Panel value="hottest">
            <RenderHottestArticles />
          </Tabs.Panel>
          <Tabs.Panel value="subscribed">
            <RenderArticles type="subscribed" />
          </Tabs.Panel>
        </article>
        <div className="flex justify-center flex-none w-full">
          <BottomNavigation currentPage="/news" />
        </div>
      </section>
    </Tabs>
  );
};

export default ArticlesPage;
