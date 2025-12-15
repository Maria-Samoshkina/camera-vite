import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CartState } from '../../types/state';
import { Camera, CartItem } from '../../types/camera';

const initialState: CartState = {
  camerasInCart: [],
};


export const cartSlice = createSlice ({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Camera>) => {

      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.id);
      if(existingItem){
        existingItem.quantity += 1;
      } else {
        state.camerasInCart.push({
          camera:action.payload,
          quantity:1
        });
      }
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.camera.id);
      if (existingItem && existingItem.quantity > 0){
        existingItem.quantity -= 1;
      }
    },
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.camera.id);
      if (existingItem && existingItem.quantity < 9){
        existingItem.quantity += 1;
      }
    },
    changeQuantity: (state, action: PayloadAction<{ cameraId: number; newQuantity: number }>) => {
      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.cameraId);
      if(existingItem) {
        existingItem.quantity = action.payload.newQuantity;
      }
    },
    deleteFromCart: (state, action: PayloadAction<CartItem>) => {

      const existingItem = state.camerasInCart.find((cameraInCart)=> cameraInCart.camera.id === action.payload.camera.id);
      if(existingItem){
        state.camerasInCart = state.camerasInCart.filter((cameraInCart)=> cameraInCart.camera.id !== action.payload.camera.id);
      }
    },
  },

});

export const { addToCart, decreaseQuantity, increaseQuantity, changeQuantity, deleteFromCart } = cartSlice.actions;
