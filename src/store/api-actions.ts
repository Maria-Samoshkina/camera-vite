import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cameras } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../const';

export const fetchCamerasAction = createAsyncThunk<Cameras, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchCameras',
  async (_arg, {extra: api})=> {
    const {data} = await api.get<Cameras>(ApiRoute.Cameras);
    console.log(data);
    return data;


  }
);
