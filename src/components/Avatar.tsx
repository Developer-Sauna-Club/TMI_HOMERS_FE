import { IconContext } from 'react-icons';
import { BiSolidPencil } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa6';

type AvatarProps = {
  profileImage: string;
  isLoggedIn: boolean;
};

const PROFILE_STYLE =
  'w-[8rem] h-[8rem] relative rounded-full border-[0.1rem] border-lazy-gray bg-profile-bg';

const Avatar = ({ profileImage, isLoggedIn }: AvatarProps) => {
  return (
    <div className="relative">
      {profileImage !== '' ? (
        <img
          src={`data:image/jpeg;base64,${profileImage}`}
          alt="프로필 이미지"
          className={PROFILE_STYLE}
        />
      ) : (
        <div className={PROFILE_STYLE}>
          <IconContext.Provider
            value={{
              className:
                'w-[4.76rem] h-[4.76rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-footer-icon',
            }}
          >
            <FaUser />
          </IconContext.Provider>
        </div>
      )}
      {isLoggedIn && (
        <div className="relative w-[1.5rem] h-[1.5rem] rounded-full bg-profile-bg border-lazy-gray border-[0.1rem] left-[6rem] -top-[2rem]">
          <IconContext.Provider
            value={{
              className:
                'w-[1rem] h-[1rem] absolute absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ',
            }}
          >
            <BiSolidPencil />
          </IconContext.Provider>
        </div>
      )}
    </div>
  );
};

export default Avatar;
