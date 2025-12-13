import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CartState } from '../../types/state';
import { Camera } from '../../types/camera';

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

  },

});

export const { addToCart } = cartSlice.actions;
