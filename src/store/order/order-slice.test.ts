import { describe, it, expect } from 'vitest';
import { orderSlice } from './order-slice';
import { OrderState } from '../../types/state';
import { createOrderAction } from '../api-actions';

describe('Order Slice', () => {
  const initialState: OrderState = {
    isOrderLoading: false,
    isOrderSuccess: false,
    isOrderError: false,
  };

  describe('Initial state', () => {
    it('should return initial state when called with undefined', () => {
      const result = orderSlice.reducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });

    it('should have all flags set to false initially', () => {
      const result = orderSlice.reducer(undefined, { type: '' });

      expect(result.isOrderLoading).toBe(false);
      expect(result.isOrderSuccess).toBe(false);
      expect(result.isOrderError).toBe(false);
    });
  });

  describe('createOrderAction.pending', () => {
    it('should set loading state and reset other flags', () => {
      const action = { type: createOrderAction.pending.type };
      const result = orderSlice.reducer(initialState, action);

      expect(result.isOrderLoading).toBe(true);
      expect(result.isOrderSuccess).toBe(false);
      expect(result.isOrderError).toBe(false);
    });

    it('should reset success flag when starting new order', () => {
      const stateWithSuccess: OrderState = {
        isOrderLoading: false,
        isOrderSuccess: true,
        isOrderError: false,
      };

      const action = { type: createOrderAction.pending.type };
      const result = orderSlice.reducer(stateWithSuccess, action);

      expect(result.isOrderLoading).toBe(true);
      expect(result.isOrderSuccess).toBe(false);
      expect(result.isOrderError).toBe(false);
    });

    it('should reset error flag when starting new order', () => {
      const stateWithError: OrderState = {
        isOrderLoading: false,
        isOrderSuccess: false,
        isOrderError: true,
      };

      const action = { type: createOrderAction.pending.type };
      const result = orderSlice.reducer(stateWithError, action);

      expect(result.isOrderLoading).toBe(true);
      expect(result.isOrderSuccess).toBe(false);
      expect(result.isOrderError).toBe(false);
    });
  });

  describe('createOrderAction.fulfilled', () => {
    it('should set success state and reset loading', () => {
      const loadingState: OrderState = {
        isOrderLoading: true,
        isOrderSuccess: false,
        isOrderError: false,
      };

      const action = {
        type: createOrderAction.fulfilled.type,
        payload: undefined,
      };

      const result = orderSlice.reducer(loadingState, action);

      expect(result.isOrderLoading).toBe(false);
      expect(result.isOrderSuccess).toBe(true);
      expect(result.isOrderError).toBe(false);
    });

    it('should set success from initial state', () => {
      const action = {
        type: createOrderAction.fulfilled.type,
        payload: undefined,
      };

      const result = orderSlice.reducer(initialState, action);

      expect(result.isOrderLoading).toBe(false);
      expect(result.isOrderSuccess).toBe(true);
      expect(result.isOrderError).toBe(false);
    });

    it('should clear error flag if it was set', () => {
      const stateWithError: OrderState = {
        isOrderLoading: true,
        isOrderSuccess: false,
        isOrderError: true,
      };

      const action = {
        type: createOrderAction.fulfilled.type,
        payload: undefined,
      };

      const result = orderSlice.reducer(stateWithError, action);

      expect(result.isOrderLoading).toBe(false);
      expect(result.isOrderSuccess).toBe(true);
      expect(result.isOrderError).toBe(false);
    });
  });

  describe('createOrderAction.rejected', () => {
    it('should set error state and reset loading', () => {
      const loadingState: OrderState = {
        isOrderLoading: true,
        isOrderSuccess: false,
        isOrderError: false,
      };

      const action = { type: createOrderAction.rejected.type };
      const result = orderSlice.reducer(loadingState, action);

      expect(result.isOrderLoading).toBe(false);
      expect(result.isOrderSuccess).toBe(false);
      expect(result.isOrderError).toBe(true);
    });

    it('should set error from initial state', () => {
      const action = { type: createOrderAction.rejected.type };
      const result = orderSlice.reducer(initialState, action);

      expect(result.isOrderLoading).toBe(false);
      expect(result.isOrderSuccess).toBe(false);
      expect(result.isOrderError).toBe(true);
    });

    it('should clear success flag if it was set', () => {
      const stateWithSuccess: OrderState = {
        isOrderLoading: true,
        isOrderSuccess: true,
        isOrderError: false,
      };

      const action = { type: createOrderAction.rejected.type };
      const result = orderSlice.reducer(stateWithSuccess, action);

      expect(result.isOrderLoading).toBe(false);
      expect(result.isOrderSuccess).toBe(false);
      expect(result.isOrderError).toBe(true);
    });
  });

  describe('Order flow scenarios', () => {
    it('should handle successful order flow', () => {
      let state = orderSlice.reducer(
        initialState,
        { type: createOrderAction.pending.type }
      );
      expect(state.isOrderLoading).toBe(true);
      expect(state.isOrderSuccess).toBe(false);
      expect(state.isOrderError).toBe(false);

      state = orderSlice.reducer(
        state,
        { type: createOrderAction.fulfilled.type, payload: undefined }
      );
      expect(state.isOrderLoading).toBe(false);
      expect(state.isOrderSuccess).toBe(true);
      expect(state.isOrderError).toBe(false);
    });

    it('should handle failed order flow', () => {
      let state = orderSlice.reducer(
        initialState,
        { type: createOrderAction.pending.type }
      );
      expect(state.isOrderLoading).toBe(true);
      expect(state.isOrderSuccess).toBe(false);
      expect(state.isOrderError).toBe(false);

      state = orderSlice.reducer(
        state,
        { type: createOrderAction.rejected.type }
      );
      expect(state.isOrderLoading).toBe(false);
      expect(state.isOrderSuccess).toBe(false);
      expect(state.isOrderError).toBe(true);
    });

    it('should handle retry after error', () => {
      let state = orderSlice.reducer(
        initialState,
        { type: createOrderAction.pending.type }
      );

      state = orderSlice.reducer(
        state,
        { type: createOrderAction.rejected.type }
      );
      expect(state.isOrderError).toBe(true);

      state = orderSlice.reducer(
        state,
        { type: createOrderAction.pending.type }
      );
      expect(state.isOrderLoading).toBe(true);
      expect(state.isOrderError).toBe(false);

      state = orderSlice.reducer(
        state,
        { type: createOrderAction.fulfilled.type, payload: undefined }
      );
      expect(state.isOrderSuccess).toBe(true);
      expect(state.isOrderError).toBe(false);
    });

    it('should handle creating new order after success', () => {
      let state = orderSlice.reducer(
        initialState,
        { type: createOrderAction.fulfilled.type, payload: undefined }
      );
      expect(state.isOrderSuccess).toBe(true);

      state = orderSlice.reducer(
        state,
        { type: createOrderAction.pending.type }
      );
      expect(state.isOrderLoading).toBe(true);
      expect(state.isOrderSuccess).toBe(false);
    });
  });

  describe('State transitions', () => {
    it('should only have one flag true at a time during normal flow', () => {
      const pendingState = orderSlice.reducer(
        initialState,
        { type: createOrderAction.pending.type }
      );
      const trueFlags = Object.values(pendingState).filter((val) => val === true);
      expect(trueFlags.length).toBe(1);

      const successState = orderSlice.reducer(
        pendingState,
        { type: createOrderAction.fulfilled.type, payload: undefined }
      );
      const successTrueFlags = Object.values(successState).filter((val) => val === true);
      expect(successTrueFlags.length).toBe(1);

      const errorState = orderSlice.reducer(
        pendingState,
        { type: createOrderAction.rejected.type }
      );
      const errorTrueFlags = Object.values(errorState).filter((val) => val === true);
      expect(errorTrueFlags.length).toBe(1);
    });

    it('should have all flags false only in initial state', () => {
      expect(initialState.isOrderLoading).toBe(false);
      expect(initialState.isOrderSuccess).toBe(false);
      expect(initialState.isOrderError).toBe(false);
    });
  });
});
