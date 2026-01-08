import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY, NameSpace } from '../../const';
import { CartState } from '../../types/state';
import { Camera, CartItem } from '../../types/camera';
import { getCartItemsFromStorage, saveCartItemsFromStorage } from '../../utils/cart-storage/cart-storage';
import { createOrderAction } from '../api-actions';

const initialState: CartState = {
  camerasInCart: getCartItemsFromStorage(),
};


export const cartSlice = createSlice ({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Camera>) => {

      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.id);
      if(existingItem){
        if(existingItem.quantity >= MAX_CART_QUANTITY) {
          return;
        }
        existingItem.quantity += 1;
      } else {
        state.camerasInCart.push({
          camera:action.payload,
          quantity:1
        });
      }
      saveCartItemsFromStorage(state.camerasInCart);
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.camera.id);
      if (existingItem && existingItem.quantity > MIN_CART_QUANTITY){
        existingItem.quantity -= 1;
      }
      saveCartItemsFromStorage(state.camerasInCart);
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.camera.id);
      if (existingItem && existingItem.quantity < MAX_CART_QUANTITY){
        existingItem.quantity += 1;
      }
      saveCartItemsFromStorage(state.camerasInCart);
    },
    changeQuantity: (state, action: PayloadAction<{ cameraId: number; newQuantity: number }>) => {
      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.cameraId);
      if(existingItem) {
        if(action.payload.newQuantity < MIN_CART_QUANTITY || action.payload.newQuantity > MAX_CART_QUANTITY) {
          return;
        }
        existingItem.quantity = action.payload.newQuantity;
      }
      saveCartItemsFromStorage(state.camerasInCart);
    },
    deleteFromCart: (state, action: PayloadAction<CartItem>) => {

      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.camera.id);
      if(existingItem){
        state.camerasInCart = state.camerasInCart.filter((cameraInCart)=> cameraInCart.camera.id !== action.payload.camera.id);
      }
      saveCartItemsFromStorage(state.camerasInCart);
    },
  },
  extraReducers(builder){
    builder
      .addCase(createOrderAction.fulfilled, (state)=> {
        state.camerasInCart = [];
        saveCartItemsFromStorage(state.camerasInCart);

      });

  }

});

export const { addToCart, decreaseQuantity, increaseQuantity, changeQuantity, deleteFromCart } = cartSlice.actions;
