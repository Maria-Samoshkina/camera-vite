import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {PromoCamerasState, State} from '../../types/state';


const getPromoCamerasSlice = (state: Pick<State, NameSpace.PromoCameras>): PromoCamerasState => state[NameSpace.PromoCameras];

export const getPromoCameras = createSelector(
  [getPromoCamerasSlice],
  (state: PromoCamerasState) => state.promoCameras
);

export const getIsPromoCamerasFetchingError = createSelector(
  [getPromoCamerasSlice],
  (state: PromoCamerasState) => state.isPromoCamerasFetchingError
);

export const getIsPromoCamerasDataLoading = createSelector(
  [getPromoCamerasSlice],
  (state: PromoCamerasState) => state.isPromoCamerasLoading
);
