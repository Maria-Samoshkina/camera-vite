import { getDetailedCamera, getIsDetailedCameraFetchingError, getIsDetailedCameraLoading } from './detailed-camera-selectors';
import { NameSpace } from '../../const';
import { DetailedCameraState } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('DetailedCamera selectors', () => {
  const mockCamera = makeFakeCamera();

  const detailedCameraState: DetailedCameraState = {
    detailedCamera: mockCamera,
    isDetailedCameraLoading: false,
    isDetailedCameraFetchingError: false,
  };

  const state = {
    [NameSpace.DetailedCamera]: detailedCameraState,
  };

  it('getDetailedCamera should return camera object', () => {
    expect(getDetailedCamera(state)).toEqual(mockCamera);
  });

  it('getIsDetailedCameraFetchingError should return error flag', () => {
    expect(getIsDetailedCameraFetchingError(state)).toBe(false);

    const errorState = {
      [NameSpace.DetailedCamera]: {
        ...detailedCameraState,
        isDetailedCameraFetchingError: true,
      },
    };
    expect(getIsDetailedCameraFetchingError(errorState)).toBe(true);
  });

  it('getIsDetailedCameraLoading should return loading flag', () => {
    expect(getIsDetailedCameraLoading(state)).toBe(false);
    const loadingState = {
      [NameSpace.DetailedCamera]: {
        ...detailedCameraState,
        isDetailedCameraLoading: true,
      },
    };
    expect(getIsDetailedCameraLoading(loadingState)).toBe(true);
  });
});
