import { useCallback, } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/cameras-selectors';
import CameraCard from './camera-card';
import PromoBlock from './promo-block';
import AddCameraToCartModal from '../../components/modals/AddCameraToCartModal';
import Filter from '../../components/filter/filter';
import { changeCamerasCategory, changeCamerasLevel, changeCamerasTypes, changePriceFrom, changePriceTo } from '../../store/filters/filters-slice';
import { getFilteredCameras } from '../../utils/filters/filters';
import { getCamerasCategory, getCamerasLevels, getCamerasTypes, getPriceFrom, getPriceTo } from '../../store/filters/filters-selectors';
import useAddToCartModal from '../../components/hooks/useAddToCartModal';


function CatalogPage (): JSX.Element {

  const cameras = useAppSelector(getCameras);
  const dispatch = useAppDispatch();
  const selectedCamerasCategory = useAppSelector(getCamerasCategory);
  const selectedCamerasTypes = useAppSelector(getCamerasTypes);
  const selectedCamerasLevels = useAppSelector(getCamerasLevels);
  const priceFrom = useAppSelector(getPriceFrom);
  const priceTo = useAppSelector(getPriceTo);

  const handleCameraHover = useCallback((cameraId: string) => {
    const currentCamera = cameras.find((camera) => (camera.id).toString() === cameraId);
    return currentCamera;
  }, [cameras]);

  const { isAddToCartModalOpen,
    handleOpenAddToCartModal,
    handleCloseAddToCartModal } = useAddToCartModal();

  const handleCamerasCategoryChange = useCallback((category: string)=> {
    dispatch(changeCamerasCategory(category));
  }, [dispatch]);

  const handleCamerasTypeChange = useCallback((type: string)=> {
    dispatch(changeCamerasTypes(type));
  }, [dispatch]);

  const handleCamerasLevelChange = useCallback((level: string)=> {
    dispatch(changeCamerasLevel(level));
  }, [dispatch]);

  const handleCamerasPriceFromChange = useCallback((price: number | null)=> {
    dispatch(changePriceFrom(price));
  }, [dispatch]);

  const handleCamerasPriceToChange = useCallback((price: number | null)=> {
    dispatch(changePriceTo(price));
  }, [dispatch]);


  const filteredCameras = getFilteredCameras(cameras,
    selectedCamerasCategory,
    selectedCamerasTypes,
    selectedCamerasLevels,
    priceFrom,
    priceTo);

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
                  <Filter
                    onCamerasCategoryChange={handleCamerasCategoryChange}
                    selectedCategory = {selectedCamerasCategory}
                    onCamerasTypeChange = {handleCamerasTypeChange}
                    selectedTypes = {selectedCamerasTypes}
                    onCamerasLevelChange = {handleCamerasLevelChange}
                    selectedLevels = {selectedCamerasLevels}
                    filteredCameras = {filteredCameras}
                    onCamerasPriceFromChange = {handleCamerasPriceFromChange}
                    selectedPriceFrom = {priceFrom}
                    onCamerasPriceToChange = {handleCamerasPriceToChange}
                    selectedPriceTo = {priceTo}

                  />
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title&#45;&#45;h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPrice" name="sort" checked/>
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input type="radio" id="sortPopular" name="sort"/>
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;up">
                            <input type="radio" id="up" name="sort-icon" checked aria-label="По возрастанию"/>
                            <label htmlFor="up">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;down">
                            <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"/>
                            <label htmlFor="down">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="cards catalog__cards">

                    {filteredCameras.map((cameraItem)=>
                      (
                        <CameraCard
                          className = ''
                          key={cameraItem.id}
                          camera = {cameraItem}
                          onCameraMouseEnter = {()=> handleCameraHover((cameraItem.id).toString()) }
                          onAddToCartClick = {()=> handleOpenAddToCartModal((cameraItem.id).toString())}

                        />)
                    )}
                  </div>
                  <div className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item"><a className="pagination__link pagination__link&#45;&#45;active" href="1">1</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link" href="2">2</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link" href="3">3</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link pagination__link&#45;&#45;text" href="2">Далее</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <AddCameraToCartModal
          isOpen={isAddToCartModalOpen}
          onModalClose = {handleCloseAddToCartModal}
        />
      </main>
      <Footer/>

    </div>
  );
}
export default CatalogPage;
