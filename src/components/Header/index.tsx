import { useNavigate } from 'react-router-dom';
import CloseButton from '../CloseButton';
import HeaderText from '../HeaderText';

type HeaderProps = {
  label: 'search';
  type?: 'close';
  path?: string;
};

const Header = ({ label, type, path }: HeaderProps) => {
  const navigate = useNavigate();
  const HEADER_LABEL = {
    search: '검색',
  };

  const HEADER_TYPE = {
    close: <CloseButton onClick={() => (path ? navigate(path) : navigate(-1))} />,
  };

  return (
    <header className="flex justify-between items-center">
      <HeaderText label={HEADER_LABEL[label]} />
      {type && HEADER_TYPE[type]}
    </header>
  );
};

export default Header;
