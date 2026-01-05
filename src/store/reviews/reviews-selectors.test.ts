import {
  getReviews,
  getIsReviewsLoading,
  getIsReviewsFetchingError,
  getDisplayedReviewsCount,
  getSortedReviews,
  getDisplayedReviews,
  getHasMoreReviews,
  getIsSubmitting,
  getIsSubmittingFailed,
  getIsSubmittingSuccess,
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
    isSubmitting: false,
    isSubmittingFailed: false,
    isSubmittingSuccess: false,
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

  describe('Submit status selectors', () => {
    it('getIsSubmitting should return false when not submitting', () => {
      expect(getIsSubmitting(state)).toBe(false);
    });

    it('getIsSubmitting should return true when submitting', () => {
      const submittingState = {
        [NameSpace.Reviews]: { ...reviewsState, isSubmitting: true },
      };
      expect(getIsSubmitting(submittingState)).toBe(true);
    });

    it('getIsSubmittingFailed should return false when no error', () => {
      expect(getIsSubmittingFailed(state)).toBe(false);
    });

    it('getIsSubmittingFailed should return true when submission failed', () => {
      const failedState = {
        [NameSpace.Reviews]: { ...reviewsState, isSubmittingFailed: true },
      };
      expect(getIsSubmittingFailed(failedState)).toBe(true);
    });

    it('getIsSubmittingSuccess should return false when not successful', () => {
      expect(getIsSubmittingSuccess(state)).toBe(false);
    });

    it('getIsSubmittingSuccess should return true when submission successful', () => {
      const successState = {
        [NameSpace.Reviews]: { ...reviewsState, isSubmittingSuccess: true },
      };
      expect(getIsSubmittingSuccess(successState)).toBe(true);
    });
  });

  describe('Submit status combinations', () => {
    it('should handle submitting state', () => {
      const submittingState = {
        [NameSpace.Reviews]: {
          ...reviewsState,
          isSubmitting: true,
          isSubmittingSuccess: false,
          isSubmittingFailed: false,
        },
      };

      expect(getIsSubmitting(submittingState)).toBe(true);
      expect(getIsSubmittingSuccess(submittingState)).toBe(false);
      expect(getIsSubmittingFailed(submittingState)).toBe(false);
    });

    it('should handle success state', () => {
      const successState = {
        [NameSpace.Reviews]: {
          ...reviewsState,
          isSubmitting: false,
          isSubmittingSuccess: true,
          isSubmittingFailed: false,
        },
      };

      expect(getIsSubmitting(successState)).toBe(false);
      expect(getIsSubmittingSuccess(successState)).toBe(true);
      expect(getIsSubmittingFailed(successState)).toBe(false);
    });

    it('should handle error state', () => {
      const errorState = {
        [NameSpace.Reviews]: {
          ...reviewsState,
          isSubmitting: false,
          isSubmittingSuccess: false,
          isSubmittingFailed: true,
        },
      };

      expect(getIsSubmitting(errorState)).toBe(false);
      expect(getIsSubmittingSuccess(errorState)).toBe(false);
      expect(getIsSubmittingFailed(errorState)).toBe(true);
    });

    it('should handle reset state (all flags false)', () => {
      const resetState = {
        [NameSpace.Reviews]: {
          ...reviewsState,
          isSubmitting: false,
          isSubmittingSuccess: false,
          isSubmittingFailed: false,
        },
      };

      expect(getIsSubmitting(resetState)).toBe(false);
      expect(getIsSubmittingSuccess(resetState)).toBe(false);
      expect(getIsSubmittingFailed(resetState)).toBe(false);
    });
  });
});
