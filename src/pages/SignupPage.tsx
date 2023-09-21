import Header from '@components/HeaderText';
import SignUpForm from './signup/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <Header size="large" label="회원 가입" />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
