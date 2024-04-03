import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import SubButton from '@/components/SubButton';

type FailedMessageProps = {
  path: string;
  label: string;
  children: ReactNode;
};

const FailedMessage = ({ path, label, children }: FailedMessageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center font-Cafe24SurroundAir">
      <span className="mb-4">{children}</span>
      <SubButton label={label} color="blue" type="outline" onClick={() => navigate(path)} />
    </div>
  );
};

export default FailedMessage;
