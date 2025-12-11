import { SortType, SortDirection } from '../../const';
import { Cameras } from '../../types/camera';

export const sortCameras = (cameras: Cameras, sortType:string, sortDirection: string)=> {
  switch(sortType){
    case SortType.price:
      return [...cameras].sort((cameraA, cameraB)=>
        sortDirection === SortDirection.ascending
          ? cameraA.price - cameraB.price
          : cameraB.price - cameraA.price
      );

    case SortType.popularity:
      return [...cameras].sort((cameraA, cameraB)=>
        sortDirection === SortDirection.ascending
          ? cameraA.rating - cameraB.rating
          : cameraB.rating - cameraA.rating
      );

    default:
      return cameras;
  }
};
