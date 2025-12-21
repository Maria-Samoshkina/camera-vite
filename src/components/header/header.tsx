import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasInCart } from '../../store/cart/cart-selectors';
import SearchForm from '../search-form/search-form';

function Header (): JSX.Element {

  const camerasInCart = useAppSelector(getCamerasInCart);
  const total = camerasInCart.reduce((sum, item)=> sum + item.quantity, 0);

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Main} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to="/">Каталог </Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>

        <SearchForm/>

        <Link className="header__basket-link" to={AppRoute.Card}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {camerasInCart.length !== 0
            ? <span className="header__basket-count">{total}</span>
            : null}
        </Link>
      </div>
    </header>
  );
}

export default Header;


