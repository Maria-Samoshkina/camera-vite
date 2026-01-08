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
  Order= '/orders',
  Reviews = '/reviews'
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

export const MIN_SEARCH_LENGTH = 3;

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 15;

export const TEXT_MIN_LENGTH = 10;
export const TEXT_MAX_LENGTH = 160;

export const RATING_MIN_VALUE = 1;
export const RATING_MAX_VALUE = 5;
export const ITEMS_PER_PAGE = 9;
export const PAGES_PER_GROUP = 3;

export const RATING_STARS = ['отлично', 'хорошо', 'нормально', 'плохо', 'ужасно'];
