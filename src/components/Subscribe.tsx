type SubscribeProps = {
  subscriber: number;
  subscribing: number;
};

const Subscribe = ({ subscriber, subscribing }: SubscribeProps) => {
  return (
    <div className="flex items-center font-Cafe24SurroundAir text-wall-street">
      <span className="mr-1 font-Cafe24Surround text-footer-icon">{subscriber}</span>명의 구독자
      <div className="w-[0.1rem] h-[1rem] bg-extra-white inline-block ml-[0.5rem] mr-[0.5rem]" />
      <span className="mr-1 font-Cafe24Surround text-footer-icon">{subscribing}</span>명을 구독중
    </div>
  );
};

export default Subscribe;
