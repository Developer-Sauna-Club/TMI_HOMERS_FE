import { Navigate } from 'react-router-dom';
import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';
import Loader from '@/components/Loader';
import { useAuthContext } from '@/hooks/useAuthContext';
import EditForm from './ProfileEditPage/EditForm';

const ProfileEditPage = () => {
  const { user } = useAuthContext();

  if (user === undefined) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="grid grid-rows-[1fr_8fr] h-screen bg-white overflow-y-auto">
      <header className="flex justify-center w-full">
        <div className="flex justify-between items-center p-4 pt-8 w-full max-w-sm">
          <HeaderText label="프로필 수정" />
          <CloseButton />
        </div>
      </header>
      <EditForm user={user} />
    </section>
  );
};

export default ProfileEditPage;
