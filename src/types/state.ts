import { store } from '../store';
import { Camera, Cameras, DetailedCamera, DetailedCameras, PromoCameras, CartItems, CartItem } from './camera';
import { Reviews } from './review';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InitialState = {
  cameras: Cameras;
  isCamerasDataLoading: boolean;
  isCamerasFetchingError:boolean;

  detailedCamera: DetailedCamera | null;
  isDetailedCameraLoading: boolean;
  isDetailedCameraFetchingError: boolean;

  similarCameras: DetailedCameras;
  isSimilarCamerasLoading: boolean;
  isSimilarCamerasFetchingError: boolean;

  promoCameras: PromoCameras;
  isPromoCamerasLoading: boolean;
  isPromoCamerasFetchingError: boolean;

  error: string|null;

  camerasCategory: string | null;
  camerasTypes: string [];
  camerasLevels: string [];
  priceFrom: number | null;
  priceTo: number | null;
  sortType: string;
  sortDirection: string;

  reviews: Reviews;
  isReviewsLoading:boolean;
  isReviewsFetchingError: boolean;
  displayedReviewsCount: number;

  isAddToCartModalOpen: boolean;
  selectedCameraForCart: Camera| null;
  isAddCameraSuccessModalOpen: boolean;
  selectedCameraForRemoveFromCart: CartItem|null;
  isRemoveCameraFromCartOpen:boolean;
  isOrderSuccessModalOpen:boolean;

  camerasInCart: CartItems;

  coupon: string | null;
  discount: number;
  isCouponValid: boolean | null;
  isCouponChecking: boolean;
  isCouponFetchingError: boolean;

  isOrderLoading: boolean;
  isOrderSuccess: boolean;
  isOrderError: boolean;

};

export type CamerasState = Pick<InitialState, 'cameras'| 'isCamerasDataLoading'| 'isCamerasFetchingError'>;
export type DetailedCameraState = Pick<InitialState, 'detailedCamera'| 'isDetailedCameraLoading'| 'isDetailedCameraFetchingError'>;
export type SimilarCamerasState = Pick<InitialState, 'similarCameras'| 'isSimilarCamerasLoading'| 'isSimilarCamerasFetchingError'>;
export type PromoCamerasState = Pick<InitialState, 'promoCameras'| 'isPromoCamerasLoading'| 'isPromoCamerasFetchingError'>;
export type ErrorState = Pick<InitialState, 'error'>;
export type FiltersState = Pick<InitialState, 'camerasCategory'| 'camerasTypes'| 'camerasLevels'| 'priceFrom' | 'priceTo'| 'sortType'| 'sortDirection'>
export type ReviewsState = Pick<InitialState, 'reviews'|'isReviewsLoading'| 'isReviewsFetchingError' | 'displayedReviewsCount'>
export type ModalsState = Pick<InitialState,
'isAddToCartModalOpen' |
'selectedCameraForCart' |
'isAddCameraSuccessModalOpen' |
'selectedCameraForRemoveFromCart' |
'isRemoveCameraFromCartOpen' |
'isOrderSuccessModalOpen'>
export type CartState = Pick<InitialState, 'camerasInCart'>;
export type CouponState = Pick<InitialState, 'coupon' | 'discount' | 'isCouponValid' | 'isCouponChecking' | 'isCouponFetchingError' >
export type OrderState = Pick<InitialState, 'isOrderLoading' | 'isOrderSuccess' | 'isOrderError'>
