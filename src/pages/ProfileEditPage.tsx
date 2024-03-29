import { useNavigate } from 'react-router-dom';
import { CloseButton, Confirm, HeaderText } from '@/components';
import { MODAL_MESSAGE } from '@/constants/Messages';
import { useAuthQuery, useModal } from '@/hooks';
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
    <section className="flex justify-center h-screen">
      <div className="flex flex-col justify-center px-2">
        {showModal && (
          <Confirm
            theme="negative"
            title={MODAL_MESSAGE.PROFILE_EDIT_WARN}
            onClose={modalClose}
            onConfirm={handleClickConfirm}
          />
        )}
        <header className="flex justify-center w-full">
          <div className="flex items-center justify-between w-full max-w-sm p-6 pt-8">
            <HeaderText label="프로필 수정" />
            <CloseButton onClick={modalOpen} />
          </div>
        </header>
        <EditForm user={user! as User} />
      </div>
    </section>
  );
};

export default ProfileEditPage;
