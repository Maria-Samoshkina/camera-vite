import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, NameSpace } from '../../const';
import App from './app';
import { withStore, withHistory } from '../../utils-mocks/mock-components';
import { makeFakeCamera, makeFakePromoCamera, makeFakeStore } from '../../utils-mocks/mocks.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render CatalogPage when user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const camera = makeFakeCamera();
    const promoCamera = makeFakePromoCamera();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Cameras]: {
          cameras: [camera],
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        },
        [NameSpace.PromoCameras]: {
          promoCameras: [promoCamera],
          isPromoCamerasLoading: false,
          isPromoCamerasFetchingError: false,
        },
      })
    );

    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render DetailedCameraPage when user navigates to "/camera/:cameraId"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const camera = makeFakeCamera();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Cameras]: {
          cameras: [camera],
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        },
        [NameSpace.DetailedCamera]: {
          detailedCamera: camera,
          isDetailedCameraLoading: false,
          isDetailedCameraFetchingError: false,
        },
      })
    );

    mockHistory.push(`${AppRoute.Camera}/${camera.id}`);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: 'FakeCamera' })).toBeInTheDocument();
  });

  it('should render LoadingPage when cameras data is loading', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Cameras]: {
          cameras: [],
          isCamerasDataLoading: true,
          isCamerasFetchingError: false,
        },
      })
    );

    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render CartPage when user navigates to "/card"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Cameras]: {
          cameras: [],
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        },
        [NameSpace.Cart]: {
          camerasInCart: [],
        },
      })
    );

    mockHistory.push(AppRoute.Card);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: 'Корзина' })).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigates to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const unknownRoute = '/unknown-route';

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Cameras]: {
          cameras: [],
          isCamerasDataLoading: false,
          isCamerasFetchingError: false,
        },
      })
    );

    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();

  });
});
