import { useAppSelector } from '../../hooks';
import { useEffect, useRef } from 'react';
import { getSelectedCameraForCart } from '../../store/modals/modals-selectors';

type AddCameraToCartModalProps = {
  isOpen: boolean;
  onModalClose: ()=> void;
}

function AddCameraToCartModal (props: AddCameraToCartModalProps): JSX.Element {


  const {isOpen, onModalClose} = props;

  const selectedCameraForCart = useAppSelector(getSelectedCameraForCart);
  const addToCartButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
    if (isOpen && addToCartButtonRef.current) {
      addToCartButtonRef.current.focus();
    }
  }, [isOpen]);

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
      if (evt.key === 'Tab' && isOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (evt.shiftKey) {
          if (document.activeElement === firstElement) {
            evt.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            evt.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleTabKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleTabKeyDown);
    };
  }, [isOpen]);


  return (
    <div className={isOpen ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={()=> onModalClose()}
        >
        </div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={selectedCameraForCart ? `/${selectedCameraForCart.previewImgWebp}, /${selectedCameraForCart.previewImgWebp2x} 2x` : ''}/>
                <img src={selectedCameraForCart?.previewImg ? `/${selectedCameraForCart.previewImg}` : ''} srcSet={selectedCameraForCart ? `/${selectedCameraForCart.previewImg2x} 2x` : ''} width="140" height="120" alt={selectedCameraForCart?.name}/>
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{selectedCameraForCart?.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{selectedCameraForCart?.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{selectedCameraForCart?.category}</li>
                <li className="basket-item__list-item">{selectedCameraForCart?.level}</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{selectedCameraForCart?.price?.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              ref={addToCartButtonRef}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={()=> onModalClose()}
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

export default AddCameraToCartModal;
