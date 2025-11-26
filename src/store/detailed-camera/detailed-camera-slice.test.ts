import { detailedCameraSlice, dropCamera } from './detailed-camera-slice';
import { fetchDetailedCameraAction } from '../api-actions';
import { DetailedCameraState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('detailedCameraSlice', () => {
  const mockCamera = makeFakeCamera();

  const initialState: DetailedCameraState = {
    detailedCamera: null,
    isDetailedCameraLoading: true,
    isDetailedCameraFetchingError: false,
  };

  it('should handle initial state', () => {
    expect(detailedCameraSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchDetailedCameraAction.pending', () => {
    const action = { type: fetchDetailedCameraAction.pending.type };
    const state = detailedCameraSlice.reducer(initialState, action);
    expect(state.isDetailedCameraLoading).toBe(true);
    expect(state.isDetailedCameraFetchingError).toBe(false);
    expect(state.detailedCamera).toBeNull();
  });

  it('should handle fetchDetailedCameraAction.fulfilled', () => {
    const action = { type: fetchDetailedCameraAction.fulfilled.type, payload: mockCamera };
    const state = detailedCameraSlice.reducer(initialState, action);
    expect(state.detailedCamera).toEqual(mockCamera);
    expect(state.isDetailedCameraLoading).toBe(false);
    expect(state.isDetailedCameraFetchingError).toBe(false);
  });

  it('should handle fetchDetailedCameraAction.rejected', () => {
    const action = { type: fetchDetailedCameraAction.rejected.type };
    const state = detailedCameraSlice.reducer(initialState, action);
    expect(state.isDetailedCameraFetchingError).toBe(true);
    expect(state.isDetailedCameraLoading).toBe(false);
  });

  it('should handle dropCamera action', () => {
    const stateWithCamera: DetailedCameraState = {
      detailedCamera: mockCamera,
      isDetailedCameraLoading: false,
      isDetailedCameraFetchingError: false,
    };
    const state = detailedCameraSlice.reducer(stateWithCamera, dropCamera());
    expect(state.detailedCamera).toBeNull();
  });
});
