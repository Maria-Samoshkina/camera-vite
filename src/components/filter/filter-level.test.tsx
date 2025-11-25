import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace, CAMERA_LEVELS } from '../../const';
import FilterLevel from './filter-level';
import { changeCamerasLevel } from '../../store/filters/filters-slice';

describe('Component: FilterLevel', () => {
  it('should render filter level component with all levels', () => {
    const { withStoreComponent } = withStore(
      <FilterLevel />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText('Уровень')).toBeInTheDocument();

    CAMERA_LEVELS.forEach((level) => {
      expect(screen.getByDisplayValue(level)).toBeInTheDocument();
      expect(screen.getByText(level)).toBeInTheDocument();
    });
  });

  it('should render checkboxes for each camera level', () => {
    const { withStoreComponent } = withStore(
      <FilterLevel />,
      makeFakeStore()
    );

    render(withStoreComponent);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(CAMERA_LEVELS.length);

    checkboxes.forEach((checkbox, index) => {
      expect(checkbox).toHaveAttribute('type', 'checkbox');
      expect(checkbox).toHaveAttribute('name', CAMERA_LEVELS[index]);
      expect(checkbox).toHaveAttribute('value', CAMERA_LEVELS[index]);
    });
  });

  it('should toggle camera level when checkbox is clicked', () => {
    const { withStoreComponent, mockStore } = withStore(
      <FilterLevel />,
      makeFakeStore()
    );

    render(withStoreComponent);

    const professionalCheckbox = screen.getByDisplayValue('Профессиональный');
    fireEvent.click(professionalCheckbox);

    const actions = mockStore.getActions();
    expect(actions).toEqual([changeCamerasLevel('Профессиональный')]);

  });

  it('should display selected levels as checked', () => {
    const selectedLevels = ['Любительский', 'Профессиональный'];
    const { withStoreComponent } = withStore(
      <FilterLevel />,
      makeFakeStore({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: selectedLevels,
          priceFrom: null,
          priceTo: null,
        }
      })
    );

    render(withStoreComponent);

    const amateurCheckbox = screen.getByDisplayValue('Любительский');
    const professionalCheckbox = screen.getByDisplayValue('Профессиональный');
    const zeroCheckbox = screen.getByDisplayValue('Нулевой');

    expect(amateurCheckbox).toBeChecked();
    expect(professionalCheckbox).toBeChecked();
    expect(zeroCheckbox).not.toBeChecked();
  });


});
