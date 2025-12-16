import { CartItems } from '../../types/camera';

export const AUTH_CART_KEY_NAME = 'camera-shop-cart';


export const getCartItemsFromStorage = (): CartItems => {
  const cartItems = localStorage.getItem(AUTH_CART_KEY_NAME);
  return cartItems ? JSON.parse(cartItems) as CartItems : [];
};

export const saveCartItemsFromStorage = (cartItems: CartItems): void => {
  localStorage.setItem(AUTH_CART_KEY_NAME, JSON.stringify(cartItems));
};

export const dropCartItemsFromStorage = (): void => {
  localStorage.removeItem(AUTH_CART_KEY_NAME);
};


export const AUTH_COUPON_KEY_NAME = 'camera-shop-coupon';

export const getCouponFromStorage = (): string | null => {
  const coupon = localStorage.getItem(AUTH_COUPON_KEY_NAME);
  return coupon;
};

export const saveCouponFromStorage = (coupon: string): void => {
  localStorage.setItem(AUTH_COUPON_KEY_NAME, coupon);
};

export const dropCouponFromStorage = (): void => {
  localStorage.removeItem(AUTH_COUPON_KEY_NAME);
};

export const AUTH_DISCOUNT_KEY_NAME = 'camera-shop-discount';

export const getDiscountFromStorage = (): number => {
  const discount = localStorage.getItem(AUTH_DISCOUNT_KEY_NAME);
  return discount ? Number(discount) : 0;
};

export const saveDiscountFromStorage = (discount: number): void => {
  localStorage.setItem(AUTH_DISCOUNT_KEY_NAME, discount.toString());
};

export const dropDiscountFromStorage = (): void => {
  localStorage.removeItem(AUTH_DISCOUNT_KEY_NAME);
};
