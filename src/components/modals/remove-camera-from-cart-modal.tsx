import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { UseModalAccessibility } from '../../hooks/use-modal-accessibility';
import { getSelectedCameraForRemoveFromCart } from '../../store/modals/modals-selectors';
import { deleteFromCart } from '../../store/cart/cart-slice';
import { CartItem } from '../../types/camera';

type RemoveCameraFromCartModalProps = {
  isOpen: boolean;
  onModalClose: ()=> void;
}

function RemoveCameraFromCartModal (props:RemoveCameraFromCartModalProps):JSX.Element {

  const {isOpen, onModalClose} = props;
  const dispatch = useAppDispatch();

  const selectedCameraForRemoveFromСart = useAppSelector(getSelectedCameraForRemoveFromCart);
  const removeFromCartButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  UseModalAccessibility({
    isOpen,
    onModalClose,
    modalRef,
    initialFocusRef: removeFromCartButtonRef as unknown as React.RefObject<HTMLElement>,
  });

  const handleDeleteCameraFromCartClick = (cameraInCart: CartItem | null)=> {
    if(cameraInCart){
      dispatch(deleteFromCart(cameraInCart));
      onModalClose();
    }
  };

  return (
    <div className={isOpen ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={()=> onModalClose()}
        >
        </div>
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Удалить этот товар?</p>
          {selectedCameraForRemoveFromСart && (
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp"
                    srcSet={`${selectedCameraForRemoveFromСart.camera.previewImgWebp}, ${selectedCameraForRemoveFromСart.camera.previewImgWebp2x} 2x`}
                  />
                  <img src={selectedCameraForRemoveFromСart.camera.previewImg} srcSet={`${selectedCameraForRemoveFromСart.camera.previewImg2x} 2x`} width="140" height="120" alt={selectedCameraForRemoveFromСart.camera.name}/>
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{selectedCameraForRemoveFromСart.camera.name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{selectedCameraForRemoveFromСart.camera.vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{selectedCameraForRemoveFromСart.camera.type} {selectedCameraForRemoveFromСart.camera.category.toLowerCase()}</li>
                  <li className="basket-item__list-item">{selectedCameraForRemoveFromСart.camera.level} уровень</li>
                </ul>
              </div>
            </div>
          )}
          <div className="modal__buttons">
            <button
              ref={removeFromCartButtonRef}
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick = {()=> handleDeleteCameraFromCartClick(selectedCameraForRemoveFromСart)}
            >
              Удалить
            </button>
            <a className="btn btn--transparent modal__btn modal__btn--half-width" href="#">Продолжить покупки
            </a>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onModalClose}
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

export default RemoveCameraFromCartModal;
