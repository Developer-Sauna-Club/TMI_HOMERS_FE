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
  if (!user) {
    return;
  }

  const handleToggleFollow = (id: string) => {
    const followingUserId = user?.following.find(({ user }) => user === id);
    if (!followingUserId) {
      followMutation.mutate(id);
    } else {
      unFollowMutation.mutate(followingUserId._id);
    }
  };

  const isFollowing = (user: User | undefined | '') => {
    if (user) {
      return user.following.some(({ user }) => user === id) ?? false;
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
        <div className="font-Cafe24SurroundAir text-black dark:text-white">
          {fullName.length > ARTICLE_TITLE_MAX_LENGTH
            ? `${fullName.slice(0, ARTICLE_TITLE_MAX_LENGTH)}...`
            : fullName}
        </div>
      </div>
      <SubButton
        icon="star"
        key={id}
        label="팔로우"
        color="violet"
        type={isFollowing(user) ? 'fill' : 'outline'}
        size="small"
        onClick={() => handleToggleFollow(id)}
      />
    </div>
  );
};

export default UserListItem;
