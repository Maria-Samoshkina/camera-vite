import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace} from '../../const';
import { FiltersState } from '../../types/state';


const initialState: FiltersState = {
  camerasType: null,
  camerasCategory: null,
  camerasLevel: null
};

export const filtersSlice = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {
    changeCamerasType: (state, action: PayloadAction<string>) => {
      state.camerasType = action.payload;
    },
    changeCamerasCategory: (state, action: PayloadAction<string>)=> {
      state.camerasCategory = action.payload;
    },
    changeCamerasLevel: (state, action: PayloadAction<string>)=> {
      state.camerasLevel = action.payload;
    },
  },
});

export const {changeCamerasType, changeCamerasCategory, changeCamerasLevel } = filtersSlice.actions;
