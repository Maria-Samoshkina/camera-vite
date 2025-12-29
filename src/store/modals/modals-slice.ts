import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ModalsState} from '../../types/state';
import { Camera, CartItem } from '../../types/camera';
import { createOrderAction } from '../api-actions';


const initialState: ModalsState = {
  isAddToCartModalOpen: false,
  selectedCameraForCart:  null,
  isAddCameraToCartSuccessModalOpen: false,
  selectedCameraForRemoveFromCart: null,
  isRemoveCameraFromCartOpen: false,
  isOrderSuccessModalOpen:false,
  isAddNewReviewModalOpen: false,
  isReviewSuccessModalOpen: false
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
    openAddCameraToCartSuccessModal: (state)=> {
      state.isAddCameraToCartSuccessModalOpen = true;
    },
    closeAddCameraToCartSuccessModal: (state)=> {
      state.isAddCameraToCartSuccessModalOpen = false;
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
    closeOrderSuccessModal: (state)=> {
      state.isOrderSuccessModalOpen = false;
    },
    openAddNewReviewModal:(state)=>{
      state.isAddNewReviewModalOpen = true;
    },
    closeAddNewReviewModal: (state)=>{
      state.isAddNewReviewModalOpen = false;
    },
    openReviewSuccessModal:(state)=>{
      state.isReviewSuccessModalOpen = true;
    },
    closeReviewSuccessModal: (state)=>{
      state.isReviewSuccessModalOpen = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAction.fulfilled, (state) => {
        state.isOrderSuccessModalOpen = true;
      })
      .addCase(createOrderAction.rejected, (state) => {
        state.isOrderSuccessModalOpen = true;
      });
  }

});

export const {openAddToCartModal,
  closeAddToCartModal,
  setSelectedCameraForCart,
  openAddCameraToCartSuccessModal,
  closeAddCameraToCartSuccessModal,
  setSelectedCameraForRemoveFromCart,
  openRemoveFromCartModal,
  closeRemoveFromCartModal,
  closeOrderSuccessModal,
  openAddNewReviewModal,
  closeAddNewReviewModal,
  openReviewSuccessModal,
  closeReviewSuccessModal
} = modalsSlice.actions;
