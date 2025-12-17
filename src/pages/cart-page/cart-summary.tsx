import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCoupon, getDiscount, getIsCouponChecking, getIsCouponFetchingError, getIsCouponValid } from '../../store/coupon/coupon-selectors';
import { FormEvent, useEffect, useState } from 'react';
import { checkCouponAction, createOrderAction } from '../../store/api-actions';
import { getCartItemsFromStorage } from '../../utils/cart-storage/cart-storage';
import { OrderData } from '../../types/order';
import { resetCoupon } from '../../store/coupon/coupon-slice';

function CartSummary (): JSX.Element {

  const [couponInput, setCouponInput] = useState('');

  const coupon = useAppSelector(getCoupon);
  const discount = useAppSelector(getDiscount);
  const isCouponValid = useAppSelector(getIsCouponValid);
  const isCouponChecking = useAppSelector(getIsCouponChecking);
  const isCouponFetchingError = useAppSelector(getIsCouponFetchingError);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (isCouponFetchingError) {
      toast.error('Не удалось применить промокод');
    }
  }, [isCouponFetchingError]);

  useEffect(() => {
    if (coupon && isCouponValid === true) {
      setCouponInput(coupon);
    }
  }, [coupon, isCouponValid]);


  const handleCouponChange = (couponOfUserInput: string)=>{
    const trimmedValue = couponOfUserInput.trim();
    setCouponInput(trimmedValue);

  };


  const handleCouponSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (couponInput && !isCouponChecking) {
      dispatch(checkCouponAction(couponInput));
    }
  };

  const camerasInCart = getCartItemsFromStorage();

  const total = camerasInCart.reduce(
    (sum, item) => sum + item.camera.price * item.quantity,
    0
  );

  const summaryOfDiscount = discount * total / 100;

  const summaryForPay = total - summaryOfDiscount;

  const camerasIds = camerasInCart.map((cameraInCart) => cameraInCart.camera.id);


  const handleOrderButtonClick = (orderData: OrderData)=> {
    dispatch(createOrderAction(orderData));
    dispatch(resetCoupon());
    setCouponInput('');

  };


  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p
          className="title title--h4"
        >Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <form
            action="#"
            onSubmit={handleCouponSubmit}

          >
            <div className={`custom-input ${isCouponValid === false ? 'is-invalid' : ''} ${isCouponValid === true ? 'is-valid' : ''}`}>
              <label><span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  value={couponInput || ''}
                  onChange={(evt)=> handleCouponChange(evt.target.value)}
                  disabled = {isCouponChecking || isCouponValid === true}

                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="submit"
              disabled={!couponInput || isCouponChecking || (isCouponValid === true)}
            >
              {isCouponChecking ? 'Проверка...' : 'Применить'}
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{total} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">{summaryOfDiscount} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{summaryForPay} ₽</span></p>
        <button
          className="btn btn--purple"
          type="submit"
          disabled={camerasInCart.length === 0}
          onClick={()=> handleOrderButtonClick({camerasIds, coupon})}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
