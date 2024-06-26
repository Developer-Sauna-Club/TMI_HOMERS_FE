import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MainButton from '@/components/MainButton';
import useAuthQuery from '@/hooks/useAuthQuery';
import FormInput from '@components/FormInput';

type SignUpFormValues = {
  email: string;
  password: string;
  nickname: string;
  passwordCheck: string;
};

const [EMAIL, PASSWORD, PASSWORD_CHECK, NICKNAME]: (keyof SignUpFormValues)[] = [
  'email',
  'password',
  'passwordCheck',
  'nickname',
];

const INPUT_LABEL: { [key: string]: string } = {
  EMAIL: '이메일',
  PASSWORD: '비밀번호',
  PASSWORD_CHECK: '비밀번호 확인',
  NICKNAME: '닉네임',
};

const PLACEHOLDER: { [key: string]: string } = {
  EMAIL: '이메일을 입력해주세요',
  PASSWORD: '비밀번호를 입력해주세요',
  PASSWORD_CHECK: '비밀번호를 한번 더 입력해주세요',
  NICKNAME: '닉네임을 입력해주세요',
};

const ERROR_MESSAGE: { [key: string]: string } = {
  EMPTY_EMAIL: '이메일은 필수입니다!',
  INVALID_EMAIL: '이메일 형식에 맞지 않습니다!',
  EMPTY_PASSWORD: '비밀번호는 필수입니다!',
  INVALID_PASSWORD: '영문, 숫자, 특수기호로 입력해주세요!',
  SHORT_PASSWORD: '8글자 이상 입력해주세요!',
  EMPTY_PASSWORD_CHECK: '비밀번호 확인은 필수입니다!',
  INVALID_PASSWORD_CHECK: '비밀번호와 일치하지 않습니다!',
  EMPTY_NICKNAME: '닉네임은 필수입니다!',
  INVALID_NICKNAME: '한글, 영문, 숫자로 입력해주세요!',
  SHORT_NICKNAME: '2글자 이상으로 입력해주세요!',
  LONG_NICKNAME: '10글자 이하로 입력해주세요!',
};

const SignUpForm = () => {
  const methods = useForm<SignUpFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const {
    signUpQuery: { mutate: signUpMutate, isPending: isLoading },
  } = useAuthQuery();

  const onSubmit: SubmitHandler<SignUpFormValues> = ({ email, password, nickname }) => {
    signUpMutate({ email, password, nickname });
  };
  const navigate = useNavigate();

  const handleClickLoginButton = () => {
    navigate('/login');
  };

  const { watch, trigger } = methods;
  const [password, passwordCheck] = [watch(PASSWORD), watch(PASSWORD_CHECK)];

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center font-bold gap-8"
      >
        <div className="w-full">
          <FormInput
            name={EMAIL}
            label={INPUT_LABEL.EMAIL}
            registerOptions={{
              required: ERROR_MESSAGE.EMPTY_EMAIL,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: ERROR_MESSAGE.INVALID_EMAIL,
              },
            }}
            placeholder={PLACEHOLDER.EMAIL}
          />
          <FormInput
            name={PASSWORD}
            label={INPUT_LABEL.PASSWORD}
            registerOptions={{
              required: ERROR_MESSAGE.EMPTY_PASSWORD,
              pattern: {
                value: /^[A-Za-z0-9@$!%*#?&]+$/,
                message: ERROR_MESSAGE.INVALID_PASSWORD,
              },
              minLength: {
                value: 8,
                message: ERROR_MESSAGE.SHORT_PASSWORD,
              },
              onChange: async () => {
                await trigger(PASSWORD);
              },
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder={PLACEHOLDER.PASSWORD}
            isPassword={true}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
            showToggleButton={!!password}
          />
          <FormInput
            name={PASSWORD_CHECK}
            label={INPUT_LABEL.PASSWORD_CHECK}
            registerOptions={{
              required: ERROR_MESSAGE.INVALID_PASSWORD_CHECK,
              validate: (value, { password }) =>
                value === password || ERROR_MESSAGE.INVALID_PASSWORD_CHECK,
              onChange: async () => {
                await trigger(PASSWORD_CHECK);
              },
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder={PLACEHOLDER.PASSWORD_CHECK}
            isPassword={true}
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword((prev) => !prev)}
            showToggleButton={!!passwordCheck}
          />
          <FormInput
            name={NICKNAME}
            label={INPUT_LABEL.NICKNAME}
            registerOptions={{
              required: ERROR_MESSAGE.EMPTY_NICKNAME,
              pattern: {
                value: /^[A-Za-z0-9가-힣]+$/,
                message: ERROR_MESSAGE.INVALID_NICKNAME,
              },
              minLength: {
                value: 2,
                message: ERROR_MESSAGE.SHORT_NICKNAME,
              },
              maxLength: {
                value: 10,
                message: ERROR_MESSAGE.LONG_NICKNAME,
              },
            }}
            placeholder={PLACEHOLDER.NICKNAME}
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
  );
};

export default SignUpForm;
