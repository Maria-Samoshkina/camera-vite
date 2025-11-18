import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilteredCamerasWithoutPrice, getPriceFrom, getPriceTo } from '../../store/filters/filters-selectors';
import { getMinMax } from '../../utils/filters/price';
import { changePriceFrom, changePriceTo } from '../../store/filters/filters-slice';


function FilterPrice (): JSX.Element {

  const filteredCamerasWithoutPrice = useAppSelector(getFilteredCamerasWithoutPrice);

  const dispatch = useAppDispatch();
  const priceFrom = useAppSelector(getPriceFrom);
  const priceTo = useAppSelector(getPriceTo);
  const priceForPlaceholder = getMinMax(filteredCamerasWithoutPrice);


  const handleCamerasPriceFromChange = useCallback((price: number | null)=> {
    dispatch(changePriceFrom(price));
  }, [dispatch]);

  const handleCamerasPriceToChange = useCallback((price: number | null)=> {
    dispatch(changePriceTo(price));
  }, [dispatch]);

  const handlePriceFromBlur = (value: number) => {
    if(value < priceForPlaceholder.minPrice){
      handleCamerasPriceFromChange(priceForPlaceholder.minPrice);
    }
  };

  const handlePriceToBlur = (value: number) => {
    if (priceFrom && value < priceFrom) {
      handleCamerasPriceToChange(0);
    }
    if (value > priceForPlaceholder.maxPrice) {
      handleCamerasPriceToChange(priceForPlaceholder.maxPrice);
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={(priceForPlaceholder.minPrice.toString())}
              value = {priceFrom || ''}
              onChange = {(evt)=> handleCamerasPriceFromChange(evt.target.value ? Number(evt.target.value) : null) }
              onBlur={(evt) => handlePriceFromBlur(Number(evt.target.value))}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={(priceForPlaceholder.maxPrice.toString())}
              min={priceFrom || undefined}
              value={priceTo || ''}
              onChange={(evt) => handleCamerasPriceToChange(evt.target.value ? Number(evt.target.value) : null)}
              onBlur={(evt) => handlePriceToBlur(Number(evt.target.value))}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
