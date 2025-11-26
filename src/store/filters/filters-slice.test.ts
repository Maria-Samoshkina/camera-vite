import { filtersSlice, changeCamerasCategory, changeCamerasTypes, changeCamerasLevel, changePriceFrom, changePriceTo, resetFilters } from './filters-slice';
import { FiltersState } from '../../types/state';

describe('filtersSlice', () => {
  const initialState: FiltersState = {
    camerasCategory: null,
    camerasTypes: [],
    camerasLevels: [],
    priceFrom: null,
    priceTo: null,
  };

  it('should handle initial state', () => {
    expect(filtersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle changeCamerasCategory', () => {
    const action = changeCamerasCategory('Видеокамера');
    const state = filtersSlice.reducer(initialState, action);
    expect(state.camerasCategory).toBe('Видеокамера');
  });

  it('should handle changeCamerasTypes (add/remove)', () => {
    let state = filtersSlice.reducer(initialState, changeCamerasTypes('Цифровая'));
    expect(state.camerasTypes).toContain('Цифровая');
    state = filtersSlice.reducer(state, changeCamerasTypes('Цифровая'));
    expect(state.camerasTypes).not.toContain('Цифровая');
  });

  it('should handle changeCamerasLevel (add/remove)', () => {
    let state = filtersSlice.reducer(initialState, changeCamerasLevel('Профессиональный'));
    expect(state.camerasLevels).toContain('Профессиональный');
    state = filtersSlice.reducer(state, changeCamerasLevel('Профессиональный'));
    expect(state.camerasLevels).not.toContain('Профессиональный');
  });

  it('should handle changePriceFrom', () => {
    const action = changePriceFrom(1000);
    const state = filtersSlice.reducer(initialState, action);
    expect(state.priceFrom).toBe(1000);
  });

  it('should handle changePriceTo', () => {
    const action = changePriceTo(5000);
    const state = filtersSlice.reducer(initialState, action);
    expect(state.priceTo).toBe(5000);
  });

  it('should handle resetFilters', () => {
    const filledState: FiltersState = {
      camerasCategory: 'Фотокамера',
      camerasTypes: ['Цифровая', 'Плёночная'],
      camerasLevels: ['Любительский'],
      priceFrom: 1000,
      priceTo: 5000,
    };
    const state = filtersSlice.reducer(filledState, resetFilters());
    expect(state).toEqual(initialState);
  });
});
