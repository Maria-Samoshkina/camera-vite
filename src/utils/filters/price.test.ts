import { getMinMax, getCamerasByPrice } from './price';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('price utils', () => {
  const camera1 = { ...makeFakeCamera(), price: 100 };
  const camera2 = { ...makeFakeCamera(), price: 200 };
  const camera3 = { ...makeFakeCamera(), price: 300 };
  const cameras = [camera1, camera2, camera3];

  it('getMinMax returns correct min and max price', () => {
    expect(getMinMax(cameras)).toEqual({ minPrice: 100, maxPrice: 300 });
    expect(getMinMax([camera2])).toEqual({ minPrice: 200, maxPrice: 200 });
  });

  it('getCamerasByPrice filters by priceFrom', () => {
    expect(getCamerasByPrice(cameras, 200, null)).toEqual([camera2, camera3]);
  });

  it('getCamerasByPrice filters by priceTo', () => {
    expect(getCamerasByPrice(cameras, null, 200)).toEqual([camera1, camera2]);
  });

  it('getCamerasByPrice filters by priceFrom and priceTo', () => {
    expect(getCamerasByPrice(cameras, 150, 250)).toEqual([camera2]);
  });

  it('getCamerasByPrice returns all if no price limits', () => {
    expect(getCamerasByPrice(cameras, null, null)).toEqual(cameras);
  });
});
