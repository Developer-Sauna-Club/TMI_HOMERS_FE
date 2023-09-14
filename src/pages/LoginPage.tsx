import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import HeaderText from '@/components/HeaderText';
import MainButton from '@/components/MainButton';

type LoginFormValue = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const methods = useForm<LoginFormValue>();
  return (
    // TODO 레이아웃 grid로 잡아보기! 뷰포트 사용하지 말기
    <div className="flex flex-col items-center w-[100vw] h-[100vh] justify-center bg-white">
      <div className=" absolute top-[12%]">
        <HeaderText label="로그인" />
      </div>
      <FormProvider {...methods}>
        <form className="flex flex-col font-bold p-4 px-16 gap-5">
          <div>
            <FormInput
              name="email"
              label="E-mail"
              type="email"
              registerOptions={{
                required: '이메일은 필수입니다!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '이메일 형식에 맞지 않습니다!',
                },
              }}
              placeholder="이메일을 입력해주세요"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
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
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <MainButton label="로그인" />
            <MainButton label="회원가입" mode="outlined" />
            <button className="font-Cafe24SurroundAir text-[1rem] text-lazy-gray hover:text-wall-street mt-5">
              홈으로 가기
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
