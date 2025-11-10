import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FiltersState, State } from '../../types/state';

const getFiltersSlice = (state: Pick<State, NameSpace.Filters>): FiltersState => state[NameSpace.Filters];

export const getCamerasCategory = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.camerasCategory
);

export const getCamerasTypes = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.camerasTypes
);

export const getCamerasLevels = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.camerasLevels
);


