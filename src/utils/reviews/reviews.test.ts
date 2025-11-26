import { sortReviewsByDate } from './reviews';
import { Reviews } from '../../types/review';

describe('sortReviewsByDate', () => {
  it('should sort reviews by date descending', () => {
    const reviews: Reviews = [
      { id: '1', createAt: '2022-01-01', cameraId: 1, userName: 'A', advantage: '', disadvantage: '', review: '', rating: 5 },
      { id: '2', createAt: '2023-01-01', cameraId: 1, userName: 'B', advantage: '', disadvantage: '', review: '', rating: 4 },
      { id: '3', createAt: '2021-01-01', cameraId: 1, userName: 'C', advantage: '', disadvantage: '', review: '', rating: 3 },
    ];
    const sorted = sortReviewsByDate(reviews);
    expect(sorted.map((r) => r.id)).toEqual(['2', '1', '3']);
  });

  it('should handle empty array', () => {
    expect(sortReviewsByDate([])).toEqual([]);
  });

  it('should handle reviews with same date', () => {
    const reviews: Reviews = [
      { id: '1', createAt: '2022-01-01', cameraId: 1, userName: 'A', advantage: '', disadvantage: '', review: '', rating: 5 },
      { id: '2', createAt: '2022-01-01', cameraId: 1, userName: 'B', advantage: '', disadvantage: '', review: '', rating: 4 },
    ];
    const sorted = sortReviewsByDate(reviews);
    expect(sorted.map((r) => r.id)).toEqual(['1', '2']);
  });
});
