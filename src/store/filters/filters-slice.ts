import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace} from '../../const';
import { FiltersState } from '../../types/state';


const initialState: FiltersState = {
  camerasCategory: null,
  camerasTypes: [],
  camerasLevels: []
};

export const filtersSlice = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {
    changeCamerasCategory: (state, action: PayloadAction<string | null>)=> {
      const selectedCategory = action.payload;
      state.camerasCategory = selectedCategory;

      if (selectedCategory === 'Видеокамера') {
        state.camerasTypes = state.camerasTypes.filter(
          (type) => type !== 'Плёночная' && type !== 'Моментальная'
        );
      }
    },
    changeCamerasTypes: (state, action: PayloadAction<string>) => {
      const selectedCamerasType = action.payload;
      if (state.camerasTypes.includes(selectedCamerasType)) {
        state.camerasTypes = state.camerasTypes.filter((type)=> type !== selectedCamerasType);
      } else {
        state.camerasTypes.push(selectedCamerasType);
      }
    },
    changeCamerasLevel: (state, action: PayloadAction<string>)=> {
      const selectedLevel = action.payload;
      if(state.camerasLevels.includes(selectedLevel)) {
        state.camerasLevels = state.camerasLevels.filter((level)=> level !== selectedLevel);
      } else {
        state.camerasLevels.push(selectedLevel);
      }
    },
    resetFilters:(state)=> {
      state.camerasCategory = null;
      state.camerasTypes = [];
      state.camerasLevels = [];
    }
  },
});

export const {changeCamerasTypes, changeCamerasCategory, changeCamerasLevel, resetFilters } = filtersSlice.actions;
