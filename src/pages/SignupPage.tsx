import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/api/axiosClient';

const SIGNUP = '/signup';

type Data = {
  email: string;
  password: string;
  password_confirm: string;
  fullName: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
      fullName: '',
    },
    mode: 'all',
  });

  const { mutate, isLoading } = useMutation(
    (data: Data) => {
      return axiosClient.post(SIGNUP, data);
    },
    {
      onSuccess(data) {
        alert(data);
      },
      onError(err) {
        alert(err);
      },
    },
  );

  const onSubmit = (data: Data) => {
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          placeholder="email"
          className="border-2 border-black"
          {...register('email', {
            required: {
              value: true,
              message: '이메일을 입력해주세요',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식에 맞지 않습니다',
            },
          })}
        />
        <p className="text-red-600">{errors.email?.message}</p>
        <hr />
        <label>비밀번호</label>
        <input
          placeholder="password"
          className="border-2 border-black"
          {...register('password', {
            required: {
              value: true,
              message: '비밀번호를 입력해주세요',
            },
            minLength: {
              value: 8,
              message: '8글자 이상 입력해주세요',
            },
          })}
        />
        <p className="text-red-600">{errors.password?.message}</p>
        <hr />
        <label>비밀번호 확인</label>
        <input
          placeholder="password_confirm"
          className="border-2 border-black"
          {...register('password_confirm', {
            required: {
              value: true,
              message: '비밀번호를 입력해주세요',
            },
            minLength: {
              value: 8,
              message: '8글자 이상 입력해주세요',
            },
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다',
          })}
        />
        <p className="text-red-600">{errors.password_confirm?.message}</p>
        <hr />
        <label>이름</label>
        <input
          placeholder="fullName"
          className="border-2 border-black"
          {...register('fullName', {
            required: {
              value: true,
              message: '이름을 입력하세요',
            },
          })}
        />
        <p className="text-red-600">{errors.fullName?.message}</p>
        <hr />
        {isLoading && <p>로딩중..</p>}
        <input type="submit" />
      </form>
    </>
  );
};

export default SignUpPage;
