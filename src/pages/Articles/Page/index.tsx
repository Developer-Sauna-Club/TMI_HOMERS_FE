import { AiOutlineArrowUp } from 'react-icons/ai';
import { BsFire } from 'react-icons/bs';
import { MdStars } from 'react-icons/md';
import { Header } from '@/components';
import BottomNavigation from '@/components/BottomNavigation';
import Tabs from '@/components/Tabs';
import useScrollToTop from '@/hooks/useScrollToTop';
import RenderHottestArticles from '@/pages/ArticlesPage/RenderHottestArticles';
import RenderArticles from '../RenderArticles';

const ArticlesPage = () => {
  const { ref: scrollRef, showScrollToTopButton, scrollToTop } = useScrollToTop();

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
        <article ref={scrollRef} className="flex-grow overflow-y-auto">
          <Tabs.Panel value="newest">
            <RenderArticles type="newest" />
          </Tabs.Panel>
          <Tabs.Panel value="hottest">
            <RenderHottestArticles />
          </Tabs.Panel>
          <Tabs.Panel value="subscribed">
            <RenderArticles type="subscribed" />
          </Tabs.Panel>
          <button
            onClick={scrollToTop}
            disabled={!showScrollToTopButton}
            className={`absolute p-2 flex items-center justify-center text-white w-[3.5rem] h-[3.5rem] bg-cooled-blue drop-shadow-[0_0.25rem_0.25rem_rgba(0,0,0,0.25)] transition-opacity duration-300 ease-in-out ${
              showScrollToTopButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } rounded-full bottom-24 right-4`}
            aria-label="위로 가기"
          >
            <AiOutlineArrowUp className="w-[1.5rem] h-[1.5rem]" />
          </button>
        </article>
        <div className="flex justify-center flex-none w-full">
          <BottomNavigation currentPage="/news" />
        </div>
      </section>
    </Tabs>
  );
};

export default ArticlesPage;
