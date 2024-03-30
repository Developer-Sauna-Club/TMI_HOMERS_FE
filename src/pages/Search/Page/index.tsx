import { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { Header } from '@/components';
import Tabs from '@/components/Tabs';

const SearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const handleRecentResult = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <Tabs defaultValue="0">
      <section className="max-w-[25.875rem] mx-auto h-screen w-screen flex flex-col font-Cafe24SurroundAir">
        <div className="bg-cooled-blue dark:bg-dark-primary flex flex-col pt-[2.75rem] pl-5 pr-5 gap-4">
          <Header label="search" type="close" />
          <div className="bg-input-white rounded-lg ">
            <div className="flex items-center">
              <MdOutlineSearch className="w-[1.8rem] h-[1.8rem] cursor-pointer text-tricorn-black" />
              <input
                className="w-[90%] p-3.5 outline-none placeholder:text-lazy-gray"
                placeholder="검색어를 입력해주세요"
                value={keyword}
                onChange={(e) => {
                  handleRecentResult(e.target.value);
                }}
              />
            </div>
            <div className="bg-white">
              <Tabs.List>
                <Tabs.Tab value="0">검색</Tabs.Tab>
                <Tabs.Tab value="1">유저</Tabs.Tab>
              </Tabs.List>
            </div>
          </div>
        </div>

        <Tabs.Panel value="0">내용1</Tabs.Panel>
        <Tabs.Panel value="1">내용2</Tabs.Panel>
      </section>
    </Tabs>
  );
};

export default SearchPage;
