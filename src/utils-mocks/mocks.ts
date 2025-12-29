
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Camera, DetailedCamera, PromoCamera } from '../types/camera';
import { Review } from '../types/review';
import { NameSpace } from '../const';
import { name, datatype, image, lorem, internet } from 'faker';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeCamera = (): Camera => ({
  id: datatype.number({ min: 1, max: 1000 }),
  name: 'FakeCamera',
  vendorCode: `${datatype.string(6).toUpperCase()}`,
  type: 'Цифровая',
  category: 'Фотокамера',
  description: lorem.paragraph(),
  level: 'Любительский',
  price: datatype.number({ min: 10000, max: 100000 }),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  reviewCount: datatype.number({ min: 0, max: 100 }),
  previewImg: image.imageUrl(280, 240),
  previewImg2x: image.imageUrl(560, 480),
  previewImgWebp: image.imageUrl(280, 240),
  previewImgWebp2x: image.imageUrl(560, 480),
});

export const makeFakeDetailedCamera = (): DetailedCamera => makeFakeCamera();

export const makeFakePromoCamera = (): PromoCamera => ({
  id: datatype.number({ min: 1, max: 1000 }),
  name: `${name.firstName()} Promo Camera`,
  previewImg: image.imageUrl(1280, 550),
  previewImg2x: image.imageUrl(2560, 1100),
  previewImgWebp: image.imageUrl(1280, 550),
  previewImgWebp2x: image.imageUrl(2560, 1100),
});

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  createAt: datatype.datetime().toISOString(),
  cameraId: datatype.number({ min: 1, max: 1000 }),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.paragraph(),
  rating: datatype.number({ min: 1, max: 5 }),
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.Cameras]: {
    cameras: [],
    isCamerasDataLoading: false,
    isCamerasFetchingError: false,
    ...initialState?.[NameSpace.Cameras],
  },
  [NameSpace.DetailedCamera]: {
    detailedCamera: null,
    isDetailedCameraLoading: false,
    isDetailedCameraFetchingError: false,
    ...initialState?.[NameSpace.DetailedCamera],
  },
  [NameSpace.SimilarCameras]: {
    similarCameras: [],
    isSimilarCamerasLoading: false,
    isSimilarCamerasFetchingError: false,
    ...initialState?.[NameSpace.SimilarCameras],
  },
  [NameSpace.PromoCameras]: {
    promoCameras: [],
    isPromoCamerasLoading: false,
    isPromoCamerasFetchingError: false,
    ...initialState?.[NameSpace.PromoCameras],
  },
  [NameSpace.Error]: {
    error: null,
    ...initialState?.[NameSpace.Error],
  },
  [NameSpace.Filters]: {
    camerasCategory: null,
    camerasTypes: [],
    camerasLevels: [],
    priceFrom: null,
    priceTo: null,
    sortType: 'price',
    sortDirection: 'asc',
    ...initialState?.[NameSpace.Filters],
  },
  [NameSpace.Reviews]: {
    reviews: [],
    isReviewsLoading: false,
    isReviewsFetchingError: false,
    displayedReviewsCount: 3,
    isSubmitting: false,
    isSubmittingSuccess: false,
    isSubmittingFailed: false,
    ...initialState?.[NameSpace.Reviews],
  },
  [NameSpace.Modals]: {
    isAddToCartModalOpen: false,
    selectedCameraForCart: null,
    isAddCameraToCartSuccessModalOpen: false,
    selectedCameraForRemoveFromCart: null,
    isRemoveCameraFromCartOpen: false,
    isOrderSuccessModalOpen: false,
    isAddNewReviewModalOpen: false,
    isReviewSuccessModalOpen: false,
    ...initialState?.[NameSpace.Modals],
  },
  [NameSpace.Cart]: {
    camerasInCart: [],
    ...initialState?.[NameSpace.Cart],
  },
  [NameSpace.Coupon]: {
    coupon: null,
    discount: 0,
    isCouponValid: null,
    isCouponChecking: false,
    isCouponFetchingError: false,
    ...initialState?.[NameSpace.Coupon],
  },
  [NameSpace.Order]: {
    isOrderLoading: false,
    isOrderSuccess: false,
    isOrderError: false,
    ...initialState?.[NameSpace.Order],
  },
});
