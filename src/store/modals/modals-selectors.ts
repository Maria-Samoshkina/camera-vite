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

export const getIsAddCameraToCartSuccessModalOpen = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.isAddCameraToCartSuccessModalOpen
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

export const getIsAddNewReviewModalOpen = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.isAddNewReviewModalOpen
);

export const getIsReviewSuccessModalOpen = createSelector(
  [getModalsSlice],
  (state: ModalsState)=> state.isReviewSuccessModalOpen
);
