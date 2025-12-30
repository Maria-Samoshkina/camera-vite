import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pagination from './pagination';
import { PAGES_PER_GROUP } from '../../const';

describe('Component: Pagination', () => {
  const mockOnPageClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when total pages less than or equal to PAGES_PER_GROUP', () => {
    it('should render all pages without prev/next buttons', () => {
      const totalPages = 2;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.queryByText('Назад')).not.toBeInTheDocument();
      expect(screen.queryByText('Далее')).not.toBeInTheDocument();
    });

    it('should render all pages when total equals PAGES_PER_GROUP', () => {
      const totalPages = PAGES_PER_GROUP;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      for (let i = 1; i <= totalPages; i++) {
        expect(screen.getByText(String(i))).toBeInTheDocument();
      }
      expect(screen.queryByText('Назад')).not.toBeInTheDocument();
      expect(screen.queryByText('Далее')).not.toBeInTheDocument();
    });
  });

  describe('when total pages more than PAGES_PER_GROUP', () => {
    it('should render first group of pages without prev button', () => {
      const totalPages = 10;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.queryByText('4')).not.toBeInTheDocument();
      expect(screen.queryByText('Назад')).not.toBeInTheDocument();
      expect(screen.getByText('Далее')).toBeInTheDocument();
    });

    it('should render middle group of pages with both prev and next buttons', () => {
      const totalPages = 10;
      const currentPage = 5;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.queryByText('3')).not.toBeInTheDocument();
      expect(screen.queryByText('7')).not.toBeInTheDocument();
      expect(screen.getByText('Назад')).toBeInTheDocument();
      expect(screen.getByText('Далее')).toBeInTheDocument();
    });

    it('should render last group of pages without next button', () => {
      const totalPages = 11;
      const currentPage = 10;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('11')).toBeInTheDocument();
      expect(screen.queryByText('12')).not.toBeInTheDocument();
      expect(screen.getByText('Назад')).toBeInTheDocument();
      expect(screen.queryByText('Далее')).not.toBeInTheDocument();
    });
  });

  describe('page rendering and highlighting', () => {
    it('should mark current page as active', () => {
      const totalPages = 10;
      const currentPage = 2;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      const currentPageLink = screen.getByText('2');
      expect(currentPageLink).toHaveClass('pagination__link--active');

      const otherPageLink = screen.getByText('1');
      expect(otherPageLink).not.toHaveClass('pagination__link--active');
    });

    it('should render pagination list with correct class', () => {
      const totalPages = 5;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      const paginationList = document.querySelector('.pagination__list');
      expect(paginationList).toBeInTheDocument();
    });
  });

  describe('click handlers', () => {
    it('should call onPageClick with correct page number when page link clicked', async () => {
      const user = userEvent.setup();
      const totalPages = 10;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      const pageLink = screen.getByText('2');
      await user.click(pageLink);

      expect(mockOnPageClick).toHaveBeenCalledWith(2);
    });

    it('should call onPageClick with prev page when prev button clicked', async () => {
      const user = userEvent.setup();
      const totalPages = 10;
      const currentPage = 5;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      const prevButton = screen.getByText('Назад');
      await user.click(prevButton);

      expect(mockOnPageClick).toHaveBeenCalledWith(3);
    });

    it('should call onPageClick with next page when next button clicked', async () => {
      const user = userEvent.setup();
      const totalPages = 10;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      const nextButton = screen.getByText('Далее');
      await user.click(nextButton);

      expect(mockOnPageClick).toHaveBeenCalledWith(PAGES_PER_GROUP + 1);
    });
  });

  describe('pagination structure', () => {
    it('should have correct CSS classes on pagination container', () => {
      const totalPages = 5;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      const paginationDiv = document.querySelector('.pagination');
      expect(paginationDiv).toBeInTheDocument();
    });


    it('should have pagination links with correct class', () => {
      const totalPages = 5;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      const paginationLinks = document.querySelectorAll('.pagination__link');
      expect(paginationLinks.length).toBeGreaterThan(0);
      paginationLinks.forEach((link) => {
        expect(link).toHaveClass('pagination__link');
      });
    });

    it('should have text links with text class for prev/next buttons', () => {
      const totalPages = 10;
      const currentPage = 1;

      render(
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={mockOnPageClick}
        />
      );

      const nextButton = screen.getByText('Далее');
      expect(nextButton).toHaveClass('pagination__link--text');
    });
  });

});
