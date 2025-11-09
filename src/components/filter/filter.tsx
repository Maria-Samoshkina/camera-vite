import { CAMERA_CATEGORIES, CAMERA_LEVELS, CAMERA_TYPES} from '../../const';

type FilterProps = {
  onCamerasCategoryClick: (category: string) => void;
}


function Filter (props: FilterProps): JSX.Element {

  const {onCamerasCategoryClick} = props;

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от"/>
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до"/>
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
                  onChange={(evt) => onCamerasCategoryClick(evt.target.value)}
                />{' '}
                <span className="custom-radio__icon"></span>
                <span className="custom-radio__label">{category}</span>
              </label>
            </div>
          ))}


          {/* <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="photocamera" checked
              />
              <span className="custom-radio__icon"></span>
              <span className="custom-radio__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input type="radio" name="category" value="videocamera"/><span className="custom-radio__icon"></span><span className="custom-radio__label">Видеокамера</span>
            </label>
          </div> */}
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
                />{' '}
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{type}</span>
              </label>
            </div>
          ))}
          {/* <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox"
              name="digital" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film" disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" checked disabled/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div> */}
        </fieldset>


        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Уровень</legend>

          {CAMERA_LEVELS.map((level)=> (
            <div key = {level}
              className="custom-checkbox catalog-filter__item"
            >
              <label>
                <input type="checkbox" name={level}/>{' '}
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{level}</span>
              </label>
            </div>
          ))}
          {/* <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero" checked/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="non-professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional"/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div> */}
        </fieldset>


        <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>

      </form>
    </div>
  );
}


export default Filter;
