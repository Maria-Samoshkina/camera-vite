import { describe, it, expect } from 'vitest';
import {
  getCoupon,
  getDiscount,
  getIsCouponChecking,
  getIsCouponFetchingError,
  getIsCouponValid,
} from './coupon-selectors';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

describe('Coupon Selectors', () => {
  describe('getCoupon', () => {
    it('should return coupon code from state', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: 'DISCOUNT10',
          discount: 10,
          isCouponValid: true,
          isCouponChecking: false,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getCoupon(state);

      expect(result).toBe('DISCOUNT10');
    });

    it('should return null when no coupon is applied', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: null,
          discount: 0,
          isCouponValid: null,
          isCouponChecking: false,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getCoupon(state);

      expect(result).toBeNull();
    });
  });

  describe('getDiscount', () => {
    it('should return discount value from state', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: 'DISCOUNT15',
          discount: 15,
          isCouponValid: true,
          isCouponChecking: false,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getDiscount(state);

      expect(result).toBe(15);
    });

    it('should return 0 when no discount is applied', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: null,
          discount: 0,
          isCouponValid: null,
          isCouponChecking: false,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getDiscount(state);

      expect(result).toBe(0);
    });

    it('should return correct discount for various values', () => {
      const testCases = [5, 10, 15, 20, 25];

      testCases.forEach((discountValue) => {
        const state = {
          [NameSpace.Coupon]: {
            coupon: `DISCOUNT${discountValue}`,
            discount: discountValue,
            isCouponValid: true,
            isCouponChecking: false,
            isCouponFetchingError: false,
          },
        } as Pick<State, NameSpace.Coupon>;

        const result = getDiscount(state);
        expect(result).toBe(discountValue);
      });
    });
  });

  describe('getIsCouponChecking', () => {
    it('should return true when coupon is being checked', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: null,
          discount: 0,
          isCouponValid: null,
          isCouponChecking: true,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getIsCouponChecking(state);

      expect(result).toBe(true);
    });

    it('should return false when coupon is not being checked', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: 'DISCOUNT10',
          discount: 10,
          isCouponValid: true,
          isCouponChecking: false,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getIsCouponChecking(state);

      expect(result).toBe(false);
    });
  });

  describe('getIsCouponFetchingError', () => {
    it('should return true when there is a coupon fetching error', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: null,
          discount: 0,
          isCouponValid: false,
          isCouponChecking: false,
          isCouponFetchingError: true,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getIsCouponFetchingError(state);

      expect(result).toBe(true);
    });

    it('should return false when there is no error', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: 'DISCOUNT10',
          discount: 10,
          isCouponValid: true,
          isCouponChecking: false,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getIsCouponFetchingError(state);

      expect(result).toBe(false);
    });
  });

  describe('getIsCouponValid', () => {
    it('should return true when coupon is valid', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: 'DISCOUNT10',
          discount: 10,
          isCouponValid: true,
          isCouponChecking: false,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getIsCouponValid(state);

      expect(result).toBe(true);
    });

    it('should return false when coupon is invalid', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: null,
          discount: 0,
          isCouponValid: false,
          isCouponChecking: false,
          isCouponFetchingError: true,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getIsCouponValid(state);

      expect(result).toBe(false);
    });

    it('should return null when coupon validity is not determined', () => {
      const state = {
        [NameSpace.Coupon]: {
          coupon: null,
          discount: 0,
          isCouponValid: null,
          isCouponChecking: false,
          isCouponFetchingError: false,
        },
      } as Pick<State, NameSpace.Coupon>;

      const result = getIsCouponValid(state);

      expect(result).toBeNull();
    });
  });
});
