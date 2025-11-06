import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './catalog/catalog-slice';


export const rootReducer = combineReducers(
  {
    [NameSpace.Cameras]:camerasSlice.reducer,

  }
);
