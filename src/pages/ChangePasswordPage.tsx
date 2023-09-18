import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import HeaderText from '@/components/HeaderText';
import MainButton from '@/components/MainButton';
import useChangePassword from '@hooks/useChangePassword';

type PasswordFormValues = {
  password: string;
  passwordCheck: string;
};

const HEADER_TEXT = '비밀번호 변경';

const [PASSWORD, PASSWORD_CHECK]: (keyof PasswordFormValues)[] = ['password', 'passwordCheck'];

const PLACEHOLDER = {
  PASSWORD: '변경할 비밀번호를 입력해주세요',
  PASSWORD_CHECK: '한 번 더 입력해주세요',
};

const LABELS = {
  PASSWORD: '비밀번호',
  PASSWORD_CHECK: '',
  SUBMIT_BUTTON: '변경하기',
};

const ERROR_MESSAGE = {
  EMPTY_PASSWORD: '비밀번호는 필수입니다!',
  SHORT_PASSWORD: '8글자 이상 입력해주세요!',
  INVALID_PASSWORD: '영문, 숫자, 특수기호로 입력해주세요!',
  EMPTY_PASSWORD_CHECK: '비밀번호 확인은 필수입니다!',
  INVALID_PASSWORD_CHECK: '비밀번호와 일치하지 않습니다!',
};

const ChangePasswordPage = () => {
  const methods = useForm<PasswordFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const { changePasswordMutate, isLoading } = useChangePassword();

  const onSubmit: SubmitHandler<PasswordFormValues> = ({ password }) => {
    // TODO 추후 모달 방식으로 변경하기
    if (confirm('비밀번호를 변경하시겠습니까?')) {
      changePasswordMutate(password);
    }
  };

  const { watch, trigger } = methods;
  const [password, passwordCheck] = [watch(PASSWORD), watch(PASSWORD_CHECK)];

  return (
    <div className="flex flex-col items-center w-[100vw] h-[100vh] justify-center">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col items-center p-4 gap-5"
        >
          <div className="w-[18.375rem]">
            <div className="absolute top-[12%]">
              <HeaderText label={HEADER_TEXT} />
            </div>
            <FormInput
              name={PASSWORD}
              label={LABELS.PASSWORD}
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
              label={LABELS.PASSWORD_CHECK}
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
          </div>
          <div className="absolute bottom-[12%]">
            <MainButton label={LABELS.SUBMIT_BUTTON} type="submit" isLoading={isLoading} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChangePasswordPage;
