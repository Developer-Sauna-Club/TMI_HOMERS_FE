import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { ArticleDetail, ArticleInfoIcon, BackButton, Confirm, SubButton } from '@/components';
import {
  useArticleDetail,
  useAuthQuery,
  useLikeCreateMutation,
  useLikeDeleteMutation,
  useModal,
  useNotification,
  useToastContext,
} from '@/hooks';
import { getOptimizedImageURL } from '@/utils/imageURL';
import { BUTTON, MESSAGE } from '@constants/ArticleDetail';
import CommentInput from './ArticleDetailPage/CommentInput';
import Comments from './ArticleDetailPage/Comments';
import { LoadingPage } from '.';

const ArticleDetailPage = () => {
  const navigate = useNavigate();
  const { showModal, modalOpen, modalClose } = useModal();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { showToast } = useToastContext();

  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const { data: article, isLoading, addComment, deletePostArticle } = useArticleDetail();
  const { mutate: likeCreateMutate, isLoading: isLikeCreateLoading } = useLikeCreateMutation();
  const { mutate: likeDeleteMutate, isLoading: isLikeDeleteLoading } = useLikeDeleteMutation();
  const { mutate: likeNotificationMutate, isLoading: isLikeNotificationLoading } =
    useNotification();

  if (isLoading) {
    return <LoadingPage />;
  }

  const { _id, title, author, createdAt, likes, image, comments } = article!;
  const { fullName, _id: postUserId, image: authorProfileImage } = author;
  const { title: articleTitle, body: articleBody } = JSON.parse(title);

  const isMyPost = user ? user._id === postUserId : false;
  const myLike = likes.find((like) => (user ? like.user === user._id : false));
  const isLoginUser = !!user;

  const toggleLikeMutate = () => {
    if (myLike) {
      likeDeleteMutate(myLike._id);
    } else {
      likeCreateMutate(_id, {
        onSuccess: (newLike) => {
          likeNotificationMutate({
            notificationType: 'LIKE',
            notificationTypeId: newLike._id,
            userId: postUserId,
            postId: newLike.post,
          });
        },
      });
    }
  };

  const handleLikeButtonClick = () => {
    if (isLikeCreateLoading || isLikeDeleteLoading || isLikeNotificationLoading) {
      return;
    }
    if (!isLoginUser) {
      showToast('로그인이 필요해요');
    } else {
      toggleLikeMutate();
    }
  };

  const handleDeletePost = async () => {
    deletePostArticle(_id);
  };

  return (
    <div className="flex flex-col items-center max-w-[25.875rem] w-screen mx-auto h-screen pt-[2.75rem] font-Cafe24SurroundAir">
      {showModal && (
        <Confirm
          theme="negative"
          title="게시물을 삭제하겠습니까?"
          onClose={modalClose}
          onConfirm={handleDeletePost}
        />
      )}
      <section className="post-field max-w-[22rem] w-full">
        <div className="flex justify-between">
          <BackButton onClick={() => navigate(-1)} />
          {isMyPost && (
            <div id="isMine" className="flex items-center justify-between w-[3rem]">
              <button
                type="button"
                name="edit"
                aria-label="프로필 수정"
                onClick={() => {
                  navigate(`/news/edit`, { state: { article } });
                }}
              >
                <FiEdit className="w-[1rem] h-[1rem]" />
              </button>
              <button type="button" name="delete" onClick={modalOpen}>
                <BsTrash className="w-[1rem] h-[1rem]" />
              </button>
            </div>
          )}
        </div>
        <div>
          <ArticleDetail
            nickname={fullName}
            postedDate={createdAt}
            profileImage={authorProfileImage ? authorProfileImage : ''}
            postUserId={postUserId}
          />
          <div className="my-3 text-lg text-tricorn-black dark:text-extra-white font-Cafe24Surround">
            {articleTitle}
          </div>
          <div className={`flex items-center justify-center ${image ? 'h-[20rem]' : ''}`}>
            {image && (
              <img
                alt={articleTitle}
                src={getOptimizedImageURL({ url: image, width: 350, height: 320 })}
                className={
                  !isImageLoaded
                    ? 'h-full m-5 rounded-lg bg-gray-300 dark:bg-gray-800 animate-pulse'
                    : 'h-full object-scale-down m-5 rounded-lg'
                }
                onLoad={() => setIsImageLoaded(true)}
                width="350px"
                height="320px"
              />
            )}
          </div>
          <div className="text-base text-tricorn-black break-all dark:text-extra-white mt-3 whitespace-pre-line">
            {articleBody}
          </div>
          <div className="flex justify-between mt-6">
            <SubButton
              label={BUTTON.CHEER_UP}
              onClick={() => handleLikeButtonClick()}
              color="blue"
              type={myLike ? 'fill' : 'outline'}
              icon="good"
            />
            <ArticleInfoIcon
              likes={likes.length}
              comments={comments.length}
              mode="post"
              color={myLike ? 'blue' : 'gray'}
            />
          </div>
        </div>
        <div className="banner mt-[10%] mb-[5%] border-b-[0.01rem] border-lazy-gray" />
      </section>
      <section>
        {comments.length === 0 ? (
          <div className="flex justify-start w-[22rem] mt-[3%]">
            <span className="text-xs text-gray-400 mb-[5rem] ">{MESSAGE.NO_COMMENT}</span>
          </div>
        ) : (
          <div className="mb-[6rem]">
            <Comments comments={comments} userId={user ? user._id : null} />
          </div>
        )}
      </section>
      {isLoginUser && (
        <CommentInput
          onAddComment={addComment}
          postId={_id}
          userId={postUserId}
          userImage={user ? (user.image ? user.image : '') : ''}
        />
      )}
    </div>
  );
};

export default ArticleDetailPage;
