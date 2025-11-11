import { CAMERA_CATEGORIES, CAMERA_LEVELS, CAMERA_TYPES} from '../../const';
import { useAppDispatch } from '../../hooks';
import {resetFilters } from '../../store/filters/filters-slice';
import { getMinMax } from '../../utils/filters/price';
import { Cameras } from '../../types/camera';


type FilterProps = {
  onCamerasCategoryChange: (category: string) => void;
  selectedCategory: string | null;
  onCamerasTypeChange: (type: string)=> void;
  selectedTypes: string[];
  onCamerasLevelChange: (level: string)=> void;
  selectedLevels: string[];
  filteredCameras: Cameras;
  onCamerasPriceFromChange: (priceFrom: number | null)=> void;
  selectedPriceFrom: number | null;
  onCamerasPriceToChange: (priceTo: number | null)=> void;
  selectedPriceTo: number | null;
}

function Filter (props: FilterProps): JSX.Element {

  const dispatch = useAppDispatch();

  const {onCamerasCategoryChange,
    selectedCategory,
    onCamerasTypeChange,
    selectedTypes,
    onCamerasLevelChange,
    selectedLevels,
    filteredCameras,
    onCamerasPriceFromChange,
    selectedPriceFrom,
    onCamerasPriceToChange,
    selectedPriceTo
  } = props;

  const priceForPlaceholder = getMinMax(filteredCameras);

  const handlePriceFromChange = (value: number | null)=> {
    onCamerasPriceFromChange(value);
  };

  const handlePriceFromBlur = (value: number) => {
    if(value < priceForPlaceholder.minPrice){
      onCamerasPriceFromChange(priceForPlaceholder.minPrice);
    }
  };

  const handlePriceToChange = (value: number | null)=> {
    onCamerasPriceToChange(value);
  };

  const handlePriceToBlur = (value: number) => {
    if (selectedPriceFrom && value < selectedPriceFrom) {
      onCamerasPriceToChange(0);
    }
    if (value > priceForPlaceholder.maxPrice) {
      onCamerasPriceToChange(priceForPlaceholder.maxPrice);
    }
  };


  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder={(priceForPlaceholder.minPrice.toString())}
                  value = {selectedPriceFrom || ''}
                  onChange = {(evt)=> handlePriceFromChange(evt.target.value ? Number(evt.target.value) : null) }
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
                  min={selectedPriceFrom || undefined}
                  value={selectedPriceTo || ''}
                  onChange={(evt) => handlePriceToChange(evt.target.value ? Number(evt.target.value) : null)}
                  onBlur={(evt) => handlePriceToBlur(Number(evt.target.value))}
                />
              </label>
            </div>
          </div>
        </fieldset>


        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Категория</legend>

          {CAMERA_CATEGORIES.map((category) => (
            <div key={category}
              className="custom-radio catalog-filter__item"
            >
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={(evt) => onCamerasCategoryChange(evt.target.value)}
                />{' '}
                <span className="custom-radio__icon"></span>
                <span className="custom-radio__label">{category}</span>
              </label>
            </div>
          ))}
        </fieldset>


        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Тип камеры</legend>

          {CAMERA_TYPES.map((type)=> (
            <div key={type}
              className="custom-checkbox catalog-filter__item"
            >
              <label>
                <input type="checkbox"
                  name={type}
                  value={type}
                  checked={selectedTypes.includes(type)}
                  disabled={(type === 'Плёночная' || type === 'Моментальная') && selectedCategory === 'Видеокамера'}
                  onChange={() => onCamerasTypeChange(type)}
                />{' '}
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{type}</span>
              </label>
            </div>
          ))}
        </fieldset>


        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Уровень</legend>

          {CAMERA_LEVELS.map((level)=> (
            <div key = {level}
              className="custom-checkbox catalog-filter__item"
            >
              <label>
                <input type="checkbox"
                  name={level}
                  value={level}
                  checked={selectedLevels.includes(level)}
                  onChange={() => onCamerasLevelChange(level)}
                />{' '}
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{level}</span>
              </label>
            </div>
          ))}
        </fieldset>


        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={() => {
            dispatch(resetFilters());
          }}
        >
          Сбросить фильтры
        </button>

      </form>
    </div>
  );
}


export default Filter;

