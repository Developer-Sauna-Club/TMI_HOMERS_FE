import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
// import { createPortal } from 'react-dom';

type ModalProps = {
  isAlert?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
  title: string;
  body?: string;
  warning?: boolean;
  confirmLabel?: string;
};

const Backdrop = () => {
  const BACKDROP_CLASS = `fixed top-0 left-0 w-[100%] h-[100vh] z-20 bg-black bg-opacity-25`;
  return <div className={BACKDROP_CLASS} />;
};

const ModalOverlay: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="fixed top-[35vh] left-[8.5%] min-w-[83%] max-w-[50%] bg-white rounded-lg pt-[1rem] shadow-xl z-30 ">
      <div className="flex flex-col items-center justify-between">{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays')!;

const Modal = ({
  title = '모달 타이틀',
  body,
  warning = false,
  confirmLabel = '확인',
  onConfirm,
  onClose,
}: ModalProps) => {
  const TITLE_CLASS = 'font-Cafe24Surround text-[1.25rem] text-tricorn-black';
  const BODY_CLASS = 'font-Cafe24SurroundAir text-base text-footer-icon whitespace-pre-line';

  const BUTTON_CONTAINER_CLASS =
    'flex justify-evenly items-center w-[10.8rem] h-[3.88rem] w-full h-full';

  const BUTTON_BASE_CLASS = 'w-[6.25rem] h-[2.25rem] font-Cafe24SurroundAir text-wall-street';
  const BUTTON_TRANSITION_CLASS = 'transform transition duration-300 active:scale-90';
  const CONFIRM_BUTTON_CLASS = 'font-Cafe24Surround rounded-full hover:bg-opacity-75';

  const WARNING_CLASSES = warning ? `bg-error-red` : `bg-cooled-blue`;

  return (
    <>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(
        <ModalOverlay>
          <div className="text-center">
            <div className="flex flex-col gap-[1rem]">
              <p className={TITLE_CLASS}>{title}</p>
              <p className={BODY_CLASS}>{body}</p>
            </div>
          </div>
          <div className="flex border-t border-profile-bg w-[95%] justify-around items-center mt-5">
            <div className={`${BUTTON_CONTAINER_CLASS} h-[3.875rem]`}>
              <button
                className={`${BUTTON_BASE_CLASS} ${BUTTON_TRANSITION_CLASS}`}
                onClick={onClose}
              >
                취소
              </button>
              <button
                className={`${BUTTON_BASE_CLASS} ${CONFIRM_BUTTON_CLASS} ${BUTTON_TRANSITION_CLASS} ${WARNING_CLASSES} text-white`}
                onClick={onConfirm}
              >
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
