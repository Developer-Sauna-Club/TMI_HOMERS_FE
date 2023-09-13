import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FormInput from '@/components/FormInput';
import useSignUp from '@/hooks/useSignUp';

type Data = {
  email: string;
  password: string;
  password_confirm: string;
  fullName: string;
};

const Signup = () => {
  // <Data> 이거없으면 errors에 타입 에러 많이 나네... 중요!
  const methods = useForm<Data>();
  const { handleSubmit } = methods;
  const { mutate } = useSignUp();

  const onSubmit: SubmitHandler<Data> = (data) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="email"
          placeholder="email"
          registerOptions={{
            required: {
              value: true,
              message: '이메일을 입력해주세요',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식에 맞지 않습니다',
            },
          }}
        />
        <FormInput
          name="password"
          placeholder="password"
          registerOptions={{
            required: {
              value: true,
              message: '비밀번호를 입력해주세요',
            },
            minLength: {
              value: 8,
              message: '8글자 이상 입력해주세요',
            },
          }}
        />
        <FormInput
          name="fullName"
          placeholder="fullName"
          registerOptions={{
            required: {
              value: true,
              message: '이름을 입력하세요',
            },
          }}
        />
        <input type="submit" />
      </form>
    </FormProvider>
  );
};

export default Signup;
