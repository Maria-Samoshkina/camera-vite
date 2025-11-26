import { reviewsSlice, showMoreReviews } from './reviews-slice';
import { fetchReviewsAction } from '../api-actions';
import { ReviewsState } from '../../types/state';
import { Review } from '../../types/review';
import { INITIAL_REVIEWS_COUNT, REVIEWS_COUNT_STEP } from '../../const';

describe('reviewsSlice', () => {
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

  const initialState: ReviewsState = {
    reviews: [],
    isReviewsLoading: true,
    isReviewsFetchingError: false,
    displayedReviewsCount: INITIAL_REVIEWS_COUNT,
  };

  it('should handle initial state', () => {
    expect(reviewsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchReviewsAction.pending', () => {
    const action = { type: fetchReviewsAction.pending.type };
    const state = reviewsSlice.reducer(initialState, action);
    expect(state.isReviewsLoading).toBe(true);
    expect(state.isReviewsFetchingError).toBe(false);
  });

  it('should handle fetchReviewsAction.fulfilled', () => {
    const action = { type: fetchReviewsAction.fulfilled.type, payload: [review1, review2] };
    const state = reviewsSlice.reducer(initialState, action);
    expect(state.reviews).toEqual([review1, review2]);
    expect(state.isReviewsLoading).toBe(false);
    expect(state.isReviewsFetchingError).toBe(false);
  });

  it('should handle fetchReviewsAction.rejected', () => {
    const action = { type: fetchReviewsAction.rejected.type };
    const state = reviewsSlice.reducer(initialState, action);
    expect(state.isReviewsLoading).toBe(false);
    expect(state.isReviewsFetchingError).toBe(true);
  });

  it('should handle showMoreReviews', () => {
    const state = reviewsSlice.reducer(initialState, showMoreReviews());
    expect(state.displayedReviewsCount).toBe(INITIAL_REVIEWS_COUNT + REVIEWS_COUNT_STEP);
  });
});
