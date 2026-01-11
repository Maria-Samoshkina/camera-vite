import { SortDirection, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSortDirection, getSortType } from '../../store/filters/filters-selectors';
import { changeSortDirection, changeSortType } from '../../store/filters/filters-slice';

function Sort (): JSX.Element {

  const dispatch = useAppDispatch();
  const selectedSortType = useAppSelector(getSortType);
  const selectedSortDirection = useAppSelector(getSortDirection);

  const handleSortTypeChange = (sortType: string)=> {
    dispatch(changeSortType(sortType));
  };

  const handleSortDirectionChange = (sortDirection: string)=> {
    dispatch(changeSortDirection(sortDirection));
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">

            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                value={SortType.Price}
                checked ={selectedSortType === SortType.Price}
                onChange={(evt)=> handleSortTypeChange(evt.target.value) }
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>


            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                value={SortType.Popularity}
                checked = {selectedSortType === SortType.Popularity}
                onChange={(evt)=> handleSortTypeChange(evt.target.value) }

              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                value={SortDirection.Ascending}
                checked = {selectedSortDirection === SortDirection.Ascending}
                onChange={(evt)=> handleSortDirectionChange(evt.target.value)}
                aria-label="По возрастанию"
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                value={SortDirection.Descending}
                checked = {selectedSortDirection === SortDirection.Descending}
                onChange={(evt)=> handleSortDirectionChange(evt.target.value)}
              />
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
  );
}

export default Sort;
