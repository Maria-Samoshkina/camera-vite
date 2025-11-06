import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cameras, DetailedCamera } from '../types/camera';
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
    return data;


  }
);

export const fetchDetailedCameraAction = createAsyncThunk<DetailedCamera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchDetailedCamera',
  async (id, { extra: api})=> {

    const {data} = await api.get<DetailedCamera>(`${ApiRoute.Cameras}/${id}`);

    return data;

  }
);

