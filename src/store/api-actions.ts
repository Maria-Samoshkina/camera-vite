import { createAsyncThunk } from '@reduxjs/toolkit';
import { Cameras, DetailedCamera, DetailedCameras, PromoCameras } from '../types/camera';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { ApiRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { Reviews } from '../types/review';
import { setError } from './error/error-slice';
import { Discount } from '../types/coupon';
import { OrderData } from '../types/order';

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

export const fetchSimilarCamerasAction = createAsyncThunk<DetailedCameras, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchSimilarCameras',
  async (id, { extra: api})=> {

    const {data} = await api.get<DetailedCameras>(`${ApiRoute.Cameras}/${id}/similar`);

    return data;

  }
);

export const fetchPromoCamerasAction = createAsyncThunk<PromoCameras, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchPromoCameras',
  async (_arg, {extra: api})=> {
    const {data} = await api.get<PromoCameras>(ApiRoute.Promo);
    return data;

  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchReview',
  async (id, { extra: api})=> {
    const {data: reviews} = await api.get<Reviews>(`${ApiRoute.Cameras}/${id}/reviews`);
    return reviews;

  }
);


export const clearErrorAction = createAsyncThunk(
  'ERROR/clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
  }
);

export const checkCouponAction = createAsyncThunk<{ coupon: string; discount: Discount }, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'CART/checkCoupon',
  async (coupon, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Discount>(ApiRoute.Coupon, { coupon });
      return { coupon, discount: data };
    } catch (error) {
      return rejectWithValue('Invalid coupon');
    }
  }
);

export const createOrderAction = createAsyncThunk<
  void,
  OrderData,
  { dispatch: AppDispatch;
    extra: AxiosInstance; }
>(
  'order/create',
  async (orderData, { extra: api }) => {
    await api.post(ApiRoute.Order, orderData);

  }
);
