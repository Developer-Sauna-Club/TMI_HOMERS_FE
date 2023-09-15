type SubscribeProps = {
  subscriber: number;
  subscribing: number;
};

const SubscribeInfo = ({ subscriber, subscribing }: SubscribeProps) => {
  const formatThousandToK = (number: number) => {
    if (number >= 1000) {
      const formattedToK = (number / 1000).toFixed(1);
      return formattedToK.endsWith('.0') ? `${formattedToK.slice(0, -2)}K` : `${formattedToK}K`;
    } else {
      return number;
    }
  };

  return (
    <div className="flex items-center font-Cafe24SurroundAir text-wall-street">
      <span className="cursor-pointer">
        <span className="cursor-pointer mr-1 font-Cafe24Surround text-footer-icon">
          {formatThousandToK(subscriber)}
        </span>
        명의 구독자
      </span>
      <div className="w-[0.1rem] h-[1rem] bg-extra-white inline-block ml-[1rem] mr-[1rem]" />
      <span className="cursor-pointer">
        <span className="mr-1 font-Cafe24Surround text-footer-icon">
          {formatThousandToK(subscribing)}
        </span>
        명을 구독중
      </span>
    </div>
  );
};

export default SubscribeInfo;
