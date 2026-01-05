import { describe, it, expect } from 'vitest';
import { getIsOrderLoading, getIsOrderSuccess, getIsOrderError } from './order-selectors';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

describe('Order Selectors', () => {
  describe('getIsOrderLoading', () => {
    it('should return true when order is loading', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: true,
          isOrderSuccess: false,
          isOrderError: false,
        },
      } as Pick<State, NameSpace.Order>;

      const result = getIsOrderLoading(state);

      expect(result).toBe(true);
    });

    it('should return false when order is not loading', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: false,
          isOrderError: false,
        },
      } as Pick<State, NameSpace.Order>;

      const result = getIsOrderLoading(state);

      expect(result).toBe(false);
    });
  });

  describe('getIsOrderSuccess', () => {
    it('should return true when order is successful', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: true,
          isOrderError: false,
        },
      } as Pick<State, NameSpace.Order>;

      const result = getIsOrderSuccess(state);

      expect(result).toBe(true);
    });

    it('should return false when order is not successful', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: false,
          isOrderError: false,
        },
      } as Pick<State, NameSpace.Order>;

      const result = getIsOrderSuccess(state);

      expect(result).toBe(false);
    });
  });

  describe('getIsOrderError', () => {
    it('should return true when there is an order error', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: false,
          isOrderError: true,
        },
      } as Pick<State, NameSpace.Order>;

      const result = getIsOrderError(state);

      expect(result).toBe(true);
    });

    it('should return false when there is no order error', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: false,
          isOrderError: false,
        },
      } as Pick<State, NameSpace.Order>;

      const result = getIsOrderError(state);

      expect(result).toBe(false);
    });
  });

  describe('Order state combinations', () => {
    it('should handle initial state (no loading, no success, no error)', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: false,
          isOrderError: false,
        },
      } as Pick<State, NameSpace.Order>;

      expect(getIsOrderLoading(state)).toBe(false);
      expect(getIsOrderSuccess(state)).toBe(false);
      expect(getIsOrderError(state)).toBe(false);
    });

    it('should handle loading state', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: true,
          isOrderSuccess: false,
          isOrderError: false,
        },
      } as Pick<State, NameSpace.Order>;

      expect(getIsOrderLoading(state)).toBe(true);
      expect(getIsOrderSuccess(state)).toBe(false);
      expect(getIsOrderError(state)).toBe(false);
    });

    it('should handle success state', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: true,
          isOrderError: false,
        },
      } as Pick<State, NameSpace.Order>;

      expect(getIsOrderLoading(state)).toBe(false);
      expect(getIsOrderSuccess(state)).toBe(true);
      expect(getIsOrderError(state)).toBe(false);
    });

    it('should handle error state', () => {
      const state = {
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: false,
          isOrderError: true,
        },
      } as Pick<State, NameSpace.Order>;

      expect(getIsOrderLoading(state)).toBe(false);
      expect(getIsOrderSuccess(state)).toBe(false);
      expect(getIsOrderError(state)).toBe(true);
    });
  });
});
