import { renderHook, act } from '@testing-library/react';
import useAddToCartModal from './use-add-to-cart-modal';
import { makeFakeCamera } from '../utils-mocks/mocks';
import { NameSpace } from '../const';
import { closeAddCameraToCartSuccessModal, closeAddToCartModal, openAddCameraToCartSuccessModal, openAddToCartModal, setSelectedCameraForCart } from '../store/modals/modals-slice';
import { withStoreForHooks } from '../utils-mocks/mock-components';
import { addToCart } from '../store/cart/cart-slice';

describe('useAddToCartModal hook', () => {
  const mockCamera = makeFakeCamera();
  const anotherMockCamera = makeFakeCamera();

  it('should return initial state correctly', () => {
    const initialState = {
      [NameSpace.Modals]: {
        isAddToCartModalOpen: false,
        selectedCameraForCart: null,
        isAddCameraToCartSuccessModalOpen: false,
        selectedCameraForRemoveFromCart: null,
        isRemoveCameraFromCartOpen: false,
        isOrderSuccessModalOpen: false,
        isAddNewReviewModalOpen: false,
        isReviewSuccessModalOpen: false
      },
      [NameSpace.Cameras]: {
        cameras: [mockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    expect(result.current.isAddToCartModalOpen).toBe(false);
    expect(result.current.selectedCameraForCart).toBe(null);
    expect(typeof result.current.handleBuyButtonClick).toBe('function');
    expect(typeof result.current.handleAddToCartModalClose).toBe('function');
  });

  it('should return correct modal state when modal is open', () => {
    const initialState = {
      [NameSpace.Modals]: {
        isAddToCartModalOpen: true,
        selectedCameraForCart: mockCamera,
        isAddCameraToCartSuccessModalOpen: false,
        selectedCameraForRemoveFromCart: null,
        isRemoveCameraFromCartOpen: false,
        isOrderSuccessModalOpen: false,
        isAddNewReviewModalOpen: false,
        isReviewSuccessModalOpen: false
      },
      [NameSpace.Cameras]: {
        cameras: [mockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    expect(result.current.isAddToCartModalOpen).toBe(true);
    expect(result.current.selectedCameraForCart).toEqual(mockCamera);
  });

  it('should dispatch correct actions when handleBuyButtonClick is called', () => {
    const initialState = {
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
      [NameSpace.Cameras]: {
        cameras: [mockCamera, anotherMockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper, mockStore } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    act(() => {
      result.current.handleBuyButtonClick(mockCamera.id.toString());
    });

    const actions = mockStore.getActions();

    expect(actions).toEqual([setSelectedCameraForCart(mockCamera), openAddToCartModal() ]);

  });


  it('should dispatch closeAddToCartModal when modal is closed', () => {
    const initialState = {
      [NameSpace.Modals]: {
        isAddToCartModalOpen: true,
        selectedCameraForCart: mockCamera,
        isAddCameraToCartSuccessModalOpen: false,
        selectedCameraForRemoveFromCart: null,
        isRemoveCameraFromCartOpen: false,
        isOrderSuccessModalOpen: false,
        isAddNewReviewModalOpen: false,
        isReviewSuccessModalOpen: false
      },
      [NameSpace.Cameras]: {
        cameras: [mockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper, mockStore } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    act(() => {
      result.current.handleAddToCartModalClose();
    });

    const actions = mockStore.getActions();

    expect(actions).toEqual([closeAddToCartModal()]);

  });

  it('should dispatch correct actions when handleAddToCartButtonClick is called', () => {
    const initialState = {
      [NameSpace.Modals]: {
        isAddToCartModalOpen: true,
        selectedCameraForCart: mockCamera,
        isAddCameraToCartSuccessModalOpen: false,
        selectedCameraForRemoveFromCart: null,
        isRemoveCameraFromCartOpen: false,
        isOrderSuccessModalOpen: false,
        isAddNewReviewModalOpen: false,
        isReviewSuccessModalOpen: false
      },
      [NameSpace.Cameras]: {
        cameras: [mockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper, mockStore } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    act(() => {
      result.current.handleAddToCartButtonClick();
    });

    const actions = mockStore.getActions();

    expect(actions).toEqual([
      addToCart(mockCamera),
      closeAddToCartModal(),
      openAddCameraToCartSuccessModal()
    ]);
  });

  it('should dispatch closeAddCameraToCartSuccessModal when success modal is closed', () => {
    const initialState = {
      [NameSpace.Modals]: {
        isAddToCartModalOpen: false,
        selectedCameraForCart: null,
        isAddCameraToCartSuccessModalOpen: true,
        selectedCameraForRemoveFromCart: null,
        isRemoveCameraFromCartOpen: false,
        isOrderSuccessModalOpen: false,
        isAddNewReviewModalOpen: false,
        isReviewSuccessModalOpen: false
      },
      [NameSpace.Cameras]: {
        cameras: [mockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper, mockStore } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    act(() => {
      result.current.handleAddCameraToCartSuccessModalClose();
    });

    const actions = mockStore.getActions();

    expect(actions).toEqual([closeAddCameraToCartSuccessModal()]);
  });

  it('should return correct success modal state when modal is open', () => {
    const initialState = {
      [NameSpace.Modals]: {
        isAddToCartModalOpen: false,
        selectedCameraForCart: null,
        isAddCameraToCartSuccessModalOpen: true,
        selectedCameraForRemoveFromCart: null,
        isRemoveCameraFromCartOpen: false,
        isOrderSuccessModalOpen: false,
        isAddNewReviewModalOpen: false,
        isReviewSuccessModalOpen: false
      },
      [NameSpace.Cameras]: {
        cameras: [mockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    expect(result.current.isAddCameraToCartSuccessModalOpen).toBe(true);
  });

  it('should not dispatch actions when handleBuyButtonClick is called with non-existent camera id', () => {
    const initialState = {
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
      [NameSpace.Cameras]: {
        cameras: [mockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper, mockStore } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    act(() => {
      result.current.handleBuyButtonClick('non-existent-id');
    });

    const actions = mockStore.getActions();

    expect(actions).toEqual([]);
  });

  it('should not dispatch actions when handleAddToCartButtonClick is called without selected camera', () => {
    const initialState = {
      [NameSpace.Modals]: {
        isAddToCartModalOpen: true,
        selectedCameraForCart: null,
        isAddCameraToCartSuccessModalOpen: false,
        selectedCameraForRemoveFromCart: null,
        isRemoveCameraFromCartOpen: false,
        isOrderSuccessModalOpen: false,
        isAddNewReviewModalOpen: false,
        isReviewSuccessModalOpen: false
      },
      [NameSpace.Cameras]: {
        cameras: [mockCamera],
        isCamerasDataLoading: false,
        isCamerasFetchingError: false,
      },
    };

    const { wrapper, mockStore } = withStoreForHooks(initialState);

    const { result } = renderHook(() => useAddToCartModal(), { wrapper });

    act(() => {
      result.current.handleAddToCartButtonClick();
    });

    const actions = mockStore.getActions();

    expect(actions).toEqual([]);
  });

});
