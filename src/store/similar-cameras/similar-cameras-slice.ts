import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { SimilarCamerasState } from '../../types/state';
import { fetchSimilarCamerasAction } from '../api-actions';


const initialState: SimilarCamerasState = {
  similarCameras: [],
  isSimilarCamerasLoading: false,
  isSimilarCamerasFetchingError: false
};


export const similarCamerasSlice = createSlice ({
  name: NameSpace.SimilarCameras,
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchSimilarCamerasAction.pending, (state)=> {
        state.isSimilarCamerasLoading = true;
        state.isSimilarCamerasFetchingError = false;

      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action)=> {
        state.similarCameras = action.payload;
        state.isSimilarCamerasLoading = false;
        state.isSimilarCamerasFetchingError = false;

      })
      .addCase(fetchSimilarCamerasAction.rejected, (state)=> {
        state.isSimilarCamerasLoading = false;
        state.isSimilarCamerasFetchingError = true;
      });

  }
});
