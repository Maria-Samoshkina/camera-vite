import { renderHook, act } from '@testing-library/react';
import useAddToCartModal from './use-add-to-cart-modal';
import { makeFakeCamera } from '../utils-mocks/mocks';
import { NameSpace } from '../const';
import { closeAddToCartModal, openAddToCartModal, setSelectedCameraForCart } from '../store/modals/modals-slice';
import { withStoreForHooks } from '../utils-mocks/mock-components';

describe('useAddToCartModal hook', () => {
  const mockCamera = makeFakeCamera();
  const anotherMockCamera = makeFakeCamera();

  it('should return initial state correctly', () => {
    const initialState = {
      [NameSpace.Modals]: {
        isAddToCartModalOpen: false,
        selectedCameraForCart: null,
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

});
