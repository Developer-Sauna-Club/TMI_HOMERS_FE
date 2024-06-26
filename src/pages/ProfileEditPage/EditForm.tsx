import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import MainButton from '@/components/MainButton';
import { TOAST_MESSAGES } from '@/constants/Messages';
import useEditProfile from '@/hooks/useEditProfile';
import { useToastContext } from '@/hooks/useToastContext';
import { User } from '@/type/User';

type FormValue = {
  nickname: string;
  introduction: string;
};

type EditFormProps = {
  user: User;
};

const EditForm = ({ user }: EditFormProps) => {
  const { showToast } = useToastContext();
  const { editProfile, isPending: isLoading } = useEditProfile();

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
  }, [setValue, setFocus, user]);

  const [nickname, introduction] = [watch('nickname'), watch('introduction')];

  const onSubmit: SubmitHandler<FormValue> = ({ nickname, introduction }) => {
    if (isNotProfileChanged({ nickname, introduction })) {
      showToast(TOAST_MESSAGES.EDIT_PROFILE_INVALID, 'error');
      return;
    }
    editProfile({ fullName: nickname, username: introduction });
  };

  return (
    <div className="flex justify-center">
      <form className="p-8 flex flex-col gap-3 max-w-sm w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="text-wall-street dark:text-lazy-gray font-Cafe24Surround font-bold">
              닉네임
            </label>
            <small className="font-Pretendard text-[0.9rem] tracking-toast text-lazy-gray">
              한글, 숫자, 영어로 2글자 이상 작성해주세요.
            </small>
          </div>
          <input
            className="max-w-sm  w-full p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir"
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
          <label className="text-wall-street dark:text-lazy-gray font-Cafe24Surround font-bold">
            자기소개
          </label>
          <input
            className="max-w-sm w-full p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir"
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
        <div className="flex flex-col justify-center items-center mt-5">
          <MainButton label="프로필 수정" type="submit" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
