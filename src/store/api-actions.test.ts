import axios from 'axios';
import { vi } from 'vitest';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeCamera } from '../utils-mocks/mocks';
import { State } from '../types/state';

import { fetchCamerasAction,
  fetchDetailedCameraAction,
  fetchSimilarCamerasAction,
  fetchPromoCamerasAction,
  fetchReviewsAction,
  clearErrorAction,
} from './api-actions';

import { ApiRoute } from '../const';

vi.mock('../services/api', () => ({
  createAPI: () => axios.create(),
}));


describe('Async actions', () => {

  const axiosInstance = axios.create();
  const mockAxiosAdapter = new MockAdapter(axiosInstance);
  const middleware = [thunk.withExtraArgument(axiosInstance)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ CAMERAS: { cameras: [] }});
  });


  describe('fetchCamerasAction', ()=> {
    it(`should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.fulfilled",
      when server response 200`, async ()=> {

      const mockCameras = [makeFakeCamera()];

      mockAxiosAdapter.onGet(ApiRoute.Cameras).reply(200, mockCameras);

      await store.dispatch(fetchCamerasAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.fulfilled.type,
      ]);

      expect(fetchCamerasActionFulfilled.payload)
        .toEqual(mockCameras);
    });

    it(`should dispatch "fetchCamerasAction.pending", "fetchCamerasAction.rejected",
      when server response 400`, async ()=> {

      mockAxiosAdapter.onGet(ApiRoute.Cameras).reply(400, []);

      await store.dispatch(fetchCamerasAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchCamerasAction.pending.type,
        fetchCamerasAction.rejected.type,
      ]);
    });
  });

  describe('fetchDetailedOfferAction', ()=> {


    const mockCamera = makeFakeCamera();
    const id = mockCamera.id;

    it('should dispatch "fetchDetailedCameraAction.pending", "fetchDetailedCameraAction.fulfilled", when server response 200', async () => {


      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${id}`).reply(200, mockCamera);

      await store.dispatch(fetchDetailedCameraAction(id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      const fetchDetailedCameraActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchDetailedCameraAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchDetailedCameraAction.pending.type,
        fetchDetailedCameraAction.fulfilled.type,
      ]);
      expect(fetchDetailedCameraActionFulfilled.payload).toEqual(mockCamera);
    });

    it('should dispatch "fetchDetailedCameraAction.pending", "fetchDetailedCameraAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${id}`).reply(400, {});

      await store.dispatch(fetchDetailedCameraAction(id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchDetailedCameraAction.pending.type,
        fetchDetailedCameraAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarCamerasAction', ()=> {
    const mockCamera = makeFakeCamera();
    const id = mockCamera.id;

    it('should dispatch "fetchSimilarCamerasAction.pending", "fetchSimilarCamerasAction.fulfilled", when server response 200', async () => {
      const mockSimilarCameras = [makeFakeCamera()];
      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${id}/similar`).reply(200, mockSimilarCameras);
      await store.dispatch(fetchSimilarCamerasAction(id.toString()));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarCamerasAction.fulfilled>;
      expect(extractedActionsTypes).toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.fulfilled.type,
      ]);
      expect(fetchSimilarCamerasActionFulfilled.payload).toEqual(mockSimilarCameras);
    });

    it('should dispatch "fetchSimilarCamerasAction.pending", "fetchSimilarCamerasAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${id}/similar`).reply(400, {});
      await store.dispatch(fetchSimilarCamerasAction(id.toString()));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      expect(extractedActionsTypes).toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoCamerasAction', ()=> {
    it('should dispatch "fetchPromoCamerasAction.pending", "fetchPromoCamerasAction.fulfilled", when server response 200', async () => {
      const mockPromoCameras = [makeFakeCamera()];

      mockAxiosAdapter.onGet(ApiRoute.Promo).reply(200, mockPromoCameras);
      await store.dispatch(fetchPromoCamerasAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoCamerasActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoCamerasAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoCamerasAction.pending.type,
        fetchPromoCamerasAction.fulfilled.type,
      ]);
      expect(fetchPromoCamerasActionFulfilled.payload).toEqual(mockPromoCameras);
    });

    it('should dispatch "fetchPromoCamerasAction.pending", "fetchPromoCamerasAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Promo).reply(400, {});
      await store.dispatch(fetchPromoCamerasAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchPromoCamerasAction.pending.type,
        fetchPromoCamerasAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', ()=> {
    const mockCamera = makeFakeCamera();
    const id = mockCamera.id;

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async () => {
      const mockReviews = [{
        id: '1',
        createAt: '',
        cameraId: id,
        userName: 'user',
        advantage: 'good',
        disadvantage: 'none',
        review: 'Nice!',
        rating: 5
      }];
      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${id}/reviews`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected", when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Cameras}/${id}/reviews`).reply(400, {});

      await store.dispatch(fetchReviewsAction(id.toString()));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('clearErrorAction', ()=> {
    it(`should dispatch "clearErrorAction.pending",
      "clearErrorAction.fulfilled" `, async ()=> {

      await store.dispatch(clearErrorAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        clearErrorAction.pending.type,
        clearErrorAction.fulfilled.type,
      ]);

    });
  });
});
