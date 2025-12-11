import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FiltersState, State } from '../../types/state';
import { getCameras } from '../catalog/cameras-selectors';
import { getFilteredCamerasUtils, getFilteredCamerasWithoutPriceUtils } from '../../utils/filters/filters';
import { sortCameras } from '../../utils/sort/sort';

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

export const getPriceFrom = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.priceFrom
);

export const getPriceTo = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.priceTo
);

export const getSortType = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.sortType
);

export const getSortDirection = createSelector(
  [getFiltersSlice],
  (state: FiltersState) => state.sortDirection
);

export const getFilteredCameras = createSelector(
  [
    getCameras,
    getCamerasCategory,
    getCamerasTypes,
    getCamerasLevels,
    getPriceFrom,
    getPriceTo,
  ],
  (cameras, category, types, levels, priceFrom, priceTo) =>
    getFilteredCamerasUtils(cameras, category, types, levels, priceFrom, priceTo)
);

export const getFilteredSortedCameras = createSelector(
  [getFilteredCameras,
    getSortType,
    getSortDirection
  ],
  (filteredCameras, sortType, sortDirection)=>
    sortCameras(filteredCameras, sortType,sortDirection)
);

export const getFilteredCamerasWithoutPrice = createSelector (
  [
    getCameras,
    getCamerasCategory,
    getCamerasTypes,
    getCamerasLevels,
  ],
  (cameras, category, types, levels) =>
    getFilteredCamerasWithoutPriceUtils(cameras, category, types, levels)

);
