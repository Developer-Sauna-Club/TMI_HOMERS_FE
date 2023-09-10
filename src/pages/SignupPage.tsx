import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosClient } from '@api/axiosClient';

type SignUpForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>();

  const createUser = async (data: SignUpForm) => {
    const response = await axiosClient.post('/signup', {
      email: data.email,
      fullName: data.nickname,
      password: data.password,
    });

    return response.data;
  };

  const fetchRegisteredUsers = async () => {
    const response = await axiosClient.get('/users/get-users');
    return response.data;
  };

  const { data: users, refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchRegisteredUsers,
  });

  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      refetchUsers();
    },
  });

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    mutate(data);
  };

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="p-2 text-center">회원가입 페이지</h2>
      <p>
        회원가입 성공하면 회원가입 성공, 실패하면 회원가입 실패 뜹니다... 이상한 점 있으면 코멘트
        해주세요 ㅎㅎ 쿼리 재미잇네오....
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center border-2">
        <input
          type="text"
          {...register('email', {
            required: '이메일은 필수입니다!',
            pattern: {
              value: /^\S+@\S+$/i,
              message: '이메일 형식이 아닙니다!',
            },
          })}
          className="block border-2"
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          {...register('password', { required: '비밀번호는 필수입니다!' })}
          className="block border-2"
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type="password"
          {...register('passwordConfirm', { required: '비밀번호 확인은 필수입니다!' })}
          className="block border-2"
        />
        {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
        {password !== passwordConfirm && <span>비밀번호가 일치하지 않습니다!</span>}
        <input
          type="text"
          {...register('nickname', { required: '닉네임은 필수입니다!' })}
          className="block border-2"
        />
        {errors.nickname && <span>{errors.nickname.message}</span>}
        <div className="mx-auto">
          <input type="submit" className="p-2 border-2" />
        </div>
      </form>
      <div className="h-6 border-2">{isError ? '회원가입 실패' : isSuccess && '회원가입 성공'}</div>
      <div>
        <h2>현재 회원가입한 유저들</h2>
        {users &&
          users
            .filter((user) => user.role === 'Regular')
            .map((user) => (
              <div key={user._id}>
                {user.email} {user.fullName}
              </div>
            ))}
      </div>
    </div>
  );
};

export default SignUpPage;
