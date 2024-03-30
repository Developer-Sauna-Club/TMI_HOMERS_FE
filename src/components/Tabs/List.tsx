import { ReactNode } from 'react';

type ListProps = {
  children: ReactNode;
};

const List = ({ children }: ListProps) => {
  return <div className="flex w-full font-Cafe24Surround">{children}</div>;
};

export default List;
