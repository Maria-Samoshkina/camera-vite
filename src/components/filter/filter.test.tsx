import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore, makeFakeCamera } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import Filter from './filter';

vi.mock('./filter-price', () => ({
  default: () => <div data-testid="filter-price">Filter Price</div>,
}));

vi.mock('./filter-category', () => ({
  default: () => <div data-testid="filter-category">Filter Category</div>,
}));

vi.mock('./filter-type', () => ({
  default: () => <div data-testid="filter-type">Filter Type</div>,
}));

vi.mock('./filter-level', () => ({
  default: () => <div data-testid="filter-level">Filter Level</div>,
}));

vi.mock('./filter-reset', () => ({
  default: () => <div data-testid="filter-reset">Filter Reset</div>,
}));

describe('Component: Filter', () => {
  const mockCameras = [makeFakeCamera(), makeFakeCamera()];

  const renderComponent = (initialState = {}) => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Filter />
      </MemoryRouter>,
      makeFakeStore({
        [NameSpace.Cameras]: {
          cameras: mockCameras,
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        },
        ...initialState
      })
    );

    return render(withStoreComponent);
  };

  it('should render main filter structure', () => {
    renderComponent();

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
    expect(screen.getByText('Фильтр')).toHaveClass('visually-hidden');
  });

  it('should render all filter child components', () => {
    renderComponent();

    expect(screen.getByTestId('filter-price')).toBeInTheDocument();
    expect(screen.getByTestId('filter-category')).toBeInTheDocument();
    expect(screen.getByTestId('filter-type')).toBeInTheDocument();
    expect(screen.getByTestId('filter-level')).toBeInTheDocument();
    expect(screen.getByTestId('filter-reset')).toBeInTheDocument();
  });

});
