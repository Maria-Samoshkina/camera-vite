import {store} from '../store';
import { setError } from '../store/error/error-slice';
import {clearErrorAction} from '../store/api-actions';


export const processErrorHandle = (message: string):void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
