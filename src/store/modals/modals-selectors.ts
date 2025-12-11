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

