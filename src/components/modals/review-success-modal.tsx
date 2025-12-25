import { useRef } from 'react';
import { UseModalAccessibility } from '../../hooks/use-modal-accessibility';

type ReviewSuccessModalProps = {
   isOpen: boolean;
  onModalClose: ()=> void;
}


function ReviewSuccessModal (props: ReviewSuccessModalProps): JSX.Element {

  const {isOpen, onModalClose} = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const continueShoppingButtonRef = useRef<HTMLButtonElement>(null);

  const handleContinueShoppingButtonClick = () => {
    onModalClose();
  };

  UseModalAccessibility({
    isOpen,
    onModalClose,
    modalRef,
    initialFocusRef: continueShoppingButtonRef as unknown as React.RefObject<HTMLElement>,
  });


  return (

    <div className={isOpen ? 'modal is-active modal--narrow' : 'modal modal--narrow'}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={onModalClose}
        >
        </div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref= {continueShoppingButtonRef}
              onClick={handleContinueShoppingButtonClick}
            >Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick = {onModalClose}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewSuccessModal;
