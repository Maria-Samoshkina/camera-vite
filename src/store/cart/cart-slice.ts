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
      state.camerasInCart.push(action.payload);
    },

  },

});

export const { addToCart } = cartSlice.actions;
