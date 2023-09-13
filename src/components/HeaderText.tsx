type HeaderTextProps = {
  size?: 'small' | 'normal' | 'large';
  label: string;
};

const HeaderText = ({ size = 'normal', label }: HeaderTextProps) => {
  const TEXT_BASE_CLASS = 'font-Cafe24Surround text-tricorn-black inline-block';
  const TEXT_SIZE_CLASS = {
    small: 'text-[1.75rem]',
    normal: 'text-[2rem]',
    large: 'text-[2.5rem]',
  };
  return <h1 className={`${TEXT_BASE_CLASS} ${TEXT_SIZE_CLASS[size]}`}>{label}</h1>;
};

export default HeaderText;
