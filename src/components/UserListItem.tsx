import { useNavigate } from 'react-router-dom';
import useAuthQuery from '@/hooks/useAuthQuery';
import useFollowQuery from '@/hooks/useFollowQuery';
import { UserListItemParams } from '@/type/search';
import { User } from '@/type/User';
import { ARTICLE_TITLE_MAX_LENGTH } from '@constants/Article';
import Avatar from './Avatar';
import SubButton from './SubButton';

const SEARCH_RESULT_CLASS =
  'cursor-pointer max-w-[22.375rem] mb-[0.8rem] mt-[1rem] mx-auto flex items-center justify-between font-Cafe24SurroundAir pl-4 pr-3 pb-[0.625rem]';

const UserListItem = ({ fullName, id, image }: UserListItemParams) => {
  const {
    userQuery: { data: user },
  } = useAuthQuery();
  const navigate = useNavigate();
  const { followMutation, unFollowMutation } = useFollowQuery();
  // TODO : 디바운스 작업 또는 batching
  const handleFollowing = (id: string) => {
    followMutation.mutate(id);
  };

  const handleUnFollowing = (id: string) => {
    if (user) {
      const userId = user?.following.find(({ user }) => user === id);
      if (userId) {
        unFollowMutation.mutate(userId._id);
      }
    }
  };

  const isFollowing = (user: User | undefined | '') => {
    if (user) {
      return user.following.every(({ user }) => user !== id);
    }
    return true;
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
