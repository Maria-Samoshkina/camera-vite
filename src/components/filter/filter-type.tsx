import { useCallback } from 'react';
import { CAMERA_TYPES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasCategory, getCamerasTypes } from '../../store/filters/filters-selectors';
import { changeCamerasTypes } from '../../store/filters/filters-slice';

function FilterType (): JSX.Element {

  const selectedCamerasTypes = useAppSelector(getCamerasTypes);
  const selectedCamerasCategory = useAppSelector(getCamerasCategory);

  const dispatch = useAppDispatch();


  const handleCamerasTypeChange = useCallback((type: string)=> {
    dispatch(changeCamerasTypes(type));
  }, [dispatch]);


  const handleCheckboxKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      action();
    }
  };


  return (
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
              checked={selectedCamerasTypes.includes(type)}
              disabled={(type === 'Плёночная' || type === 'Моментальная') && selectedCamerasCategory === 'Видеокамера'}
              onChange={() => handleCamerasTypeChange(type)}
              onKeyDown={(evt) => handleCheckboxKeyDown(evt, () => handleCamerasTypeChange(type))}
            />{' '}
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{type}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterType;
