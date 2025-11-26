import { camerasSlice } from './cameras-slice';
import { fetchCamerasAction } from '../api-actions';
import { CamerasState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('camerasSlice', () => {
  const mockCamera = makeFakeCamera();

  const initialState: CamerasState = {
    cameras: [],
    isCamerasDataLoading: false,
    isCamerasFetchingError: false,
  };

  it('should handle initial state', () => {
    expect(camerasSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchCamerasAction.pending', () => {
    const action = { type: fetchCamerasAction.pending.type };
    const state = camerasSlice.reducer(initialState, action);
    expect(state.isCamerasDataLoading).toBe(true);
    expect(state.isCamerasFetchingError).toBe(false);
  });

  it('should handle fetchCamerasAction.fulfilled', () => {
    const action = { type: fetchCamerasAction.fulfilled.type, payload: [mockCamera] };
    const state = camerasSlice.reducer(initialState, action);
    expect(state.cameras).toEqual([mockCamera]);
    expect(state.isCamerasDataLoading).toBe(false);
    expect(state.isCamerasFetchingError).toBe(false);
  });

  it('should handle fetchCamerasAction.rejected', () => {
    const action = { type: fetchCamerasAction.rejected.type };
    const state = camerasSlice.reducer(initialState, action);
    expect(state.isCamerasDataLoading).toBe(false);
    expect(state.isCamerasFetchingError).toBe(true);
  });
});
