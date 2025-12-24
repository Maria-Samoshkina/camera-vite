import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_REVIEWS_COUNT, NameSpace, REVIEWS_COUNT_STEP } from '../../const';
import { ReviewsState } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

const initialState: ReviewsState = {
  reviews: [],
  isReviewsLoading: true,
  isReviewsFetchingError: false,
  displayedReviewsCount: INITIAL_REVIEWS_COUNT,
  isSubmitting:false,
  isSubmittingFailed: false,
  isSubmittingSuccess: false
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    showMoreReviews: (state) => {
      state.displayedReviewsCount += REVIEWS_COUNT_STEP;
    },
    resetSubmitStatus: (state) => {
      state.isSubmitting = false;
      state.isSubmittingSuccess = false;
      state.isSubmittingFailed = false;
    },
  },
  extraReducers (builder){
    builder
      .addCase(fetchReviewsAction.pending, (state)=> {
        state.isReviewsLoading = true;
        state.isReviewsFetchingError = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action)=> {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
        state.isReviewsFetchingError = false;
      })
      .addCase(fetchReviewsAction.rejected, (state)=> {
        state.isReviewsLoading = false;
        state.isReviewsFetchingError = true;
      })
      .addCase(postReviewAction.pending, (state)=> {
        state.isSubmitting = true;
        state.isSubmittingSuccess = false;
        state.isSubmittingFailed = false;
      })
      .addCase(postReviewAction.fulfilled, (state, action)=> {
        state.reviews.push(action.payload);
        state.isSubmitting = false;
        state.isSubmittingSuccess = true;
        state.isSubmittingFailed = false;
      })
      .addCase(postReviewAction.rejected, (state)=> {
        state.isSubmitting = false;
        state.isSubmittingSuccess = false;
        state.isSubmittingFailed = true;
      });
  }
});

export const { showMoreReviews, resetSubmitStatus } = reviewsSlice.actions;

