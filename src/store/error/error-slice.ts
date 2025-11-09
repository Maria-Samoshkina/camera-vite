import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ErrorState } from '../../types/state';

const initialState: ErrorState = {
  error: null,
};

export const errorSlice = createSlice({
  name: NameSpace.Error,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string|null>)=> {
      state.error = action.payload;
    },
  },
});

export const {setError } = errorSlice.actions;
