import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { SortType, SortDirection, NameSpace } from '../../const';
import Sort from './sort';

describe('Component: Sort', () => {
  type FiltersState = {
    camerasCategory: string | null;
    camerasTypes: string[];
    camerasLevels: string[];
    priceFrom: number | null;
    priceTo: number | null;
    sortType: SortType;
    sortDirection: SortDirection;
  };

  type InitialState = {
    [NameSpace.Filters]?: FiltersState;
    [key: string]: unknown;
  };

  const renderComponent = (initialState: InitialState = {}) => {
    const defaultFilters: FiltersState = {
      camerasCategory: null,
      camerasTypes: [],
      camerasLevels: [],
      priceFrom: null,
      priceTo: null,
      sortType: SortType.Price,
      sortDirection: SortDirection.Ascending,
    };

    const { withStoreComponent } = withStore(
      <Sort />,
      makeFakeStore({
        [NameSpace.Filters]: {
          ...defaultFilters,
          ...(initialState?.[NameSpace.Filters] || {}),
        },
        ...initialState
      })
    );

    return render(withStoreComponent);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial render', () => {
    it('should render sort component correctly', () => {
      renderComponent();

      expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    });

    it('should render form with correct action', () => {
      renderComponent();

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('action', '#');
    });

    it('should render sort container with correct class', () => {
      renderComponent();

      const sortContainer = document.querySelector('.catalog-sort');
      expect(sortContainer).toBeInTheDocument();
    });

    it('should render sort title with correct class', () => {
      renderComponent();

      const title = screen.getByText('Сортировать:');
      expect(title).toHaveClass('title', 'title--h5');
    });
  });

  describe('sort type options', () => {
    it('should render both sort type options', () => {
      renderComponent();

      expect(screen.getByText('по цене')).toBeInTheDocument();
      expect(screen.getByText('по популярности')).toBeInTheDocument();
    });

    it('should render radio buttons for sort types', () => {
      renderComponent();

      const priceRadio = screen.getByLabelText('по цене') ;
      const popularRadio = screen.getByLabelText('по популярности') ;

      expect(priceRadio).toBeInTheDocument();
      expect(popularRadio).toBeInTheDocument();
      expect(priceRadio).toHaveAttribute('type', 'radio');
      expect(popularRadio).toHaveAttribute('type', 'radio');
    });

    it('should have correct id and name attributes on sort type inputs', () => {
      renderComponent();

      const priceRadio = screen.getByLabelText('по цене') ;
      const popularRadio = screen.getByLabelText('по популярности') ;

      expect(priceRadio).toHaveAttribute('id', 'sortPrice');
      expect(priceRadio).toHaveAttribute('name', 'sort');
      expect(popularRadio).toHaveAttribute('id', 'sortPopular');
      expect(popularRadio).toHaveAttribute('name', 'sort');
    });

    it('should have correct value attributes on sort type inputs', () => {
      renderComponent();

      const priceRadio = screen.getByLabelText('по цене') ;
      const popularRadio = screen.getByLabelText('по популярности') ;

      expect(priceRadio).toHaveAttribute('value', SortType.Price);
      expect(popularRadio).toHaveAttribute('value', SortType.Popularity);
    });

    it('should mark price radio as checked when sortType is price', () => {
      renderComponent({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
          sortType: SortType.Price,
          sortDirection: SortDirection.Ascending,
        }
      });

      const priceRadio = screen.getByLabelText('по цене');
      const popularRadio = screen.getByLabelText('по популярности');

      expect((priceRadio as HTMLInputElement).checked).toBe(true);
      expect((popularRadio as HTMLInputElement).checked).toBe(false);
    });

    it('should mark popularity radio as checked when sortType is popularity', () => {
      renderComponent({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
          sortType: SortType.Popularity,
          sortDirection: SortDirection.Ascending,
        }
      });

      const priceRadio = screen.getByLabelText('по цене');
      const popularRadio = screen.getByLabelText('по популярности');

      expect((priceRadio as HTMLInputElement).checked).toBe(false);
      expect((popularRadio as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('sort direction options', () => {
    it('should render both sort direction buttons', () => {
      renderComponent();

      const upButton = screen.getByLabelText('По возрастанию');
      const downButton = screen.getByLabelText('По убыванию');

      expect(upButton).toBeInTheDocument();
      expect(downButton).toBeInTheDocument();
    });

    it('should have correct attributes on sort direction inputs', () => {
      renderComponent();

      const upButton = screen.getByLabelText('По возрастанию') ;
      const downButton = screen.getByLabelText('По убыванию') ;

      expect(upButton).toHaveAttribute('type', 'radio');
      expect(downButton).toHaveAttribute('type', 'radio');
      expect(upButton).toHaveAttribute('name', 'sort-icon');
      expect(downButton).toHaveAttribute('name', 'sort-icon');
    });

    it('should have correct id and value attributes on sort direction inputs', () => {
      renderComponent();

      const upButton = screen.getByLabelText('По возрастанию') ;
      const downButton = screen.getByLabelText('По убыванию') ;

      expect(upButton).toHaveAttribute('id', 'up');
      expect(upButton).toHaveAttribute('value', SortDirection.Ascending);
      expect(downButton).toHaveAttribute('id', 'down');
      expect(downButton).toHaveAttribute('value', SortDirection.Descending);
    });

    it('should mark ascending button as checked when sortDirection is ascending', () => {
      renderComponent({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
          sortType: SortType.Price,
          sortDirection: SortDirection.Ascending,
        }
      });

      const upButton = screen.getByLabelText('По возрастанию');
      const downButton = screen.getByLabelText('По убыванию');

      expect((upButton as HTMLInputElement).checked).toBe(true);
      expect((downButton as HTMLInputElement).checked).toBe(false);
    });

    it('should mark descending button as checked when sortDirection is descending', () => {
      renderComponent({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
          sortType: SortType.Price,
          sortDirection: SortDirection.Descending,
        }
      });

      const upButton = screen.getByLabelText('По возрастанию');
      const downButton = screen.getByLabelText('По убыванию');

      expect((upButton as HTMLInputElement).checked).toBe(false);
      expect((downButton as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('sort structure', () => {
    it('should render sort type section with correct class', () => {
      renderComponent();

      const sortType = document.querySelector('.catalog-sort__type');
      expect(sortType).toBeInTheDocument();
    });

    it('should render sort order section with correct class', () => {
      renderComponent();

      const sortOrder = document.querySelector('.catalog-sort__order');
      expect(sortOrder).toBeInTheDocument();
    });

    it('should render sort inner container', () => {
      renderComponent();

      const innerContainer = document.querySelector('.catalog-sort__inner');
      expect(innerContainer).toBeInTheDocument();
    });

    it('should render buttons with correct classes', () => {
      renderComponent();

      const upBtn = document.querySelector('.catalog-sort__btn--up');
      const downBtn = document.querySelector('.catalog-sort__btn--down');

      expect(upBtn).toBeInTheDocument();
      expect(downBtn).toBeInTheDocument();
      expect(upBtn).toHaveClass('catalog-sort__btn', 'catalog-sort__btn--up');
      expect(downBtn).toHaveClass('catalog-sort__btn', 'catalog-sort__btn--down');
    });

    it('should render svg icons in sort direction buttons', () => {
      renderComponent();

      const svgs = document.querySelectorAll('.catalog-sort__btn svg');
      expect(svgs.length).toBe(2);

      svgs.forEach((svg) => {
        expect(svg).toHaveAttribute('width', '16');
        expect(svg).toHaveAttribute('height', '14');
      });
    });
  });

  describe('sort type selection', () => {
    it('should be able to click price option', async () => {
      const user = userEvent.setup();
      renderComponent({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
          sortType: SortType.Popularity,
          sortDirection: SortDirection.Ascending,
        }
      });

      const priceRadio = screen.getByLabelText('по цене');
      expect(priceRadio).toBeInTheDocument();
      await user.click(priceRadio);

      expect(priceRadio).toBeInTheDocument();
    });

    it('should be able to click popularity option', async () => {
      const user = userEvent.setup();
      renderComponent({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
          sortType: SortType.Price,
          sortDirection: SortDirection.Ascending,
        }
      });

      const popularRadio = screen.getByLabelText('по популярности');
      expect(popularRadio).toBeInTheDocument();
      await user.click(popularRadio);

      expect(popularRadio).toBeInTheDocument();
    });
  });

  describe('sort direction selection', () => {
    it('should be able to click ascending button', async () => {
      const user = userEvent.setup();
      renderComponent({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
          sortType: SortType.Price,
          sortDirection: SortDirection.Descending,
        }
      });

      const upButton = screen.getByLabelText('По возрастанию');
      expect(upButton).toBeInTheDocument();
      await user.click(upButton);

      expect(upButton).toBeInTheDocument();
    });

    it('should be able to click descending button', async () => {
      const user = userEvent.setup();
      renderComponent({
        [NameSpace.Filters]: {
          camerasCategory: null,
          camerasTypes: [],
          camerasLevels: [],
          priceFrom: null,
          priceTo: null,
          sortType: SortType.Price,
          sortDirection: SortDirection.Ascending,
        }
      });

      const downButton = screen.getByLabelText('По убыванию');
      expect(downButton).toBeInTheDocument();
      await user.click(downButton);

      expect(downButton).toBeInTheDocument();
    });
  });


});
