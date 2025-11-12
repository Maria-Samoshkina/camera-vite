import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_REVIEWS_COUNT, NameSpace, REVIEWS_COUNT_STEP } from '../../const';
import { ReviewsState } from '../../types/state';
import { fetchReviewsAction } from '../api-actions';

const initialState: ReviewsState = {
  reviews: [],
  isReviewsLoading: true,
  isReviewsFetchingError: false,
  displayedReviewsCount: INITIAL_REVIEWS_COUNT

};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    showMoreReviews: (state) => {
      state.displayedReviewsCount += REVIEWS_COUNT_STEP;
    }
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
      });
  }
});

export const { showMoreReviews } = reviewsSlice.actions;

