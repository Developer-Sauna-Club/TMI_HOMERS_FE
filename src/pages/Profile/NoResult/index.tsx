type NoResultProps = {
  label: string;
};

const NoResult = ({ label }: NoResultProps) => {
  // TODO : 추후 검색결과 NoResult와 병합
  return (
    <div className="flex justify-center w-full h-full">
      <span className="flex items-center justify-center text-center text-lazy-gray">
        {label}가 없습니다.
      </span>
    </div>
  );
};

export default NoResult;
