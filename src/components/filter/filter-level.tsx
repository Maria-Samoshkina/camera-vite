import { useCallback } from 'react';
import { CAMERA_LEVELS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasLevels } from '../../store/filters/filters-selectors';
import { changeCamerasLevel } from '../../store/filters/filters-slice';

function FilterLevel (): JSX.Element {
  const dispatch = useAppDispatch();

  const selectedCamerasLevels = useAppSelector(getCamerasLevels);

  const handleCamerasLevelChange = useCallback((level: string)=> {
    dispatch(changeCamerasLevel(level));
  }, [dispatch]);

  const handleCheckboxKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      action();
    }
  };


  return (
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
              checked={selectedCamerasLevels.includes(level)}
              onChange={() => handleCamerasLevelChange(level)}
              onKeyDown={(evt) => handleCheckboxKeyDown(evt, () => handleCamerasLevelChange(level))}
            />{' '}
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{level}</span>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterLevel;
