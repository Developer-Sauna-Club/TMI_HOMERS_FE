import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
// import { createPortal } from 'react-dom';

type ModalProps = {
  onClose?: () => void;
  children?: ReactNode;
  title: string;
  body?: string;
  mode?: 'confirm' | 'alert';
  warning?: boolean;
  confirmLabel?: string;
};

const Backdrop = () => {
  const BACKDROP_CLASS = `fixed top-0 left-0 w-[100%] h-[100vh] z-20 bg-black bg-opacity-25`;
  return <div className={BACKDROP_CLASS} />;
};

const ModalOverlay: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="fixed top-[35vh] left-[8.5%] w-[83%] bg-white rounded-lg p-[1rem] shadow-lg z-30 ">
      <div className="flex flex-col items-center justify-between mt-5">{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays')!;

const Modal = ({
  title = '모달 타이틀',
  body,
  warning = false,
  confirmLabel = '확인',
}: ModalProps) => {
  const TITLE_CLASS = 'font-Surround text-[1.25rem] text-tricorn-black';
  const BODY_CLASS = 'font-SurroundAir text-base text-footer-icon mt-3';
  const BUTTON_CONTAINER_CLASS =
    'flex justify-center items-center w-[10.8rem] h-[3.88rem] w-full h-full';
  const BUTTON_BASE_CLASS = 'font-SurroundAir text-wall-street';
  const CONFIRM_BUTTON_CLASS =
    'w-[6.25rem] h-[2.25rem] rounded-full hover:bg-opacity-75 transform transition duration-100 focus:scale-95 font-Surround';
  const WARNING_CLASSES = warning ? `bg-red-600` : `bg-green-600`;
  return (
    <>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(
        <ModalOverlay>
          <div className="flex flex-col items-center h-full w-full">
            <p className={TITLE_CLASS}>{title}</p>
            <p className={BODY_CLASS}>{body}</p>
          </div>
          <div className="flex border-t border-profile-bg w-[95%] justify-around items-center mt-5">
            <div className={BUTTON_CONTAINER_CLASS}>
              <button className={BUTTON_BASE_CLASS}>취소</button>
            </div>
            <div className={BUTTON_CONTAINER_CLASS}>
              <button className={`${CONFIRM_BUTTON_CLASS} ${WARNING_CLASSES} text-white`}>
                {confirmLabel}
              </button>
            </div>
          </div>
        </ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
