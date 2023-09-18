import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import ArticleDetail from '@/components/ArticleDetail';
import ArticleInfoIcon from '@/components/ArticleInfoIcon';
import BackButton from '@/components/BackButton';
import Loader from '@/components/Loader';
import SubButton from '@/components/SubButton';
import { useArticleDetail } from '@/hooks/useArticleDetail';

const ArticleDetailPage = () => {
  const { data: article, isFetching } = useArticleDetail();

  const { title, author, createdAt, likes, image, comments } = article!;
  const { fullName } = author;
  const { title: articleTitle, body: articleBody } = JSON.parse(title);

  return (
    <div className="flex flex-col items-center max-w-[25.875rem] mx-auto max-h-[56rem] h-full pt-[2.75rem] font-Cafe24SurroundAir">
      {isFetching ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <section className="post-field max-w-[22rem] w-full">
          <div className="flex justify-between">
            <BackButton />
            <div id="isMine" className="flex items-center justify-between w-[2.5rem]">
              <button type="button" name="edit">
                <FiEdit className="w-[1rem] h-[1rem]" />
              </button>
              <button type="button" name="delete">
                <BsTrash className="w-[1rem] h-[1rem]" />
              </button>
            </div>
          </div>
          <div>
            <ArticleDetail nickname={fullName} postedDate={createdAt} />
            <div className="my-3 text-lg font-Cafe24Surround">{articleTitle}</div>
            <div className="flex justify-center items-center">
              {image && <img src={image} className="w-[10rem] m-5" />}
            </div>
            <div className="text-base">{articleBody}</div>
            <div className="flex justify-between mt-6">
              <SubButton label="응원하기" color="blue" type="outline" />
              <ArticleInfoIcon likes={likes.length} comments={comments.length} mode="post" />
            </div>
          </div>
          <div className="my-[10%] border-b-[0.01rem] border-lazy-gray" />
        </section>
      )}
    </div>
  );
};

export default ArticleDetailPage;
