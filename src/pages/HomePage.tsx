import { HiFire } from 'react-icons/hi';
import { MdOutlineSearch } from 'react-icons/md';
import Article from '@components/Article';
import BottomNavigation from '@components/BottomNavigation';
import HeaderText from '@components/HeaderText';

const CHARACTER_SRC = '/img/character.png';

const HomePage = () => {
  return (
    <div className="relative flex justify-center w-full overflow-y-scroll">
      <div className="w-full max-w-md flex flex-col gap-36 shrink-0">
        <div className="bg-cooled-blue h-[375px] mb-10">
          <div className="flex h-[180px] justify-between px-10 items-center">
            <HeaderText label="홈" />
            <MdOutlineSearch size="24" className="text-tricorn-black" />
          </div>
          <div className="relative w-full h-[304px] gap-2 flex justify-center">
            <div className="w-10/12 max-w-[374px] flex flex-col gap-2">
              <div className="flex items-center">
                <HiFire size="24" className="text-article-highly-liked" />
                <h2 className="flex-none text-tricorn-black font-Cafe24Surround text-lg font-bold">
                  뜨거운 뉴스
                </h2>
              </div>
              <div className="bg-white text-black w-full rounded-xl shadow-article-container max-w-sm self-center h-[304px] z-20">
                <Article
                  title="되겠냐?"
                  id="1"
                  nickname="@khakhiD"
                  postedDate="2023-08-29T09:28:39.390Z"
                  hasImage={true}
                  likes={0}
                  comments={1}
                />
                <Article
                  title="되겠냐?"
                  id="1"
                  nickname="@khakhiD"
                  postedDate="2023-08-29T09:28:39.390Z"
                  hasImage={true}
                  likes={0}
                  comments={1}
                />
                <Article
                  title="되겠냐?"
                  id="1"
                  nickname="@khakhiD"
                  postedDate="2023-08-29T09:28:39.390Z"
                  hasImage={true}
                  likes={0}
                  comments={1}
                />
                <Article
                  title="되겠냐?"
                  id="1"
                  nickname="@khakhiD"
                  postedDate="2023-08-29T09:28:39.390Z"
                  hasImage={true}
                  likes={0}
                  comments={1}
                />
              </div>
              <img
                src={CHARACTER_SRC}
                className="absolute w-[44%] max-w-[215px] -top-16 left-1/2 z-10"
                alt="character"
              />
            </div>
          </div>
        </div>

        <div className=" bg-white flex flex-col justify-center gap-6 flex-grow">
          <div className="bg-emerald-300 w-[280px] h-20 self-center" />
          <div className="flex flex-col gap-3">
            <h2 className="text-tricorn-black font-Cafe24Surround text-lg font-bold px-7">
              최신 이야기
            </h2>
            <ul>
              <Article
                title="되겠냐?"
                id="1"
                nickname="@khakhiD"
                postedDate="2023-08-29T09:28:39.390Z"
                hasImage={true}
                likes={0}
                comments={1}
              />
              <Article
                title="되겠냐?"
                id="1"
                nickname="@khakhiD"
                postedDate="2023-08-29T09:28:39.390Z"
                hasImage={true}
                likes={0}
                comments={1}
              />
              <Article
                title="되겠냐?"
                id="1"
                nickname="@khakhiD"
                postedDate="2023-08-29T09:28:39.390Z"
                hasImage={true}
                likes={0}
                comments={1}
              />
              <Article
                title="되겠냐?"
                id="1"
                nickname="@khakhiD"
                postedDate="2023-08-29T09:28:39.390Z"
                hasImage={true}
                likes={0}
                comments={1}
              />
              <Article
                title="되겠냐?"
                id="1"
                nickname="@khakhiD"
                postedDate="2023-08-29T09:28:39.390Z"
                hasImage={true}
                likes={0}
                comments={1}
              />
              <Article
                title="되겠냐?"
                id="1"
                nickname="@khakhiD"
                postedDate="2023-08-29T09:28:39.390Z"
                hasImage={true}
                likes={0}
                comments={1}
              />
              <Article
                title="되겠냐?"
                id="1"
                nickname="@khakhiD"
                postedDate="2023-08-29T09:28:39.390Z"
                hasImage={true}
                likes={0}
                comments={1}
              />
            </ul>
          </div>
        </div>
        <div className="fixed bottom-0 flex-none justify-center items-center">
          <BottomNavigation currentPage="/home" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
