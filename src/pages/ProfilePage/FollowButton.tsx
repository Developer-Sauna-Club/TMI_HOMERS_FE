import { User } from '@type/User';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { ALTS } from '@constants/Profile';
import useFollowQuery from '@hooks/useFollowQuery';

type FollowButtonProps = {
  user: User | undefined | null;
  profileId: string;
};

const FollowButton = (props: FollowButtonProps) => {
  const { followMutation, unFollowMutation } = useFollowQuery();
  const { user, profileId } = props;

  const handleToggleFollow = () => {
    if (!user) {
      return;
    }

    const followingUserId = user.following.find(({ user }) => user === profileId);
    if (!followingUserId) {
      followMutation.mutate(profileId);
    } else {
      unFollowMutation.mutate(followingUserId._id);
    }
  };

  const isFollowing = (user: User | undefined | null) => {
    return user ? user.following.some(({ user }) => user === profileId) : false;
  };

  const BUTTON_CLASS = {
    CONTAINER_CLASS: 'transform transition duration-100 active:scale-90',
    FOLLOW_ICON:
      'fill-wall-street dark:fill-extra-white hover:fill-cooled-blue active:fill-cooled-blue',
    UN_FOLLOW_ICON: 'fill-light-violet hover:fill-cooled-blue active:fill-cooled-blue',
  };

  return (
    <div onClick={handleToggleFollow} className="text-[1.7rem] cursor-pointer self-end flex">
      <div className={BUTTON_CLASS.CONTAINER_CLASS}>
        {isFollowing(user) ? (
          <BsBookmarkStarFill className={BUTTON_CLASS.UN_FOLLOW_ICON} alt={ALTS.UN_FOLLOW} />
        ) : (
          <BsBookmarkStar className={BUTTON_CLASS.FOLLOW_ICON} alt={ALTS.FOLLOW} />
        )}
      </div>
    </div>
  );
};

export default FollowButton;
