import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormInput from '@/components/FormInput';
import HeaderText from '@/components/HeaderText';
import MainButton from '@/components/MainButton';
import useAuthQuery from '@/hooks/useAuthQuery';

type LoginFormValues = {
  email: string;
  password: string;
};

const [EMAIL, PASSWORD]: (keyof LoginFormValues)[] = ['email', 'password'];

const INPUT_LABEL: { [key: string]: string } = {
  EMAIL: '이메일',
  PASSWORD: '비밀번호',
};

const PLACEHOLDER: { [key: string]: string } = {
  EMAIL: '이메일을 입력해주세요',
  PASSWORD: '비밀번호를 입력해주세요',
};

const ERROR_MESSAGE: { [key: string]: string } = {
  EMPTY_EMAIL: '이메일은 필수입니다!',
  INVALID_EMAIL: '이메일 형식에 맞지 않습니다!',
  EMPTY_PASSWORD: '비밀번호는 필수입니다!',
  SHORT_PASSWORD: '8글자 이상 입력해주세요!',
};

const LoginPage = () => {
  const methods = useForm<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const {
    loginQuery: { mutate: loginMutate, isLoading },
  } = useAuthQuery();

  const onSubmit: SubmitHandler<LoginFormValues> = ({ email, password }) => {
    loginMutate({ email, password });
  };

  const navigate = useNavigate();

  const handleClickHomeButton = () => {
    navigate('/home');
  };

  const handleClickSignUpButton = () => {
    navigate('/signup');
  };

  const { watch, trigger } = methods;
  const password = watch(PASSWORD);

  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh] justify-center dark:bg-[#1D232A]">
      <div className=" absolute top-[12%]">
        <HeaderText label="로그인" />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col font-bold p-4 gap-5"
        >
          <div>
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
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <MainButton label="로그인" type="submit" isLoading={isLoading} />
            <MainButton label="회원가입" mode="outlined" onClick={handleClickSignUpButton} />
            <button
              onClick={handleClickHomeButton}
              className="mt-5 text-base font-Cafe24SurroundAir text-lazy-gray hover:text-wall-street"
            >
              홈으로 가기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
