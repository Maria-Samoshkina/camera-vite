import { useAppDispatch } from '../../hooks';
import { resetFilters } from '../../store/filters/filters-slice';

function FilterReset (): JSX.Element {

  const dispatch = useAppDispatch();

  const handleResetKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      dispatch(resetFilters());
    }
  };

  return (

    <button
      className="btn catalog-filter__reset-btn"
      type="reset"
      onClick={() => {
        dispatch(resetFilters());
      }}
      onKeyDown={handleResetKeyDown}
    >
              Сбросить фильтры
    </button>
  );
}

export default FilterReset;
