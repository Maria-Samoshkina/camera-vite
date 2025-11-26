import {
  getReviews,
  getIsReviewsLoading,
  getIsReviewsFetchingError,
  getDisplayedReviewsCount,
  getSortedReviews,
  getDisplayedReviews,
  getHasMoreReviews
} from './reviews-selectors';
import { NameSpace } from '../../const';
import { ReviewsState } from '../../types/state';
import { Review } from '../../types/review';

describe('reviews selectors', () => {
  const review1: Review = {
    id: '1',
    createAt: '2023-11-01T10:00:00.000Z',
    cameraId: 1,
    userName: 'User1',
    advantage: 'Adv1',
    disadvantage: 'Dis1',
    review: 'Text1',
    rating: 5,
  };
  const review2: Review = {
    id: '2',
    createAt: '2023-12-01T10:00:00.000Z',
    cameraId: 1,
    userName: 'User2',
    advantage: 'Adv2',
    disadvantage: 'Dis2',
    review: 'Text2',
    rating: 4,
  };

  const reviewsState: ReviewsState = {
    reviews: [review1, review2],
    isReviewsLoading: false,
    isReviewsFetchingError: false,
    displayedReviewsCount: 1,
  };

  const state = {
    [NameSpace.Reviews]: reviewsState,
  };

  it('getReviews should return reviews array', () => {
    expect(getReviews(state)).toEqual([review1, review2]);
  });

  it('getIsReviewsLoading should return loading flag', () => {
    expect(getIsReviewsLoading(state)).toBe(false);
  });

  it('getIsReviewsFetchingError should return error flag', () => {
    expect(getIsReviewsFetchingError(state)).toBe(false);
  });

  it('getDisplayedReviewsCount should return count', () => {
    expect(getDisplayedReviewsCount(state)).toBe(1);
  });

  it('getSortedReviews should return reviews sorted by date desc', () => {
    const sorted = getSortedReviews(state);
    expect(sorted[0]).toEqual(review2);
    expect(sorted[1]).toEqual(review1);
  });

  it('getDisplayedReviews should return sliced reviews', () => {
    const displayed = getDisplayedReviews(state);
    expect(displayed).toEqual([review2]);
  });

  it('getHasMoreReviews should return true if more reviews exist', () => {
    expect(getHasMoreReviews(state)).toBe(true);
    const allDisplayedState = {
      [NameSpace.Reviews]: { ...reviewsState, displayedReviewsCount: 2 },
    };
    expect(getHasMoreReviews(allDisplayedState)).toBe(false);
  });
});
