import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CAMERA_CATEGORY_VIDEO, CAMERA_TYPE_FILM, CAMERA_TYPE_INSTANT, NameSpace, SortDirection, SortType} from '../../const';
import { FiltersState } from '../../types/state';


const initialState: FiltersState = {
  camerasCategory: null,
  camerasTypes: [],
  camerasLevels: [],
  priceFrom: null,
  priceTo: null,
  sortType: SortType.price,
  sortDirection: SortDirection.ascending
};

export const filtersSlice = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {
    changeCamerasCategory: (state, action: PayloadAction<string | null>)=> {
      const selectedCategory = action.payload;
      state.camerasCategory = selectedCategory;

      if (selectedCategory === CAMERA_CATEGORY_VIDEO) {
        state.camerasTypes = state.camerasTypes.filter(
          (type) => type !== CAMERA_TYPE_FILM && type !== CAMERA_TYPE_INSTANT
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
    changePriceFrom: (state, action: PayloadAction<number | null>)=> {
      const selectedPriceFrom = action.payload;
      state.priceFrom = selectedPriceFrom;
    },
    changePriceTo: (state, action: PayloadAction<number | null>)=> {
      const selectedPriceTo = action.payload;
      state.priceTo = selectedPriceTo;
    },
    resetFilters:(state)=> {
      state.camerasCategory = null;
      state.camerasTypes = [];
      state.camerasLevels = [];
      state.priceFrom = null;
      state.priceTo = null;
    },

    changeSortType: (state, action: PayloadAction<string>)=> {
      state.sortType = action.payload;
    },
    changeSortDirection: (state, action: PayloadAction<string>)=> {
      state.sortDirection = action.payload;
    }
  },
});

export const {changeCamerasTypes,
  changeCamerasCategory,
  changeCamerasLevel,
  changePriceFrom,
  changePriceTo,
  resetFilters,
  changeSortDirection,
  changeSortType
} = filtersSlice.actions;
