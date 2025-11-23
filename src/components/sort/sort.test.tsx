import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Sort from './sort';

describe('Component: Sort', () => {
  it('should render sort component correctly', () => {
    render(<Sort />);

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });

  it('should render form with correct action', () => {
    render(<Sort />);

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('action', '#');
  });

  it('should render sort type options', () => {
    render(<Sort />);

    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });

  it('should render radio buttons for sort types', () => {
    render(<Sort />);

    const priceRadio = screen.getByLabelText('по цене');
    const popularRadio = screen.getByLabelText('по популярности');

    expect(priceRadio).toBeInTheDocument();
    expect(popularRadio).toBeInTheDocument();
    expect(priceRadio).toHaveAttribute('type', 'radio');
    expect(popularRadio).toHaveAttribute('type', 'radio');
  });

});
