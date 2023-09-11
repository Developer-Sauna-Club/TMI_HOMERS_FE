import { ReactNode } from 'react';

type HeaderTextProps = {
  children?: ReactNode;
  size?: 'small' | 'normal' | 'large';
};

const HeaderText = ({ children, size = 'normal' }: HeaderTextProps) => {
  const TEXT_BASE_CLASS = 'font-Cafe24Surround text-tricorn-black inline-block';
  const TEXT_SIZE_CLASS = {
    small: 'text-[1.75rem]',
    normal: 'text-[2rem]',
    large: 'text-[2.5rem]',
  };
  return <h1 className={`${TEXT_BASE_CLASS} ${TEXT_SIZE_CLASS[size]}`}>{children}</h1>;
};

export default HeaderText;
