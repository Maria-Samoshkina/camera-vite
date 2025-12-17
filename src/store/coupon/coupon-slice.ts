import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CouponState } from '../../types/state';
import { checkCouponAction } from '../api-actions';

const initialState: CouponState = {
  coupon: null,
  discount: 0,
  isCouponValid: null,
  isCouponChecking: false,
  isCouponFetchingError: false
};


export const couponSlice = createSlice ({
  name: NameSpace.Coupon,
  initialState,
  reducers: {
    applyCoupon: (state, action: PayloadAction<number>)=> {
      state.isCouponValid = true;
      state.discount = action.payload;
    },

    resetCoupon: (state)=> {
      state.coupon = null;
      state.isCouponValid = null;
      state.discount = 0;
    },
  },
  extraReducers(builder){
    builder
      .addCase(checkCouponAction.pending, (state)=> {
        state.isCouponChecking = true;
        state.isCouponFetchingError = false;
      })
      .addCase(checkCouponAction.fulfilled, (state, action)=> {
        state.coupon = action.payload.coupon;
        state.discount = action.payload.discount;
        state.isCouponValid = true;
        state.isCouponChecking = false;
        state.isCouponFetchingError = false;
      })
      .addCase(checkCouponAction.rejected, (state)=> {
        state.isCouponValid = false;
        state.isCouponChecking = false;
        state.isCouponFetchingError = true;
      });

  }
});

export const {applyCoupon, resetCoupon} = couponSlice.actions;
