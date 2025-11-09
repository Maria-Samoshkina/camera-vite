import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './catalog/cameras-slice';
import { detailedCameraSlice } from './detailed-camera/detailed-camera-slice';
import { similarCamerasSlice } from './similar-cameras/similar-cameras-slice';
import { promoCamerasSlice } from './promo-cameras/promo-cameras-slice';
import { errorSlice } from './error/error-slice';


export const rootReducer = combineReducers(
  {
    [NameSpace.Cameras]:camerasSlice.reducer,
    [NameSpace.DetailedCamera]:detailedCameraSlice.reducer,
    [NameSpace.SimilarCameras]:similarCamerasSlice.reducer,
    [NameSpace.PromoCameras]:promoCamerasSlice.reducer,
    [NameSpace.Error]:errorSlice.reducer,

  }
);
