import { filtersSlice, changeCamerasCategory, changeCamerasTypes, changeCamerasLevel, changePriceFrom, changePriceTo, resetFilters, changeSortType, changeSortDirection } from './filters-slice';
import { FiltersState } from '../../types/state';
import { SortType, SortDirection } from '../../const';

describe('filtersSlice', () => {
  const initialState: FiltersState = {
    camerasCategory: null,
    camerasTypes: [],
    camerasLevels: [],
    priceFrom: null,
    priceTo: null,
    sortType: SortType.price,
    sortDirection: SortDirection.ascending
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
      sortType: SortType.popularity,
      sortDirection: SortDirection.descending
    };
    const state = filtersSlice.reducer(filledState, resetFilters());
    expect(state.camerasCategory).toBeNull();
    expect(state.camerasTypes).toEqual([]);
    expect(state.camerasLevels).toEqual([]);
    expect(state.priceFrom).toBeNull();
    expect(state.priceTo).toBeNull();
  });

  describe('changeCamerasCategory with video camera logic', () => {
    it('should filter out film and instant types when selecting video camera', () => {
      const stateWithTypes: FiltersState = {
        ...initialState,
        camerasTypes: ['Цифровая', 'Плёночная', 'Моментальная'],
      };

      const result = filtersSlice.reducer(stateWithTypes, changeCamerasCategory('Видеокамера'));

      expect(result.camerasCategory).toBe('Видеокамера');
      expect(result.camerasTypes).toEqual(['Цифровая']);
      expect(result.camerasTypes).not.toContain('Плёночная');
      expect(result.camerasTypes).not.toContain('Моментальная');
    });

    it('should not filter types when selecting photo camera', () => {
      const stateWithTypes: FiltersState = {
        ...initialState,
        camerasTypes: ['Цифровая', 'Плёночная', 'Моментальная'],
      };

      const result = filtersSlice.reducer(stateWithTypes, changeCamerasCategory('Фотокамера'));

      expect(result.camerasCategory).toBe('Фотокамера');
      expect(result.camerasTypes).toEqual(['Цифровая', 'Плёночная', 'Моментальная']);
    });

    it('should handle setting category to null', () => {
      const stateWithCategory: FiltersState = {
        ...initialState,
        camerasCategory: 'Фотокамера',
      };

      const result = filtersSlice.reducer(stateWithCategory, changeCamerasCategory(null));

      expect(result.camerasCategory).toBeNull();
    });
  });

  describe('changeCamerasTypes', () => {
    it('should add multiple types', () => {
      let state = filtersSlice.reducer(initialState, changeCamerasTypes('Цифровая'));
      state = filtersSlice.reducer(state, changeCamerasTypes('Плёночная'));
      state = filtersSlice.reducer(state, changeCamerasTypes('Моментальная'));

      expect(state.camerasTypes).toEqual(['Цифровая', 'Плёночная', 'Моментальная']);
    });

    it('should toggle type on and off', () => {
      let state = filtersSlice.reducer(initialState, changeCamerasTypes('Цифровая'));
      expect(state.camerasTypes).toContain('Цифровая');

      state = filtersSlice.reducer(state, changeCamerasTypes('Цифровая'));
      expect(state.camerasTypes).not.toContain('Цифровая');
      expect(state.camerasTypes).toEqual([]);
    });
  });

  describe('changeCamerasLevel', () => {
    it('should add multiple levels', () => {
      let state = filtersSlice.reducer(initialState, changeCamerasLevel('Нулевой'));
      state = filtersSlice.reducer(state, changeCamerasLevel('Любительский'));
      state = filtersSlice.reducer(state, changeCamerasLevel('Профессиональный'));

      expect(state.camerasLevels).toEqual(['Нулевой', 'Любительский', 'Профессиональный']);
    });

    it('should toggle level on and off', () => {
      let state = filtersSlice.reducer(initialState, changeCamerasLevel('Профессиональный'));
      expect(state.camerasLevels).toContain('Профессиональный');

      state = filtersSlice.reducer(state, changeCamerasLevel('Профессиональный'));
      expect(state.camerasLevels).not.toContain('Профессиональный');
      expect(state.camerasLevels).toEqual([]);
    });
  });

  describe('Price filters', () => {
    it('should handle null prices', () => {
      let state = filtersSlice.reducer(initialState, changePriceFrom(1000));
      state = filtersSlice.reducer(state, changePriceFrom(null));
      expect(state.priceFrom).toBeNull();

      state = filtersSlice.reducer(initialState, changePriceTo(5000));
      state = filtersSlice.reducer(state, changePriceTo(null));
      expect(state.priceTo).toBeNull();
    });

    it('should handle price range', () => {
      let state = filtersSlice.reducer(initialState, changePriceFrom(1000));
      state = filtersSlice.reducer(state, changePriceTo(5000));

      expect(state.priceFrom).toBe(1000);
      expect(state.priceTo).toBe(5000);
    });

    it('should allow updating prices', () => {
      let state = filtersSlice.reducer(initialState, changePriceFrom(1000));
      state = filtersSlice.reducer(state, changePriceFrom(2000));

      expect(state.priceFrom).toBe(2000);
    });
  });

  describe('Sort actions', () => {
    it('should handle changeSortType', () => {
      let state = filtersSlice.reducer(initialState, changeSortType(SortType.popularity));
      expect(state.sortType).toBe(SortType.popularity);

      state = filtersSlice.reducer(state, changeSortType(SortType.price));
      expect(state.sortType).toBe(SortType.price);
    });

    it('should handle changeSortDirection', () => {
      let state = filtersSlice.reducer(initialState, changeSortDirection(SortDirection.descending));
      expect(state.sortDirection).toBe(SortDirection.descending);

      state = filtersSlice.reducer(state, changeSortDirection(SortDirection.ascending));
      expect(state.sortDirection).toBe(SortDirection.ascending);
    });
  });

  describe('Complex scenarios', () => {
    it('should handle full filter setup and reset', () => {
      let state = filtersSlice.reducer(initialState, changeCamerasCategory('Фотокамера'));
      state = filtersSlice.reducer(state, changeCamerasTypes('Цифровая'));
      state = filtersSlice.reducer(state, changeCamerasLevel('Профессиональный'));
      state = filtersSlice.reducer(state, changePriceFrom(10000));
      state = filtersSlice.reducer(state, changePriceTo(50000));
      state = filtersSlice.reducer(state, changeSortType(SortType.popularity));
      state = filtersSlice.reducer(state, changeSortDirection(SortDirection.descending));

      expect(state.camerasCategory).toBe('Фотокамера');
      expect(state.camerasTypes).toContain('Цифровая');
      expect(state.camerasLevels).toContain('Профессиональный');
      expect(state.priceFrom).toBe(10000);
      expect(state.priceTo).toBe(50000);
      expect(state.sortType).toBe(SortType.popularity);
      expect(state.sortDirection).toBe(SortDirection.descending);

      state = filtersSlice.reducer(state, resetFilters());

      expect(state.camerasCategory).toBeNull();
      expect(state.camerasTypes).toEqual([]);
      expect(state.camerasLevels).toEqual([]);
      expect(state.priceFrom).toBeNull();
      expect(state.priceTo).toBeNull();
    });

    it('should handle switching from photo to video camera category', () => {
      let state = filtersSlice.reducer(initialState, changeCamerasCategory('Фотокамера'));
      state = filtersSlice.reducer(state, changeCamerasTypes('Плёночная'));
      state = filtersSlice.reducer(state, changeCamerasTypes('Моментальная'));
      state = filtersSlice.reducer(state, changeCamerasTypes('Цифровая'));

      expect(state.camerasTypes).toEqual(['Плёночная', 'Моментальная', 'Цифровая']);

      state = filtersSlice.reducer(state, changeCamerasCategory('Видеокамера'));

      expect(state.camerasCategory).toBe('Видеокамера');
      expect(state.camerasTypes).toEqual(['Цифровая']);
    });
  });
});
