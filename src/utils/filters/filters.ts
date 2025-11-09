import { Cameras, DetailedCameras } from '../../types/camera';

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

const getCamerasByType = (cameras: Cameras, type: string| null) => {
  if (!type) {
    return cameras;
  }
  return cameras.filter((camera) => camera.type === type);
};

const getCamerasByLevel = (detailedCameras: DetailedCameras, level: string | null) => {
  if (!level) {
    return detailedCameras;
  }
  return detailedCameras.filter((detailedCamera) => detailedCamera.level === level);
};

export {getCamerasByCategory, getCamerasByType, getCamerasByLevel};
