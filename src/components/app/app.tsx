import { Routes, Route } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import NotFoundPage from '../../pages/not-found-page/not-fonund-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsCamerasDataLoading, getIsCamerasFetchingError } from '../../store/catalog/cameras-selectors';
import { useEffect } from 'react';
import { fetchCamerasAction, fetchPromoCamerasAction } from '../../store/api-actions';
import FetchingError from '../error-message/fetching-error';
import LoadingPage from '../../pages/loading -page/loading-page';
import DetailedCameraPage from '../../pages/detailed-camera-page/detailed-camera-page';


function App (): JSX.Element {

  const dispatch = useAppDispatch();

  const isCamerasDataLoading = useAppSelector(getIsCamerasDataLoading);
  const isCamerasFetchingError = useAppSelector(getIsCamerasFetchingError);

  useEffect(()=> {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoCamerasAction());
  }, [dispatch]);

  if (isCamerasFetchingError) {
    return (
      <FetchingError/>
    );
  }

  if (isCamerasDataLoading) {
    return (
      <LoadingPage/>
    );
  }


  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<CatalogPage/>}/>
        <Route path={`${AppRoute.Camera}/:cameraId`} element={<DetailedCameraPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
