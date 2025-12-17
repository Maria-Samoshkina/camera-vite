import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OrderState, State} from '../../types/state';


const getOrderSlice = (state: Pick<State, NameSpace.Order>): OrderState => state[NameSpace.Order];

export const getIsOrderLoading = createSelector(
  [getOrderSlice],
  (state: OrderState) => state.isOrderLoading
);

export const getIsOrderSuccess = createSelector(
  [getOrderSlice],
  (state: OrderState) => state.isOrderSuccess
);

export const getIsOrderError = createSelector(
  [getOrderSlice],
  (state: OrderState) => state.isOrderError
);

