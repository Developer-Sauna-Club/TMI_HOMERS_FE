import Modal from '@/components/Modal';

const LandingPage = () => {
  return (
    <>
      <h2>랜딩 페이지입니다</h2>
      <Modal
        title="정말 삭제하시겠습니까?"
        body="삭제된 내용은 복구할 수 없습니다."
        confirmLabel="삭제"
      />
    </>
  );
};

export default LandingPage;
