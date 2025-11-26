import { processErrorHandle } from './process-error-handle';
import { setError } from '../store/error/error-slice';
import { clearErrorAction } from '../store/api-actions';
import { store } from '../store';

vi.mock('../store', () => ({
  store: {
    dispatch: vi.fn(),
  },
}));

vi.mock('../store/error/error-slice', () => ({
  setError: vi.fn((message: string) => ({ type: 'error/setError', payload: message })),
}));

vi.mock('../store/api-actions', () => ({
  clearErrorAction: vi.fn(() => ({ type: 'api/clearError' })),
}));

describe('Function: "processErrorHandle"', ()=> {

  it ('should dispatch setError with the provided message, then clearErrorAction', ()=> {
    const fakeErrorMessage = 'error';

    processErrorHandle(fakeErrorMessage);

    expect(store.dispatch).toHaveBeenNthCalledWith(1, setError(fakeErrorMessage));
    expect(store.dispatch).toHaveBeenNthCalledWith(2, clearErrorAction());

  });

});
