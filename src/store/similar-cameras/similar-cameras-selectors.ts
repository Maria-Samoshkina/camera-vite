import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {SimilarCamerasState, State} from '../../types/state';

const getSimilarCamerasSlice = (state: Pick<State, NameSpace.SimilarCameras>): SimilarCamerasState => state[NameSpace.SimilarCameras];

export const getSimilarCameras = createSelector(
  [getSimilarCamerasSlice],
  (state: SimilarCamerasState) => state.similarCameras
);

export const getIsSimilarCamerasFetchingError = createSelector(
  [getSimilarCamerasSlice],
  (state: SimilarCamerasState) => state.isSimilarCamerasFetchingError
);

export const getIsSimilarCamerasDataLoading = createSelector(
  [getSimilarCamerasSlice],
  (state: SimilarCamerasState) => state.isSimilarCamerasLoading
);
