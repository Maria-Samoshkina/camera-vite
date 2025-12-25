import { useCallback, useEffect, } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/cameras-selectors';
import CameraCard from './camera-card';
import PromoBlock from './promo-block/promo-block';
import AddCameraToCartModal from '../../components/modals/add-camera-to-cart-modal';
import Filter from '../../components/filter/filter';
import { getFilteredSortedCameras} from '../../store/filters/filters-selectors';
import useAddToCartModal from '../../hooks/use-add-to-cart-modal';
import Sort from '../../components/sort/sort';
import Pagination from '../../components/pagination/pagination';
import { Link, useSearchParams } from 'react-router-dom';
import { AppRoute, ITEMS_PER_PAGE } from '../../const';
import AddCameraSuccessModal from '../../components/modals/add-camera-success-modal';


function CatalogPage (): JSX.Element {

  const cameras = useAppSelector(getCameras);
  const filteredSortedCameras = useAppSelector(getFilteredSortedCameras);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(filteredSortedCameras.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('page', String(totalPages));
        return params;
      });
    }
  }, [currentPage, totalPages, setSearchParams]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleCameras = filteredSortedCameras.slice(startIndex, endIndex);

  const handleCameraHover = useCallback((cameraId: string) => {
    const currentCamera = cameras.find((camera) => (camera.id).toString() === cameraId);
    return currentCamera;
  }, [cameras]);

  const { isAddToCartModalOpen,
    handleBuyButtonClick,
    handleAddToCartModalClose,
    isAddCameraSuccessModalOpen,
    handleAddCameraSuccessModalClose
  } = useAddToCartModal();

  const handlePageClick = (selectedPage: number)=> {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(selectedPage));
      return params;
    });

  };


  return (
    <div className="wrapper">
      <Header/>

      <main>
        <PromoBlock/>
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
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <Filter/>
                </div>
                <div className="catalog__content">

                  <Sort/>
                  <div className="cards catalog__cards">

                    {visibleCameras.map((cameraItem)=>
                      (
                        <CameraCard
                          className = ''
                          key={cameraItem.id}
                          camera = {cameraItem}
                          onCameraMouseEnter = {()=> handleCameraHover((cameraItem.id).toString()) }
                          onAddToCartClick = {()=> handleBuyButtonClick((cameraItem.id).toString())}

                        />)
                    )}
                  </div>

                  {totalPages > 1 &&
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageClick = {handlePageClick}
                /> }

                </div>
              </div>
            </div>
          </section>
        </div>
        <AddCameraToCartModal
          isOpen={isAddToCartModalOpen}
          onModalClose = {handleAddToCartModalClose}
        />

        <AddCameraSuccessModal
          isOpen = {isAddCameraSuccessModalOpen}
          onModalClose = {handleAddCameraSuccessModalClose}
        />
      </main>
      <Footer/>

    </div>
  );
}
export default CatalogPage;
