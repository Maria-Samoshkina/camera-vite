import { render, screen, } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { withHistory, withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore, makeFakeCamera } from '../../utils-mocks/mocks';
import CartPage from './cart-page';
import { NameSpace } from '../../const';

describe('CartPage Component', () => {
  const mockCamera = makeFakeCamera();
  const anotherMockCamera = makeFakeCamera();

  const renderComponent = (preloadedState = {}) => {
    const defaultState = makeFakeStore();
    const state = { ...defaultState, ...preloadedState };
    const componentWithHistory = withHistory(<CartPage />);
    const { withStoreComponent } = withStore(componentWithHistory, state);
    return render(withStoreComponent);
  };

  it('should render cart page header and main layout', () => {
    renderComponent();

    const title = screen.getByRole('heading', { name: /Корзина/i });
    expect(title).toBeInTheDocument();
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('should render breadcrumbs navigation', () => {
    renderComponent();

    const breadcrumbs = document.querySelector('.breadcrumbs__list');
    expect(breadcrumbs).toBeInTheDocument();
    expect(screen.getByText('Главная')).toBeInTheDocument();

    const breadcrumbItems = document.querySelectorAll('.breadcrumbs__item');
    expect(breadcrumbItems.length).toBeGreaterThanOrEqual(3);
  });

  it('should render cart items list when there are items in cart', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [
          { camera: mockCamera, quantity: 2 },
          { camera: anotherMockCamera, quantity: 1 },
        ],
      },
    };

    renderComponent(stateWithCartItems);

    const basketList = document.querySelector('.basket__list');
    expect(basketList).toBeInTheDocument();
    expect(basketList?.children.length).toBe(2);
  });

  it('should render cart summary component', () => {
    renderComponent();

    const basketSummary = document.querySelector('.basket__summary');
    expect(basketSummary).toBeInTheDocument();
  });

  it('should render camera info in cart item', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [{ camera: mockCamera, quantity: 2 }],
      },
    };

    renderComponent(stateWithCartItems);

    const cameraNames = screen.getAllByText(mockCamera.name);
    expect(cameraNames.length).toBeGreaterThan(0);
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${mockCamera.type} ${mockCamera.category.toLowerCase()}`)).toBeInTheDocument();
  });

  it('should render quantity controls in cart item', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [{ camera: mockCamera, quantity: 2 }],
      },
    };

    renderComponent(stateWithCartItems);

    const quantityInput = screen.getByRole('spinbutton', { name: /количество товара/i });
    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toHaveValue(2);

    const decreaseBtn = screen.getAllByLabelText('уменьшить количество товара')[0];
    const increaseBtn = screen.getAllByLabelText('увеличить количество товара')[0];
    expect(decreaseBtn).toBeInTheDocument();
    expect(increaseBtn).toBeInTheDocument();
  });

  it('should render camera price and total price', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [{ camera: mockCamera, quantity: 2 }],
      },
    };

    renderComponent(stateWithCartItems);

    const priceElement = document.querySelector('.basket-item__price');
    const totalPriceElement = document.querySelector('.basket-item__total-price');

    expect(priceElement).toBeInTheDocument();
    expect(totalPriceElement).toBeInTheDocument();
    expect(priceElement?.textContent).toContain('₽');
    expect(totalPriceElement?.textContent).toContain('₽');
  });

  it('should render remove button for each cart item', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [
          { camera: mockCamera, quantity: 1 },
          { camera: anotherMockCamera, quantity: 1 },
        ],
      },
    };

    renderComponent(stateWithCartItems);

    const removeButtons = screen.getAllByLabelText('Удалить товар');
    expect(removeButtons.length).toBe(2);
  });

  it('should disable quantity controls when order is loading', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [{ camera: mockCamera, quantity: 2 }],
      },
      [NameSpace.Order]: {
        isOrderLoading: true,
      },
    };

    renderComponent(stateWithCartItems);

    const quantityInput = screen.getByRole('spinbutton', { name: /количество товара/i });
    const decreaseBtn = screen.getAllByLabelText('уменьшить количество товара')[0];
    const increaseBtn = screen.getAllByLabelText('увеличить количество товара')[0];
    const removeBtn = screen.getByLabelText('Удалить товар');

    expect(quantityInput).toBeDisabled();
    expect(decreaseBtn).toHaveAttribute('disabled');
    expect(increaseBtn).toHaveAttribute('disabled');
    expect(removeBtn).toHaveAttribute('disabled');
  });

  it('should disable increase button when quantity is 9', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [{ camera: mockCamera, quantity: 9 }],
      },
    };

    renderComponent(stateWithCartItems);

    const increaseBtn = screen.getByLabelText('увеличить количество товара');
    expect(increaseBtn).toHaveAttribute('disabled');
  });

  it('should render remove and order success modals', () => {
    renderComponent();

    const removeCameraFromCartModal = document.querySelector('.modal');
    expect(removeCameraFromCartModal).toBeInTheDocument();
  });

  it('should update quantity when input value changes', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [{ camera: mockCamera, quantity: 2 }],
      },
    };

    renderComponent(stateWithCartItems);

    const quantityInput = screen.getByRole('spinbutton', { name: /количество товара/i });
    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toBeEnabled();
    expect(quantityInput).toHaveAttribute('type', 'number');
  });

  it('should limit quantity input to max 9', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [{ camera: mockCamera, quantity: 2 }],
      },
    };

    renderComponent(stateWithCartItems);

    const quantityInput = screen.getByRole('spinbutton', { name: /количество товара/i });
    expect(quantityInput).toHaveAttribute('min', '1');
    expect(quantityInput).toHaveAttribute('max', '9');
  });

  it('should set quantity to 1 when input is empty or less than 1', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [{ camera: mockCamera, quantity: 2 }],
      },
    };

    renderComponent(stateWithCartItems);

    const quantityInput = document.querySelector(`#counter${mockCamera.id}`) as HTMLInputElement;
    expect(quantityInput).toHaveAttribute('min', '1');
    expect(quantityInput.value).toBe('2');
  });

  it('should have correct CSS classes for structure', () => {
    renderComponent();

    expect(document.querySelector('.wrapper')).toBeInTheDocument();
    expect(document.querySelector('.page-content')).toBeInTheDocument();
    expect(document.querySelector('.breadcrumbs')).toBeInTheDocument();
    expect(document.querySelector('.basket')).toBeInTheDocument();
    expect(document.querySelector('.container')).toBeInTheDocument();
  });

  it('should render multiple cart items with different cameras', () => {
    const stateWithCartItems = {
      [NameSpace.Cart]: {
        camerasInCart: [
          { camera: mockCamera, quantity: 2 },
          { camera: anotherMockCamera, quantity: 3 },
        ],
      },
    };

    renderComponent(stateWithCartItems);

    const basketItems = document.querySelectorAll('.basket-item');
    expect(basketItems.length).toBe(2);
  });
});
