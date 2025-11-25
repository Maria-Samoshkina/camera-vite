import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from './mocks';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('../pages/catalog-page/catalog-page', () => ({
  default: () => <div>Catalog Page</div>,
}));

vi.mock('../pages/detailed-camera-page/detailed-camera-page', () => ({
  default: () => <div>Detailed Camera Page</div>,
}));

vi.mock('../pages/not-found-page/not-fonund-page', () => ({
  default: () => <div>404 Not Found Page</div>,
}));

vi.mock('../pages/loading -page/loading-page', () => ({
  default: () => <div>Loading Page</div>,
}));


vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
  ToastContainer: () => <div>Toast Container</div>,
}));


vi.mock('../services/api', () => ({
  createAPI: () => axios.create(),
}));

export function withHistory(component: JSX.Element, history?: MemoryHistory): JSX.Element {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

type HookWrapper = {
  wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axiosInstance = axios.create();
  const mockAxiosAdapter = new MockAdapter(axiosInstance);
  const middleware = [thunk.withExtraArgument(axiosInstance)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}

export function withStoreForHooks(
  initialState: Partial<State> = {},
): HookWrapper {
  const axiosInstance = axios.create();
  const mockAxiosAdapter = new MockAdapter(axiosInstance);
  const middleware = [thunk.withExtraArgument(axiosInstance)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  return ({
    wrapper,
    mockStore,
    mockAxiosAdapter,
  });
}
