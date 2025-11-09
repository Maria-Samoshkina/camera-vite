import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FiltersState, State } from '../../types/state';

const getFiltersSlice = (state: Pick<State, NameSpace.Filters>): FiltersState => state[NameSpace.Filters];

export const getCamerasCategory = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.camerasCategory
);
export const getCamerasLevel = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.camerasLevel
);

export const getCamerasType = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.camerasType
);
