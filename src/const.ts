export enum AppRoute {
  Main = '/',
  NotFound = '*',
  Camera = '/camera',
  Card = '/card'
}

export enum NameSpace {
Cameras = 'CAMERAS',
DetailedCamera = 'DETAILED_CAMERA',
SimilarCameras = 'SIMILAR_CAMERAS',
PromoCameras= 'PROMO_CAMERAS',
Error = 'ERROR',
Filters = 'FILTERS',
Reviews = 'REVIEWS',
Modals = 'MODALS',
Cart = 'CART',
Coupon = 'COUPON',
Order = 'ORDER'
}

export enum ApiRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Coupon = '/coupons',
  Order= '/orders'
}

export const CAMERA_CATEGORIES = ['Фотокамера', 'Видеокамера'] as const;
export const CAMERA_TYPES = ['Цифровая', 'Плёночная', 'Моментальная', 'Коллекционная'] as const;
export const CAMERA_LEVELS = ['Нулевой', 'Любительский', 'Профессиональный'] as const;

export const INITIAL_REVIEWS_COUNT = 3;
export const REVIEWS_COUNT_STEP = 3;

export const TIMEOUT_SHOW_ERROR = 2000;


export enum SortType {
  price = 'price',
 popularity = 'popularity'
}

export enum SortDirection {
  ascending = 'ascending',
  descending = 'descending'
}
