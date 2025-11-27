import { RefObject, useEffect } from 'react';

type UseModalAccessibilityProps = {
  isOpen: boolean;
  onModalClose: () => void;
  modalRef: RefObject<HTMLDivElement>;
  initialFocusRef?: RefObject<HTMLElement>;
};

export const UseModalAccessibility = (props: UseModalAccessibilityProps)=>{

  const {isOpen, onModalClose, modalRef, initialFocusRef } = props;


  useEffect(() => {
    const handleEscKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && isOpen) {
        onModalClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [isOpen, onModalClose]);


  useEffect(() => {
    if (isOpen && initialFocusRef?.current) {
      initialFocusRef?.current.focus();
    }
  }, [isOpen, initialFocusRef]);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleTabKeyDown = (evt: KeyboardEvent) => {
      if (evt.key !== 'Tab' || !isOpen || !modalRef.current) {
        return;
      }

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const activeElement = document.activeElement as HTMLElement | null;

      if (!activeElement || !modalRef.current.contains(activeElement)) {
        evt.preventDefault();
        firstElement.focus();
        return;
      }

      if (evt.shiftKey) {
        if (activeElement === firstElement) {
          evt.preventDefault();
          lastElement.focus();
        }
      } else {
        if (activeElement === lastElement) {
          evt.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleTabKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleTabKeyDown);
    };
  }, [isOpen, modalRef]);
};
