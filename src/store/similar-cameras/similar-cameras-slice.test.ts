import { similarCamerasSlice } from './similar-cameras-slice';
import { fetchSimilarCamerasAction } from '../api-actions';
import { SimilarCamerasState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('similarCamerasSlice', () => {
  const mockCamera = makeFakeCamera();

  const initialState: SimilarCamerasState = {
    similarCameras: [],
    isSimilarCamerasLoading: false,
    isSimilarCamerasFetchingError: false,
  };

  it('should handle initial state', () => {
    expect(similarCamerasSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchSimilarCamerasAction.pending', () => {
    const action = { type: fetchSimilarCamerasAction.pending.type };
    const state = similarCamerasSlice.reducer(initialState, action);
    expect(state.isSimilarCamerasLoading).toBe(true);
    expect(state.isSimilarCamerasFetchingError).toBe(false);
  });

  it('should handle fetchSimilarCamerasAction.fulfilled', () => {
    const action = { type: fetchSimilarCamerasAction.fulfilled.type, payload: [mockCamera] };
    const state = similarCamerasSlice.reducer(initialState, action);
    expect(state.similarCameras).toEqual([mockCamera]);
    expect(state.isSimilarCamerasLoading).toBe(false);
    expect(state.isSimilarCamerasFetchingError).toBe(false);
  });

  it('should handle fetchSimilarCamerasAction.rejected', () => {
    const action = { type: fetchSimilarCamerasAction.rejected.type };
    const state = similarCamerasSlice.reducer(initialState, action);
    expect(state.isSimilarCamerasLoading).toBe(false);
    expect(state.isSimilarCamerasFetchingError).toBe(true);
  });
});
