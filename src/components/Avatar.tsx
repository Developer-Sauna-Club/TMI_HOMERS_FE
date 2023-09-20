import { BiSolidPencil } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa6';

type AvatarProps = {
  width: number;
  profileImage: string;
  isLoggedIn: boolean;
};

const Avatar = ({ width, profileImage, isLoggedIn }: AvatarProps) => {
  const PROFILE_STYLE = `relative rounded-full border-[0.1rem] border-lazy-gray bg-profile-bg object-cover`;
  const userIconWidth = width * 0.55;
  const editIconWidth = width * 0.1875;
  const editPencilWidth = width * 0.125;
  const editPencilPosition = width * 0.0625;

  return (
    <div className="relative inline-block cursor-pointer">
      {profileImage !== '' ? (
        <img
          src={`${profileImage}`}
          alt="프로필 이미지"
          style={{ width: `${width}rem`, height: `${width}rem` }}
          className={PROFILE_STYLE}
        />
      ) : (
        <div className={PROFILE_STYLE} style={{ width: `${width}rem`, height: `${width}rem` }}>
          <FaUser
            style={{ width: `${userIconWidth}rem`, height: `${userIconWidth}rem` }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-footer-icon"
          />
        </div>
      )}
      {isLoggedIn && (
        <div
          style={{
            width: `${editIconWidth}rem`,
            height: `${editIconWidth}rem`,
            right: `${editPencilPosition}rem`,
            bottom: `${editPencilPosition}rem`,
          }}
          className="absolute rounded-full bg-profile-bg border-lazy-gray border-[0.1rem]"
        >
          <BiSolidPencil
            style={{ width: `${editPencilWidth}rem`, height: `${editPencilWidth}rem` }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
