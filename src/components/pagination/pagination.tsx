type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageClick: (page:number)=> void;
}

function Pagination (props: PaginationProps): JSX.Element {

  const { totalPages, currentPage, onPageClick } = props;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pages.map((page) => (
          <li
            key={page}
            className="pagination__item"
          >
            <a
              className={`pagination__link ${currentPage === page ? 'active' : ''}`}
              href={page.toString()}
              onClick={(e) => {
                e.preventDefault();
                onPageClick(Number(page));
              }}
            >
              {page}
            </a>
          </li>
        ))}

        {/* <li className="pagination__item"><a className="pagination__link pagination__link&#45;&#45;active" href="1">1</a>
        </li>
        <li className="pagination__item"><a className="pagination__link" href="2">2</a>
        </li>
        <li className="pagination__item"><a className="pagination__link" href="3">3</a>
        </li>
        <li className="pagination__item"><a className="pagination__link pagination__link&#45;&#45;text" href="2">Далее</a>
        </li> */}
      </ul>
    </div>
  );
}

export default Pagination;
