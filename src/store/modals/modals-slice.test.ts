import { modalsSlice, openAddToCartModal, closeAddToCartModal, setSelectedCameraForCart, openAddCameraToCartSuccessModal, closeAddCameraToCartSuccessModal, setSelectedCameraForRemoveFromCart, openRemoveFromCartModal, closeRemoveFromCartModal, closeOrderSuccessModal, openAddNewReviewModal, closeAddNewReviewModal, openReviewSuccessModal, closeReviewSuccessModal } from './modals-slice';
import { ModalsState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';
import { CartItem } from '../../types/camera';
import { createOrderAction } from '../api-actions';

describe('modalsSlice', () => {
  const mockCamera = makeFakeCamera();
  const mockCartItem: CartItem = {
    camera: mockCamera,
    quantity: 2,
  };

  const initialState: ModalsState = {
    isAddToCartModalOpen: false,
    selectedCameraForCart: null,
    isAddCameraToCartSuccessModalOpen: false,
    selectedCameraForRemoveFromCart: null,
    isRemoveCameraFromCartOpen: false,
    isOrderSuccessModalOpen: false,
    isAddNewReviewModalOpen: false,
    isReviewSuccessModalOpen: false
  };

  describe('Initial state', () => {
    it('should handle initial state', () => {
      expect(modalsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
    });
  });

  describe('Add to Cart Modal', () => {
    it('should handle openAddToCartModal', () => {
      const state = modalsSlice.reducer(initialState, openAddToCartModal());
      expect(state.isAddToCartModalOpen).toBe(true);
    });

    it('should handle closeAddToCartModal', () => {
      const stateWithOpen: ModalsState = { ...initialState, isAddToCartModalOpen: true };
      const state = modalsSlice.reducer(stateWithOpen, closeAddToCartModal());
      expect(state.isAddToCartModalOpen).toBe(false);
    });

    it('should handle setSelectedCameraForCart', () => {
      const state = modalsSlice.reducer(initialState, setSelectedCameraForCart(mockCamera));
      expect(state.selectedCameraForCart).toEqual(mockCamera);
    });

    it('should handle opening and closing add to cart modal', () => {
      let state = modalsSlice.reducer(initialState, openAddToCartModal());
      expect(state.isAddToCartModalOpen).toBe(true);

      state = modalsSlice.reducer(state, closeAddToCartModal());
      expect(state.isAddToCartModalOpen).toBe(false);
    });
  });

  describe('Add Camera to Cart Success Modal', () => {
    it('should handle openAddCameraToCartSuccessModal', () => {
      const state = modalsSlice.reducer(initialState, openAddCameraToCartSuccessModal());
      expect(state.isAddCameraToCartSuccessModalOpen).toBe(true);
    });

    it('should handle closeAddCameraToCartSuccessModal', () => {
      const stateWithOpen: ModalsState = { ...initialState, isAddCameraToCartSuccessModalOpen: true };
      const state = modalsSlice.reducer(stateWithOpen, closeAddCameraToCartSuccessModal());
      expect(state.isAddCameraToCartSuccessModalOpen).toBe(false);
    });

    it('should handle opening and closing success modal', () => {
      let state = modalsSlice.reducer(initialState, openAddCameraToCartSuccessModal());
      expect(state.isAddCameraToCartSuccessModalOpen).toBe(true);

      state = modalsSlice.reducer(state, closeAddCameraToCartSuccessModal());
      expect(state.isAddCameraToCartSuccessModalOpen).toBe(false);
    });
  });

  describe('Remove from Cart Modal', () => {
    it('should handle setSelectedCameraForRemoveFromCart', () => {
      const state = modalsSlice.reducer(initialState, setSelectedCameraForRemoveFromCart(mockCartItem));
      expect(state.selectedCameraForRemoveFromCart).toEqual(mockCartItem);
    });

    it('should handle openRemoveFromCartModal', () => {
      const state = modalsSlice.reducer(initialState, openRemoveFromCartModal());
      expect(state.isRemoveCameraFromCartOpen).toBe(true);
    });

    it('should handle closeRemoveFromCartModal', () => {
      const stateWithOpen: ModalsState = { ...initialState, isRemoveCameraFromCartOpen: true };
      const state = modalsSlice.reducer(stateWithOpen, closeRemoveFromCartModal());
      expect(state.isRemoveCameraFromCartOpen).toBe(false);
    });

    it('should handle setting cart item and opening modal', () => {
      let state = modalsSlice.reducer(initialState, setSelectedCameraForRemoveFromCart(mockCartItem));
      expect(state.selectedCameraForRemoveFromCart).toEqual(mockCartItem);

      state = modalsSlice.reducer(state, openRemoveFromCartModal());
      expect(state.isRemoveCameraFromCartOpen).toBe(true);
    });
  });

  describe('Order Success Modal', () => {
    it('should handle closeOrderSuccessModal', () => {
      const stateWithOpen: ModalsState = { ...initialState, isOrderSuccessModalOpen: true };
      const state = modalsSlice.reducer(stateWithOpen, closeOrderSuccessModal());
      expect(state.isOrderSuccessModalOpen).toBe(false);
    });

    it('should open order success modal on createOrderAction.fulfilled', () => {
      const action = {
        type: createOrderAction.fulfilled.type,
        payload: undefined,
      };
      const state = modalsSlice.reducer(initialState, action);
      expect(state.isOrderSuccessModalOpen).toBe(true);
    });

    it('should open order success modal on createOrderAction.rejected', () => {
      const action = {
        type: createOrderAction.rejected.type,
      };
      const state = modalsSlice.reducer(initialState, action);
      expect(state.isOrderSuccessModalOpen).toBe(true);
    });
  });

  describe('Add New Review Modal', () => {
    it('should handle openAddNewReviewModal', () => {
      const state = modalsSlice.reducer(initialState, openAddNewReviewModal());
      expect(state.isAddNewReviewModalOpen).toBe(true);
    });

    it('should handle closeAddNewReviewModal', () => {
      const stateWithOpen: ModalsState = { ...initialState, isAddNewReviewModalOpen: true };
      const state = modalsSlice.reducer(stateWithOpen, closeAddNewReviewModal());
      expect(state.isAddNewReviewModalOpen).toBe(false);
    });

    it('should handle opening and closing review modal', () => {
      let state = modalsSlice.reducer(initialState, openAddNewReviewModal());
      expect(state.isAddNewReviewModalOpen).toBe(true);

      state = modalsSlice.reducer(state, closeAddNewReviewModal());
      expect(state.isAddNewReviewModalOpen).toBe(false);
    });
  });

  describe('Review Success Modal', () => {
    it('should handle openReviewSuccessModal', () => {
      const state = modalsSlice.reducer(initialState, openReviewSuccessModal());
      expect(state.isReviewSuccessModalOpen).toBe(true);
    });

    it('should handle closeReviewSuccessModal', () => {
      const stateWithOpen: ModalsState = { ...initialState, isReviewSuccessModalOpen: true };
      const state = modalsSlice.reducer(stateWithOpen, closeReviewSuccessModal());
      expect(state.isReviewSuccessModalOpen).toBe(false);
    });

    it('should handle opening and closing review success modal', () => {
      let state = modalsSlice.reducer(initialState, openReviewSuccessModal());
      expect(state.isReviewSuccessModalOpen).toBe(true);

      state = modalsSlice.reducer(state, closeReviewSuccessModal());
      expect(state.isReviewSuccessModalOpen).toBe(false);
    });
  });

  describe('Complex scenarios', () => {
    it('should handle multiple modals being open simultaneously', () => {
      let state = modalsSlice.reducer(initialState, openAddToCartModal());
      state = modalsSlice.reducer(state, openAddNewReviewModal());

      expect(state.isAddToCartModalOpen).toBe(true);
      expect(state.isAddNewReviewModalOpen).toBe(true);
    });

    it('should not affect other modals when opening one', () => {
      const stateWithMultipleOpen: ModalsState = {
        ...initialState,
        isAddToCartModalOpen: true,
        isAddNewReviewModalOpen: true,
      };

      const state = modalsSlice.reducer(stateWithMultipleOpen, openRemoveFromCartModal());

      expect(state.isAddToCartModalOpen).toBe(true);
      expect(state.isAddNewReviewModalOpen).toBe(true);
      expect(state.isRemoveCameraFromCartOpen).toBe(true);
    });

    it('should handle full flow of adding camera to cart', () => {
      let state = modalsSlice.reducer(initialState, setSelectedCameraForCart(mockCamera));
      expect(state.selectedCameraForCart).toEqual(mockCamera);

      state = modalsSlice.reducer(state, openAddToCartModal());
      expect(state.isAddToCartModalOpen).toBe(true);

      state = modalsSlice.reducer(state, closeAddToCartModal());
      expect(state.isAddToCartModalOpen).toBe(false);

      state = modalsSlice.reducer(state, openAddCameraToCartSuccessModal());
      expect(state.isAddCameraToCartSuccessModalOpen).toBe(true);

      state = modalsSlice.reducer(state, closeAddCameraToCartSuccessModal());
      expect(state.isAddCameraToCartSuccessModalOpen).toBe(false);
    });

    it('should handle full flow of removing camera from cart', () => {
      let state = modalsSlice.reducer(initialState, setSelectedCameraForRemoveFromCart(mockCartItem));
      expect(state.selectedCameraForRemoveFromCart).toEqual(mockCartItem);

      state = modalsSlice.reducer(state, openRemoveFromCartModal());
      expect(state.isRemoveCameraFromCartOpen).toBe(true);

      state = modalsSlice.reducer(state, closeRemoveFromCartModal());
      expect(state.isRemoveCameraFromCartOpen).toBe(false);
    });

    it('should handle full review flow', () => {
      let state = modalsSlice.reducer(initialState, openAddNewReviewModal());
      expect(state.isAddNewReviewModalOpen).toBe(true);

      state = modalsSlice.reducer(state, closeAddNewReviewModal());
      expect(state.isAddNewReviewModalOpen).toBe(false);

      state = modalsSlice.reducer(state, openReviewSuccessModal());
      expect(state.isReviewSuccessModalOpen).toBe(true);

      state = modalsSlice.reducer(state, closeReviewSuccessModal());
      expect(state.isReviewSuccessModalOpen).toBe(false);
    });
  });
});
