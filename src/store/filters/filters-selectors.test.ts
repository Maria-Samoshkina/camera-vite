import { getCamerasCategory, getCamerasTypes, getCamerasLevels, getPriceFrom, getPriceTo, getSortType, getSortDirection, getFilteredCameras, getFilteredSortedCameras, getFilteredCamerasWithoutPrice } from './filters-selectors';
import { NameSpace, SortType, SortDirection } from '../../const';
import { FiltersState, State } from '../../types/state';
import { makeFakeCamera } from '../../utils-mocks/mocks';
import { vi } from 'vitest';
import { Cameras } from '../../types/camera';

vi.mock('../../utils/filters/filters', () => ({
  getFilteredCamerasUtils: vi.fn((cameras: Cameras) => cameras),
  getFilteredCamerasWithoutPriceUtils: vi.fn((cameras: Cameras) => cameras),
}));

vi.mock('../../utils/sort/sort', () => ({
  sortCameras: vi.fn((cameras: Cameras) => cameras),
}));

describe('filters selectors', () => {
  const mockCamera1 = { ...makeFakeCamera(), id: 1, price: 1500 };
  const mockCamera2 = { ...makeFakeCamera(), id: 2, price: 3000 };

  const filtersState: FiltersState = {
    camerasCategory: 'Фотокамера',
    camerasTypes: ['Цифровая', 'Плёночная'],
    camerasLevels: ['Любительский'],
    priceFrom: 1000,
    priceTo: 5000,
    sortType: SortType.price,
    sortDirection: SortDirection.ascending
  };

  const state = {
    [NameSpace.Filters]: filtersState,
    [NameSpace.Cameras]: {
      cameras: [mockCamera1, mockCamera2],
      isCamerasDataLoading: false,
      isCamerasFetchingError: false,
    },
  } as unknown as State;

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

  describe('Basic selectors', () => {
    it('getCamerasCategory should return null when no category selected', () => {
      const emptyState = {
        [NameSpace.Filters]: {
          ...filtersState,
          camerasCategory: null,
        },
      };
      expect(getCamerasCategory(emptyState)).toBeNull();
    });

    it('getCamerasTypes should return empty array when no types selected', () => {
      const emptyState = {
        [NameSpace.Filters]: {
          ...filtersState,
          camerasTypes: [],
        },
      };
      expect(getCamerasTypes(emptyState)).toEqual([]);
    });

    it('getCamerasLevels should return empty array when no levels selected', () => {
      const emptyState = {
        [NameSpace.Filters]: {
          ...filtersState,
          camerasLevels: [],
        },
      };
      expect(getCamerasLevels(emptyState)).toEqual([]);
    });

    it('getPriceFrom should return null when not set', () => {
      const emptyState = {
        [NameSpace.Filters]: {
          ...filtersState,
          priceFrom: null,
        },
      };
      expect(getPriceFrom(emptyState)).toBeNull();
    });

    it('getPriceTo should return null when not set', () => {
      const emptyState = {
        [NameSpace.Filters]: {
          ...filtersState,
          priceTo: null,
        },
      };
      expect(getPriceTo(emptyState)).toBeNull();
    });
  });

  describe('Sort selectors', () => {
    it('getSortType should return sort type', () => {
      expect(getSortType(state)).toBe(SortType.price);
    });

    it('getSortDirection should return sort direction', () => {
      expect(getSortDirection(state)).toBe(SortDirection.ascending);
    });

    it('getSortType should return popularity when set', () => {
      const stateWithPopularity = {
        ...state,
        [NameSpace.Filters]: {
          ...filtersState,
          sortType: SortType.popularity,
        },
      } as unknown as State;

      expect(getSortType(stateWithPopularity)).toBe(SortType.popularity);
    });

    it('getSortDirection should return descending when set', () => {
      const stateWithDescending = {
        ...state,
        [NameSpace.Filters]: {
          ...filtersState,
          sortDirection: SortDirection.descending,
        },
      } as unknown as State;

      expect(getSortDirection(stateWithDescending)).toBe(SortDirection.descending);
    });
  });

  describe('Complex selectors', () => {
    it('getFilteredCameras should return cameras', () => {
      const result = getFilteredCameras(state);
      expect(result).toEqual([mockCamera1, mockCamera2]);
    });

    it('getFilteredSortedCameras should return sorted cameras', () => {
      const result = getFilteredSortedCameras(state);
      expect(result).toEqual([mockCamera1, mockCamera2]);
    });

    it('getFilteredCamerasWithoutPrice should return cameras without price filter', () => {
      const result = getFilteredCamerasWithoutPrice(state);
      expect(result).toEqual([mockCamera1, mockCamera2]);
    });
  });

  describe('Multiple filter combinations', () => {
    it('should work with multiple types selected', () => {
      const multiTypeState = {
        ...state,
        [NameSpace.Filters]: {
          ...filtersState,
          camerasTypes: ['Цифровая', 'Плёночная', 'Моментальная'],
        },
      } as unknown as State;

      const types = getCamerasTypes(multiTypeState);
      expect(types).toHaveLength(3);
      expect(types).toContain('Цифровая');
      expect(types).toContain('Плёночная');
      expect(types).toContain('Моментальная');
    });

    it('should work with multiple levels selected', () => {
      const multiLevelState = {
        ...state,
        [NameSpace.Filters]: {
          ...filtersState,
          camerasLevels: ['Нулевой', 'Любительский', 'Профессиональный'],
        },
      } as unknown as State;

      const levels = getCamerasLevels(multiLevelState);
      expect(levels).toHaveLength(3);
      expect(levels).toContain('Нулевой');
      expect(levels).toContain('Любительский');
      expect(levels).toContain('Профессиональный');
    });

    it('should work with price range', () => {
      const priceRangeState = {
        ...state,
        [NameSpace.Filters]: {
          ...filtersState,
          priceFrom: 10000,
          priceTo: 50000,
        },
      } as unknown as State;

      expect(getPriceFrom(priceRangeState)).toBe(10000);
      expect(getPriceTo(priceRangeState)).toBe(50000);
    });
  });
});
