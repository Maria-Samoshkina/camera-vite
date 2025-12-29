import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withStore, withHistory } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import OrderSuccessModal from './order-success-modal';
import { createMemoryHistory } from 'history';

describe('Component: OrderSuccessModal', () => {
  const mockOnModalClose = vi.fn();
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    vi.clearAllMocks();
    mockHistory.push('/card');
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  const renderComponent = (isOpen = true, isOrderSuccess = true, isOrderError = false) => {
    const withHistoryComponent = withHistory(
      <OrderSuccessModal
        isOpen={isOpen}
        onModalClose={mockOnModalClose}
      />,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Order]: {
          isOrderLoading: false,
          isOrderSuccess: isOrderSuccess,
          isOrderError: isOrderError,
        }
      })
    );

    return render(withStoreComponent);
  };

  it('should render modal when isOpen is true', () => {
    renderComponent();

    expect(document.querySelector('.modal.is-active')).toBeInTheDocument();
  });

  it('should render success message when order is successful', () => {
    renderComponent(true, true, false);

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });

  it('should render error message when order has error', () => {
    renderComponent(true, false, true);

    expect(screen.getByText('Упс, покупка не удалась!')).toBeInTheDocument();
  });

  it('should render "Вернуться к покупкам" button on success', () => {
    renderComponent(true, true, false);

    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
    expect(screen.queryByText('Попробовать снова')).not.toBeInTheDocument();
  });

  it('should render "Попробовать снова" button on error', () => {
    renderComponent(true, false, true);

    expect(screen.getByText('Попробовать снова')).toBeInTheDocument();
    expect(screen.queryByText('Вернуться к покупкам')).not.toBeInTheDocument();
  });

  it('should call onModalClose when close button is clicked', () => {
    renderComponent();

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(mockOnModalClose).toHaveBeenCalledTimes(1);
  });

  it('should call onModalClose when overlay is clicked', () => {
    renderComponent();

    const overlay = document.querySelector('.modal__overlay');
    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(mockOnModalClose).toHaveBeenCalledTimes(1);
  });

  it('should call onModalClose when success button is clicked', () => {
    renderComponent(true, true, false);

    const successButton = screen.getByText('Вернуться к покупкам');
    fireEvent.click(successButton);

    expect(mockOnModalClose).toHaveBeenCalledTimes(1);
  });

  it('should call onModalClose when error button is clicked', () => {
    renderComponent(true, false, true);

    const errorButton = screen.getByText('Попробовать снова');
    fireEvent.click(errorButton);

    expect(mockOnModalClose).toHaveBeenCalledTimes(1);
  });
});
