import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorText from '@/components/ErrorText';
import Loader from '@/components/Loader';
import useSignUp from '@/hooks/useSignUp';

type SignUpFormValues = {
  email: string;
  password: string;
  nickname: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();
  const { signUpMutate, isLoading } = useSignUp();

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    signUpMutate(data);
  };

  return (
    <div>
      <h2 className="text-center">회원가입 페이지</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center font-bold">
        <label htmlFor="email" className="font-Cafe24Surround text-footer-icon p-2">
          이메일
        </label>
        <input
          {...register('email', { required: '이메일은 필수입니다!' })}
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          className={`w-[18rem] p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir ${
            errors.email ? 'border-red-600' : ''
          }`}
        />
        {errors.email && <ErrorText text={`${errors.email?.message}`} />}
        <label htmlFor="password" className="font-Cafe24Surround text-footer-icon p-2">
          비밀번호
        </label>
        <input
          {...register('password', {
            required: '비밀번호는 필수입니다!',
            minLength: {
              value: 8,
              message: '8글자 이상 입력해주세요!',
            },
          })}
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className={`w-[18rem] p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir ${
            errors.password ? 'border-red-600' : ''
          }`}
        />
        {errors.password && <ErrorText text={`${errors.password?.message}`} />}
        <label htmlFor="nickname" className="font-Cafe24Surround text-footer-icon p-2">
          닉네임
        </label>
        <input
          {...register('nickname', {
            required: '닉네임은 필수입니다',
            minLength: {
              value: 2,
              message: '2글자 이상으로 입력해주세요!',
            },
            maxLength: {
              value: 10,
              message: '10글자 이하로 입력해주세요!',
            },
          })}
          id="nickname"
          placeholder="닉네임을 입력해주세요"
          className={`w-[18rem] p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir ${
            errors.nickname ? 'border-red-600' : ''
          }`}
        />
        {errors.nickname && <ErrorText text={`${errors.nickname?.message}`} />}
        <button className="mt-2 p-2" disabled={isLoading}>
          {isLoading && <Loader />}
          {!isLoading && '회원가입'}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
