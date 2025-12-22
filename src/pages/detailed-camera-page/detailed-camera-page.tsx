import { Link, Navigate, useParams } from 'react-router-dom';
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
import useAddToCartModal from '../../hooks/use-add-to-cart-modal';
import AddCameraToCartModal from '../../components/modals/add-camera-to-cart-modal';
import { getIsSimilarCamerasFetchingError, getIsSimilarCamerasDataLoading } from '../../store/similar-cameras/similar-cameras-selectors';
import { getIsReviewsFetchingError, getIsReviewsLoading } from '../../store/reviews/reviews-selectors';
import { AppRoute } from '../../const';
import StarsRaiting from '../../components/stars-rating/stars-rating';
import AddCameraSuccessModal from '../../components/modals/add-camera-success-modal';
import AddNewReviewModal from '../../components/modals/add-new-review-modal';
import { openAddNewReviewModal, closeAddNewReviewModal } from '../../store/modals/modals-slice';
import { getIsAddNewReviewModalOpen } from '../../store/modals/modals-selectors';

function DetailedCameraPage (): JSX.Element {

  const { isAddToCartModalOpen,
    handleAddToCartModalClose,
    isAddCameraSuccessModalOpen,
    handleAddCameraSuccessModalClose,
    handleBuyButtonClick
  } = useAddToCartModal();

  const {cameraId} = useParams();

  const dispatch = useAppDispatch();
  const detailedCamera = useAppSelector(getDetailedCamera);
  const isDetailedCameraLoading = useAppSelector(getIsDetailedCameraLoading);
  const isDetailedCameraFetchingError = useAppSelector(getIsDetailedCameraFetchingError);
  const isSimilarCamerasFetchingError = useAppSelector(getIsSimilarCamerasFetchingError);
  const isSimilarCamerasLoading = useAppSelector(getIsSimilarCamerasDataLoading);
  const isReviewsFetchingError = useAppSelector(getIsReviewsFetchingError);
  const isReviewsLoading = useAppSelector(getIsReviewsLoading);
  const isAddNewReviewModalOpen = useAppSelector(getIsAddNewReviewModalOpen);


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

  const handleAddNewReviewButtonClick = ()=> {
    dispatch(openAddNewReviewModal());
  };

  const handleAddNewReviewModalClose = () => {
    dispatch(closeAddNewReviewModal());
  };


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Main}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
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

                  <StarsRaiting
                    rating={detailedCamera.rating}
                    reviewCount={detailedCamera.reviewCount}
                    className='product__rate'
                  />

                  <p className="product__price"><span className="visually-hidden">Цена:</span>{detailedCamera.price.toLocaleString('ru-RU')} ₽</p>

                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={()=>handleBuyButtonClick(detailedCamera.id.toString())}

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

          <ReviewsList
            onAddNewReviewButtonClick = {handleAddNewReviewButtonClick}
          />
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
      <AddCameraSuccessModal
        isOpen = {isAddCameraSuccessModalOpen}
        onModalClose = {handleAddCameraSuccessModalClose}
      />

      <AddNewReviewModal
        isOpen = {isAddNewReviewModalOpen}
        onModalClose = {handleAddNewReviewModalClose}
      />

      <Footer/>
    </div>
  );
}

export default DetailedCameraPage;
