import { getIsAddToCartModalOpen, getSelectedCameraForCart } from './modals-selectors';
import { NameSpace } from '../../const';
import { ModalsState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('modals selectors', () => {
  const mockCamera = makeFakeCamera();

  const modalsState: ModalsState = {
    isAddToCartModalOpen: true,
    selectedCameraForCart: mockCamera,
  };

  const state = {
    [NameSpace.Modals]: modalsState,
  };

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
