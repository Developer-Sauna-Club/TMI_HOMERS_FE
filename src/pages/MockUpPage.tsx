import { ReactNode } from 'react';
import { GithubIcon } from '@/assets/icons/GithubIcon';
import { NotionIcon } from '@/assets/icons/NotionIcon';

type MockUpProps = {
  children: ReactNode;
};

const URLS = {
  GITHUB: 'https://github.com/prgrms-fe-devcourse/FEDC4_TMI_HOMERS_OFF/wiki',
  NOTION: 'https://prgrms.notion.site/7fee2a48d198430aa3fc7c17a61fd4cb?pvs=4',
};

const MockUpPage = ({ children }: MockUpProps) => {
  return (
    <>
      <div className="lg:flex hidden flex-col items-start w-[414px] max-w-[610px] justify-between">
        <header className="mt-[5%]">
          <img src="/img/logo.svg" alt="logo" className="w-[100px]" />
        </header>
        <section>
          <div className="font-Cafe24SurroundAir text-tricorn-black dark:text-profile-bg text-[2.5rem] tracking-tighter leading-[3rem]">
            <p>쓸데 없는 거 쓸 때,</p>
            <p className="text-pigeon-body dark:text-cooled-blue">
              티엠아이{' '}
              <span className="font-Cafe24Surround text-pigeon-body dark:text-cooled-blue">
                호머스
              </span>
            </p>
          </div>
          <div className="mt-[3rem]">
            <p className="font-Cafe24SurroundAir tracking-toast text-[1.2rem] text-wall-street dark:text-lazy-gray">
              핀잔 맞을까봐 남들에게 말하지 못한
              <br />
              사소한 이야기들을 공유하세요!
            </p>
          </div>
          <div className="mt-[3rem] select-none hover:scale-[97%] transition ease-in-out cursor-pointer">
            <img src="/img/notion-button.png" alt="about-homers-button" />
          </div>
        </section>
        <footer className="mb-[5%] flex gap-5 justify-start items-center h-[3rem]">
          {/* <a href="">
            <img src="/img/google-play.png" alt="google-play" className="w-[8rem]" />
          </a> */}
          <div className="hover:scale-[90%] transition ease-in-out cursor-pointer">
            <a href={URLS.GITHUB} target="_blank" rel="noreferrer">
              <GithubIcon
                className="text-footer-icon dark:text-lazy-gray"
                width="3.5rem"
                height="3.5rem"
              />
            </a>
          </div>
          <div className="hover:scale-[90%] transition ease-in-out cursor-pointer w-full h-full">
            <a href={URLS.NOTION} target="_blank" rel="noreferrer">
              <NotionIcon
                className="text-footer-icon dark:text-lazy-gray"
                width="1.8rem"
                height="3rem"
              />
            </a>
          </div>
        </footer>
      </div>
      <div
        id="app-main"
        className="lg:w-[414px] lg:border-x overflow-auto bg-white dark:bg-tricorn-black dark:border-wall-street"
      >
        {children}
      </div>
    </>
  );
};

export default MockUpPage;
