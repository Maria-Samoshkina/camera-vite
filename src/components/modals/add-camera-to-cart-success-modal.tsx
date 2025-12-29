import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UseModalAccessibility } from '../../hooks/use-modal-accessibility';
import { AppRoute } from '../../const';

type AddCameraToCartSuccessModalProps = {
  isOpen: boolean;
  onModalClose: ()=> void;
}

function AddCameraToCartSuccessModal (props: AddCameraToCartSuccessModalProps) : JSX.Element | null {

  const {isOpen, onModalClose} = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const continueShoppingButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleContinueShoppingButtonClick = () => {
    onModalClose();
    if (location.pathname.startsWith(AppRoute.Camera)) {
      navigate(AppRoute.Main);
    }
  };

  UseModalAccessibility({
    isOpen,
    onModalClose,
    modalRef,
    initialFocusRef: continueShoppingButtonRef as unknown as React.RefObject<HTMLElement>,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay"
          onClick={onModalClose}
        >

        </div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--transparent modal__btn"
              onClick={handleContinueShoppingButtonClick}
              ref={continueShoppingButtonRef}
            >
              Продолжить покупки
            </button>


            <Link
              to={AppRoute.Card}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={onModalClose}
            >
              Перейти в корзину
            </Link>


          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={onModalClose}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

}

export default AddCameraToCartSuccessModal;
