import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuantityControl from './quantity-control';
import { makeFakeCamera, makeFakeStore } from '../../utils-mocks/mocks';
import { withStore } from '../../utils-mocks/mock-components';
import { changeQuantity } from '../../store/cart/cart-slice';
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY, NameSpace } from '../../const';
import { CartItem } from '../../types/camera';

describe('QuantityControl Component', () => {
  const mockCamera = makeFakeCamera();
  const baseCartItem: CartItem = { camera: mockCamera, quantity: 2 };

  const renderComponent = (
    cartItem: CartItem,
    {
      onDecrease = vi.fn(),
      onIncrease = vi.fn(),
      stateOverrides = {},
    }: {
      onDecrease?: (item: CartItem) => void;
      onIncrease?: (item: CartItem) => void;
      stateOverrides?: Partial<ReturnType<typeof makeFakeStore>>;
    } = {},
  ) => {
    const state = makeFakeStore(stateOverrides);
    const { withStoreComponent, mockStore } = withStore(
      <QuantityControl
        cartItem={cartItem}
        onDecreaseButtonClick={onDecrease}
        onIncreaseButtonClick={onIncrease}
      />,
      state,
    );

    return { ...render(withStoreComponent), mockStore, onDecrease, onIncrease };
  };

  it('should render input with correct value and limits', () => {
    renderComponent(baseCartItem);

    const input = screen.getByRole('spinbutton', { name: /количество товара/i });
    expect(input).toHaveValue(2);
    expect(input).toHaveAttribute('min', String(MIN_CART_QUANTITY));
    expect(input).toHaveAttribute('max', String(MAX_CART_QUANTITY));
  });

  it('should call handlers on decrease/increase clicks', () => {
    const onDecrease = vi.fn();
    const onIncrease = vi.fn();

    renderComponent(baseCartItem, { onDecrease, onIncrease });

    fireEvent.click(screen.getByLabelText('уменьшить количество товара'));
    fireEvent.click(screen.getByLabelText('увеличить количество товара'));

    expect(onDecrease).toHaveBeenCalledWith(baseCartItem);
    expect(onIncrease).toHaveBeenCalledWith(baseCartItem);
  });

  it('should dispatch changeQuantity on valid input change', () => {
    const { mockStore } = renderComponent(baseCartItem);

    const input = screen.getByRole('spinbutton', { name: /количество товара/i });
    fireEvent.change(input, { target: { value: '3' } });

    const actions = mockStore.getActions();
    expect(actions).toContainEqual(
      changeQuantity({ cameraId: mockCamera.id, newQuantity: 3 })
    );
  });

  it('should clamp to minimum on blur when value is invalid', () => {
    const { mockStore } = renderComponent(baseCartItem);

    const input = screen.getByRole('spinbutton', { name: /количество товара/i });
    fireEvent.blur(input, { target: { value: '0' } });

    const actions = mockStore.getActions();
    expect(actions).toContainEqual(
      changeQuantity({ cameraId: mockCamera.id, newQuantity: MIN_CART_QUANTITY })
    );
  });

  it('should disable controls when order is loading', () => {
    renderComponent(baseCartItem, {
      stateOverrides: {
        [NameSpace.Order]: {
          isOrderLoading: true,
          isOrderSuccess: false,
          isOrderError: false,
        },
      },
    });

    const input = screen.getByRole('spinbutton', { name: /количество товара/i });
    const decreaseBtn = screen.getByLabelText('уменьшить количество товара');
    const increaseBtn = screen.getByLabelText('увеличить количество товара');

    expect(input).toBeDisabled();
    expect(decreaseBtn).toHaveAttribute('disabled');
    expect(increaseBtn).toHaveAttribute('disabled');
  });
});
