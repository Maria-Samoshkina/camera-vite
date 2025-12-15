import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ModalsState} from '../../types/state';
import { Camera, CartItem } from '../../types/camera';


const initialState: ModalsState = {
  isAddToCartModalOpen: false,
  selectedCameraForCart:  null,
  isAddCameraSuccessModalOpen: false,
  selectedCameraForRemoveFromCart: null,
  isRemoveCameraFromCartOpen: false
};

export const modalsSlice = createSlice({
  name: NameSpace.Modals,
  initialState,
  reducers: {
    openAddToCartModal: (state)=> {
      state.isAddToCartModalOpen = true;
    },
    closeAddToCartModal: (state)=> {
      state.isAddToCartModalOpen = false;
    },
    setSelectedCameraForCart: (state, action: PayloadAction<Camera>) => {
      state.selectedCameraForCart = action.payload;
    },
    openAddCameraSuccessModal: (state)=> {
      state.isAddCameraSuccessModalOpen = true;
    },
    closeAddCameraSuccessModal: (state)=> {
      state.isAddCameraSuccessModalOpen = false;
    },
    setSelectedCameraForRemoveFromCart: (state, action: PayloadAction<CartItem>) => {
      state.selectedCameraForRemoveFromCart = action.payload;
    },
    openRemoveFromCartModal: (state)=> {
      state.isRemoveCameraFromCartOpen = true;
    },
    closeRemoveFromCartModal: (state)=> {
      state.isRemoveCameraFromCartOpen = false;
    },

  }});

export const {openAddToCartModal,
  closeAddToCartModal,
  setSelectedCameraForCart,
  openAddCameraSuccessModal,
  closeAddCameraSuccessModal,
  setSelectedCameraForRemoveFromCart,
  openRemoveFromCartModal,
  closeRemoveFromCartModal
} = modalsSlice.actions;
