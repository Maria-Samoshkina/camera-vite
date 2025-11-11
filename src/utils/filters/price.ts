import { Cameras } from '../../types/camera';

const getMinMax = (filteredCameras: Cameras)=> {
  const prices = filteredCameras.map((camera)=> camera.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {minPrice, maxPrice};
};


const getCamerasByPrice = (cameras: Cameras, priceFrom: number | null, priceTo: number | null) =>
  cameras.filter((camera) => {
    const matchesMinPrice = !priceFrom || camera.price >= priceFrom;
    const matchesMaxPrice = !priceTo || camera.price <= priceTo;
    return matchesMinPrice && matchesMaxPrice;
  });

export {getMinMax, getCamerasByPrice};
