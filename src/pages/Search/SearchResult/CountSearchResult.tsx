type CountSearchResultProps = {
  index: number;
  length: number;
};

const CountSearchResult = ({ index, length }: CountSearchResultProps) => {
  return (
    !index && (
      <div className="font-Cafe24Surround text-[0.875rem] ml-10 pb-2 text-wall-street dark:text-lazy-gray">{`${length}건의 검색결과`}</div>
    )
  );
};

export default CountSearchResult;
