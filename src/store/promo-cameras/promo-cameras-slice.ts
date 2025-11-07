import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PromoCamerasState } from '../../types/state';
import { fetchPromoCamerasAction } from '../api-actions';


const initialState: PromoCamerasState = {
  promoCameras: [],
  isPromoCamerasLoading: false,
  isPromoCamerasFetchingError: false
};


export const promoCamerasSlice = createSlice ({
  name: NameSpace.PromoCameras,
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchPromoCamerasAction.pending, (state)=> {
        state.isPromoCamerasLoading = true;
      })
      .addCase(fetchPromoCamerasAction.fulfilled, (state, action)=> {
        state.promoCameras = action.payload;
        state.isPromoCamerasFetchingError = false;
      })
      .addCase(fetchPromoCamerasAction.rejected, (state)=> {
        state.isPromoCamerasLoading = false;
        state.isPromoCamerasFetchingError = true;
      });
  }
});
