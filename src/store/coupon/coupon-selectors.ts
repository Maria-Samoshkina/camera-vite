import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CouponState, State} from '../../types/state';

const getCouponSlice = (state: Pick<State, NameSpace.Coupon>): CouponState => state[NameSpace.Coupon];

export const getCoupon = createSelector(
  [getCouponSlice],
  (state: CouponState) => state.coupon
);

export const getDiscount = createSelector(
  [getCouponSlice],
  (state: CouponState) => state.discount
);

export const getIsCouponChecking = createSelector(
  [getCouponSlice],
  (state: CouponState) => state.isCouponChecking
);

export const getIsCouponFetchingError = createSelector(
  [getCouponSlice],
  (state: CouponState) => state.isCouponFetchingError
);

export const getIsCouponValid = createSelector(
  [getCouponSlice],
  (state: CouponState) => state.isCouponValid
);
