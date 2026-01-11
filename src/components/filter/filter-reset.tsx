import { useAppDispatch } from '../../hooks';
import { resetFilters } from '../../store/filters/filters-slice';
import { useSearchParams } from 'react-router-dom';

function FilterReset (): JSX.Element {

  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const handleFiltersResetButtonClick = () => {
    dispatch(resetFilters());
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handleFiltersResetButtonKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      handleFiltersResetButtonClick();
    }
  };

  return (

    <button
      className="btn catalog-filter__reset-btn"
      type="reset"
      onClick={handleFiltersResetButtonClick}
      onKeyDown={handleFiltersResetButtonKeyDown}
    >
              Сбросить фильтры
    </button>
  );
}

export default FilterReset;
