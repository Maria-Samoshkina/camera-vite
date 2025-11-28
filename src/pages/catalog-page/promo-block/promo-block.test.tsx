import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PromoBlock from './promo-block';
import { makeFakePromoCamera, makeFakeStore } from '../../../utils-mocks/mocks';
import { NameSpace } from '../../../const';
import { getPromoCameras, getIsPromoCamerasDataLoading } from '../../../store/promo-cameras/promo-cameras-selectors';
import { withStore,withHistory } from '../../../utils-mocks/mock-components';

vi.mock('../../../store/promo-cameras/promo-cameras-selectors', () => ({
  getPromoCameras: vi.fn(),
  getIsPromoCamerasDataLoading: vi.fn(),
}));

vi.mock('swiper/react', () => ({
  Swiper: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div className={className} data-testid="swiper">
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
  Pagination: {},
  Autoplay: {},
}));

const mockGetPromoCameras = vi.mocked(getPromoCameras);
const mockGetIsPromoCamerasDataLoading = vi.mocked(getIsPromoCamerasDataLoading);

describe('Component: PromoBlock', () => {
  const mockPromoCamera1 = { ...makeFakePromoCamera(), name: 'Promo Camera One', id: 1 };
  const mockPromoCamera2 = { ...makeFakePromoCamera(), name: 'Promo Camera Two', id: 2 };

  const renderComponent = (storeData: ReturnType<typeof makeFakeStore>) => {
    const { withStoreComponent } = withStore(
      <PromoBlock />,
      storeData
    );
    const componentWithHistory = withHistory(withStoreComponent);
    return render(componentWithHistory);
  };

  const defaultStoreData = makeFakeStore({
    [NameSpace.PromoCameras]: {
      promoCameras: [mockPromoCamera1, mockPromoCamera2],
      isPromoCamerasLoading: false,
      isPromoCamerasFetchingError: false,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state when data is loading', () => {
    mockGetIsPromoCamerasDataLoading.mockReturnValue(true);
    mockGetPromoCameras.mockReturnValue([]);

    renderComponent(defaultStoreData);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('swiper')).not.toBeInTheDocument();
  });


  it('should render swiper with promo cameras', () => {
    mockGetIsPromoCamerasDataLoading.mockReturnValue(false);
    mockGetPromoCameras.mockReturnValue([mockPromoCamera1, mockPromoCamera2]);

    renderComponent(defaultStoreData);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.getByTestId('swiper')).toHaveClass('slider');

    const slides = screen.getAllByTestId('swiper-slide');
    expect(slides).toHaveLength(2);
  });

  it('should render promo camera images with correct attributes', () => {
    mockGetIsPromoCamerasDataLoading.mockReturnValue(false);
    mockGetPromoCameras.mockReturnValue([mockPromoCamera1]);

    renderComponent(defaultStoreData);

    const promoImage = screen.getByAltText(mockPromoCamera1.name);
    expect(promoImage).toBeInTheDocument();
    expect(promoImage).toHaveAttribute('src', mockPromoCamera1.previewImg);
    expect(promoImage).toHaveAttribute('srcSet', `${mockPromoCamera1.previewImg2x} 2x`);
    expect(promoImage).toHaveAttribute('width', '1280');
    expect(promoImage).toHaveAttribute('height', '280');
  });

  it('should render multiple promo cameras', () => {
    mockGetIsPromoCamerasDataLoading.mockReturnValue(false);
    mockGetPromoCameras.mockReturnValue([mockPromoCamera1, mockPromoCamera2]);

    renderComponent(defaultStoreData);

    expect(screen.getByText(mockPromoCamera1.name)).toBeInTheDocument();
    expect(screen.getByText(mockPromoCamera2.name)).toBeInTheDocument();

    const detailsLinks = screen.getAllByText('Подробнее');
    expect(detailsLinks).toHaveLength(2);
    expect(detailsLinks[0]).toHaveAttribute('href', `/camera/${mockPromoCamera1.id}`);
    expect(detailsLinks[1]).toHaveAttribute('href', `/camera/${mockPromoCamera2.id}`);
  });

});
