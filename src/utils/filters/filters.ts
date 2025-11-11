import { Cameras, DetailedCameras } from '../../types/camera';
import { getCamerasByPrice } from './price';

const CATEGORY_MAPPING = {
  'Фотокамера': 'Фотоаппарат',
  'Видеокамера': 'Видеокамера'
} as const;

const getCamerasByCategory = (cameras: Cameras, category: string | null) => {
  if (!category) {
    return cameras;
  }
  const serverCategory = CATEGORY_MAPPING[category as keyof typeof CATEGORY_MAPPING];
  return cameras.filter((camera) => camera.category === serverCategory);
};

const getCamerasByType = (cameras: Cameras, types: string[]) => {
  if (!types.length) {
    return cameras;
  }
  return cameras.filter((camera) => types.includes(camera.type));
};

const getCamerasByLevel = (detailedCameras: DetailedCameras, levels: string[]) => {
  if (!levels.length) {
    return detailedCameras;
  }
  return detailedCameras.filter((detailedCamera) => levels.includes(detailedCamera.level));
};

const getFilteredCameras = (
  cameras: Cameras,
  category: string | null,
  types: string[],
  levels: string[],
  priceFrom: number | null,
  priceTo: number | null
) => {
  let filteredCameras = cameras;

  if (category) {
    filteredCameras = getCamerasByCategory(filteredCameras, category);
  }

  if (types.length) {
    filteredCameras = getCamerasByType(filteredCameras, types);
  }

  if(levels.length) {
    filteredCameras = getCamerasByLevel(filteredCameras, levels);
  }

  if(priceFrom !== null && priceFrom !== undefined || priceTo !== null && priceTo !== undefined) {
    filteredCameras = getCamerasByPrice(filteredCameras, priceFrom, priceTo);
  }

  return filteredCameras;
};

export {getCamerasByCategory, getCamerasByType, getCamerasByLevel, getFilteredCameras};
