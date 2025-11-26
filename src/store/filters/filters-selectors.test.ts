import { getCamerasCategory, getCamerasTypes, getCamerasLevels, getPriceFrom, getPriceTo } from './filters-selectors';
import { NameSpace } from '../../const';
import { FiltersState } from '../../types/state';

describe('filters selectors', () => {
  const filtersState: FiltersState = {
    camerasCategory: 'Фотокамера',
    camerasTypes: ['Цифровая', 'Плёночная'],
    camerasLevels: ['Любительский'],
    priceFrom: 1000,
    priceTo: 5000,
  };

  const state = {
    [NameSpace.Filters]: filtersState,
  };

  it('getCamerasCategory should return category', () => {
    expect(getCamerasCategory(state)).toBe('Фотокамера');
  });

  it('getCamerasTypes should return types', () => {
    expect(getCamerasTypes(state)).toEqual(['Цифровая', 'Плёночная']);
  });

  it('getCamerasLevels should return levels', () => {
    expect(getCamerasLevels(state)).toEqual(['Любительский']);
  });

  it('getPriceFrom should return priceFrom', () => {
    expect(getPriceFrom(state)).toBe(1000);
  });

  it('getPriceTo should return priceTo', () => {
    expect(getPriceTo(state)).toBe(5000);
  });
});
