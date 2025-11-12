import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { ReviewsState } from '../../types/state';
import { sortReviewsByDate } from '../../utils/reviews/reviews';


const getReviewsSlice = (state: Pick<State, NameSpace.Reviews>): ReviewsState => state[NameSpace.Reviews];

export const getReviews = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.reviews
);

export const getIsReviewsLoading = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.isReviewsLoading
);


export const getIsReviewsFetchingError = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.isReviewsFetchingError
);

export const getDisplayedReviewsCount = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.displayedReviewsCount
);


export const getSortedReviews = createSelector(
  [getReviews],
  (reviews) => sortReviewsByDate(reviews)
);

export const getDisplayedReviews = createSelector(
  [getSortedReviews , getDisplayedReviewsCount],
  (sortedReviews, displayedReviewsCount) => sortedReviews.slice (0, displayedReviewsCount));

export const getHasMoreReviews = createSelector(
  [getSortedReviews, getDisplayedReviewsCount],
  (sortedReviews, displayedReviewsCount) => sortedReviews.length > displayedReviewsCount
);


