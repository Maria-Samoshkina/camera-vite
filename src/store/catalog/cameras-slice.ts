import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CamerasState } from '../../types/state';
import { fetchCamerasAction } from '../api-actions';

const initialState: CamerasState = {
  cameras: [],
  isCamerasDataLoading: false,
  isCamerasFetchingError: false
};


export const camerasSlice = createSlice ({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchCamerasAction.pending, (state)=> {
        state.isCamerasDataLoading = true;
        state.isCamerasFetchingError = false;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action)=> {
        state.cameras = action.payload;
        state.isCamerasDataLoading = false;
        state.isCamerasFetchingError = false;
      })
      .addCase(fetchCamerasAction.rejected, (state)=> {
        state.isCamerasDataLoading = false;
        state.isCamerasFetchingError = true;
      });

  }
});
