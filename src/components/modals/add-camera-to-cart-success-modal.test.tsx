import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withStore, withHistory } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import AddCameraToCartSuccessModal from './add-camera-to-cart-success-modal';
import { createMemoryHistory } from 'history';

describe('Component: AddCameraToCartSuccessModal', () => {
  const mockOnModalClose = vi.fn();
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    vi.clearAllMocks();
    mockHistory.push('/');
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  const renderComponent = (isOpen = true) => {
    const withHistoryComponent = withHistory(
      <AddCameraToCartSuccessModal
        isOpen={isOpen}
        onModalClose={mockOnModalClose}
      />,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Modals]: {
          isAddToCartModalOpen: false,
          selectedCameraForCart: null,
          isAddCameraToCartSuccessModalOpen: isOpen,
          selectedCameraForRemoveFromCart: null,
          isRemoveCameraFromCartOpen: false,
          isOrderSuccessModalOpen: false,
          isAddNewReviewModalOpen: false,
          isReviewSuccessModalOpen: false,
        }
      })
    );

    return render(withStoreComponent);
  };

  it('should render modal when isOpen is true', () => {
    renderComponent();

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    expect(document.querySelector('.modal.is-active')).toBeInTheDocument();
  });

  it('should not render active modal when isOpen is false', () => {
    renderComponent(false);

    expect(document.querySelector('.modal.is-active')).not.toBeInTheDocument();
    expect(screen.queryByText('Товар успешно добавлен в корзину')).not.toBeInTheDocument();
  });

  it('should render action buttons correctly', () => {
    renderComponent();

    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
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

  it('should call onModalClose when "Продолжить покупки" button is clicked', () => {
    renderComponent();

    const continueButton = screen.getByText('Продолжить покупки');
    fireEvent.click(continueButton);

    expect(mockOnModalClose).toHaveBeenCalledTimes(1);
  });

  it('should render link to cart', () => {
    renderComponent();

    const cartLink = screen.getByText('Перейти в корзину');
    expect(cartLink).toHaveAttribute('href', '/card');
  });
});
