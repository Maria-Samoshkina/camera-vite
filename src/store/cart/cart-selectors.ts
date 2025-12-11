import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CartState, State} from '../../types/state';

const getCartSlice = (state: Pick<State, NameSpace.Cart>): CartState => state[NameSpace.Cart];

export const getCamerasInCart = createSelector(
  [getCartSlice],
  (state: CartState) => state.camerasInCart
);
