import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore, makeFakeCamera } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import AddCameraToCartModal from './add-camera-to-cart-modal';

describe('Component: AddCameraToCartModal', () => {
  const mockOnModalClose = vi.fn();
  const mockCamera = makeFakeCamera();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  const renderComponent = (isOpen = true, selectedCamera = mockCamera) => {
    const { withStoreComponent } = withStore(
      <AddCameraToCartModal
        isOpen={isOpen}
        onModalClose={mockOnModalClose}
      />,
      makeFakeStore({
        [NameSpace.Modals]: {
          selectedCameraForCart: selectedCamera,
          isAddToCartModalOpen: isOpen,
          isAddCameraToCartSuccessModalOpen: false,
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

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(document.querySelector('.modal.is-active')).toBeInTheDocument();
  });

  it('should not render active modal when isOpen is false', () => {
    renderComponent(false);

    expect(document.querySelector('.modal:not(.is-active)')).toBeInTheDocument();
    expect(document.querySelector('.modal.is-active')).not.toBeInTheDocument();
  });

  it('should render camera information correctly', () => {
    renderComponent();

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.category)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.level)).toBeInTheDocument();
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

  it('should call onModalClose when Escape key is pressed', () => {
    renderComponent();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnModalClose).toHaveBeenCalledTimes(1);
  });

});
