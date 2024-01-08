import { useNavigate } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import Confirm from '@components/Modals/Confirm';
import useModal from '@hooks/useModal';

type DropdownMenuProps = {
  logoutMutate: () => void;
};

const EDIT_PAGE_URL = '/profile/edit';
const CHANGE_PASSWORD_PAGE_URL = '/password';
const DropdownMenu = (props: DropdownMenuProps) => {
  const navigate = useNavigate();
  const { showModal, modalOpen, modalClose } = useModal();

  const dropdownMenu = [
    { label: '프로필 수정', onClick: () => navigate(EDIT_PAGE_URL) },
    { label: '비밀번호 변경', onClick: () => navigate(CHANGE_PASSWORD_PAGE_URL) },
    { label: '로그아웃', onClick: () => modalOpen() },
  ];
  return (
    <div className="dropdown dropdown-end">
      {showModal && (
        <Confirm
          theme="negative"
          title="정말 로그아웃 하시겠어요?"
          confirmLabel="로그아웃"
          onClose={modalClose}
          onConfirm={props.logoutMutate}
        />
      )}
      <label
        tabIndex={0}
        className="cursor-pointer text-[1.5rem] z-[40] text-footer-icon focus:text-tricorn-black dark:text-lazy-gray dark:focus:text-wall-street"
      >
        <IoSettingsSharp />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[30] menu p-1 shadow bg-white text-tricorn-black dark:text-lazy-gray dark:bg-tricorn-black border border-lazy-gray rounded-box w-40"
      >
        {dropdownMenu.map((item, i) => (
          <li key={i}>
            <div onClick={() => item.onClick()}>{item.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
