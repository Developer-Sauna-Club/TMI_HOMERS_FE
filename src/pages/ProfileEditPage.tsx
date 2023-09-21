import { useNavigate } from 'react-router-dom';
import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';
import useAuthQuery from '@/hooks/useAuthQuery';
import type { User } from '@/type/User';
import EditForm from './ProfileEditPage/EditForm';

const ProfileEditPage = () => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();

  const navigate = useNavigate();

  const handleClickCloseButton = () => {
    navigate(-1);
  };

  return (
    <section className="grid grid-rows-[1fr_8fr] h-screen overflow-y-auto">
      <header className="flex justify-center w-full">
        <div className="flex items-center justify-between w-full max-w-sm p-4 pt-8">
          <HeaderText label="프로필 수정" />
          <CloseButton onClick={handleClickCloseButton} />
        </div>
      </header>
      <EditForm user={user! as User} />
    </section>
  );
};

export default ProfileEditPage;
