import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DetailedCameraPage from './detailed-camera-page';
import { makeFakeCamera, makeFakeStore } from '../../utils-mocks/mocks';
import { NameSpace } from '../../const';
import { withStore, withHistory } from '../../utils-mocks/mock-components';

vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/footer/footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock('./detailed-camera-tabs', () => ({
  default: () => <div data-testid="detailed-camera-tabs">Camera Tabs</div>,
}));

vi.mock('./reviews-list', () => ({
  default: () => <div data-testid="reviews-list">Reviews List</div>,
}));

vi.mock('./similar-cameras/similar-cameras', () => ({
  default: () => <div data-testid="similar-cameras">Similar Cameras</div>,
}));

vi.mock('../../components/modals/add-camera-to-cart-modal', () => ({
  default: ({ isOpen }: { isOpen: boolean }) => (
    isOpen ? <div data-testid="add-to-cart-modal">Add To Cart Modal</div> : null
  ),
}));

describe('Page: DetailedCameraPage', () => {
  const mockCamera = { ...makeFakeCamera(), name: 'Test Camera DetailedPage', id: 999 };

  const renderComponent = (initialState = {}) => {
    const defaultState = makeFakeStore({
      [NameSpace.DetailedCamera]: {
        detailedCamera: mockCamera,
        isDetailedCameraLoading: false,
        isDetailedCameraFetchingError: false,
      },
      [NameSpace.Modals]: {
        isAddToCartModalOpen: false,
        selectedCameraForCart: null,
      },
      ...initialState,
    });

    const { withStoreComponent } = withStore(
      <DetailedCameraPage />,
      defaultState
    );

    const componentWithHistory = withHistory(withStoreComponent);
    return render(componentWithHistory);
  };

  it('should render page structure correctly', () => {
    renderComponent();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render breadcrumbs', () => {
    renderComponent();

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();

    const activeBreadcrumb = document.querySelector('.breadcrumbs__link--active');
    expect(activeBreadcrumb).toBeInTheDocument();
    expect(activeBreadcrumb).toHaveTextContent('Test Camera DetailedPage');
  });

  it('should render camera information', () => {
    renderComponent();

    const cameraTitle = screen.getByRole('heading', { level: 1 });
    expect(cameraTitle).toHaveTextContent(mockCamera.name);

    expect(screen.getByAltText(mockCamera.name)).toBeInTheDocument();
  });

  it('should render camera rating', () => {
    renderComponent();

    expect(screen.getByText(`Рейтинг: ${mockCamera.rating}`)).toBeInTheDocument();
    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.reviewCount.toString())).toBeInTheDocument();
  });

  it('should render add to cart button', () => {
    renderComponent();

    const addToCartButton = screen.getByText('Добавить в корзину');
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toHaveClass('btn--purple');
  });


  it('should show loading state when camera is loading', () => {
    const loadingState = makeFakeStore({
      [NameSpace.DetailedCamera]: {
        detailedCamera: null,
        isDetailedCameraLoading: true,
        isDetailedCameraFetchingError: false,
      },
    });

    const { withStoreComponent } = withStore(
      <DetailedCameraPage />,
      loadingState
    );

    const componentWithHistory = withHistory(withStoreComponent);
    render(componentWithHistory);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show add to cart modal when modal is open', () => {
    const stateWithOpenModal = makeFakeStore({
      [NameSpace.DetailedCamera]: {
        detailedCamera: mockCamera,
        isDetailedCameraLoading: false,
        isDetailedCameraFetchingError: false,
      },
      [NameSpace.Modals]: {
        isAddToCartModalOpen: true,
        selectedCameraForCart: mockCamera,
      },
    });

    const { withStoreComponent } = withStore(
      <DetailedCameraPage />,
      stateWithOpenModal
    );

    const componentWithHistory = withHistory(withStoreComponent);
    render(componentWithHistory);

    expect(screen.getByTestId('add-to-cart-modal')).toBeInTheDocument();
  });

});
