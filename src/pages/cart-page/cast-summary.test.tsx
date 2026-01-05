import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { withHistory, withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import CartSummary from './cart-summary';
import { NameSpace } from '../../const';

describe('CartSummary Component', () => {
  const renderComponent = (preloadedState = {}) => {
    const defaultState = makeFakeStore();
    const state = { ...defaultState, ...preloadedState };
    const componentWithHistory = withHistory(<CartSummary />);
    const { withStoreComponent } = withStore(componentWithHistory, state);
    return render(withStoreComponent);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render cart summary section', () => {
    renderComponent();

    const summary = document.querySelector('.basket__summary');
    expect(summary).toBeInTheDocument();
  });

  it('should render promo code section', () => {
    renderComponent();

    expect(screen.getByText('Если у вас есть промокод на скидку, примените его в этом поле')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите промокод')).toBeInTheDocument();
  });

  it('should render promo code input and apply button', () => {
    renderComponent();

    const promoInput = screen.getByPlaceholderText('Введите промокод') ;
    const applyButton = screen.getByRole('button', { name: /Применить/i });

    expect(promoInput).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();
  });

  it('should render order summary with total, discount and total to pay', () => {
    renderComponent();

    const summaryItems = document.querySelectorAll('.basket__summary-item');
    expect(summaryItems.length).toBeGreaterThanOrEqual(3);

    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getByText('Скидка:')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
  });

  it('should render order button', () => {
    renderComponent();

    const orderButton = screen.getByRole('button', { name: /Оформить заказ/i });
    expect(orderButton).toBeInTheDocument();
  });

  it('should display loading state when order is being processed', () => {
    const stateWithLoading = {
      [NameSpace.Order]: {
        isOrderLoading: true,
      },
    };

    renderComponent(stateWithLoading);

    expect(screen.getByText('Оформляем заказ...')).toBeInTheDocument();
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should disable order button when order is loading', () => {
    const stateWithLoading = {
      [NameSpace.Order]: {
        isOrderLoading: true,
      },
    };

    renderComponent(stateWithLoading);

    const orderButton = screen.getByRole('button', { name: /Оформить заказ/i });
    expect(orderButton).toHaveAttribute('disabled');
  });

  it('should enable promo input when coupon is not valid yet', () => {
    const stateWithoutCoupon = {
      [NameSpace.Coupon]: {
        coupon: null,
        discount: 0,
        isCouponValid: null,
        isCouponChecking: false,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithoutCoupon);

    const promoInput = screen.getByPlaceholderText('Введите промокод') ;
    expect(promoInput).not.toBeDisabled();
  });

  it('should disable promo input and show success message when coupon is valid', () => {
    const stateWithValidCoupon = {
      [NameSpace.Coupon]: {
        coupon: 'VALIDCOUPON',
        discount: 10,
        isCouponValid: true,
        isCouponChecking: false,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithValidCoupon);

    const promoInput = screen.getByPlaceholderText<HTMLInputElement>(
      'Введите промокод'
    ); expect(promoInput).toBeDisabled();
    expect(promoInput.value).toBe('VALIDCOUPON');

    const successMessage = document.querySelector('.custom-input__success');
    expect(successMessage?.textContent).toBe('Промокод принят!');
  });

  it('should show error message when coupon is invalid', () => {
    const stateWithInvalidCoupon = {
      [NameSpace.Coupon]: {
        coupon: null,
        discount: 0,
        isCouponValid: false,
        isCouponChecking: false,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithInvalidCoupon);

    const errorMessage = document.querySelector('.custom-input__error');
    expect(errorMessage?.textContent).toBe('Промокод неверный');
  });

  it('should disable apply button when input is empty', () => {
    renderComponent();

    const applyButton = screen.getByRole('button', { name: /Применить/i });
    expect(applyButton).toHaveAttribute('disabled');
  });

  it('should disable apply button when checking coupon', () => {
    const stateWithChecking = {
      [NameSpace.Coupon]: {
        coupon: null,
        discount: 0,
        isCouponValid: null,
        isCouponChecking: true,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithChecking);

    const promoInput = screen.getByPlaceholderText('Введите промокод') ;
    fireEvent.change(promoInput, { target: { value: 'TESTCOUPON' } });

    const applyButton = screen.getByRole('button', { name: /Проверка/i });
    expect(applyButton).toHaveAttribute('disabled');
  });

  it('should show checking text on button when coupon is being checked', () => {
    const stateWithChecking = {
      [NameSpace.Coupon]: {
        coupon: null,
        discount: 0,
        isCouponValid: null,
        isCouponChecking: true,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithChecking);

    expect(screen.getByRole('button', { name: /Проверка/i })).toBeInTheDocument();
  });

  it('should disable apply button when coupon is already valid', () => {
    const stateWithValidCoupon = {
      [NameSpace.Coupon]: {
        coupon: 'VALIDCOUPON',
        discount: 10,
        isCouponValid: true,
        isCouponChecking: false,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithValidCoupon);

    const applyButton = screen.getByRole('button', { name: /Применить/i });
    expect(applyButton).toHaveAttribute('disabled');
  });

  it('should update promo input value when user types', () => {
    renderComponent();

    const promoInput = screen.getByPlaceholderText<HTMLInputElement>(
      'Введите промокод'
    ); fireEvent.change(promoInput, { target: { value: 'TEST123' } });

    expect(promoInput.value).toBe('TEST123');
  });

  it('should trim whitespace from promo input', () => {
    renderComponent();

    const promoInput = screen.getByPlaceholderText<HTMLInputElement>(
      'Введите промокод'
    ); fireEvent.change(promoInput, { target: { value: '  TEST123  ' } });

    expect(promoInput.value).toBe('TEST123');
  });

  it('should apply custom-input styles based on coupon validation state', () => {
    const stateWithValidCoupon = {
      [NameSpace.Coupon]: {
        coupon: 'VALIDCOUPON',
        discount: 10,
        isCouponValid: true,
        isCouponChecking: false,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithValidCoupon);

    const customInput = document.querySelector('.custom-input');
    expect(customInput).toHaveClass('is-valid');
  });

  it('should apply invalid style when coupon is invalid', () => {
    const stateWithInvalidCoupon = {
      [NameSpace.Coupon]: {
        coupon: null,
        discount: 0,
        isCouponValid: false,
        isCouponChecking: false,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithInvalidCoupon);

    const customInput = document.querySelector('.custom-input');
    expect(customInput).toHaveClass('is-invalid');
  });

  it('should render discount value in summary', () => {
    const stateWithDiscount = {
      [NameSpace.Coupon]: {
        coupon: 'DISCOUNT10',
        discount: 10,
        isCouponValid: true,
        isCouponChecking: false,
        isCouponFetchingError: false,
      },
    };

    renderComponent(stateWithDiscount);

    const discountElement = document.querySelector('.basket__summary-value--bonus');
    expect(discountElement).toBeInTheDocument();
    expect(discountElement?.textContent).toContain('₽');
  });

  it('should have correct CSS classes for summary sections', () => {
    renderComponent();

    expect(document.querySelector('.basket__summary')).toBeInTheDocument();
    expect(document.querySelector('.basket__promo')).toBeInTheDocument();
    expect(document.querySelector('.basket-form')).toBeInTheDocument();
    expect(document.querySelector('.basket__summary-order')).toBeInTheDocument();
  });

  it('should not render loading spinner when order is not loading', () => {
    const stateWithoutLoading = {
      [NameSpace.Order]: {
        isOrderLoading: false,
      },
    };

    renderComponent(stateWithoutLoading);

    const loadingDiv = document.querySelector('.basket__loading');
    expect(loadingDiv).not.toBeInTheDocument();
  });

  it('should render form with correct structure', () => {
    renderComponent();

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('action', '#');

    const label = form?.querySelector('label');
    expect(label).toBeInTheDocument();
  });
});
