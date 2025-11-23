import { useCallback, } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/cameras-selectors';
import CameraCard from './camera-card';
import PromoBlock from './promo-block';
import AddCameraToCartModal from '../../components/modals/add-camera-to-cart-modal';
import Filter from '../../components/filter/filter';
import { getFilteredCameras} from '../../store/filters/filters-selectors';
import useAddToCartModal from '../../hooks/use-add-to-cart-modal';
import Sort from '../../components/sort/sort';
import Pagination from '../../components/pagination/pagination';


function CatalogPage (): JSX.Element {

  const cameras = useAppSelector(getCameras);
  const filteredCameras = useAppSelector(getFilteredCameras);


  const handleCameraHover = useCallback((cameraId: string) => {
    const currentCamera = cameras.find((camera) => (camera.id).toString() === cameraId);
    return currentCamera;
  }, [cameras]);

  const { isAddToCartModalOpen,
    handleBuyButtonClick,
    handleAddToCartModalClose } = useAddToCartModal();


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
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
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

                    {filteredCameras.map((cameraItem)=>
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

                  <Pagination/>
                </div>
              </div>
            </div>
          </section>
        </div>
        <AddCameraToCartModal
          isOpen={isAddToCartModalOpen}
          onModalClose = {handleAddToCartModalClose}
        />
      </main>
      <Footer/>

    </div>
  );
}
export default CatalogPage;
