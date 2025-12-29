import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import AddNewReviewModal from './add-new-review-modal';

describe('Component: AddNewReviewModal', () => {
  const mockOnModalClose = vi.fn();
  const mockCameraId = '1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  const renderComponent = (isOpen = true) => {
    const { withStoreComponent } = withStore(
      <AddNewReviewModal
        isOpen={isOpen}
        onModalClose={mockOnModalClose}
        id={mockCameraId}
      />,
      makeFakeStore({
        [NameSpace.Reviews]: {
          reviews: [],
          isReviewsLoading: false,
          isReviewsFetchingError: false,
          displayedReviewsCount: 3,
          isSubmitting: false,
          isSubmittingSuccess: false,
          isSubmittingFailed: false,
        }
      })
    );

    return render(withStoreComponent);
  };

  it('should render modal when isOpen is true', () => {
    renderComponent();

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(document.querySelector('.modal.is-active')).toBeInTheDocument();
  });

  it('should render form title correctly', () => {
    renderComponent();

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
  });

  it('should render rating field with legend', () => {
    renderComponent();

    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
    const rateFieldset = document.querySelector('.rate');
    expect(rateFieldset).toBeInTheDocument();
  });

  it('should render all form fields', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Введите ваше имя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Основные преимущества товара')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Главные недостатки товара')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Поделитесь своим опытом покупки')).toBeInTheDocument();
  });

  it('should render submit button', () => {
    renderComponent();

    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
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

  it('should not render active modal when isOpen is false', () => {
    renderComponent(false);

    expect(document.querySelector('.modal.is-active')).not.toBeInTheDocument();
  });
});
