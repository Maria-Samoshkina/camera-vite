import { useCallback } from 'react';
import { CAMERA_CATEGORIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCamerasCategory } from '../../store/filters/filters-slice';
import { getCamerasCategory } from '../../store/filters/filters-selectors';

function FilterCategory (): JSX.Element{
  const dispatch = useAppDispatch();
  const selectedCamerasCategory = useAppSelector(getCamerasCategory);


  const handleCamerasCategoryChange = useCallback((category: string)=> {
    dispatch(changeCamerasCategory(category));
  }, [dispatch]);

  const handleCheckboxKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      action();
    }
  };


  return (
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
              checked={selectedCamerasCategory === category}
              onChange={(evt) => handleCamerasCategoryChange(evt.target.value)}
              onKeyDown={(evt) => handleCheckboxKeyDown(evt, () => handleCamerasCategoryChange(category))}
            />{' '}
            <span className="custom-radio__icon"></span>
            <span className="custom-radio__label">{category}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterCategory;
