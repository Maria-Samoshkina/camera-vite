import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DetailedCameraState } from '../../types/state';
import { fetchDetailedCameraAction } from '../api-actions';


const initialState: DetailedCameraState = {
  detailedCamera: null,
  isDetailedCameraLoading: true,
  isDetailedCameraFetchingError: false
};

export const detailedCameraSlice = createSlice({
  name: NameSpace.DetailedCamera,
  initialState,
  reducers: {
    dropCamera: (state)=> {
      state.detailedCamera = null;
    }
  },
  extraReducers (builder){
    builder
      .addCase(fetchDetailedCameraAction.pending, (state)=> {
        state.isDetailedCameraLoading = true;
        state.isDetailedCameraFetchingError = false;
        state.detailedCamera = null;
      })
      .addCase(fetchDetailedCameraAction.fulfilled, (state, action)=> {
        state.detailedCamera = action.payload;
        state.isDetailedCameraLoading = false;
        state.isDetailedCameraFetchingError = false;
      })
      .addCase(fetchDetailedCameraAction.rejected, (state)=> {
        state.isDetailedCameraFetchingError = true;
        state.isDetailedCameraLoading = false;
      });

  }
});

export const {dropCamera} = detailedCameraSlice.actions;
