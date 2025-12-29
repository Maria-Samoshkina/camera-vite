import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import ReviewSuccessModal from './review-success-modal';

describe('Component: ReviewSuccessModal', () => {
  const mockOnModalClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  const renderComponent = (isOpen = true) => {
    const { withStoreComponent } = withStore(
      <ReviewSuccessModal
        isOpen={isOpen}
        onModalClose={mockOnModalClose}
      />,
      makeFakeStore()
    );

    return render(withStoreComponent);
  };

  it('should render modal when isOpen is true', () => {
    renderComponent();

    expect(screen.getByText('Спасибо за отзыв')).toBeInTheDocument();
    expect(document.querySelector('.modal.is-active')).toBeInTheDocument();
  });

  it('should have modal--narrow class', () => {
    renderComponent();

    expect(document.querySelector('.modal--narrow')).toBeInTheDocument();
  });

  it('should render continue button', () => {
    renderComponent();

    expect(screen.getByText('Вернуться к покупкам')).toBeInTheDocument();
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

  it('should call onModalClose when continue button is clicked', () => {
    renderComponent();

    const continueButton = screen.getByText('Вернуться к покупкам');
    fireEvent.click(continueButton);

    expect(mockOnModalClose).toHaveBeenCalledTimes(1);
  });

  it('should not render modal when isOpen is false', () => {
    renderComponent(false);

    expect(document.querySelector('.modal.is-active')).not.toBeInTheDocument();
  });
});
