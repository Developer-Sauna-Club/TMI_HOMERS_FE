type HomeBannerTypes = {
  carouselItems: {
    imgSrc: string;
    text: string;
  }[];
};

const BANNER_CONTENT_CLASS = {
  IMAGE: 'max-w-[40%] max-h-[80%]',
  PARAGRAPH:
    'ml-[5%] mr-[5%] font-Cafe24SurroundAir text-tricorn-black text-[1.125rem] tracking-toast font-light',
};

const BG_COLOR = [`bg-[#CDE5E5]`, `bg-[#eee9f7]`];

const HomeBanner = ({ carouselItems }: HomeBannerTypes) => {
  return (
    <section className="w-full flex flex-col justify-center items-center overflow-hidden">
      <div className="carousel w-full h-full">
        {carouselItems.map((item, i) => {
          return (
            <div
              id={`#item${i + 1}`}
              key={i + 1}
              className={`carousel-item rounded-[1rem] ${BG_COLOR[i]} flex justify-center items-center w-[67%] h-[7.625rem] mr-5`}
            >
              <img src={item.imgSrc} className={`${BANNER_CONTENT_CLASS.IMAGE}`} alt="Banner" />
              <pre className={`${BANNER_CONTENT_CLASS.PARAGRAPH}`}>{item.text}</pre>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeBanner;
