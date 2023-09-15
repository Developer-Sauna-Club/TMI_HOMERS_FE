import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/Avatar';
import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';

const NewArticlePage = () => {
  const navigate = useNavigate();
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const [titleCount, setTitleCount] = useState(0);

  const handleResizeTextareaHeight = () => {
    if (textArea.current) {
      textArea.current.style.height = 'auto';
      textArea.current.style.height = textArea.current.scrollHeight + 'px';
    }
  };

  const handleTitleCount = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleCount(e.target.value.length);
  };

  return (
    <div className="max-w-[25.875rem] mx-auto max-h-[56rem] h-full pt-[2.75rem] bg-cooled-blue font-Cafe24SurroundAir position:relative border-2">
      <header className="flex flex-col">
        <div className="flex justify-between items-center mb-[1.75rem] ml-[2.44rem] mr-[1.56rem]">
          <HeaderText size="normal" label="글쓰기" />
          <CloseButton onClick={() => navigate(-1)} />
        </div>
      </header>
      <div className="flex flex-col bg-white h-[48.5rem] rounded-t-3xl">
        <div className="flex items-center mx-auto w-full justify-between max-w-[22.625rem] pt-[2rem]">
          <Avatar width={2.5} profileImage="" isLoggedIn={false} />
          <div className="flex w-[12.5rem]">
            <span className="font-Cafe24Surround">닉네임</span>
          </div>
          <button className="w-[6rem] h-[2.2rem] rounded-lg bg-cooled-blue font-Cafe24Surround text-white">
            작성하기
          </button>
        </div>
        <div className="mx-auto w-full max-w-[22.625rem]">
          <form>
            <div className="flex items-end h-[3.5rem] border-b-2 border-cooled-blue">
              <input
                onChange={handleTitleCount}
                className="block w-full pb-2 outline-none"
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div className="flex justify-end w-full">
              <span className="text-xs text-lazy-gray">{`${titleCount}/20`}</span>
            </div>
            <div className="block">
              <textarea
                ref={textArea}
                onChange={handleResizeTextareaHeight}
                className="overflow-hidden outline-none resize-none h-[20rem]"
                placeholder="내용을 작성해주세요"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewArticlePage;
