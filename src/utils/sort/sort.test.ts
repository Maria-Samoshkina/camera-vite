import { sortCameras } from './sort';
import { SortDirection, SortType } from '../../const';
import { makeFakeCamera } from '../../utils-mocks/mocks';

describe('sortCameras', () => {
  const camera1 = { ...makeFakeCamera(), id: 1, price: 300, rating: 3.2 };
  const camera2 = { ...makeFakeCamera(), id: 2, price: 100, rating: 4.8 };
  const camera3 = { ...makeFakeCamera(), id: 3, price: 200, rating: 2.1 };
  const cameras = [camera1, camera2, camera3];

  it('sorts by price ascending', () => {
    const sorted = sortCameras(cameras, SortType.Price, SortDirection.Ascending);
    expect(sorted.map((camera) => camera.id)).toEqual([2, 3, 1]);
    expect(cameras.map((camera) => camera.id)).toEqual([1, 2, 3]);
  });

  it('sorts by price descending', () => {
    const sorted = sortCameras(cameras, SortType.Price, SortDirection.Descending);
    expect(sorted.map((camera) => camera.id)).toEqual([1, 3, 2]);
  });

  it('sorts by popularity descending', () => {
    const sorted = sortCameras(cameras, SortType.Popularity, SortDirection.Descending);
    expect(sorted.map((camera) => camera.id)).toEqual([2, 1, 3]);
  });

  it('returns original array for unknown sort type', () => {
    const result = sortCameras(cameras, 'unknown', SortDirection.Ascending);
    expect(result).toBe(cameras);
  });
});
