import { SortType, SortDirection } from '../../const';
import { Cameras } from '../../types/camera';

export const sortCameras = (cameras: Cameras, sortType:string, sortDirection: string)=> {
  switch(sortType){
    case SortType.Price:
      return [...cameras].sort((cameraA, cameraB)=>
        sortDirection === SortDirection.Ascending
          ? cameraA.price - cameraB.price
          : cameraB.price - cameraA.price
      );

    case SortType.Popularity:
      return [...cameras].sort((cameraA, cameraB)=>
        sortDirection === SortDirection.Ascending
          ? cameraA.rating - cameraB.rating
          : cameraB.rating - cameraA.rating
      );

    default:
      return cameras;
  }
};
