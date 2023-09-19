import CloseButton from '@/components/CloseButton';
import HeaderText from '@/components/HeaderText';
import EditForm from './ProfileEditPage/EditForm';

const ProfileEditPage = () => {
  return (
    <section className="grid grid-rows-[1fr_8fr] h-screen bg-white overflow-y-auto dark:bg-[#1D232A]">
      <header className="flex justify-center w-full">
        <div className="flex items-center justify-between w-full max-w-sm p-4 pt-8">
          <HeaderText label="프로필 수정" />
          <CloseButton />
        </div>
      </header>
      <EditForm />
    </section>
  );
};

export default ProfileEditPage;
