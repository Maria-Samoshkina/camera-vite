import { useRef } from 'react';
import { UseModalAccessibility } from '../../hooks/use-modal-accessibility';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getIsOrderError, getIsOrderSuccess } from '../../store/order/order-selectors';

type OrderSuccessModalProps = {
  isOpen: boolean;
  onModalClose: ()=> void;
}

function OrderSuccessModal (props: OrderSuccessModalProps): JSX.Element {

  const {isOpen, onModalClose} = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const backToShoppingButton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const isOrderError = useAppSelector(getIsOrderError);
  const isOrderSuccess = useAppSelector(getIsOrderSuccess);


  const handleModalClose = () => {
    if(isOrderSuccess){
      onModalClose();
      navigate(AppRoute.Main);
    }
    if(isOrderError){
      onModalClose();
    }

  };


  UseModalAccessibility({
    isOpen,
    onModalClose: handleModalClose,
    modalRef,
    initialFocusRef: backToShoppingButton as unknown as React.RefObject<HTMLElement>,
  });


  const handleBackToShoppingButtonClick = ()=> {
    handleModalClose();
  };

  return (
    <div className={isOpen ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={handleModalClose}

        >

        </div>
        <div className="modal__content" ref={modalRef}>


          {isOrderError && <p className="title title--h4">Упс, покупка не удалась!</p>}


          {isOrderSuccess && (
            <>
              <p className="title title--h4">Спасибо за покупку</p>
              <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                <use xlinkHref="#icon-review-success"></use>
              </svg>
            </>
          )}


          <div className="modal__buttons">

            {isOrderSuccess &&
          <button
            ref = {backToShoppingButton}
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={handleBackToShoppingButtonClick}
          >Вернуться к покупкам
          </button>}

            {isOrderError &&
          <button
            ref = {backToShoppingButton}
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={handleModalClose}
          >Попробовать снова
          </button>}

          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleModalClose}
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

export default OrderSuccessModal;

//При возникновении ошибки
// в попапе отображается текст ошибки.
// Текст остаётся на усмотрение разработчика. Корзина не очищается.
