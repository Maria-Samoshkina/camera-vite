import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './catalog/cameras-slice';
import { detailedCameraSlice } from './detailedCamera/detailed-camera-slice';


export const rootReducer = combineReducers(
  {
    [NameSpace.Cameras]:camerasSlice.reducer,
    [NameSpace.DetailedCamera]:detailedCameraSlice.reducer

  }
);
