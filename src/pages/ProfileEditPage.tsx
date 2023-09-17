import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';
import EditForm from './ProfileEditPage/EditForm';

const ProfileEditPage = () => {
  return (
    <section className="grid grid-rows-[1fr_8fr] h-screen bg-white overflow-y-auto">
      <header className="flex justify-center w-full">
        <div className="flex justify-between items-center p-4 pt-8 w-full max-w-sm">
          <HeaderText label="프로필 수정" />
          <CloseButton />
        </div>
      </header>
      <EditForm />
    </section>
  );
};

export default ProfileEditPage;
