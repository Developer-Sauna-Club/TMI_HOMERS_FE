import SubButton from '@/components/SubButton';

type RecentResultProps = {
  recentResult: string[];
  onClick: (item: string) => void;
};

const RecentResult = ({ recentResult, onClick }: RecentResultProps) => {
  return (
    <>
      <h2 className="font-Cafe24Surround text-[1.125rem] text-tricorn-black dark:text-extra-white">
        최근 검색어
      </h2>
      <hr className="mt-2 mb-5" />
      <div className="flex flex-wrap gap-2">
        {recentResult.map((item, index) => (
          <div key={index}>
            <SubButton
              size="small"
              radius="medium"
              label={item}
              color="blue"
              type="outline"
              onClick={() => onClick(item)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentResult;
