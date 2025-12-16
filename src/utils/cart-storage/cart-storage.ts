import { CartItems } from '../../types/camera';

export const AUTH_CART_KEY_NAME = 'camera-shop-cart';


export const getCartItems = (): CartItems => {
  const cartItems = localStorage.getItem(AUTH_CART_KEY_NAME);
  return cartItems ? JSON.parse(cartItems) as CartItems : [];
};

export const saveCartItems = (cartItems: CartItems): void => {
  localStorage.setItem(AUTH_CART_KEY_NAME, JSON.stringify(cartItems));
};

export const dropCartItems = (): void => {
  localStorage.removeItem(AUTH_CART_KEY_NAME);
};
