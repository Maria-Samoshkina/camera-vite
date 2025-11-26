import { promoCamerasSlice } from './promo-cameras-slice';
import { fetchPromoCamerasAction } from '../api-actions';
import { PromoCamerasState } from '../../types/state';
import { PromoCamera } from '../../types/camera';

describe('promoCamerasSlice', () => {
  const mockPromoCamera: PromoCamera = {
    id: 1,
    name: 'Promo Camera',
    previewImg: 'img.jpg',
    previewImg2x: 'img2x.jpg',
    previewImgWebp: 'img.webp',
    previewImgWebp2x: 'img2x.webp',
  };

  const initialState: PromoCamerasState = {
    promoCameras: [],
    isPromoCamerasLoading: false,
    isPromoCamerasFetchingError: false,
  };

  it('should handle initial state', () => {
    expect(promoCamerasSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchPromoCamerasAction.pending', () => {
    const action = { type: fetchPromoCamerasAction.pending.type };
    const state = promoCamerasSlice.reducer(initialState, action);
    expect(state.isPromoCamerasLoading).toBe(true);
    expect(state.isPromoCamerasFetchingError).toBe(false);
  });

  it('should handle fetchPromoCamerasAction.fulfilled', () => {
    const action = { type: fetchPromoCamerasAction.fulfilled.type, payload: [mockPromoCamera] };
    const state = promoCamerasSlice.reducer(initialState, action);
    expect(state.promoCameras).toEqual([mockPromoCamera]);
    expect(state.isPromoCamerasLoading).toBe(false);
    expect(state.isPromoCamerasFetchingError).toBe(false);
  });

  it('should handle fetchPromoCamerasAction.rejected', () => {
    const action = { type: fetchPromoCamerasAction.rejected.type };
    const state = promoCamerasSlice.reducer(initialState, action);
    expect(state.isPromoCamerasLoading).toBe(false);
    expect(state.isPromoCamerasFetchingError).toBe(true);
  });
});
