import { AiOutlineBell } from 'react-icons/ai';
import HeaderText from '@/components/HeaderText';

const NotificationPage = () => {
  return (
    <div className="grid grid-rows-[1fr_8fr_1fr] h-[100vh]">
      <header className="pl-6 pt-10">
        <HeaderText label="알림" />
      </header>
      <div className="flex flex-col justify-center items-center  gap-4">
        <div className="w-20 h-20 rounded-full bg-cooled-blue">
          <AiOutlineBell className="w-10 h-10 translate-x-1/2 translate-y-1/2 text-white" />
        </div>
        <p className="text-wall-street font-Cafe24SurroundAir text-2xl font-light">
          받은 알림이 없습니다.
        </p>
      </div>
      <footer className="">푸터</footer>
    </div>
  );
};

export default NotificationPage;
