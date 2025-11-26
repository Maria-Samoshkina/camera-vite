import { formatReviewDate } from './date';

describe('formatReviewDate', () => {
  it('should format date to DD MMMM in Russian', () => {
    expect(formatReviewDate('2023-11-26')).toBe('26 ноября');
    expect(formatReviewDate('2022-01-01')).toBe('01 января');
    expect(formatReviewDate('2022-07-15')).toBe('15 июля');
  });

  it('should handle invalid date string gracefully', () => {
    expect(formatReviewDate('')).toBe('Invalid Date');
    expect(formatReviewDate('not-a-date')).toBe('Invalid Date');
  });
});
