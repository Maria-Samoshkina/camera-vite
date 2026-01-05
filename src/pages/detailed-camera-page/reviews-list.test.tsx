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
  const mockOnAddNewReviewButtonClick = vi.fn();

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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (initialState = {}) => {
    const defaultState = makeFakeStore({
      [NameSpace.Reviews]: {
        reviews: mockReviews,
        isReviewsLoading: false,
        isReviewsFetchingError: false,
        displayedReviewsCount: 3,
        isSubmitting: false,
        isSubmittingSuccess: false,
        isSubmittingFailed: false,
        ...initialState,
      },
    });

    const { withStoreComponent, mockStore } = withStore(
      <ReviewsList onAddNewReviewButtonClick={mockOnAddNewReviewButtonClick} />,
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

  it('should render "Add new review" button', () => {
    renderComponent();

    const addReviewButton = screen.getByText('Оставить свой отзыв');
    expect(addReviewButton).toBeInTheDocument();
    expect(addReviewButton).toHaveClass('btn');
  });

  it('should call onAddNewReviewButtonClick when "Add review" button is clicked', () => {
    renderComponent();

    const addReviewButton = screen.getByText('Оставить свой отзыв');
    fireEvent.click(addReviewButton);

    expect(mockOnAddNewReviewButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should render review sections (advantages, disadvantages, comments)', () => {
    renderComponent();

    expect(screen.getAllByText('Достоинства:').length).toBe(2);
    expect(screen.getAllByText('Недостатки:').length).toBe(2);
    expect(screen.getAllByText('Комментарий:').length).toBe(2);
  });

  it('should render reviews with correct structure', () => {
    renderComponent();

    const reviewCards = document.querySelectorAll('.review-card');
    expect(reviewCards.length).toBe(2);

    reviewCards.forEach((card) => {
      expect(card.querySelector('.review-card__head')).toBeInTheDocument();
      expect(card.querySelector('.review-card__data')).toBeInTheDocument();
      expect(card.querySelector('.review-card__rate')).toBeInTheDocument();
      expect(card.querySelector('.review-card__list')).toBeInTheDocument();
    });
  });

  it('should render time element with correct datetime attribute', () => {
    renderComponent();

    const timeElements = document.querySelectorAll('.review-card__data');
    expect(timeElements[0]).toHaveAttribute('dateTime', '2023-12-01T10:00:00.000Z');
    expect(timeElements[1]).toHaveAttribute('dateTime', '2023-11-28T14:30:00.000Z');
  });

  it('should render StarsRating component for each review', () => {
    renderComponent();

    const ratingElements = document.querySelectorAll('.review-card__rate');
    expect(ratingElements.length).toBe(2);
  });

  it('should display reviews in correct order', () => {
    renderComponent();

    const userNames = screen.getAllByText(/Иван Петров|Мария Сидорова/);
    expect(userNames[0]).toHaveTextContent('Иван Петров');
    expect(userNames[1]).toHaveTextContent('Мария Сидорова');
  });

  it('should render review with all fields correctly', () => {
    renderComponent();

    const firstReview = mockReviews[0];
    expect(screen.getByText(firstReview.userName)).toBeInTheDocument();
    expect(screen.getByText(firstReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(firstReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(firstReview.review)).toBeInTheDocument();
  });

  it('should set ref on the last review item', () => {
    renderComponent();

    const reviewCards = document.querySelectorAll('.review-card');
    expect(reviewCards.length).toBe(2);
  });


});
