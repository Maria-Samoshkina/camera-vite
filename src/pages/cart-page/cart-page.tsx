import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import RemoveCameraFromCartModal from '../../components/modals/remove-camera-from-cart-modal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInCart } from '../../store/cart/cart-selectors';
import { changeQuantity, decreaseQuantity, increaseQuantity } from '../../store/cart/cart-slice';
import { getIsOrderSuccessModalOpen, getIsRemoveCameraFromCartOpen } from '../../store/modals/modals-selectors';
import { closeOrderSuccessModal, closeRemoveFromCartModal, openRemoveFromCartModal, setSelectedCameraForRemoveFromCart } from '../../store/modals/modals-slice';
import { CartItem } from '../../types/camera';
import CartSummary from './cart-summary';
import { AppRoute } from '../../const';
import OrderSuccessModal from '../../components/modals/order-success-modal';
import { getIsOrderLoading } from '../../store/order/order-selectors';

function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const camerasInCart = useAppSelector(getCamerasInCart);
  const isOpenRemoveCameraFromCartModal = useAppSelector(getIsRemoveCameraFromCartOpen);
  const isOrderSuccessModalOpen = useAppSelector(getIsOrderSuccessModalOpen);


  const handleDecreaseButtonClick = (cameraInCart: CartItem)=> {
    if (cameraInCart.quantity > 1) {
      dispatch(decreaseQuantity(cameraInCart));
    }
  };

  const handleIncreaseButtonClick = (cameraInCart: CartItem)=> {
    dispatch(increaseQuantity(cameraInCart));
  };

  const handleRemoveFromCartButtonClick = (cartItem: CartItem)=> {
    dispatch(setSelectedCameraForRemoveFromCart(cartItem));
    dispatch(openRemoveFromCartModal());
  };

  const handleRemoveFromCartModalClose = () => {
    dispatch(closeRemoveFromCartModal());
  };


  const handleOrderSuccessModalClose = () => {
    dispatch(closeOrderSuccessModal());
  };

  const isOrderLoading = useAppSelector(getIsOrderLoading);


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Main}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">

                {camerasInCart.map((cartItem) => {
                  const { camera, quantity } = cartItem;

                  return(
                    <li key={camera.id}
                      className="basket-item"
                    >
                      <div className="basket-item__img">
                        <picture>
                          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`}/>
                          <img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="140" height="120" alt={camera.name}/>
                        </picture>
                      </div>
                      <div className="basket-item__description">
                        <p className="basket-item__title">{camera.name}</p>
                        <ul className="basket-item__list">
                          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{camera.vendorCode}</span>
                          </li>
                          <li className="basket-item__list-item">{camera.type} {camera.category.toLowerCase()}</li>
                          <li className="basket-item__list-item">{camera.level} уровень</li>
                        </ul>
                      </div>
                      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{camera.price.toLocaleString('ru-RU')} ₽</p>
                      <div className="quantity">


                        <button
                          className="btn-icon btn-icon--prev"
                          aria-label="уменьшить количество товара"
                          disabled={isOrderLoading || quantity <= 1}
                          onClick={()=> {
                            handleDecreaseButtonClick(cartItem);
                          }}
                        >
                          <svg width="7" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-arrow"></use>
                          </svg>
                        </button>
                        <label className="visually-hidden" htmlFor={`counter${camera.id}`}></label>
                        <input
                          type="number"
                          id={`counter${camera.id}`}
                          value={quantity}
                          min="1"
                          max="9"
                          aria-label="количество товара"
                          disabled={isOrderLoading}
                          onFocus={(evt) => evt.currentTarget.select()}
                          onChange={(evt) => {
                            const value = Number(evt.target.value);
                            if (!isNaN(value) && value >= 1 && value <= 9) {
                              dispatch(changeQuantity({ cameraId: camera.id, newQuantity: value }));
                            }
                          }}
                          onBlur={(evt) => {
                            const value = Number(evt.target.value);
                            if (isNaN(value) || value < 1) {
                              dispatch(changeQuantity({ cameraId: camera.id, newQuantity: 1 }));
                            } else if (value > 9) {
                              dispatch(changeQuantity({ cameraId: camera.id, newQuantity: 9 }));
                            }
                          }}
                        />


                        <button
                          className="btn-icon btn-icon--next"
                          aria-label="увеличить количество товара"
                          disabled={isOrderLoading || quantity >= 9}
                          onClick={()=> handleIncreaseButtonClick(cartItem)}
                        >
                          <svg width="7" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-arrow"></use>
                          </svg>
                        </button>
                      </div>
                      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{(camera.price * quantity).toLocaleString('ru-RU')} ₽</div>
                      <button
                        className="cross-btn"
                        type="button"
                        aria-label="Удалить товар"
                        disabled={isOrderLoading}
                        onClick={()=> handleRemoveFromCartButtonClick(cartItem)}
                      >
                        <svg width="10" height="10" aria-hidden="true">
                          <use xlinkHref="#icon-close"></use>
                        </svg>
                      </button>
                    </li>
                  );
                })}

              </ul>

              <CartSummary/>
            </div>
          </section>
        </div>
        <RemoveCameraFromCartModal
          isOpen = {isOpenRemoveCameraFromCartModal}
          onModalClose={handleRemoveFromCartModalClose}
        />
        <OrderSuccessModal
          isOpen = {isOrderSuccessModalOpen}
          onModalClose={handleOrderSuccessModalClose}
        />

      </main>
      <Footer/>
    </div>
  );
}

export default CartPage;
