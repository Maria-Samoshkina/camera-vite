import { useRef } from 'react';
import { UseModalAccessibility } from '../../hooks/use-modal-accessibility';

type OrderSuccessModalProps = {
  isOpen: boolean;
  onModalClose: ()=> void;
}

function OrderSuccessModal (props: OrderSuccessModalProps): JSX.Element {

  const {isOpen, onModalClose} = props;
  const modalRef = useRef<HTMLDivElement>(null);


  UseModalAccessibility({
    isOpen,
    onModalClose,
    modalRef,
    //initialFocusRef: removeFromCartButtonRef as unknown as React.RefObject<HTMLElement>,
  });

  return (
    <div className={isOpen ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessModal;
