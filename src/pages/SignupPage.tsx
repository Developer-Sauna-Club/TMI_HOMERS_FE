import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MainButton from '@/components/MainButton';
import FormInput from '@components/FormInput';
import Header from '@components/HeaderText';
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
  const navigate = useNavigate();

  const handleClickLoginButton = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center h-[100vh]">
      <Header size="large" label="회원 가입" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col items-center font-bold gap-8"
        >
          <div className="w-full">
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
              label="비밀번호 확인"
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
          </div>
          <div className="flex flex-col gap-4">
            <MainButton label="회원가입" type="submit" isLoading={isLoading} />
            <MainButton
              label="로그인"
              type="button"
              mode="outlined"
              onClick={handleClickLoginButton}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
