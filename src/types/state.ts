import { store } from '../store';
import { Cameras, DetailedCamera, DetailedCameras, PromoCameras } from './camera';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InitialState = {
  cameras: Cameras;
  isCamerasDataLoading: boolean;
  isCamerasFetchingError:boolean;

  detailedCamera: DetailedCamera | null;
  isDetailedCameraLoading: boolean;
  isDetailedCameraFetchingError: boolean;

  similarCameras: DetailedCameras;
  isSimilarCamerasLoading: boolean;
  isSimilarCamerasFetchingError: boolean;

  promoCameras: PromoCameras;
  isPromoCamerasLoading: boolean;
  isPromoCamerasFetchingError: boolean;

  error: string|null;


};

export type CamerasState = Pick<InitialState, 'cameras'| 'isCamerasDataLoading'| 'isCamerasFetchingError'>;
export type DetailedCameraState = Pick<InitialState, 'detailedCamera'| 'isDetailedCameraLoading'| 'isDetailedCameraFetchingError'>;
export type SimilarCamerasState = Pick<InitialState, 'similarCameras'| 'isSimilarCamerasLoading'| 'isSimilarCamerasFetchingError'>;
export type PromoCamerasState = Pick<InitialState, 'promoCameras'| 'isPromoCamerasLoading'| 'isPromoCamerasFetchingError'>;
export type ErrorState = Pick<InitialState, 'error'>;
