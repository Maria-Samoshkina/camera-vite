import { getPromoCameras, getIsPromoCamerasFetchingError, getIsPromoCamerasDataLoading } from './promo-cameras-selectors';
import { NameSpace } from '../../const';
import { PromoCamerasState } from '../../types/state';
import { PromoCamera } from '../../types/camera';

describe('promo-cameras selectors', () => {
  const mockPromoCamera: PromoCamera = {
    id: 1,
    name: 'Promo Camera',
    previewImg: 'img.jpg',
    previewImg2x: 'img2x.jpg',
    previewImgWebp: 'img.webp',
    previewImgWebp2x: 'img2x.webp',
  };

  const promoCamerasState: PromoCamerasState = {
    promoCameras: [mockPromoCamera],
    isPromoCamerasLoading: false,
    isPromoCamerasFetchingError: false,
  };

  const state = {
    [NameSpace.PromoCameras]: promoCamerasState,
  };

  it('getPromoCameras should return promo cameras array', () => {
    expect(getPromoCameras(state)).toEqual([mockPromoCamera]);
  });

  it('getIsPromoCamerasFetchingError should return error flag', () => {
    expect(getIsPromoCamerasFetchingError(state)).toBe(false);
    const errorState = {
      [NameSpace.PromoCameras]: {
        ...promoCamerasState,
        isPromoCamerasFetchingError: true,
      },
    };
    expect(getIsPromoCamerasFetchingError(errorState)).toBe(true);
  });

  it('getIsPromoCamerasDataLoading should return loading flag', () => {
    expect(getIsPromoCamerasDataLoading(state)).toBe(false);
    const loadingState = {
      [NameSpace.PromoCameras]: {
        ...promoCamerasState,
        isPromoCamerasLoading: true,
      },
    };
    expect(getIsPromoCamerasDataLoading(loadingState)).toBe(true);
  });
});
