import { ChangeEvent, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';
import { HiPencil } from 'react-icons/hi';
import { updateProfileImage } from '@/api/common/User';
import MainButton from '@/components/MainButton';
import useEditProfile from '@/hooks/useEditProfile';
import { User } from '@/type/User';

type FormValue = {
  nickname: string;
  introduction: string;
};

type EditFormProps = {
  user: User;
};

const EditForm = ({ user }: EditFormProps) => {
  const navigate = useNavigate();
  const { editProfile, isLoading } = useEditProfile();
  const [image, setImage] = useState<string | null>(null);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      nickname: '',
      introduction: '',
    },
    mode: 'onChange',
  });

  const isSameIntroduction = (introduction: string) => {
    return (user.username === undefined && introduction === '') || user.username === introduction;
  };

  const isNotProfileChanged = ({ nickname, introduction }: FormValue) => {
    return user.fullName === nickname && isSameIntroduction(introduction);
  };

  useEffect(() => {
    setValue('nickname', user.fullName ? user.fullName : '');
    setValue('introduction', user.username ? user.username : '');
    setFocus('nickname');
    setImage(user.image ? user.image : null);
  }, [setValue, setFocus, user]);

  const [nickname, introduction] = [watch('nickname'), watch('introduction')];

  const handleClickPasswordButton = () => {
    navigate('/password');
  };

  const onSubmit: SubmitHandler<FormValue> = ({ nickname, introduction }) => {
    if (isNotProfileChanged({ nickname, introduction })) {
      alert('기존 정보와 같습니다');
      return;
    }
    editProfile({ fullName: nickname, username: introduction });
  };

  const handleUpLoadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files;
    if (!imageFile || imageFile.length < 0) {
      return;
    }
    const updatedUser = await updateProfileImage(imageFile[0]);
    setImage(updatedUser.image as string);
  };

  return (
    <div className="flex justify-center">
      <form className="p-8 flex flex-col gap-3 max-w-sm w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-wall-street font-Cafe24Surround font-bold">
            프로필 사진
          </label>
          <div className="relative w-32 h-32 rounded-full bg-profile-bg self-center mb-6 border border-tertiory-gray text-footer-icon">
            {image ? (
              <img src={image} className="w-full h-full rounded-full" alt="thumbnail" />
            ) : (
              <BiSolidUser className="w-24 h-24 translate-x-4 translate-y-4" />
            )}
            <label
              htmlFor="image"
              className="absolute right-1 bottom-1 p-1 rounded-full bg-profile-bg border border-tertiory-gray"
            >
              <HiPencil className="w-4 h-4" />
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image"
              onChange={handleUpLoadImage}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="text-wall-street font-Cafe24Surround font-bold">닉네임</label>
            <small>한글, 숫자, 영어로 2글자 이상 작성해주세요</small>
          </div>
          <input
            className="max-w-sm  w-full  p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir"
            {...register('nickname', {
              required: '닉네임은 필수입니다',
              pattern: {
                value: /^[A-Za-z0-9가-힣]+$/,
                message: '한글, 영문, 숫자로 입력해주세요!',
              },
              minLength: {
                value: 2,
                message: '2글자 이상으로 입력해주세요!',
              },
              maxLength: {
                value: 10,
                message: '10글자 이하로 입력해주세요!',
              },
            })}
            aria-required
          />
          <small
            className={`self-end font-Cafe24SurroundAir text-sm font-light ${
              errors.nickname ? 'text-error-red' : ''
            }`}
          >
            {nickname.length} / 10
          </small>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-wall-street font-Cafe24Surround font-bold">자기소개</label>
          <input
            className="max-w-sm  w-full  p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir"
            {...register('introduction', {
              maxLength: {
                value: 30,
                message: '30글자 이하로 입력해주세요!',
              },
            })}
          />
          <small
            className={`self-end font-Cafe24SurroundAir text-sm font-light ${
              errors.introduction ? 'text-error-red' : ''
            }`}
          >
            {introduction.length} / 30
          </small>
        </div>
        <div className="flex flex-col items-center mt-5 p-5 gap-5">
          <MainButton
            label="비밀번호 변경하기"
            mode="outlined"
            onClick={handleClickPasswordButton}
          />
          <MainButton label="프로필 수정" type="submit" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
