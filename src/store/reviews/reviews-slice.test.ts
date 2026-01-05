import { reviewsSlice, showMoreReviews, resetSubmitStatus } from './reviews-slice';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
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
    isSubmitting: false,
    isSubmittingFailed: false,
    isSubmittingSuccess: false,
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

  describe('postReviewAction', () => {
    const newReview: Review = {
      id: '3',
      createAt: '2024-01-01T12:00:00.000Z',
      cameraId: 1,
      userName: 'NewUser',
      advantage: 'Great camera',
      disadvantage: 'Heavy',
      review: 'Overall very good',
      rating: 5,
    };

    it('should handle postReviewAction.pending', () => {
      const action = { type: postReviewAction.pending.type };
      const state = reviewsSlice.reducer(initialState, action);

      expect(state.isSubmitting).toBe(true);
      expect(state.isSubmittingSuccess).toBe(false);
      expect(state.isSubmittingFailed).toBe(false);
    });

    it('should handle postReviewAction.fulfilled', () => {
      const stateWithReviews: ReviewsState = {
        ...initialState,
        reviews: [review1],
        isSubmitting: true,
      };

      const action = {
        type: postReviewAction.fulfilled.type,
        payload: newReview,
      };
      const state = reviewsSlice.reducer(stateWithReviews, action);

      expect(state.reviews).toEqual([review1, newReview]);
      expect(state.isSubmitting).toBe(false);
      expect(state.isSubmittingSuccess).toBe(true);
      expect(state.isSubmittingFailed).toBe(false);
    });

    it('should handle postReviewAction.rejected', () => {
      const submittingState: ReviewsState = {
        ...initialState,
        isSubmitting: true,
      };

      const action = { type: postReviewAction.rejected.type };
      const state = reviewsSlice.reducer(submittingState, action);

      expect(state.isSubmitting).toBe(false);
      expect(state.isSubmittingSuccess).toBe(false);
      expect(state.isSubmittingFailed).toBe(true);
    });

    it('should reset previous success state when starting new submission', () => {
      const stateWithSuccess: ReviewsState = {
        ...initialState,
        isSubmittingSuccess: true,
      };

      const action = { type: postReviewAction.pending.type };
      const state = reviewsSlice.reducer(stateWithSuccess, action);

      expect(state.isSubmitting).toBe(true);
      expect(state.isSubmittingSuccess).toBe(false);
    });

    it('should reset previous error state when starting new submission', () => {
      const stateWithError: ReviewsState = {
        ...initialState,
        isSubmittingFailed: true,
      };

      const action = { type: postReviewAction.pending.type };
      const state = reviewsSlice.reducer(stateWithError, action);

      expect(state.isSubmitting).toBe(true);
      expect(state.isSubmittingFailed).toBe(false);
    });
  });

  describe('resetSubmitStatus', () => {
    it('should reset all submit status flags', () => {
      const stateWithSuccess: ReviewsState = {
        ...initialState,
        isSubmitting: false,
        isSubmittingSuccess: true,
        isSubmittingFailed: false,
      };

      const state = reviewsSlice.reducer(stateWithSuccess, resetSubmitStatus());

      expect(state.isSubmitting).toBe(false);
      expect(state.isSubmittingSuccess).toBe(false);
      expect(state.isSubmittingFailed).toBe(false);
    });

    it('should reset from error state', () => {
      const stateWithError: ReviewsState = {
        ...initialState,
        isSubmitting: false,
        isSubmittingSuccess: false,
        isSubmittingFailed: true,
      };

      const state = reviewsSlice.reducer(stateWithError, resetSubmitStatus());

      expect(state.isSubmitting).toBe(false);
      expect(state.isSubmittingSuccess).toBe(false);
      expect(state.isSubmittingFailed).toBe(false);
    });

    it('should reset from submitting state', () => {
      const stateSubmitting: ReviewsState = {
        ...initialState,
        isSubmitting: true,
        isSubmittingSuccess: false,
        isSubmittingFailed: false,
      };

      const state = reviewsSlice.reducer(stateSubmitting, resetSubmitStatus());

      expect(state.isSubmitting).toBe(false);
      expect(state.isSubmittingSuccess).toBe(false);
      expect(state.isSubmittingFailed).toBe(false);
    });
  });

  describe('Complete review submission flow', () => {
    it('should handle successful review submission flow', () => {
      const newReview: Review = {
        id: '3',
        createAt: '2024-01-01T12:00:00.000Z',
        cameraId: 1,
        userName: 'NewUser',
        advantage: 'Great',
        disadvantage: 'None',
        review: 'Perfect',
        rating: 5,
      };

      let state = reviewsSlice.reducer(
        initialState,
        { type: postReviewAction.pending.type }
      );
      expect(state.isSubmitting).toBe(true);

      state = reviewsSlice.reducer(
        state,
        { type: postReviewAction.fulfilled.type, payload: newReview }
      );
      expect(state.isSubmittingSuccess).toBe(true);
      expect(state.reviews).toContain(newReview);

      state = reviewsSlice.reducer(state, resetSubmitStatus());
      expect(state.isSubmittingSuccess).toBe(false);
    });

    it('should handle failed review submission flow', () => {
      let state = reviewsSlice.reducer(
        initialState,
        { type: postReviewAction.pending.type }
      );
      expect(state.isSubmitting).toBe(true);

      state = reviewsSlice.reducer(
        state,
        { type: postReviewAction.rejected.type }
      );
      expect(state.isSubmittingFailed).toBe(true);
      expect(state.isSubmitting).toBe(false);

      state = reviewsSlice.reducer(state, resetSubmitStatus());
      expect(state.isSubmittingFailed).toBe(false);
    });

    it('should handle retry after failed submission', () => {
      const newReview: Review = {
        id: '3',
        createAt: '2024-01-01T12:00:00.000Z',
        cameraId: 1,
        userName: 'NewUser',
        advantage: 'Great',
        disadvantage: 'None',
        review: 'Perfect',
        rating: 5,
      };

      let state = reviewsSlice.reducer(
        initialState,
        { type: postReviewAction.rejected.type }
      );
      expect(state.isSubmittingFailed).toBe(true);

      state = reviewsSlice.reducer(
        state,
        { type: postReviewAction.pending.type }
      );
      expect(state.isSubmitting).toBe(true);
      expect(state.isSubmittingFailed).toBe(false);

      state = reviewsSlice.reducer(
        state,
        { type: postReviewAction.fulfilled.type, payload: newReview }
      );
      expect(state.isSubmittingSuccess).toBe(true);
      expect(state.isSubmittingFailed).toBe(false);
    });
  });
});
