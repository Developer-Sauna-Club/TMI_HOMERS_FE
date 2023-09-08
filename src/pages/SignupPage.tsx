import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorText from '@/components/ErrorText';

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

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <h2 className="text-center">회원가입 페이지</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <input
          {...register('email', { required: '이메일은 필수입니다' })}
          type="email"
          placeholder="이메일을 입력해주세요"
          className={`w-[18rem] p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir ${
            errors.email ? 'border-red-600' : ''
          }`}
        />
        {errors.email && <ErrorText text={`${errors.email?.message}`} />}
        <input
          {...register('password', {
            required: '비밀번호는 필수입니다',
            minLength: {
              value: 8,
              message: '8글자 이상 입력해주세요',
            },
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className={`w-[18rem] p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir ${
            errors.password ? 'border-red-600' : ''
          }`}
        />
        {errors.password && <ErrorText text={`${errors.password?.message}`} />}
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
          placeholder="닉네임을 입력해주세요"
          className={`w-[18rem] p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir ${
            errors.nickname ? 'border-red-600' : ''
          }`}
        />
        {errors.nickname && <ErrorText text={`${errors.nickname?.message}`} />}
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;
