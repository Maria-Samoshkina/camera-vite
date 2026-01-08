import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeQuantity } from '../../store/cart/cart-slice';
import { getIsOrderLoading } from '../../store/order/order-selectors';
import { CartItem } from '../../types/camera';

type QuantityControlProps = {
cartItem: CartItem;
onDecreaseButtonClick: (itemInCart: CartItem)=> void;
onIncreaseButtonClick: (itemInCart: CartItem)=> void;

}

function QuantityControl (props: QuantityControlProps): JSX.Element {

  const isOrderLoading = useAppSelector(getIsOrderLoading);
  const dispatch = useAppDispatch();

  const {cartItem, onDecreaseButtonClick, onIncreaseButtonClick} = props;

  return (
    <div className="quantity">

      <button
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
        disabled={isOrderLoading || cartItem.quantity <= MIN_CART_QUANTITY}
        onClick={()=> {
          onDecreaseButtonClick(cartItem);
        }}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <label className="visually-hidden" htmlFor={`counter${cartItem.camera.id}`}>
        Количество товара
      </label>
      <input
        type="number"
        id={`counter${cartItem.camera.id}`}
        value={cartItem.quantity}
        min={MIN_CART_QUANTITY}
        max={MAX_CART_QUANTITY}
        aria-label="количество товара"
        disabled={isOrderLoading}
        onFocus={(evt) => evt.currentTarget.select()}
        onChange={(evt) => {
          const value = Number(evt.target.value);
          if (!isNaN(value) && value >= MIN_CART_QUANTITY && value <= MAX_CART_QUANTITY) {
            dispatch(changeQuantity({ cameraId: cartItem.camera.id, newQuantity: value }));
          }
        }}
        onBlur={(evt) => {
          const value = Number(evt.target.value);
          if (isNaN(value) || value < MIN_CART_QUANTITY) {
            dispatch(changeQuantity({ cameraId: cartItem.camera.id, newQuantity: MIN_CART_QUANTITY }));
          } else if (value > MAX_CART_QUANTITY) {
            dispatch(changeQuantity({ cameraId: cartItem.camera.id, newQuantity: MAX_CART_QUANTITY }));
          }
        }}
      />


      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
        disabled={isOrderLoading || cartItem.quantity >= MAX_CART_QUANTITY}
        onClick={()=> onIncreaseButtonClick(cartItem)}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default QuantityControl;
