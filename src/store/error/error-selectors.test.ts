import { getError } from './error-selectors';
import { NameSpace } from '../../const';
import { ErrorState } from '../../types/state';

describe('error selectors', () => {
  const errorState: ErrorState = {
    error: 'Ошибка!',
  };

  const state = {
    [NameSpace.Error]: errorState,
  };

  it('getError should return error string', () => {
    expect(getError(state)).toBe('Ошибка!');
  });

  it('getError should return null if no error', () => {
    const stateWithNull = {
      [NameSpace.Error]: { error: null },
    };
    expect(getError(stateWithNull)).toBeNull();
  });
});
