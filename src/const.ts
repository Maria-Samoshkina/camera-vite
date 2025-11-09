export enum AppRoute {
  Main = '/',
  NotFound = '*',
  Camera = '/camera'
}

export enum NameSpace {
Cameras = 'CAMERAS',
DetailedCamera = 'DETAILED_CAMERA',
SimilarCameras = 'SIMILAR_CAMERAS',
PromoCameras= 'PROMO_CAMERAS',
Error = 'ERROR',
Filters = 'FILTERS'
}

export enum ApiRoute {
  Cameras = '/cameras',
  Promo = '/promo'
}

export const CAMERA_CATEGORIES = ['Фотокамера', 'Видеокамера'] as const;
export const CAMERA_TYPES = ['Цифровая', 'Плёночная', 'Моментальная', 'Коллекционная'] as const;
export const CAMERA_LEVELS = ['Нулевой', 'Любительский', 'Профессиональный'] as const;


