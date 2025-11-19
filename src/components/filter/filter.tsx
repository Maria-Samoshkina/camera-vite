import FilterPrice from './filter-price';
import FilterCategory from './filter-category';
import FilterLevel from './filter-level';
import FilterType from './filter-type';
import FilterReset from './filter-reset';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCamerasCategory, getCamerasLevels, getCamerasTypes, getPriceFrom, getPriceTo } from '../../store/filters/filters-selectors';
import { changeCamerasCategory, changeCamerasLevel, changeCamerasTypes, changePriceFrom, changePriceTo } from '../../store/filters/filters-slice';
import { useEffect, useRef } from 'react';


function Filter (): JSX.Element {

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  const selectedCamerasTypes = useAppSelector(getCamerasTypes);
  const selectedCamerasCategory = useAppSelector(getCamerasCategory);
  const selectedCamerasLevels = useAppSelector(getCamerasLevels);
  const priceFrom = useAppSelector(getPriceFrom);
  const priceTo = useAppSelector(getPriceTo);

  useEffect(() => {
    if (!isInitialized.current) {
      const priceFromUrl = searchParams.get('priceFrom');
      const priceToUrl = searchParams.get('priceTo');
      const categoryUrl = searchParams.get('category');
      const typesUrl = searchParams.getAll('type');
      const levelsUrl = searchParams.getAll('level');

      if (priceFromUrl) {
        dispatch(changePriceFrom(Number(priceFromUrl)));
      }
      if (priceToUrl) {
        dispatch(changePriceTo(Number(priceToUrl)));
      }
      if (categoryUrl) {
        dispatch(changeCamerasCategory(categoryUrl));
      }
      if (typesUrl.length > 0) {
        typesUrl.forEach((type) => {
          dispatch(changeCamerasTypes(type));
        });
      }
      if (levelsUrl.length > 0) {
        levelsUrl.forEach((level) => {
          dispatch(changeCamerasLevel(level));
        });
      }

      isInitialized.current = true;
    }
  }, [dispatch, searchParams]);


  useEffect(()=> {
    const params = new URLSearchParams();

    if (priceFrom){
      params.set('priceFrom', priceFrom.toString());
    }
    if (priceTo){
      params.set('priceTo', priceTo.toString());
    }

    if(selectedCamerasCategory){
      params.set('category', selectedCamerasCategory);
    }
    selectedCamerasTypes.forEach((cameraType)=> params.append('type', cameraType));
    selectedCamerasLevels.forEach((cameraLevel)=> params.append('level',cameraLevel));

    setSearchParams(params, { replace: true });
  }, [priceFrom, priceTo, selectedCamerasTypes, setSearchParams,selectedCamerasCategory, selectedCamerasLevels]);

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>

        <FilterPrice/>
        <FilterCategory/>
        <FilterType/>
        <FilterLevel/>
        <FilterReset/>

      </form>
    </div>
  );
}


export default Filter;

