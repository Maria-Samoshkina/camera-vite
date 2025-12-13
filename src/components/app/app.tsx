import { Routes, Route } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import { toast } from 'react-toastify';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import NotFoundPage from '../../pages/not-found-page/not-fonund-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsCamerasDataLoading, getIsCamerasFetchingError } from '../../store/catalog/cameras-selectors';
import { getError } from '../../store/error/error-selectors';
import { setError } from '../../store/error/error-slice';
import { useEffect } from 'react';
import { fetchCamerasAction, fetchPromoCamerasAction } from '../../store/api-actions';
import LoadingPage from '../../pages/loading -page/loading-page';
import DetailedCameraPage from '../../pages/detailed-camera-page/detailed-camera-page';
import { getIsPromoCamerasFetchingError } from '../../store/promo-cameras/promo-cameras-selectors';
import CartPage from '../../pages/cart-page/cart-page';


function App (): JSX.Element {

  const dispatch = useAppDispatch();

  const isCamerasDataLoading = useAppSelector(getIsCamerasDataLoading);
  const isCamerasFetchingError = useAppSelector(getIsCamerasFetchingError);
  const error = useAppSelector(getError);
  const isPromoCamerasFetchingError = useAppSelector(getIsPromoCamerasFetchingError);


  useEffect(()=> {
    dispatch(fetchCamerasAction());
    dispatch(fetchPromoCamerasAction());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isCamerasFetchingError) {
      toast.error('Не удалось загрузить каталог камер. Попробуйте обновить страницу.');
    }
  }, [isCamerasFetchingError]);

  useEffect(() => {
    if (isPromoCamerasFetchingError) {
      toast.error('Не удалось загрузить промо-товары. Попробуйте обновить страницу.');
    }
  }, [isPromoCamerasFetchingError]);


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
        <Route path ={AppRoute.Card} element= {<CartPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
