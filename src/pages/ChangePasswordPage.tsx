import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CloseButton, Confirm, FormInput, HeaderText, MainButton } from '@/components';
import { MODAL_MESSAGE } from '@/constants/Messages';
import { useChangePassword, useModal } from '@/hooks';

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

const MODAL_CONFIRM_LABEL = '변경하기';

const ChangePasswordPage = () => {
  const methods = useForm<PasswordFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showModal, modalOpen, modalClose } = useModal();
  const { changePasswordMutate, isLoading } = useChangePassword();

  const onSubmit: SubmitHandler<PasswordFormValues> = () => {
    modalOpen();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const { watch, trigger } = methods;
  const [password, passwordCheck] = [watch(PASSWORD), watch(PASSWORD_CHECK)];

  return (
    <div className="flex flex-col items-center h-[100vh] justify-center overflow-hidden">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col items-center p-4 gap-5"
        >
          {showModal && (
            <Confirm
              theme="positive"
              title={MODAL_MESSAGE.PASSWORD_EDIT_WARN}
              confirmLabel={MODAL_CONFIRM_LABEL}
              onClose={modalClose}
              onConfirm={() => changePasswordMutate(password)}
            />
          )}
          <div className="w-[18.375rem]">
            <div className="mb-[35%] flex items-center justify-between w-full max-w-[18.375rem]">
              <HeaderText label={HEADER_TEXT} />
              <CloseButton onClick={handleBackClick} />
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
          <div className="flex flex-col gap-3 mt-5">
            <MainButton label={LABELS.SUBMIT_BUTTON} type="submit" isLoading={isLoading} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ChangePasswordPage;
