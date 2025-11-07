import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {DetailedCameraState, State} from '../../types/state';


const getDetailedCameraSlice = (state: Pick<State, NameSpace.DetailedCamera>): DetailedCameraState => state[NameSpace.DetailedCamera];

export const getDetailedCamera = createSelector(
  [getDetailedCameraSlice],
  (state: DetailedCameraState) => state.detailedCamera
);

export const getIsDetailedCameraFetchingError = createSelector(
  [getDetailedCameraSlice],
  (state: DetailedCameraState) => state.isDetailedCameraFetchingError
);

export const getIsDetailedCameraLoading = createSelector(
  [getDetailedCameraSlice],
  (state: DetailedCameraState) => state.isDetailedCameraLoading
);
