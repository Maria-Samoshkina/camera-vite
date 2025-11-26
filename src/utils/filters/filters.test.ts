
import { getCamerasByCategory,
  getCamerasByType, getCamerasByLevel,
  getFilteredCamerasUtils,
  getFilteredCamerasWithoutPriceUtils } from './filters';
import { vi } from 'vitest';
import { makeFakeCamera } from '../../utils-mocks/mocks';
import { getCamerasByPrice } from './price';

vi.mock('./price', () => ({
  getCamerasByPrice: vi.fn(),
}));

describe('filters utils', () => {
  const camera1 = { ...makeFakeCamera(),
    id: 1,
    category: 'Фотоаппарат',
    type: 'digital',
    level: 'beginner',
    price: 100 };

  const camera2 = { ...makeFakeCamera(),
    id: 2,
    category: 'Видеокамера',
    type: 'video',
    level: 'professional',
    price: 200 };

  const camera3 = { ...makeFakeCamera(),
    id: 3,
    category: 'Фотоаппарат',
    type: 'film',
    level: 'intermediate',
    price: 300 };

  const cameras = [camera1, camera2, camera3];
  const detailedCameras = [camera1, camera2, camera3];

  it('getCamerasByCategory filters by category', () => {
    expect(getCamerasByCategory(cameras, 'Фотокамера')).toEqual([camera1, camera3]);
    expect(getCamerasByCategory(cameras, 'Видеокамера')).toEqual([camera2]);
    expect(getCamerasByCategory(cameras, null)).toEqual(cameras);
  });

  it('getCamerasByType filters by type', () => {
    expect(getCamerasByType(cameras, ['digital'])).toEqual([camera1]);
    expect(getCamerasByType(cameras, [])).toEqual(cameras);
  });

  it('getCamerasByLevel filters by level', () => {
    expect(getCamerasByLevel(detailedCameras, ['beginner'])).toEqual([camera1]);
    expect(getCamerasByLevel(detailedCameras, [])).toEqual(detailedCameras);
  });

  it('getFilteredCamerasUtils filters by all params', () => {

    const mockGetCamerasByPrice = vi.mocked(getCamerasByPrice);
    mockGetCamerasByPrice.mockReturnValue([camera1]);

    const result = getFilteredCamerasUtils(
      cameras,
      'Фотокамера',
      ['digital'],
      ['beginner'],
      50,
      150
    );

    expect(mockGetCamerasByPrice).toHaveBeenCalledWith([camera1], 50, 150);
    expect(result).toEqual([camera1]);
  });

  it('getFilteredCamerasWithoutPriceUtils filters by category, type, level', () => {
    const result = getFilteredCamerasWithoutPriceUtils(cameras, 'Фотокамера', ['digital'], ['beginner']);
    expect(result).toEqual([camera1]);
  });
});

