import { useNavigate } from 'react-router-dom';
import { MdOutlineSearch } from 'react-icons/md';
import CloseButton from '../CloseButton';
import HeaderText from '../HeaderText';

const HEADER_LABEL = {
  search: '검색',
  news: '뉴스',
} as const
 
type label = keyof typeof HEADER_LABEL;

type HeaderProps = {
  label: label ;
  type?: 'close' | 'search';
  path?: string;
};

const Header = ({ label, type, path }: HeaderProps) => {
  const navigate = useNavigate();

  const HEADER_TYPE = {
    close: <CloseButton onClick={() => (path ? navigate(path) : navigate(-1))} />,
    search: (
      <MdOutlineSearch
        className="w-[1.8rem] h-[1.8rem] cursor-pointer text-tricorn-black dark:text-extra-white"
        onClick={() => (path ? navigate(path) : navigate(-1))}
      />
    ),
  };

  return (
    <header className="flex justify-between items-center">
      <HeaderText label={HEADER_LABEL[label]} />
      {type && HEADER_TYPE[type]}
    </header>
  );
};

export default Header;
