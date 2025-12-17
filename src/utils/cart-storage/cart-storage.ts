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
