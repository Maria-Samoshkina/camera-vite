import FilterPrice from './filter-price';
import FilterCategory from './filter-category';
import FilterLevel from './filter-level';
import FilterType from './filter-type';
import FilterReset from './filter-reset';


function Filter (): JSX.Element {


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

