import { useNavigate } from 'react-router-dom';
import { followUser, unFollowUser } from '@/api/common/Follow';
import { UserListItemParams } from '@/type/search';
import { User } from '@/type/User';
import { ARTICLE_TITLE_MAX_LENGTH } from '@constants/Article';
import { useAuthContext } from '@hooks/useAuthContext';
import Avatar from './Avatar';
import SubButton from './SubButton';

const SEARCH_RESULT_CLASS =
  'cursor-pointer max-w-[22.375rem] mb-[0.8rem] mt-[0.5rem] mx-auto flex items-center justify-between font-Cafe24SurroundAir pl-4 pr-3 pb-[0.625rem] pt-[0.25rem]';

const UserListItem = ({ fullName, id, image }: UserListItemParams) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleUnFollowing = (id: string) => {
    const userId = user?.following.find(({ user }) => user === id);
    if (userId) {
      unFollowUser(userId._id);
    }
  };
  const handleFollowing = (id: string) => {
    if (id) {
      followUser(id);
    }
    //TODO : 비회원일때 팔로우 버튼을 클릭했을시 Not authorized 오류 처리
  };
  const isFollowing = (user: User | undefined | null) => {
    if (user) {
      return user.following.every(({ user }) => user !== id);
    } else {
      return true;
    }
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
        <div className="font-Cafe24SurroundAir">
          {fullName.length > ARTICLE_TITLE_MAX_LENGTH
            ? `${fullName.slice(0, ARTICLE_TITLE_MAX_LENGTH)}...`
            : fullName}
        </div>
      </div>
      {isFollowing(user) ? (
        <SubButton
          key={id}
          label="팔로우"
          color="violet"
          type="outline"
          size="small"
          onClick={() => handleFollowing(id)}
        />
      ) : (
        <SubButton
          key={id}
          label="팔로우"
          color="violet"
          type="fill"
          size="small"
          onClick={() => handleUnFollowing(id)}
        />
      )}
    </div>
  );
};

export default UserListItem;
