import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { CamerasState } from '../../types/state';

const getCamerasSlice = (state: Pick<State, NameSpace.Cameras>): CamerasState => state[NameSpace.Cameras];

export const getOffers = createSelector(
  [getCamerasSlice],
  (state: CamerasState) => state.cameras
);

export const getIsCamerasFetchingError = createSelector(
  [getCamerasSlice],
  (state: CamerasState) => state.isCamerasFetchingError
);

export const getIsCamerasDataLoading = createSelector(
  [getCamerasSlice],
  (state: CamerasState) => state.isCamerasDataLoading
);
