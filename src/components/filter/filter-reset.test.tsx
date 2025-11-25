import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import FilterReset from './filter-reset';
import { resetFilters } from '../../store/filters/filters-slice';


describe('Component: FilterReset', () => {

  it('should render reset button with correct text', () => {
    const {withStoreComponent} = withStore (
      <MemoryRouter>
        <FilterReset/>
      </MemoryRouter>,
      makeFakeStore()
    );

    render(withStoreComponent);

    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveAttribute('type', 'reset');
  });

  it('should dispatch resetFilters action when button is clicked', () => {
    const {withStoreComponent, mockStore} = withStore (
      <MemoryRouter>
        <FilterReset/>
      </MemoryRouter>,
      makeFakeStore()
    );

    render(withStoreComponent);

    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    fireEvent.click(resetButton);

    const actions = mockStore.getActions();

    expect(actions).toEqual([resetFilters()]);

  });


  it('should work when filters are already set', () => {

    const {withStoreComponent, mockStore} = withStore (
      <MemoryRouter>
        <FilterReset/>
      </MemoryRouter>,
      makeFakeStore({
        [NameSpace.Filters]: {
          camerasCategory: 'Фотокамера',
          camerasTypes: ['Цифровая'],
          camerasLevels: ['Профессиональный'],
          priceFrom: 1000,
          priceTo: 5000,
        }
      })
    );

    render(withStoreComponent);

    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    fireEvent.click(resetButton);

    const actions = mockStore.getActions();
    expect(actions).toEqual([resetFilters()]);

  });


  it('should work with empty initial state', () => {
    const {withStoreComponent, mockStore} = withStore (
      <MemoryRouter>
        <FilterReset/>
      </MemoryRouter>,
      makeFakeStore({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
        }
      })
    );

    render(withStoreComponent);

    const resetButton = screen.getByRole('button', { name: /сбросить фильтры/i });
    fireEvent.click(resetButton);

    const actions = mockStore.getActions();
    expect(actions).toEqual([resetFilters()]);

  });

});
