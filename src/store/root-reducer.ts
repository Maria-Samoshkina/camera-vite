import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasSlice } from './catalog/cameras-slice';
import { detailedCameraSlice } from './detailed-camera/detailed-camera-slice';
import { similarCamerasSlice } from './similar-cameras/similar-cameras-slice';


export const rootReducer = combineReducers(
  {
    [NameSpace.Cameras]:camerasSlice.reducer,
    [NameSpace.DetailedCamera]:detailedCameraSlice.reducer,
    [NameSpace.SimilarCameras]:similarCamerasSlice.reducer,

  }
);
