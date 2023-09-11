import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import FormInput from '@components/FormInput';
import Loader from '@components/Loader';
import useSignUp from '@hooks/useSignUp';

type SignUpFormValues = {
  email: string;
  password: string;
  nickname: string;
  passwordCheck: string;
};

const SignUpPage = () => {
  const methods = useForm<SignUpFormValues>();
  const { signUpMutate, isLoading } = useSignUp();
  const onSubmit: SubmitHandler<SignUpFormValues> = ({ email, password, nickname }) => {
    signUpMutate({ email, password, nickname });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="">회원가입 페이지</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col font-bold p-4 px-16"
        >
          <FormInput
            name="email"
            label="이메일"
            registerOptions={{
              required: '이메일은 필수입니다!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식에 맞지 않습니다!',
              },
            }}
            type="email"
            placeholder="이메일을 입력해주세요"
          />
          <FormInput
            name="password"
            label="비밀번호"
            registerOptions={{
              required: '비밀번호는 필수입니다!',
              pattern: {
                value: /^[A-Za-z0-9@$!%*#?&]+$/,
                message: '영문, 숫자, 특수기호로 입력해주세요!',
              },
              minLength: {
                value: 8,
                message: '8글자 이상 입력해주세요!',
              },
            }}
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <FormInput
            name="passwordCheck"
            label="비밀번호확인"
            registerOptions={{
              required: '비밀번호 확인은 필수입니다!',
              validate: (value, { password }) =>
                value === password || '비밀번호와 일치하지 않습니다!',
            }}
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요!"
          />
          <FormInput
            name="nickname"
            label="닉네임"
            registerOptions={{
              required: '닉네임은 필수입니다!',
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
            }}
            placeholder="닉네임을 입력해주세요"
          />
          <button className="mt-2 p-2" disabled={isLoading}>
            {isLoading && <Loader />}
            {!isLoading && '회원가입'}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
