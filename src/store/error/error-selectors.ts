import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { ErrorState } from '../../types/state';

const getErrorSlice = (state:Pick<State, NameSpace.Error>): ErrorState => state[NameSpace.Error];

export const getError = createSelector(
  [getErrorSlice],
  (state: ErrorState)=> state.error
);

