import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarsRating from './stars-rating';

describe('StarsRating', () => {
  it('renders correct number of full and empty stars based on rating', () => {
    const rating = 3;

    const { container } = render(
      <StarsRating rating={rating} reviewCount={10} className="product-card__rate" />
    );

    const root = container.querySelector('.rate.product-card__rate');
    expect(root).toBeInTheDocument();

    const uses = container.querySelectorAll('use');
    expect(uses).toHaveLength(5);

    uses.forEach((useElement, index) => {
      const href = useElement.getAttribute('xlink:href');
      if (index < rating) {
        expect(href).toBe('#icon-full-star');
      } else {
        expect(href).toBe('#icon-star');
      }
    });

    expect(screen.getByText(`Рейтинг: ${rating}`)).toBeInTheDocument();

    expect(screen.getByText('Всего оценок:', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('does not render review count when reviewCount is not provided', () => {
    const { queryByText } = render(<StarsRating rating={4} />);

    expect(queryByText('Всего оценок:', { exact: false })).not.toBeInTheDocument();
  });

  it('applies passed className to root element', () => {
    const { container } = render(
      <StarsRating rating={5} className="review-card__rate" />
    );

    const root = container.querySelector('.rate.review-card__rate');
    expect(root).toBeInTheDocument();
  });
});
