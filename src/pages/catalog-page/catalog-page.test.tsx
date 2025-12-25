import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CatalogPage from './catalog-page';
import { makeFakeCamera, makeFakeStore, makeFakePromoCamera } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import { getFilteredSortedCameras } from '../../store/filters/filters-selectors';
import { withStore, withHistory } from '../../utils-mocks/mock-components';


vi.mock('../../store/filters/filters-selectors', () => ({
  getFilteredSortedCameras: vi.fn(),
}));

const mockGetFilteredSortedCameras = vi.mocked(getFilteredSortedCameras);

vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/footer/footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('../../pages/catalog-page/promo-block/promo-block', () => ({
  default: () => <div data-testid="promo-block">PromoBlock</div>,
}));

vi.mock('../../components/filter/filter', () => ({
  default: () => <div data-testid="filter">Filter</div>,
}));

vi.mock('../../components/sort/sort', () => ({
  default: () => <div data-testid="sort">Sort</div>,
}));

vi.mock('../../components/pagination/pagination', () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

vi.mock('../../components/modals/add-camera-to-cart-modal', () => ({
  default: ({ isOpen }: { isOpen: boolean }) => (
    isOpen ? <div data-testid="add-to-cart-modal">AddToCartModal</div> : null
  ),
}));

vi.mock('./camera-card', () => ({
  default: ({ camera, onAddToCartClick }: { camera: { id: number; name: string }; onAddToCartClick: () => void }) => (
    <div data-testid={`camera-card-${camera.id}`}>
      <span>{camera.name}</span>
      <button onClick={onAddToCartClick} data-testid={`buy-button-${camera.id}`}>
        Купить
      </button>
    </div>
  ),
}));

describe('Page: CatalogPage', () => {
  const mockCamera1 = { ...makeFakeCamera(), name: 'Camera One', id: 1 };
  const mockCamera2 = { ...makeFakeCamera(), name: 'Camera Two', id: 2 };
  const mockPromoCamera = makeFakePromoCamera();

  const renderComponent = (storeData: ReturnType<typeof makeFakeStore>) => {
    const { withStoreComponent } = withStore(
      <CatalogPage />,
      storeData
    );
    const componentWithHistory = withHistory(withStoreComponent);
    return render(componentWithHistory);
  };

  const defaultStoreData = makeFakeStore({
    [NameSpace.Cameras]: {
      cameras: [mockCamera1, mockCamera2],
      isCamerasDataLoading: false,
      isCamerasFetchingError: false,
    },
    [NameSpace.PromoCameras]: {
      promoCameras: [mockPromoCamera],
      isPromoCamerasLoading: false,
      isPromoCamerasFetchingError: false,
    },
    [NameSpace.Filters]: {
      camerasCategory: null,
      camerasTypes: [],
      camerasLevels: [],
      priceFrom: null,
      priceTo: null,
    },
    [NameSpace.Modals]: {
      isAddToCartModalOpen: false,
      selectedCameraForCart: null,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetFilteredSortedCameras.mockReturnValue([mockCamera1, mockCamera2]);
  });

  it('should render catalog page correctly', () => {
    renderComponent(defaultStoreData);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('promo-block')).toBeInTheDocument();
  });

  it('should render page title', () => {
    renderComponent(defaultStoreData);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Каталог фото- и видеотехники');
  });

  it('should render breadcrumbs', () => {
    renderComponent(defaultStoreData);

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();

    const activeBreadcrumb = screen.getByText('Каталог');
    expect(activeBreadcrumb).toHaveClass('breadcrumbs__link--active');
  });

  it('should render catalog components', () => {
    renderComponent(defaultStoreData);

    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByTestId('sort')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should render filtered cameras', () => {
    renderComponent(defaultStoreData);

    expect(screen.getByTestId(`camera-card-${mockCamera1.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`camera-card-${mockCamera2.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockCamera1.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera2.name)).toBeInTheDocument();
  });


  it('should not show add to cart modal by default', () => {
    renderComponent(defaultStoreData);

    expect(screen.queryByTestId('add-to-cart-modal')).not.toBeInTheDocument();
  });

  it('should show add to cart modal when state is open', () => {
    const storeWithOpenModal = makeFakeStore({
      ...defaultStoreData,
      [NameSpace.Modals]: {
        isAddToCartModalOpen: true,
        selectedCameraForCart: mockCamera1,
      },
    });

    renderComponent(storeWithOpenModal);

    expect(screen.getByTestId('add-to-cart-modal')).toBeInTheDocument();
  });


  it('should pass correct props to camera cards', () => {
    renderComponent(defaultStoreData);

    const cameraCard = screen.getByTestId(`camera-card-${mockCamera1.id}`);
    expect(cameraCard).toBeInTheDocument();

    const buyButton = screen.getByTestId(`buy-button-${mockCamera1.id}`);
    expect(buyButton).toBeInTheDocument();
  });

});
