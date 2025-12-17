import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import {OrderState } from '../../types/state';
import { createOrderAction } from '../api-actions';

const initialState: OrderState = {
  isOrderLoading: false,
  isOrderSuccess: false,
  isOrderError: false
};


export const orderSlice = createSlice ({
  name: NameSpace.Order,
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(createOrderAction.pending, (state)=> {
        state.isOrderLoading = true;
        state.isOrderSuccess = false;
        state.isOrderError = false;

      })
      .addCase(createOrderAction.fulfilled, (state)=> {
        state.isOrderLoading = false;
        state.isOrderSuccess = true;
        state.isOrderError = false;
      })
      .addCase(createOrderAction.rejected, (state)=> {
        state.isOrderLoading = false;
        state.isOrderSuccess = false;
        state.isOrderError = true;
      });

  }
});
