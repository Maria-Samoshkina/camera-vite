import { getIsAddToCartModalOpen, getSelectedCameraForCart, getIsAddCameraToCartSuccessModalOpen, getSelectedCameraForRemoveFromCart, getIsRemoveCameraFromCartOpen, getIsOrderSuccessModalOpen, getIsAddNewReviewModalOpen, getIsReviewSuccessModalOpen } from './modals-selectors';
import { NameSpace } from '../../const';
import { ModalsState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';
import { CartItem } from '../../types/camera';

describe('modals selectors', () => {
  const mockCamera = makeFakeCamera();
  const mockCartItem: CartItem = {
    camera: mockCamera,
    quantity: 2,
  };

  const modalsState: ModalsState = {
    isAddToCartModalOpen: true,
    selectedCameraForCart: mockCamera,
    isAddCameraToCartSuccessModalOpen: true,
    selectedCameraForRemoveFromCart: mockCartItem,
    isRemoveCameraFromCartOpen: true,
    isOrderSuccessModalOpen: true,
    isAddNewReviewModalOpen: true,
    isReviewSuccessModalOpen: true
  };

  const state = {
    [NameSpace.Modals]: modalsState,
  };

  describe('Add to Cart Modal selectors', () => {
    it('getIsAddToCartModalOpen should return modal open flag', () => {
      expect(getIsAddToCartModalOpen(state)).toBe(true);
      const closedState = {
        [NameSpace.Modals]: { ...modalsState, isAddToCartModalOpen: false },
      };
      expect(getIsAddToCartModalOpen(closedState)).toBe(false);
    });

    it('getSelectedCameraForCart should return selected camera', () => {
      expect(getSelectedCameraForCart(state)).toEqual(mockCamera);
      const emptyState = {
        [NameSpace.Modals]: { ...modalsState, selectedCameraForCart: null },
      };
      expect(getSelectedCameraForCart(emptyState)).toBeNull();
    });
  });

  describe('Add Camera to Cart Success Modal selectors', () => {
    it('getIsAddCameraToCartSuccessModalOpen should return success modal open flag', () => {
      expect(getIsAddCameraToCartSuccessModalOpen(state)).toBe(true);
      const closedState = {
        [NameSpace.Modals]: { ...modalsState, isAddCameraToCartSuccessModalOpen: false },
      };
      expect(getIsAddCameraToCartSuccessModalOpen(closedState)).toBe(false);
    });
  });

  describe('Remove from Cart Modal selectors', () => {
    it('getSelectedCameraForRemoveFromCart should return selected cart item', () => {
      expect(getSelectedCameraForRemoveFromCart(state)).toEqual(mockCartItem);
      const emptyState = {
        [NameSpace.Modals]: { ...modalsState, selectedCameraForRemoveFromCart: null },
      };
      expect(getSelectedCameraForRemoveFromCart(emptyState)).toBeNull();
    });

    it('getIsRemoveCameraFromCartOpen should return remove modal open flag', () => {
      expect(getIsRemoveCameraFromCartOpen(state)).toBe(true);
      const closedState = {
        [NameSpace.Modals]: { ...modalsState, isRemoveCameraFromCartOpen: false },
      };
      expect(getIsRemoveCameraFromCartOpen(closedState)).toBe(false);
    });
  });

  describe('Order Success Modal selectors', () => {
    it('getIsOrderSuccessModalOpen should return order success modal open flag', () => {
      expect(getIsOrderSuccessModalOpen(state)).toBe(true);
      const closedState = {
        [NameSpace.Modals]: { ...modalsState, isOrderSuccessModalOpen: false },
      };
      expect(getIsOrderSuccessModalOpen(closedState)).toBe(false);
    });
  });

  describe('Review Modal selectors', () => {
    it('getIsAddNewReviewModalOpen should return add review modal open flag', () => {
      expect(getIsAddNewReviewModalOpen(state)).toBe(true);
      const closedState = {
        [NameSpace.Modals]: { ...modalsState, isAddNewReviewModalOpen: false },
      };
      expect(getIsAddNewReviewModalOpen(closedState)).toBe(false);
    });

    it('getIsReviewSuccessModalOpen should return review success modal open flag', () => {
      expect(getIsReviewSuccessModalOpen(state)).toBe(true);
      const closedState = {
        [NameSpace.Modals]: { ...modalsState, isReviewSuccessModalOpen: false },
      };
      expect(getIsReviewSuccessModalOpen(closedState)).toBe(false);
    });
  });

  describe('Multiple modals state', () => {
    it('should correctly return states when all modals are closed', () => {
      const allClosedState = {
        [NameSpace.Modals]: {
          isAddToCartModalOpen: false,
          selectedCameraForCart: null,
          isAddCameraToCartSuccessModalOpen: false,
          selectedCameraForRemoveFromCart: null,
          isRemoveCameraFromCartOpen: false,
          isOrderSuccessModalOpen: false,
          isAddNewReviewModalOpen: false,
          isReviewSuccessModalOpen: false,
        },
      };

      expect(getIsAddToCartModalOpen(allClosedState)).toBe(false);
      expect(getIsAddCameraToCartSuccessModalOpen(allClosedState)).toBe(false);
      expect(getIsRemoveCameraFromCartOpen(allClosedState)).toBe(false);
      expect(getIsOrderSuccessModalOpen(allClosedState)).toBe(false);
      expect(getIsAddNewReviewModalOpen(allClosedState)).toBe(false);
      expect(getIsReviewSuccessModalOpen(allClosedState)).toBe(false);
      expect(getSelectedCameraForCart(allClosedState)).toBeNull();
      expect(getSelectedCameraForRemoveFromCart(allClosedState)).toBeNull();
    });

    it('should correctly return states when multiple modals are open', () => {
      const mixedState = {
        [NameSpace.Modals]: {
          isAddToCartModalOpen: true,
          selectedCameraForCart: mockCamera,
          isAddCameraToCartSuccessModalOpen: false,
          selectedCameraForRemoveFromCart: null,
          isRemoveCameraFromCartOpen: true,
          isOrderSuccessModalOpen: false,
          isAddNewReviewModalOpen: true,
          isReviewSuccessModalOpen: false,
        },
      };

      expect(getIsAddToCartModalOpen(mixedState)).toBe(true);
      expect(getSelectedCameraForCart(mixedState)).toEqual(mockCamera);
      expect(getIsAddCameraToCartSuccessModalOpen(mixedState)).toBe(false);
      expect(getIsRemoveCameraFromCartOpen(mixedState)).toBe(true);
      expect(getIsOrderSuccessModalOpen(mixedState)).toBe(false);
      expect(getIsAddNewReviewModalOpen(mixedState)).toBe(true);
      expect(getIsReviewSuccessModalOpen(mixedState)).toBe(false);
    });
  });
});
