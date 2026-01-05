import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  cartSlice,
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  changeQuantity,
  deleteFromCart,
} from './cart-slice';
import { makeFakeCamera } from '../../utils-mocks/mocks';
import { CartState } from '../../types/state';
import { CartItem } from '../../types/camera';
import { createOrderAction } from '../api-actions';

vi.mock('../../utils/cart-storage/cart-storage', () => ({
  getCartItemsFromStorage: vi.fn(() => []),
  saveCartItemsFromStorage: vi.fn(),
}));

describe('Cart Slice', () => {
  const mockCamera1 = makeFakeCamera();
  const mockCamera2 = { ...makeFakeCamera(), id: 999 };

  let initialState: CartState;

  beforeEach(() => {
    initialState = {
      camerasInCart: [],
    };
  });

  describe('addToCart', () => {
    it('should add new camera to empty cart', () => {
      const result = cartSlice.reducer(initialState, addToCart(mockCamera1));

      expect(result.camerasInCart.length).toBe(1);
      expect(result.camerasInCart[0].camera).toEqual(mockCamera1);
      expect(result.camerasInCart[0].quantity).toBe(1);
    });

    it('should increase quantity if camera already exists in cart', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 1 }],
      };

      const result = cartSlice.reducer(stateWithCamera, addToCart(mockCamera1));

      expect(result.camerasInCart.length).toBe(1);
      expect(result.camerasInCart[0].quantity).toBe(2);
    });

    it('should add multiple different cameras to cart', () => {
      let state = cartSlice.reducer(initialState, addToCart(mockCamera1));
      state = cartSlice.reducer(state, addToCart(mockCamera2));

      expect(state.camerasInCart.length).toBe(2);
      expect(state.camerasInCart[0].camera.id).toBe(mockCamera1.id);
      expect(state.camerasInCart[1].camera.id).toBe(mockCamera2.id);
    });
  });

  describe('decreaseQuantity', () => {
    it('should decrease quantity of camera in cart', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 3 }],
      };

      const cartItem: CartItem = { camera: mockCamera1, quantity: 3 };
      const result = cartSlice.reducer(stateWithCamera, decreaseQuantity(cartItem));

      expect(result.camerasInCart[0].quantity).toBe(2);
    });

    it('should not decrease quantity below 0', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 0 }],
      };

      const cartItem: CartItem = { camera: mockCamera1, quantity: 0 };
      const result = cartSlice.reducer(stateWithCamera, decreaseQuantity(cartItem));

      expect(result.camerasInCart[0].quantity).toBe(0);
    });

    it('should not affect other cameras in cart', () => {
      const stateWithCameras: CartState = {
        camerasInCart: [
          { camera: mockCamera1, quantity: 2 },
          { camera: mockCamera2, quantity: 3 },
        ],
      };

      const cartItem: CartItem = { camera: mockCamera1, quantity: 2 };
      const result = cartSlice.reducer(stateWithCameras, decreaseQuantity(cartItem));

      expect(result.camerasInCart[0].quantity).toBe(1);
      expect(result.camerasInCart[1].quantity).toBe(3);
    });
  });

  describe('increaseQuantity', () => {
    it('should increase quantity of camera in cart', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 1 }],
      };

      const cartItem: CartItem = { camera: mockCamera1, quantity: 1 };
      const result = cartSlice.reducer(stateWithCamera, increaseQuantity(cartItem));

      expect(result.camerasInCart[0].quantity).toBe(2);
    });

    it('should not increase quantity above 9', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 9 }],
      };

      const cartItem: CartItem = { camera: mockCamera1, quantity: 9 };
      const result = cartSlice.reducer(stateWithCamera, increaseQuantity(cartItem));

      expect(result.camerasInCart[0].quantity).toBe(9);
    });

    it('should increase quantity from 8 to 9', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 8 }],
      };

      const cartItem: CartItem = { camera: mockCamera1, quantity: 8 };
      const result = cartSlice.reducer(stateWithCamera, increaseQuantity(cartItem));

      expect(result.camerasInCart[0].quantity).toBe(9);
    });
  });

  describe('changeQuantity', () => {
    it('should change quantity of camera in cart', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 1 }],
      };

      const result = cartSlice.reducer(
        stateWithCamera,
        changeQuantity({ cameraId: mockCamera1.id, newQuantity: 5 })
      );

      expect(result.camerasInCart[0].quantity).toBe(5);
    });

    it('should not change quantity if camera not found', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 2 }],
      };

      const result = cartSlice.reducer(
        stateWithCamera,
        changeQuantity({ cameraId: 9999, newQuantity: 5 })
      );

      expect(result.camerasInCart[0].quantity).toBe(2);
    });

    it('should allow setting quantity to any value', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 1 }],
      };

      const result = cartSlice.reducer(
        stateWithCamera,
        changeQuantity({ cameraId: mockCamera1.id, newQuantity: 9 })
      );

      expect(result.camerasInCart[0].quantity).toBe(9);
    });
  });

  describe('deleteFromCart', () => {
    it('should delete camera from cart', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 1 }],
      };

      const cartItem: CartItem = { camera: mockCamera1, quantity: 1 };
      const result = cartSlice.reducer(stateWithCamera, deleteFromCart(cartItem));

      expect(result.camerasInCart.length).toBe(0);
    });

    it('should only delete specified camera', () => {
      const stateWithCameras: CartState = {
        camerasInCart: [
          { camera: mockCamera1, quantity: 2 },
          { camera: mockCamera2, quantity: 3 },
        ],
      };

      const cartItem: CartItem = { camera: mockCamera1, quantity: 2 };
      const result = cartSlice.reducer(stateWithCameras, deleteFromCart(cartItem));

      expect(result.camerasInCart.length).toBe(1);
      expect(result.camerasInCart[0].camera.id).toBe(mockCamera2.id);
    });

    it('should not affect cart if camera not found', () => {
      const stateWithCamera: CartState = {
        camerasInCart: [{ camera: mockCamera1, quantity: 1 }],
      };

      const nonExistentCartItem: CartItem = { camera: mockCamera2, quantity: 1 };
      const result = cartSlice.reducer(stateWithCamera, deleteFromCart(nonExistentCartItem));

      expect(result.camerasInCart.length).toBe(1);
      expect(result.camerasInCart[0].camera.id).toBe(mockCamera1.id);
    });
  });

  describe('extraReducers', () => {
    it('should clear cart when order is successfully created', () => {
      const stateWithCameras: CartState = {
        camerasInCart: [
          { camera: mockCamera1, quantity: 2 },
          { camera: mockCamera2, quantity: 1 },
        ],
      };

      const result = cartSlice.reducer(
        stateWithCameras,
        createOrderAction.fulfilled(undefined, '', { camerasIds: [1], coupon: null })
      );

      expect(result.camerasInCart.length).toBe(0);
      expect(result.camerasInCart).toEqual([]);
    });
  });
});
