import { useLocation, useNavigate } from 'react-router-dom';
import CloseButton from '@components/CloseButton';
import HeaderText from '@components/HeaderText';
import Confirm from '@components/Modals/Confirm';
import { MODAL_MESSAGE } from '@constants/Messages';
import { ETC } from '@constants/NewArticle';
import useAuthQuery from '@hooks/useAuthQuery';
import useModal from '@hooks/useModal';
import ArticleEditForm from './ArticleEditPage/ArticleEditForm';

const ArticleEditPage = () => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();

  const navigate = useNavigate();
  const {
    _id: postId,
    title: articleInfo,
    image: articleImage,
    imagePublicId,
  } = useLocation().state.article;
  const { showModal, modalOpen, modalClose } = useModal();

  const handleClickExit = () => {
    navigate(-1);
  };

  return (
    <section className="max-w-[25.875rem] w-screen h-screen mx-auto relative bg-cooled-blue dark:bg-[#303E43] text-tricorn-black dark:text-extra-white font-Cafe24SurroundAir">
      {showModal && (
        <Confirm
          theme="negative"
          title={MODAL_MESSAGE.PROFILE_EDIT_WARN}
          onClose={modalClose}
          onConfirm={handleClickExit}
        />
      )}
      <div className="h-[15%] pt-[2.75rem]">
        <header className="flex flex-col">
          <div className="flex justify-between items-center mb-[1.75rem] ml-[2.44rem] mr-[1.56rem]">
            <HeaderText size="normal" label={ETC.HEADER_WRITE_EDIT} />
            <CloseButton onClick={modalOpen} />
          </div>
        </header>
      </div>
      <div className="h-[85%] mx-auto">
        <ArticleEditForm
          user={user}
          postId={postId}
          articleInfo={articleInfo}
          articleImage={articleImage}
          imagePublicId={imagePublicId}
        />
      </div>
    </section>
  );
};
export default ArticleEditPage;
