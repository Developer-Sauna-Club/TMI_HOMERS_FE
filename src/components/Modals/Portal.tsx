import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  elementId?: string;
};

const Portal = ({ children, elementId = 'overlays' }: PortalProps) => {
  const element = document.getElementById(elementId) as HTMLElement;

  return createPortal(children, element);
};

export default Portal;
