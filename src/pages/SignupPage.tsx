import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

const SIGNUP_URL = '/signup';

// 공식 문서 예제의 스타일을 가져와 사용
const inputDefaultStyle = `mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
invalid:border-pink-500 invalid:text-pink-600
focus:invalid:border-pink-500 focus:invalid:ring-pink-500`;
const validationErrorStyle = `text-right text-sm font-bold text-red-700`;
const buttonStyle = `rounded-lg bg-blue-500 px-4 py-2 text-white mt-5 w-[100%] hover:bg-blue-600`;
const spanStyle = `mt-5 block text-left text-md font-bold text-slate-700`;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const userSignup = async (data: FormValues) => {
    const response = await axiosClient.post(SIGNUP_URL, {
      email: data.email,
      password: data.password,
      fullName: data.nickname,
    });

    return response.data;
  };

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: userSignup,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate(data);
  };

  const Placeholders = {
    email: '이메일을 입력해주세요.',
    password: '패스워드를 입력해주세요.',
    passwordConfirm: '패스워드를 한 번 더 입력해주세요.',
    nickname: '닉네임을 입력해주세요.',
  };

  const ERROR_MESSAGES = {
    REQUIRED_EMAIL: '이메일은 필수 입력입니다',
    REQUIRED_PASSWORD: '패스워드는 필수 입력입니다',
    SHORT_PASSWORD: '패스워드는 6자 이상이어야 합니다',
    MISMATCH_PASSWORD: '패스워드가 일치하지 않습니다',
  };

  return (
    <div className="block w-[50%] h-full text-center m-auto">
      <div className="">
        <h1 className="font-bold text-lg text-center">회원가입 테스트</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className={spanStyle}>E-mail</span>
          <input
            className={inputDefaultStyle}
            type="text"
            placeholder={Placeholders.email}
            {...register('email', {
              required: ERROR_MESSAGES.REQUIRED_EMAIL,
            })}
          />

          {errors.email && <p className={validationErrorStyle}>{errors.email.message}</p>}

          <span className={spanStyle}>Password</span>
          <input
            className={inputDefaultStyle}
            type="password"
            placeholder={Placeholders.password}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 6,
                message: ERROR_MESSAGES.SHORT_PASSWORD,
              },
            })}
          />

          {errors.password && <p className={validationErrorStyle}>{errors.password.message}</p>}

          <input
            className={inputDefaultStyle}
            type="password"
            placeholder={Placeholders.passwordConfirm}
            {...register('passwordConfirm')}
          />

          <span className={spanStyle}>Nickname</span>
          <input
            className={inputDefaultStyle}
            placeholder={Placeholders.nickname}
            {...register('nickname')}
          />
          <button className={buttonStyle} type="submit">
            회원가입
          </button>
        </form>
      </div>
      <div className="mt-5">
        <h1 className="font-bold text-white">결과</h1>
        <p className={isError ? 'text-red-600' : 'text-green-600'}>
          {isError ? '회원가입 실패' : isSuccess && '회원가입 성공'}
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
