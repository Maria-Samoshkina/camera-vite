import { getCameras, getIsCamerasFetchingError, getIsCamerasDataLoading } from './cameras-selectors';
import { NameSpace } from '../../const';
import { CamerasState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('Cameras selectors', () => {
  const mockCamera = makeFakeCamera();

  const camerasState: CamerasState = {
    cameras: [mockCamera],
    isCamerasDataLoading: false,
    isCamerasFetchingError: false,
  };

  const state = {
    [NameSpace.Cameras]: camerasState,
  };

  it('getCameras should return cameras array', () => {
    const results = getCameras(state);
    expect(results).toEqual([mockCamera]);
  });

  it('getIsCamerasFetchingError should return error flag', () => {
    expect(getIsCamerasFetchingError(state)).toBe(false);

    const errorState = {
      [NameSpace.Cameras]: {
        ...camerasState,
        isCamerasFetchingError: true,
      },
    };
    expect(getIsCamerasFetchingError(errorState)).toBe(true);
  });

  it('getIsCamerasDataLoading should return loading flag', () => {
    expect(getIsCamerasDataLoading(state)).toBe(false);

    const loadingState = {
      [NameSpace.Cameras]: {
        ...camerasState,
        isCamerasDataLoading: true,
      },
    };
    expect(getIsCamerasDataLoading(loadingState)).toBe(true);
  });
});
