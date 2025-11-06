import { store } from '../store';
import { Cameras } from './camera';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InitialState = {
  cameras: Cameras;
  isCamerasDataLoading: boolean;
  isCamerasFetchingError:boolean;

};

export type CamerasState = Pick<InitialState, 'cameras'| 'isCamerasDataLoading'| 'isCamerasFetchingError'>;
