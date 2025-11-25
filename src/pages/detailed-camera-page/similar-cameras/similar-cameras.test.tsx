import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SimilarCameras from './similar-cameras';
import { makeFakeCamera, makeFakeStore } from '../../../utils-mocks/mocks';
import { NameSpace } from '../../../const';
import { getSimilarCameras } from '../../../store/similar-cameras/similar-cameras-selectors';
import { withStore, withHistory } from '../../../utils-mocks/mock-components';

vi.mock('../../../store/similar-cameras/similar-cameras-selectors', () => ({
  getSimilarCameras: vi.fn(),
}));

vi.mock('../../../hooks/use-add-to-cart-modal', () => ({
  default: () => ({
    handleBuyButtonClick: vi.fn(),
    isAddToCartModalOpen: false,
    handleAddToCartModalClose: vi.fn(),
    selectedCameraForCart: null,
  }),
}));

vi.mock('swiper/react', () => ({
  Swiper: ({ children, ...props }: { children: React.ReactNode; slidesPerView?: number; slidesPerGroup?: number; spaceBetween?: number }) => (
    <div
      data-testid="swiper"
      data-slides-per-view={props.slidesPerView}
      data-slides-per-group={props.slidesPerGroup}
      data-space-between={props.spaceBetween}
    >
      {children}
    </div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">
      {children}
    </div>
  ),
}));

vi.mock('swiper/modules', () => ({
  Navigation: {},
}));

vi.mock('../../catalog-page/camera-card', () => ({
  default: ({ camera, onAddToCartClick, className }: { camera: { id: number; name: string }; onAddToCartClick: () => void; className?: string }) => (
    <div data-testid={`camera-card-${camera.id}`} className={className}>
      <span>{camera.name}</span>
      <button onClick={onAddToCartClick} data-testid={`buy-button-${camera.id}`}>
        Купить
      </button>
    </div>
  ),
}));

const mockGetSimilarCameras = vi.mocked(getSimilarCameras);

describe('Component: SimilarCameras', () => {
  const mockCamera1 = { ...makeFakeCamera(), name: 'Similar Camera One', id: 1 };
  const mockCamera2 = { ...makeFakeCamera(), name: 'Similar Camera Two', id: 2 };
  const mockCamera3 = { ...makeFakeCamera(), name: 'Similar Camera Three', id: 3 };

  const renderComponent = (storeData: ReturnType<typeof makeFakeStore>) => {
    const { withStoreComponent } = withStore(
      <SimilarCameras />,
      storeData
    );
    const componentWithHistory = withHistory(withStoreComponent);
    return render(componentWithHistory);
  };

  const defaultStoreData = makeFakeStore({
    [NameSpace.SimilarCameras]: {
      similarCameras: [mockCamera1, mockCamera2, mockCamera3],
      isSimilarCamerasLoading: false,
      isSimilarCamerasFetchingError: false,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null when similar cameras array is empty', () => {
    mockGetSimilarCameras.mockReturnValue([]);

    const { container } = renderComponent(defaultStoreData);

    expect(container.firstChild).toBeNull();
  });


  it('should render similar cameras section when cameras exist', () => {
    mockGetSimilarCameras.mockReturnValue([mockCamera1, mockCamera2, mockCamera3]);

    renderComponent(defaultStoreData);

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Похожие товары');
  });

  it('should render swiper', () => {
    mockGetSimilarCameras.mockReturnValue([mockCamera1, mockCamera2, mockCamera3]);

    renderComponent(defaultStoreData);

    const swiper = screen.getByTestId('swiper');
    expect(swiper).toBeInTheDocument();
  });

  it('should render swiper navigation buttons', () => {
    mockGetSimilarCameras.mockReturnValue([mockCamera1, mockCamera2, mockCamera3]);

    renderComponent(defaultStoreData);

    const prevButton = document.querySelector('.swiper-button-prev');
    expect(prevButton).toBeInTheDocument();

    const nextButton = document.querySelector('.swiper-button-next');
    expect(nextButton).toBeInTheDocument();
  });

  it('should render all similar cameras as slides', () => {
    mockGetSimilarCameras.mockReturnValue([mockCamera1, mockCamera2, mockCamera3]);

    renderComponent(defaultStoreData);

    const slides = screen.getAllByTestId('swiper-slide');

    expect(slides).toHaveLength(3);
  });


  it('should handle buy button click', () => {
    mockGetSimilarCameras.mockReturnValue([mockCamera1]);

    renderComponent(defaultStoreData);

    const buyButton = screen.getByTestId(`buy-button-${mockCamera1.id}`);
    fireEvent.click(buyButton);

    expect(buyButton).toBeInTheDocument();
  });


  it('should render camera names correctly', () => {
    mockGetSimilarCameras.mockReturnValue([mockCamera1, mockCamera2]);

    renderComponent(defaultStoreData);

    expect(screen.getByText('Similar Camera One')).toBeInTheDocument();
    expect(screen.getByText('Similar Camera Two')).toBeInTheDocument();
  });
});
