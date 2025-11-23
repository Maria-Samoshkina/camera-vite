import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore, makeFakeCamera } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import FilterPrice from './filter-price';

describe('Component: FilterPrice', () => {
  const mockCameras = [
    { ...makeFakeCamera(), price: 1000 },
    { ...makeFakeCamera(), price: 2000 },
    { ...makeFakeCamera(), price: 3000 },
  ];

  const renderComponent = (initialState = {}) => {
    const { withStoreComponent, mockStore } = withStore(
      <FilterPrice />,
      makeFakeStore({
        [NameSpace.Cameras]: {
          cameras: mockCameras,
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        },
        ...initialState
      })
    );

    return {
      component: render(withStoreComponent),
      mockStore
    };
  };

  it('should render FilterPrice with correct legend', () => {
    renderComponent();

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });

  it('should render two number inputs for price range', () => {
    renderComponent();

    const numberInputs = screen.getAllByRole('spinbutton');

    expect(numberInputs).toHaveLength(2);

    expect(numberInputs[0]).toHaveAttribute('type', 'number');
    expect(numberInputs[0]).toHaveAttribute('name', 'price');

    expect(numberInputs[1]).toHaveAttribute('type', 'number');
    expect(numberInputs[1]).toHaveAttribute('name', 'priceUp');
  });

  it('should display current price values from store', () => {
    renderComponent({
      [NameSpace.Filters]: {
        camerasCategory: null,
        camerasTypes: [],
        camerasLevels: [],
        priceFrom: 1500,
        priceTo: 2500,
      }
    });

    const numberInputs = screen.getAllByRole('spinbutton');

    expect(numberInputs[0]).toHaveValue(1500);
    expect(numberInputs[1]).toHaveValue(2500);
  });

  it('should dispatch changePriceFrom action when price from input changes', () => {
    const { mockStore } = renderComponent();

    const priceFromInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(priceFromInput, { target: { value: '1200' } });

    const actions = mockStore.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('FILTERS/changePriceFrom');
    expect(actions[0].payload).toBe(1200);
  });

  it('should dispatch changePriceTo action when price to input changes', () => {
    const { mockStore } = renderComponent();

    const priceToInput = screen.getAllByRole('spinbutton')[1];
    fireEvent.change(priceToInput, { target: { value: '2800' } });

    const actions = mockStore.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('FILTERS/changePriceTo');
    expect(actions[0].payload).toBe(2800);
  });

});
