import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import { Review } from '../../types/review';
import ReviewsList from './reviews-list';
import { showMoreReviews } from '../../store/reviews/reviews-slice';

vi.mock('../../utils/reviews/date', () => ({
  formatReviewDate: (date: string) => `Formatted: ${date}`,
}));

const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('Component: ReviewsList', () => {
  const mockReviews: Review[] = [
    {
      id: 'review-1',
      createAt: '2023-12-01T10:00:00.000Z',
      cameraId: 1,
      userName: 'Иван Петров',
      advantage: 'Отличное качество фото',
      disadvantage: 'Тяжелая камера',
      review: 'Очень доволен покупкой. Рекомендую всем!',
      rating: 5,
    },
    {
      id: 'review-2',
      createAt: '2023-11-28T14:30:00.000Z',
      cameraId: 1,
      userName: 'Мария Сидорова',
      advantage: 'Хорошая цена',
      disadvantage: 'Слабая батарея',
      review: 'Неплохая камера за свои деньги.',
      rating: 4,
    },
  ];

  const renderComponent = (initialState = {}) => {
    const defaultState = makeFakeStore({
      [NameSpace.Reviews]: {
        reviews: mockReviews,
        isReviewsLoading: false,
        isReviewsFetchingError: false,
        displayedReviewsCount: 3,
        ...initialState,
      },
    });

    const { withStoreComponent, mockStore } = withStore(
      <ReviewsList />,
      defaultState
    );

    return {
      ...render(withStoreComponent),
      mockStore
    };
  };

  it('should render reviews section title', () => {
    renderComponent();

    expect(screen.getByRole('heading', { name: 'Отзывы' })).toBeInTheDocument();
  });

  it('should render all reviews', () => {
    renderComponent();

    expect(screen.getByText('Иван Петров')).toBeInTheDocument();
    expect(screen.getByText('Мария Сидорова')).toBeInTheDocument();
    expect(screen.getByText('Отличное качество фото')).toBeInTheDocument();
    expect(screen.getByText('Хорошая цена')).toBeInTheDocument();
  });

  it('should render review details correctly', () => {
    renderComponent();

    expect(screen.getByText('Очень доволен покупкой. Рекомендую всем!')).toBeInTheDocument();
    expect(screen.getByText('Тяжелая камера')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2023-12-01T10:00:00.000Z')).toBeInTheDocument();
    expect(document.querySelectorAll('.review-card__rate').length).toBeGreaterThan(0);
  });

  it('should show "Show more reviews" button when hasMoreReviews is true', () => {
    renderComponent({
      displayedReviewsCount: 1,
    });

    const showMoreButton = screen.getByText('Показать больше отзывов');
    expect(showMoreButton).toBeInTheDocument();
    expect(showMoreButton).toHaveClass('btn--purple');
  });

  it('should not show "Show more reviews" button when all reviews are displayed', () => {
    renderComponent({
      displayedReviewsCount: 5,
    });

    expect(screen.queryByText('Показать больше отзывов')).not.toBeInTheDocument();
  });

  it('should dispatch showMoreReviews when "Show more" button is clicked', () => {
    const { mockStore } = renderComponent({
      displayedReviewsCount: 1,
    });

    const showMoreButton = screen.getByText('Показать больше отзывов');
    fireEvent.click(showMoreButton);

    const actions = mockStore.getActions();
    expect(actions).toEqual([showMoreReviews()]);
  });

  it('should render empty state when no reviews', () => {
    renderComponent({
      reviews: [],
      displayedReviewsCount: 0,
    });

    expect(screen.getByRole('heading', { name: 'Отзывы' })).toBeInTheDocument();
    expect(screen.queryByText('Показать больше отзывов')).not.toBeInTheDocument();

    const reviewsList = document.querySelector('.review-block__list');
    expect(reviewsList).toBeInTheDocument();
    expect(reviewsList).toBeEmptyDOMElement();
  });
});
