import { PAGES_PER_GROUP } from '../../const';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageClick: (page:number)=> void;
}

function Pagination (props: PaginationProps): JSX.Element {

  const { totalPages, currentPage, onPageClick } = props;


  const getVisiblePages = (): number[] => {
    if (totalPages <= PAGES_PER_GROUP) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const groupIndex = Math.floor((currentPage - 1) / PAGES_PER_GROUP);
    const startPage = groupIndex * PAGES_PER_GROUP + 1;

    const pages: number[] = [];
    for (let i = 0; i < PAGES_PER_GROUP && startPage + i <= totalPages; i++) {
      pages.push(startPage + i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const firstVisiblePage = visiblePages[0];
  const lastVisiblePage = visiblePages[visiblePages.length - 1];

  const showPrev = firstVisiblePage > 1;
  const showNext = lastVisiblePage < totalPages;

  return (
    <div className="pagination">
      <ul className="pagination__list">

        {showPrev && (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                onPageClick(firstVisiblePage - 1);
              }}
            >
              Назад
            </a>
          </li>
        )}
        {visiblePages.map((page) => (
          <li
            key={page}
            className="pagination__item"
          >
            <a
              className={`pagination__link ${currentPage === page ? 'pagination__link--active' : ''}`}
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                onPageClick(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        {showNext && (
          <li className="pagination__item">
            <a
              className="pagination__link pagination__link--text"
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                onPageClick(lastVisiblePage + 1);
              }}
            >
              Далее
            </a>
          </li>
        )}

      </ul>
    </div>
  );
}

export default Pagination;
