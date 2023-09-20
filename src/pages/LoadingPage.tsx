import Loader from '@/components/Loader';

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Loader size="lg" />
    </div>
  );
};

export default LoadingPage;
