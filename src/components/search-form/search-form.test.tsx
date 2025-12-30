import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { withHistory, withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore, makeFakeCamera } from '../../utils-mocks/mocks';
import SearchForm from './search-form';

describe('Component: SearchForm', () => {
  const mockCamera1 = { ...makeFakeCamera(), id: 1, name: 'Canon EOS 5D Mark IV' };
  const mockCamera2 = { ...makeFakeCamera(), id: 2, name: 'Nikon D850' };
  const mockCamera3 = { ...makeFakeCamera(), id: 3, name: 'Sony Alpha 7R IV' };

  const renderComponent = (initialState = {}) => {
    const { withStoreComponent } = withStore(
      <SearchForm />,
      makeFakeStore({
        CAMERAS: {
          cameras: [mockCamera1, mockCamera2, mockCamera3],
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        },
        ...initialState
      })
    );

    const componentWithHistory = withHistory(withStoreComponent);
    return render(componentWithHistory);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial render', () => {
    it('should render search form with input field', () => {
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('form-search__input');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('autoComplete', 'off');
    });

    it('should render reset button', () => {
      renderComponent();

      const resetButton = screen.getByRole('button', { hidden: true });
      expect(resetButton).toBeInTheDocument();
      expect(resetButton).toHaveClass('form-search__reset');
      expect(resetButton).toHaveAttribute('type', 'reset');
    });

    it('should render form container with correct class', () => {
      renderComponent();

      const formContainer = document.querySelector('.form-search');
      expect(formContainer).toBeInTheDocument();
    });

    it('should not show dropdown on initial render', () => {
      renderComponent();

      const dropdownList = document.querySelector('.form-search__select-list');
      expect(dropdownList).not.toBeInTheDocument();
    });
  });

  describe('search functionality', () => {
    it('should not show dropdown when input is less than MIN_SEARCH_LENGTH', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Ca');

      const dropdownList = document.querySelector('.form-search__select-list');
      expect(dropdownList).not.toBeInTheDocument();
    });

    it('should show dropdown when input reaches MIN_SEARCH_LENGTH and matches cameras', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Can');

      expect(screen.getByText('Canon EOS 5D Mark IV')).toBeInTheDocument();
    });

    it('should filter cameras by name case-insensitively', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'nikon');

      expect(screen.getByText('Nikon D850')).toBeInTheDocument();
      expect(screen.queryByText('Canon EOS 5D Mark IV')).not.toBeInTheDocument();
      expect(screen.queryByText('Sony Alpha 7R IV')).not.toBeInTheDocument();
    });

    it('should show all matching cameras in dropdown', async () => {
      const user = userEvent.setup();
      const cameraA = { ...makeFakeCamera(), id: 4, name: 'Camera Alpha' };
      const cameraB = { ...makeFakeCamera(), id: 5, name: 'Camera Beta' };
      const cameraC = { ...makeFakeCamera(), id: 6, name: 'Sony Camera' };

      renderComponent({
        CAMERAS: {
          cameras: [cameraA, cameraB, cameraC],
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        }
      });

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Camera');

      expect(screen.getByText('Camera Alpha')).toBeInTheDocument();
      expect(screen.getByText('Camera Beta')).toBeInTheDocument();
      expect(screen.queryByText('Sony Camera')).toBeInTheDocument();
    });

    it('should hide dropdown when search input cleared', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Can');
      expect(screen.getByText('Canon EOS 5D Mark IV')).toBeInTheDocument();

      await user.clear(input);

      const dropdownList = document.querySelector('.form-search__select-list');
      expect(dropdownList).not.toBeInTheDocument();
    });

    it('should not show dropdown when no cameras match the search', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'xyz');

      const dropdownList = document.querySelector('.form-search__select-list');
      expect(dropdownList).not.toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('should navigate down through dropdown items with ArrowDown', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Can');

      await user.keyboard('{ArrowDown}');

      const firstItem = screen.getByText('Canon EOS 5D Mark IV').closest('li');
      expect(firstItem).toHaveClass('is-active');
    });

    it('should navigate up through dropdown items with ArrowUp', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Nikon');

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowUp}');

      const items = document.querySelectorAll('.form-search__select-item');
      expect(items[0]).not.toHaveClass('is-active');
    });

    it('should not navigate beyond the last item with ArrowDown', async () => {
      const user = userEvent.setup();
      const camera1 = { ...makeFakeCamera(), id: 7, name: 'Camera 1' };
      const camera2 = { ...makeFakeCamera(), id: 8, name: 'Camera 2' };

      renderComponent({
        CAMERAS: {
          cameras: [camera1, camera2],
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        }
      });

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Camera');

      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');

      const items = document.querySelectorAll('.form-search__select-item');
      expect(items[1]).toHaveClass('is-active');
    });

    it('should navigate to first item when pressing ArrowUp on no selection', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Nikon');

      await user.keyboard('{ArrowUp}');

      const items = document.querySelectorAll('.form-search__select-item');
      expect(items[0]).not.toHaveClass('is-active');
    });

    it('should close dropdown and focus input on Escape key', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту') ;
      await user.type(input, 'Can');

      expect(screen.getByText('Canon EOS 5D Mark IV')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      const dropdownList = document.querySelector('.form-search__select-list');
      expect(dropdownList).not.toBeInTheDocument();
      expect(input).toHaveFocus();
    });
  });

  describe('reset button functionality', () => {
    it('should clear search query when reset button clicked', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту') ;
      await user.type(input, 'Canon');

      expect((input as HTMLInputElement).value).toBe('Canon');

      const resetButton = screen.getByRole('button', { hidden: true });
      await user.click(resetButton);

      expect((input as HTMLInputElement).value).toBe('');
    });

    it('should close dropdown when reset button clicked', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Can');

      expect(screen.getByText('Canon EOS 5D Mark IV')).toBeInTheDocument();

      const resetButton = screen.getByRole('button', { hidden: true });
      await user.click(resetButton);

      const dropdownList = document.querySelector('.form-search__select-list');
      expect(dropdownList).not.toBeInTheDocument();
    });

    it('should not clear anything if input is already empty', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту') ;
      expect((input as HTMLInputElement).value).toBe('');

      const resetButton = screen.getByRole('button', { hidden: true });
      await user.click(resetButton);

      expect((input as HTMLInputElement).value).toBe('');
    });
  });

  describe('form styling', () => {
    it('should add list-opened class when dropdown is open', async () => {
      const user = userEvent.setup();
      renderComponent();

      const formContainer = document.querySelector('.form-search');
      expect(formContainer).not.toHaveClass('list-opened');

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Can');

      expect(formContainer).toHaveClass('list-opened');
    });

    it('should add list-opened class when input has value (even with closed dropdown)', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'x');

      const formContainer = document.querySelector('.form-search');
      expect(formContainer).toHaveClass('list-opened');
    });

    it('should remove list-opened class when search is cleared', async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByPlaceholderText('Поиск по сайту');
      await user.type(input, 'Can');

      let formContainer = document.querySelector('.form-search');
      expect(formContainer).toHaveClass('list-opened');

      await user.clear(input);

      formContainer = document.querySelector('.form-search');
      expect(formContainer).not.toHaveClass('list-opened');
    });
  });

});
