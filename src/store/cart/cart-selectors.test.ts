import { describe, it, expect } from 'vitest';
import { getCamerasInCart } from './cart-selectors';
import { NameSpace } from '../../const';
import { makeFakeCamera } from '../../utils-mocks/mocks';
import { State } from '../../types/state';
import { CartItem } from '../../types/camera';

describe('Cart Selectors', () => {
  const mockCamera1 = makeFakeCamera();
  const mockCamera2 = makeFakeCamera();

  const mockCartItems: CartItem[] = [
    { camera: mockCamera1, quantity: 2 },
    { camera: mockCamera2, quantity: 1 },
  ];

  describe('getCamerasInCart', () => {
    it('should return cameras in cart from state', () => {
      const state = {
        [NameSpace.Cart]: {
          camerasInCart: mockCartItems,
        },
      } as Pick<State, NameSpace.Cart>;

      const result = getCamerasInCart(state);

      expect(result).toEqual(mockCartItems);
      expect(result.length).toBe(2);
    });

    it('should return empty array when cart is empty', () => {
      const state = {
        [NameSpace.Cart]: {
          camerasInCart: [],
        },
      } as Pick<State, NameSpace.Cart>;

      const result = getCamerasInCart(state);

      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should return correct cart items with quantities', () => {
      const state = {
        [NameSpace.Cart]: {
          camerasInCart: mockCartItems,
        },
      } as Pick<State, NameSpace.Cart>;

      const result = getCamerasInCart(state);

      expect(result[0].quantity).toBe(2);
      expect(result[1].quantity).toBe(1);
      expect(result[0].camera).toEqual(mockCamera1);
      expect(result[1].camera).toEqual(mockCamera2);
    });
  });
});
