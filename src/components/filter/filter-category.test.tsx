import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace, CAMERA_CATEGORIES } from '../../const';
import FilterCategory from './filter-category';

describe('Component: FilterCategory', () => {
  it('should render filter category component with all categories', () => {
    const { withStoreComponent } = withStore(
      <FilterCategory />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText('Категория')).toBeInTheDocument();

    CAMERA_CATEGORIES.forEach((category) => {
      expect(screen.getByDisplayValue(category)).toBeInTheDocument();
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('should render radio buttons for each camera category', () => {
    const { withStoreComponent } = withStore(
      <FilterCategory />,
      makeFakeStore()
    );

    render(withStoreComponent);

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(CAMERA_CATEGORIES.length);

    radioButtons.forEach((radio) => {
      expect(radio).toHaveAttribute('type', 'radio');
      expect(radio).toHaveAttribute('name', 'category');
    });
  });

  it('should select camera category when radio button is clicked', () => {
    const { withStoreComponent, mockStore } = withStore(
      <FilterCategory />,
      makeFakeStore()
    );

    render(withStoreComponent);

    const photoRadio = screen.getByDisplayValue('Фотокамера');
    fireEvent.click(photoRadio);

    const actions = mockStore.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('FILTERS/changeCamerasCategory');
    expect(actions[0].payload).toBe('Фотокамера');
  });

  it('should display selected category as checked', () => {
    const selectedCategory = 'Видеокамера';
    const { withStoreComponent } = withStore(
      <FilterCategory />,
      makeFakeStore({
        [NameSpace.Filters]: {
          camerasCategory: selectedCategory,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
        }
      })
    );

    render(withStoreComponent);

    const selectedRadio = screen.getByDisplayValue(selectedCategory);
    const otherRadio = screen.getByDisplayValue('Фотокамера');

    expect(selectedRadio).toBeChecked();
    expect(otherRadio).not.toBeChecked();
  });

});
