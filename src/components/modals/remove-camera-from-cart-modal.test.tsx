import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withStore, withHistory } from '../../utils-mocks/mock-components';
import { makeFakeStore, makeFakeCamera } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import RemoveCameraFromCartModal from './remove-camera-from-cart-modal';
import { createMemoryHistory } from 'history';

describe('Component: RemoveCameraFromCartModal', () => {
  const mockOnModalClose = vi.fn();
  const mockCamera = makeFakeCamera();
  const mockCartItem = {
    camera: mockCamera,
    quantity: 1,
  };
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    vi.clearAllMocks();
    mockHistory.push('/card');
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  const renderComponent = (isOpen = true) => {
    const withHistoryComponent = withHistory(
      <RemoveCameraFromCartModal
        isOpen={isOpen}
        onModalClose={mockOnModalClose}
      />,
      mockHistory
    );

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Modals]: {
          selectedCameraForRemoveFromCart: mockCartItem,
          isRemoveCameraFromCartOpen: isOpen,
          isAddToCartModalOpen: false,
          selectedCameraForCart: null,
          isAddCameraSuccessModalOpen: false,
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

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(document.querySelector('.modal.is-active')).toBeInTheDocument();
  });

  it('should not render active modal when isOpen is false', () => {
    renderComponent(false);

    expect(document.querySelector('.modal.is-active')).not.toBeInTheDocument();
  });

  it('should render camera information to be deleted', () => {
    renderComponent();

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.category)).toBeInTheDocument();
  });

  it('should render delete and cancel buttons', () => {
    renderComponent();

    expect(screen.getByText('Удалить')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
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

  it('should call onModalClose when cancel button is clicked', () => {
    renderComponent();

    const cancelButton = screen.getByText('Продолжить покупки');
    fireEvent.click(cancelButton);

    expect(mockOnModalClose).toHaveBeenCalledTimes(1);
  });
});
