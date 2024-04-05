import { User } from '@/type/User';

type getFollowCountsProps = {
  userInfo: User | undefined;
};

export const getFollowCounts = ({ userInfo }: getFollowCountsProps) => {
  const followingCount = userInfo
    ? Array.from(new Set(userInfo.following.map((following) => following.user))).length
    : 0;
  const followerCount = userInfo
    ? Array.from(new Set(userInfo.followers.map((follower) => follower._id))).length
    : 0;

  return {
    followingCount,
    followerCount,
  };
};
