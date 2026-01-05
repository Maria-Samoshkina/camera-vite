import { describe, it, expect } from 'vitest';
import { couponSlice, applyCoupon, resetCoupon } from './coupon-slice';
import { CouponState } from '../../types/state';
import { checkCouponAction } from '../api-actions';

describe('Coupon Slice', () => {
  const initialState: CouponState = {
    coupon: null,
    discount: 0,
    isCouponValid: null,
    isCouponChecking: false,
    isCouponFetchingError: false,
  };

  describe('Initial state', () => {
    it('should return initial state when called with undefined', () => {
      const result = couponSlice.reducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });
  });

  describe('applyCoupon reducer', () => {
    it('should apply coupon with discount', () => {
      const result = couponSlice.reducer(initialState, applyCoupon(15));

      expect(result.discount).toBe(15);
      expect(result.isCouponValid).toBe(true);
    });

    it('should apply different discount values', () => {
      const discountValues = [5, 10, 15, 20, 25];

      discountValues.forEach((discount) => {
        const result = couponSlice.reducer(initialState, applyCoupon(discount));

        expect(result.discount).toBe(discount);
        expect(result.isCouponValid).toBe(true);
      });
    });

    it('should override previous discount', () => {
      const stateWithDiscount: CouponState = {
        ...initialState,
        discount: 10,
        isCouponValid: true,
      };

      const result = couponSlice.reducer(stateWithDiscount, applyCoupon(20));

      expect(result.discount).toBe(20);
      expect(result.isCouponValid).toBe(true);
    });
  });

  describe('resetCoupon reducer', () => {
    it('should reset coupon to initial state', () => {
      const stateWithCoupon: CouponState = {
        coupon: 'DISCOUNT15',
        discount: 15,
        isCouponValid: true,
        isCouponChecking: false,
        isCouponFetchingError: false,
      };

      const result = couponSlice.reducer(stateWithCoupon, resetCoupon());

      expect(result.coupon).toBeNull();
      expect(result.discount).toBe(0);
      expect(result.isCouponValid).toBeNull();
    });

    it('should not affect checking and error states', () => {
      const stateWithCoupon: CouponState = {
        coupon: 'DISCOUNT10',
        discount: 10,
        isCouponValid: true,
        isCouponChecking: true,
        isCouponFetchingError: true,
      };

      const result = couponSlice.reducer(stateWithCoupon, resetCoupon());

      expect(result.isCouponChecking).toBe(true);
      expect(result.isCouponFetchingError).toBe(true);
    });

    it('should reset already reset state without errors', () => {
      const result = couponSlice.reducer(initialState, resetCoupon());

      expect(result).toEqual(initialState);
    });
  });

  describe('checkCouponAction extraReducers', () => {
    describe('pending', () => {
      it('should set checking state to true', () => {
        const action = { type: checkCouponAction.pending.type };
        const result = couponSlice.reducer(initialState, action);

        expect(result.isCouponChecking).toBe(true);
        expect(result.isCouponFetchingError).toBe(false);
      });

      it('should reset error state when checking starts', () => {
        const stateWithError: CouponState = {
          ...initialState,
          isCouponFetchingError: true,
        };

        const action = { type: checkCouponAction.pending.type };
        const result = couponSlice.reducer(stateWithError, action);

        expect(result.isCouponChecking).toBe(true);
        expect(result.isCouponFetchingError).toBe(false);
      });
    });

    describe('fulfilled', () => {
      it('should set coupon data when check is successful', () => {
        const payload = {
          coupon: 'DISCOUNT15',
          discount: 15,
        };

        const action = {
          type: checkCouponAction.fulfilled.type,
          payload,
        };

        const result = couponSlice.reducer(initialState, action);

        expect(result.coupon).toBe('DISCOUNT15');
        expect(result.discount).toBe(15);
        expect(result.isCouponValid).toBe(true);
        expect(result.isCouponChecking).toBe(false);
        expect(result.isCouponFetchingError).toBe(false);
      });

      it('should handle different coupon codes and discounts', () => {
        const testCases = [
          { coupon: 'SAVE10', discount: 10 },
          { coupon: 'PROMO20', discount: 20 },
          { coupon: 'DEAL25', discount: 25 },
        ];

        testCases.forEach((payload) => {
          const action = {
            type: checkCouponAction.fulfilled.type,
            payload,
          };

          const result = couponSlice.reducer(initialState, action);

          expect(result.coupon).toBe(payload.coupon);
          expect(result.discount).toBe(payload.discount);
          expect(result.isCouponValid).toBe(true);
        });
      });

      it('should override previous coupon when new one is applied', () => {
        const stateWithCoupon: CouponState = {
          coupon: 'OLD10',
          discount: 10,
          isCouponValid: true,
          isCouponChecking: false,
          isCouponFetchingError: false,
        };

        const payload = {
          coupon: 'NEW20',
          discount: 20,
        };

        const action = {
          type: checkCouponAction.fulfilled.type,
          payload,
        };

        const result = couponSlice.reducer(stateWithCoupon, action);

        expect(result.coupon).toBe('NEW20');
        expect(result.discount).toBe(20);
      });
    });

    describe('rejected', () => {
      it('should set error state when check fails', () => {
        const action = { type: checkCouponAction.rejected.type };
        const result = couponSlice.reducer(initialState, action);

        expect(result.isCouponValid).toBe(false);
        expect(result.isCouponChecking).toBe(false);
        expect(result.isCouponFetchingError).toBe(true);
      });

      it('should reset checking state on error', () => {
        const stateChecking: CouponState = {
          ...initialState,
          isCouponChecking: true,
        };

        const action = { type: checkCouponAction.rejected.type };
        const result = couponSlice.reducer(stateChecking, action);

        expect(result.isCouponChecking).toBe(false);
        expect(result.isCouponValid).toBe(false);
        expect(result.isCouponFetchingError).toBe(true);
      });

      it('should not affect coupon and discount values on rejection', () => {
        const stateWithCoupon: CouponState = {
          coupon: 'DISCOUNT10',
          discount: 10,
          isCouponValid: true,
          isCouponChecking: true,
          isCouponFetchingError: false,
        };

        const action = { type: checkCouponAction.rejected.type };
        const result = couponSlice.reducer(stateWithCoupon, action);

        expect(result.coupon).toBe('DISCOUNT10');
        expect(result.discount).toBe(10);
      });
    });
  });

  describe('Complex scenarios', () => {
    it('should handle multiple coupon applications', () => {
      let state = couponSlice.reducer(initialState, applyCoupon(10));
      expect(state.discount).toBe(10);

      state = couponSlice.reducer(state, applyCoupon(15));
      expect(state.discount).toBe(15);

      state = couponSlice.reducer(state, resetCoupon());
      expect(state.discount).toBe(0);
    });

    it('should handle check-apply-reset flow', () => {
      const checkAction = {
        type: checkCouponAction.fulfilled.type,
        payload: { coupon: 'TEST10', discount: 10 },
      };

      let state = couponSlice.reducer(initialState, checkAction);
      expect(state.coupon).toBe('TEST10');
      expect(state.discount).toBe(10);
      expect(state.isCouponValid).toBe(true);

      state = couponSlice.reducer(state, resetCoupon());
      expect(state.coupon).toBeNull();
      expect(state.discount).toBe(0);
      expect(state.isCouponValid).toBeNull();
    });

    it('should handle error recovery flow', () => {
      const rejectAction = { type: checkCouponAction.rejected.type };
      let state = couponSlice.reducer(initialState, rejectAction);
      expect(state.isCouponFetchingError).toBe(true);
      expect(state.isCouponValid).toBe(false);

      const successAction = {
        type: checkCouponAction.fulfilled.type,
        payload: { coupon: 'VALID', discount: 15 },
      };
      state = couponSlice.reducer(state, successAction);
      expect(state.isCouponFetchingError).toBe(false);
      expect(state.isCouponValid).toBe(true);
      expect(state.coupon).toBe('VALID');
    });
  });
});
