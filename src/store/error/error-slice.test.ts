import { errorSlice, setError } from './error-slice';
import { ErrorState } from '../../types/state';

describe('errorSlice', () => {
  const initialState: ErrorState = {
    error: null,
  };

  it('should handle initial state', () => {
    expect(errorSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setError with string', () => {
    const action = setError('Ошибка!');
    const state = errorSlice.reducer(initialState, action);
    expect(state.error).toBe('Ошибка!');
  });

  it('should handle setError with null', () => {
    const stateWithError: ErrorState = { error: 'Ошибка!' };
    const action = setError(null);
    const state = errorSlice.reducer(stateWithError, action);
    expect(state.error).toBeNull();
  });
});
