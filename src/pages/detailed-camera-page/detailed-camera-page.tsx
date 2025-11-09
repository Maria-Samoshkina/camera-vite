import { Navigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDetailedCamera, getIsDetailedCameraLoading, getIsDetailedCameraFetchingError } from '../../store/detailed-camera/detailed-camera-selectors';
import { useEffect } from 'react';
import { fetchDetailedCameraAction } from '../../store/api-actions';
import DetailedCameraTabs from './detailed-camera-tabs';
import { toast } from 'react-toastify';

function DetailedCameraPage (): JSX.Element {
  const {cameraId} = useParams();

  const dispatch = useAppDispatch();
  const detailedCamera = useAppSelector(getDetailedCamera);
  const isDetailedCameraLoading = useAppSelector(getIsDetailedCameraLoading);
  const isDetailedCameraFetchingError = useAppSelector(getIsDetailedCameraFetchingError);

  useEffect(()=> {
    if(cameraId) {
      dispatch(fetchDetailedCameraAction(cameraId));
    }
  }, [cameraId,dispatch]);

  useEffect(() => {
    if (isDetailedCameraFetchingError) {
      toast.error('Не удалось загрузить подробную информацию о камере. Попробуйте обновить страницу.');
    }
  }, [isDetailedCameraFetchingError]);


  if (isDetailedCameraLoading) {
    return <div>Loading...</div>;
  }

  if(!detailedCamera){
    return <Navigate to = '*'/>;
  }

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{detailedCamera.name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${detailedCamera.previewImgWebp}, /${detailedCamera.previewImgWebp2x} 2x`}/>
                    <img src={`/${detailedCamera.previewImg}`} srcSet={`/${detailedCamera.previewImg2x} 2x`} width="560" height="480" alt={detailedCamera.name}/>
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{detailedCamera.name}</h1>
                  <div className="rate product__rate">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={`star-${detailedCamera.id}-${i}`} width="17" height="16" aria-hidden="true">
                        <use xlinkHref={i < detailedCamera.rating ? '#icon-full-star' : '#icon-star'}></use>
                      </svg>
                    ))}
                    <p className="visually-hidden">Рейтинг: {detailedCamera.rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{detailedCamera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{detailedCamera.price.toLocaleString('ru-RU')} ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <DetailedCameraTabs detailedCamera = {detailedCamera}/>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <div className="product-similar__slider">
                  <div className="product-similar__slider-list">
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/fast-shot.webp, img/content/fast-shot@2x.webp 2x"/>
                          <img src="img/content/fast-shot.jpg" srcSet="img/content/fast-shot@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 4</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                        </div>
                        <p className="product-card__title">FastShot MR-5</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x"/>
                          <img src="img/content/das-auge.jpg" srcSet="img/content/das-auge@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 3</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
                        </div>
                        <p className="product-card__title">Ретрокамера Das Auge IV</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/instaprinter.webp, img/content/instaprinter@2x.webp 2x"/>
                          <img src="img/content/instaprinter.jpg" srcSet="img/content/instaprinter@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 5</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
                        </div>
                        <p className="product-card__title">Instaprinter P2</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/fast-shot.webp, img/content/fast-shot@2x.webp 2x"/>
                          <img src="img/content/fast-shot.jpg" srcSet="img/content/fast-shot@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 4</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                        </div>
                        <p className="product-card__title">FastShot MR-5</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x"/>
                          <img src="img/content/das-auge.jpg" srcSet="img/content/das-auge@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 3</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
                        </div>
                        <p className="product-card__title">Ретрокамера Das Auge IV</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/instaprinter.webp, img/content/instaprinter@2x.webp 2x"/>
                          <img src="img/content/instaprinter.jpg" srcSet="img/content/instaprinter@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 5</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
                        </div>
                        <p className="product-card__title">Instaprinter P2</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                  <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                  <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">Оставить свой отзыв</button>
                </div>
                <ul className="review-block__list">
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Сергей Горский</p>
                      <time className="review-card__data" dateTime="2022-04-13">13 апреля</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 5</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Надёжная, хорошо лежит в руке, необычно выглядит</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих денег!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Пётр Матросов</p>
                      <time className="review-card__data" dateTime="2022-03-02">2 марта</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 1</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Хорошее пресс-папье</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Через 3 дня развалилась на куски</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">При попытке вставить плёнку сломался механизм открытия отсека, пришлось заклеить его изолентой. Начал настраивать фокус&nbsp;— линза провалилась внутрь корпуса. Пока доставал — отломилось несколько лепестков диафрагмы. От злости стукнул камеру об стол, и рукоятка треснула пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу. НЕ РЕКОМЕНДУЮ!!!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Татьяна Кузнецова </p>
                      <time className="review-card__data" dateTime="2021-12-30">30 декабря</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 4</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Редкая</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Высокая цена</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Дорого для портативной видеокамеры, но в моей коллекции как раз не хватало такого экземпляра. Следов использования нет, доставили в заводской упаковке, выглядит шикарно!</p>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer/>
    </div>
  );
}

export default DetailedCameraPage;
