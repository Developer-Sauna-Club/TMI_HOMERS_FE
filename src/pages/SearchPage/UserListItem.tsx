import { useNavigate } from 'react-router-dom';
import { UserListItemParams } from '@type/search';
import { User } from '@type/User';
import Avatar from '@components/Avatar';
import Confirm from '@components/Modals/Confirm';
import SubButton from '@components/SubButton';
import { ARTICLE_TITLE_MAX_LENGTH } from '@constants/Article';
import useAuthQuery from '@hooks/useAuthQuery';
import useFollowQuery from '@hooks/useFollowQuery';
import useModal from '@hooks/useModal';

const SEARCH_RESULT_CLASS =
  'cursor-pointer max-w-[22.375rem] mb-[0.8rem] mt-[1rem] mx-auto flex items-center justify-between font-Cafe24SurroundAir pl-4 pr-3 pb-[0.625rem]';

const UserListItem = ({ fullName, id, image }: UserListItemParams) => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const navigate = useNavigate();
  const { followMutation, unFollowMutation } = useFollowQuery();
  const { showModal, modalOpen, modalClose } = useModal();

  const handleToggleFollow = (id: string) => {
    if (!user) {
      modalOpen();
    } else {
      const followingUserId = user.following.find(({ user }) => user === id);
      if (!followingUserId) {
        followMutation.mutate(id);
      } else {
        unFollowMutation.mutate(followingUserId._id);
      }
    }
  };

  const isFollowing = (user: User | undefined | null) => {
    if (user) {
      return user.following.some(({ user }) => user === id) ?? false;
    }
  };

  const handleClickConfirm = () => {
    modalClose();
    navigate('/login');
  };

  return (
    <div key={id} className={`${SEARCH_RESULT_CLASS}`}>
      <div
        className="flex items-center gap-4 line-clamp-1"
        onClick={() => {
          navigate(`/profile/${id}`);
        }}
      >
        <Avatar width={2.5} profileImage={image} isLoggedIn={false} />
        <div className="font-Cafe24SurroundAir text-black dark:text-white">
          {fullName.length > ARTICLE_TITLE_MAX_LENGTH
            ? `${fullName.slice(0, ARTICLE_TITLE_MAX_LENGTH)}...`
            : fullName}
        </div>
      </div>
      <SubButton
        icon="star"
        key={id}
        label="구독하기"
        color="violet"
        type={isFollowing(user) ? 'fill' : 'outline'}
        size="small"
        onClick={() => handleToggleFollow(id)}
      />
      {showModal && (
        <Confirm
          theme="negative"
          title="로그인이 필요한 작업니다."
          message="로그인 하시겠습니까?"
          onClose={modalClose}
          onConfirm={handleClickConfirm}
        />
      )}
    </div>
  );
};

export default UserListItem;
