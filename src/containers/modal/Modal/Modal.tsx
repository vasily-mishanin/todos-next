import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import './styles.css';

export type ModalProps = {
  open: boolean;
  title?: string;
  showCloseBtn?: boolean;
  children: ReactNode;
  onClose: () => void;
};

export const Modal: FC<ModalProps> = ({
  children,
  title,
  open,
  showCloseBtn,
  onClose,
}) => {
  const hasWindow = typeof window !== 'undefined';
  const rootElement = useRef<Element | null>(null);
  const isShown = open && rootElement?.current !== null;

  useEffect(() => {
    rootElement.current = document.querySelector('#modal-portal');
  }, [hasWindow]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isShown) {
        onClose();
      }
    },
    [isShown, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, [isShown, onKeyDown]);

  const modal = (
    <div className='overlay' onClick={onClose}>
      <div className='inner' onClick={(e) => e.stopPropagation()}>
        {showCloseBtn && (
          <button className='btn-close-modal' onClick={onClose}>
            <XMarkIcon />
          </button>
        )}
        {title && <h2 className='modal-title'>{title}</h2>}
        <div className='content'>{children}</div>
      </div>
    </div>
  );

  return isShown ? createPortal(modal, rootElement?.current as Element) : null;
};
