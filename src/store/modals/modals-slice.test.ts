import { modalsSlice, openAddToCartModal, closeAddToCartModal, setSelectedCameraForCart } from './modals-slice';
import { ModalsState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('modalsSlice', () => {
  const mockCamera = makeFakeCamera();

  const initialState: ModalsState = {
    isAddToCartModalOpen: false,
    selectedCameraForCart: null,
  };

  it('should handle initial state', () => {
    expect(modalsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

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
});
