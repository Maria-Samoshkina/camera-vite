import { Navigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDetailedCamera, getIsDetailedCameraLoading, getIsDetailedCameraFetchingError } from '../../store/detailed-camera/detailed-camera-selectors';
import { useEffect } from 'react';
import { fetchDetailedCameraAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import DetailedCameraTabs from './detailed-camera-tabs';
import { toast } from 'react-toastify';
import ReviewsList from './reviews-list';
import SimilarCameras from './similar-cameras/similar-cameras';
import useAddToCartModal from '../../hooks/useAddToCartModal';
import AddCameraToCartModal from '../../components/modals/AddCameraToCartModal';
import { getIsSimilarCamerasFetchingError, getIsSimilarCamerasDataLoading } from '../../store/similar-cameras/similar-cameras-selectors';
import { getIsReviewsFetchingError, getIsReviewsLoading } from '../../store/reviews/reviews-selectors';

function DetailedCameraPage (): JSX.Element {

  const { isAddToCartModalOpen,
    handleAddToCartModalClose } = useAddToCartModal();

  const {cameraId} = useParams();

  const dispatch = useAppDispatch();
  const detailedCamera = useAppSelector(getDetailedCamera);
  const isDetailedCameraLoading = useAppSelector(getIsDetailedCameraLoading);
  const isDetailedCameraFetchingError = useAppSelector(getIsDetailedCameraFetchingError);
  const isSimilarCamerasFetchingError = useAppSelector(getIsSimilarCamerasFetchingError);
  const isSimilarCamerasLoading = useAppSelector(getIsSimilarCamerasDataLoading);
  const isReviewsFetchingError = useAppSelector(getIsReviewsFetchingError);
  const isReviewsLoading = useAppSelector(getIsReviewsLoading);

  useEffect(()=> {
    if(cameraId) {
      dispatch(fetchDetailedCameraAction(cameraId));
      dispatch(fetchSimilarCamerasAction(cameraId));
      dispatch(fetchReviewsAction(cameraId));
    }
  }, [cameraId,dispatch]);

  useEffect(() => {
    if (isDetailedCameraFetchingError) {
      toast.error('Не удалось загрузить подробную информацию о камере. Попробуйте обновить страницу.');
    }
    if(isSimilarCamerasFetchingError){
      toast.error('Не удалось загрузить похожие товары. Попробуйте обновить страницу.');

    }
    if(isReviewsFetchingError) {
      toast.error('Не удалось загрузить отзывы. Попробуйте обновить страницу.');

    }
  }, [isDetailedCameraFetchingError,isSimilarCamerasFetchingError, isReviewsFetchingError ]);


  if (isDetailedCameraLoading || isSimilarCamerasLoading || isReviewsLoading) {
    return <div>Loading...</div>;
  }

  if(!detailedCamera){
    return <Navigate to = '*'/>;
  }


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{detailedCamera.name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${detailedCamera.previewImgWebp}, /${detailedCamera.previewImgWebp2x} 2x`}/>
                    <img src={`/${detailedCamera.previewImg}`} srcSet={`/${detailedCamera.previewImg2x} 2x`} width="560" height="480" alt={detailedCamera.name}/>
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{detailedCamera.name}</h1>
                  <div className="rate product__rate">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={`star-${detailedCamera.id}-${i}`} width="17" height="16" aria-hidden="true">
                        <use xlinkHref={i < detailedCamera.rating ? '#icon-full-star' : '#icon-star'}></use>
                      </svg>
                    ))}
                    <p className="visually-hidden">Рейтинг: {detailedCamera.rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{detailedCamera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{detailedCamera.price.toLocaleString('ru-RU')} ₽</p>


                  <button
                    className="btn btn--purple"
                    type="button"

                  >
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>


                  <DetailedCameraTabs detailedCamera = {detailedCamera}/>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">

            <SimilarCameras />
          </div>

          <ReviewsList/>
        </div>
      </main>

      <button
        className="up-btn"
        type="button"
        onClick={() => {
          scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>

      <AddCameraToCartModal
        isOpen={isAddToCartModalOpen}
        onModalClose = {handleAddToCartModalClose}
      />

      <Footer/>
    </div>
  );
}

export default DetailedCameraPage;
