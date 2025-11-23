import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace, CAMERA_TYPES } from '../../const';
import FilterType from './filter-type';

describe('Component: FilterType', ()=> {
  it ('should render FilterType component with all types', ()=>{
    const {withStoreComponent} = withStore (
      <FilterType/>,
      makeFakeStore()
    );

    render (withStoreComponent);

    expect (screen.getByText('Тип камеры')).toBeInTheDocument();
    CAMERA_TYPES.forEach((type)=> {
      expect(screen.getByDisplayValue(type)).toBeInTheDocument();
      expect(screen.getByText(type)).toBeInTheDocument();
    });

  });

  it ('should toggle camera type when checkbox is clicked', ()=> {
    const {withStoreComponent, mockStore} = withStore (
      <FilterType/>,
      makeFakeStore()
    );

    render (withStoreComponent);

    const digitalTypeCheckbox = screen.getByDisplayValue('Цифровая');
    fireEvent.click(digitalTypeCheckbox);

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe('FILTERS/changeCamerasTypes');
    expect(actions[0].payload).toBe('Цифровая');

  });

  it('should display selected types as checked', () => {
    const selectedTypes = ['Цифровая', 'Плёночная'];

    const { withStoreComponent } = withStore(
      <FilterType />,
      makeFakeStore({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: selectedTypes,
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
        }
      })
    );

    render(withStoreComponent);

    const digitalCheckbox = screen.getByDisplayValue('Цифровая');
    const filmCheckbox = screen.getByDisplayValue('Плёночная');
    const instantCheckbox = screen.getByDisplayValue('Моментальная');
    const collectibleCheckbox = screen.getByDisplayValue('Коллекционная');

    expect(digitalCheckbox).toBeChecked();
    expect(filmCheckbox).toBeChecked();
    expect(instantCheckbox).not.toBeChecked();
    expect(collectibleCheckbox).not.toBeChecked();

  });
});
