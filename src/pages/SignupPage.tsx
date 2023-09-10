import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosClient } from '@api/axiosClient';

type SignUpForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
};

type User = {
  role: string;
  fullName: string;
  email: string;
  _id: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }, //form 전체의 state, 일괄적으로 업데이트됨
  } = useForm<SignUpForm>({
    mode: 'onChange', //onSubmit 이벤트에서 유효성 검사 진행되고, inputs은 이벤트리스너를 연결하여 다시 자체 유효성 검사를 함
  });

  /*
  useQuery
  데이터를 get하기 위한 api. 
  post, update는 useMutation을 사용한다. 

  - 첫 번째 파라미터로 unique Key가 들어가고, 두 번째 파라미터로 비동기함수(api호출함수)가
  들어간다. 
  - unique Key는 다른 컴포넌트에서도 해당 키를 사용하면 호출 가능!
    unique Key는 string 혹은 배열을 받는다. 
    배열로 넘기면 0번 값은 다른 컴포넌트에서 부를 string 값이 들어감. 배열 원소 값 바뀌면 queryFn이 재실행됨
    1번 값은 query 함수 내부에서 파라미터로 해당 값이 전달됨
  - return 값은 api 성공, 실패여부, api return 값을 포함한 객체임
  - 여러 개의 비동기 query가 있다면 useQueries 사용권장
  - enabled 사용 시 useQuery를 동기적으로 사용 가능

  -refetch는 사용자 목록을 불러오기 위함. 
  -users에 사용자 목록이 불러와져서 다른 컴포넌트에서도 사용 가능해짐!
  */
  const { data: users, refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosClient.get('/users/get-users');
      return response.data;
    },
  });

  /*
  useMutation
  값을 바꿀 때 사용하는 api. return 값은 useQuery와 동일
  즉, 데이터를 생성, 업데이트, 삭제할 때 사용된다. 

  - return 값으로 data, isLoading, mutate, ... 등이 있다. 
  - mutationFn (variables: TVariables) => Promise<TData>
    - api 요청 함수. 아래 경우엔 새로운 유저 생성
    - variables는 mutate가 전달하는 객체
  - onSuccess: mutation이 성공하고 결과를 전달할 때 실행됨
  */
  const { mutate, isError, isSuccess } = useMutation({
    mutationFn: async (data: SignUpForm) => {
      const response = await axiosClient.post('/signup', {
        email: data.email,
        fullName: data.nickname,
        password: data.password,
      });

      return response.data;
    },
    onSuccess: () => {
      refetchUsers();
    },
  });

  const onSubmitHandler: SubmitHandler<SignUpForm> = (data) => {
    //모든 항목이 정상적으로 입력 되었을 때 처리할 내부 로직
    // console.log(data);
    mutate(data);
    // data에는 register()로 등록된 input의 각 value가 key-value 형태로 들어옴
    // 즉 input에 입력한 값들이 유효성 검사 통과하고 유효하게 들어오면!!!
  };

  //password라는 이름을 가진 input의 값을 감시한다.
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="p-2 text-center">회원가입 페이지</h2>
      {/* handleSubmit은 onSubmit을 호출하기 전에 입력값을 검증한다.
          만약 입력 받은 form validation이 성공적이면 form data를 받는다.
      */}
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col justify-center border-1"
      >
        <input
          type="text"
          /* "register" 함수를 호출하여 input을 hook에 등록 */
          {...register('email', {
            required: '이메일은 필수입니다', //필수항목 혹은 검증규칙 포함
            pattern: {
              value: /^\S+@\S+$/i,
              message: '이메일 형식이 아닙니다',
            },
          })}
          className="block border-2"
          placeholder="이메일을 입력해주세요"
        />
        {/* 필드 검증에 실패하면 오류가 반환됨 */}
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        <input
          type="password"
          {...register('password', {
            required: '비밀번호는 필수입니다',
            pattern: {
              value: /^(?!.*\s).{8,16}$/,
              message: '비밀번호는 8자 이상, 16자 이하, 공백을 포함할 수 없습니다',
            },
          })}
          className="block border-2"
          placeholder="비밀번호를 입력해주세요"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        <input
          type="password"
          {...register('passwordConfirm', {
            required: '비밀번호 확인은 필수입니다',
          })}
          className="block border-2"
          placeholder="비밀번호 확인"
        />
        {errors.passwordConfirm && (
          <span className="text-red-500">{errors.passwordConfirm.message}</span>
        )}
        {password !== passwordConfirm && (
          <span className="text-red-500">비밀번호가 일치하지 않습니다</span>
        )}
        <input
          type="text"
          {...register('nickname', {
            required: '닉네임은 필수입니다',
            pattern: {
              value: /^(?!.*\s).{2,10}$/,
              message: '닉네임은 2자 이상, 10자 이하, 공백을 포함할 수 없습니다',
            },
          })}
          className="block border-2"
          placeholder="닉네임을 입력해주세요"
        />
        {errors.nickname && <span className="text-red-500">{errors.nickname.message}</span>}
        <button className="mx-auto">
          <input type="submit" className="p-2 border-2" />
        </button>
      </form>
      <div className="h-6 border-2 rounded-md text-center bg-slate-300 my-4">
        제출결과 {isError ? '회원가입 실패' : isSuccess && '회원가입 성공'}
      </div>
      <div>
        <h3 className="mb-3">현재 회원가입한 유저들</h3>
        {/*
        나중에 게시글 불러올 때 사용하기
        */}
        {users &&
          users
            .filter((user: User) => user.role === 'Regular')
            .map((user: User) => (
              <div key={user._id}>
                - {user.email} {user.fullName}
              </div>
            ))}
      </div>
    </div>
  );
};

export default SignUpPage;
