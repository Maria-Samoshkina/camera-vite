import { getSimilarCameras, getIsSimilarCamerasFetchingError, getIsSimilarCamerasDataLoading } from './similar-cameras-selectors';
import { NameSpace } from '../../const';
import { SimilarCamerasState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('similar-cameras selectors', () => {
  const mockCamera = makeFakeCamera();

  const similarCamerasState: SimilarCamerasState = {
    similarCameras: [mockCamera],
    isSimilarCamerasLoading: false,
    isSimilarCamerasFetchingError: false,
  };

  const state = {
    [NameSpace.SimilarCameras]: similarCamerasState,
  };

  it('getSimilarCameras should return similar cameras array', () => {
    expect(getSimilarCameras(state)).toEqual([mockCamera]);
  });

  it('getIsSimilarCamerasFetchingError should return error flag', () => {
    expect(getIsSimilarCamerasFetchingError(state)).toBe(false);
    const errorState = {
      [NameSpace.SimilarCameras]: {
        ...similarCamerasState,
        isSimilarCamerasFetchingError: true,
      },
    };
    expect(getIsSimilarCamerasFetchingError(errorState)).toBe(true);
  });

  it('getIsSimilarCamerasDataLoading should return loading flag', () => {
    expect(getIsSimilarCamerasDataLoading(state)).toBe(false);
    const loadingState = {
      [NameSpace.SimilarCameras]: {
        ...similarCamerasState,
        isSimilarCamerasLoading: true,
      },
    };
    expect(getIsSimilarCamerasDataLoading(loadingState)).toBe(true);
  });
});
