import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ModalsState, State} from '../../types/state';

const getModalsSlice = (state:Pick<State, NameSpace.Modals>): ModalsState => state[NameSpace.Modals];

export const getIsAddToCartModalOpen = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.isAddToCartModalOpen
);

export const getSelectedCameraForCart = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.selectedCameraForCart
);

export const getIsAddCameraSuccessModalOpen = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.isAddCameraSuccessModalOpen
);

export const getSelectedCameraForRemoveFromCart = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.selectedCameraForRemoveFromCart
);

export const getIsRemoveCameraFromCartOpen = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.isRemoveCameraFromCartOpen
);

export const getIsOrderSuccessModalOpen = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.isOrderSuccessModalOpen
);
