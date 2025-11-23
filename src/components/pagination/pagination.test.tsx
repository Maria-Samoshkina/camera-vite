import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render pagination component correctly', () => {
    render(<Pagination />);

    const pagination = document.querySelector('.pagination');
    expect(pagination).toBeInTheDocument();
  });

  it('should render pagination list', () => {
    render(<Pagination />);

    const paginationList = document.querySelector('.pagination__list');
    expect(paginationList).toBeInTheDocument();
    expect(paginationList?.tagName).toBe('UL');
  });

  it('should render next', () => {
    render(<Pagination />);


    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

});
