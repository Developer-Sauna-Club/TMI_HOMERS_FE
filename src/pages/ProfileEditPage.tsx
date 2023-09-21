import { useNavigate } from 'react-router-dom';
import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';
import Confirm from '@/components/Modals/Confirm';
import useAuthQuery from '@/hooks/useAuthQuery';
import useModal from '@/hooks/useModal';
import type { User } from '@/type/User';
import EditForm from './ProfileEditPage/EditForm';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { showModal, modalOpen, modalClose } = useModal();
  const {
    userQuery: { data: user },
  } = useAuthQuery();

  const handleClickConfirm = () => {
    navigate(-1);
  };

  return (
    <section className="grid grid-rows-[1fr_8fr] h-screen overflow-y-auto">
      {showModal && (
        <Confirm
          theme="negative"
          title="수정사항이 사라질 수 있어요"
          onClose={modalClose}
          onConfirm={handleClickConfirm}
        />
      )}
      <header className="flex justify-center w-full">
        <div className="flex items-center justify-between w-full max-w-sm p-4 pt-8">
          <HeaderText label="프로필 수정" />
          <CloseButton onClick={modalOpen} />
        </div>
      </header>
      <EditForm user={user! as User} />
    </section>
  );
};

export default ProfileEditPage;
