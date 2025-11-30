import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDisplayedReviews, getDisplayedReviewsCount, getHasMoreReviews } from '../../store/reviews/reviews-selectors';
import { showMoreReviews } from '../../store/reviews/reviews-slice';
import { formatReviewDate } from '../../utils/reviews/date';
import StarsRating from '../../components/stars-rating/stars-rating';

function ReviewsList (): JSX.Element {

  const displayedReviews = useAppSelector(getDisplayedReviews);
  const hasMoreReviews = useAppSelector(getHasMoreReviews);
  const dispatch = useAppDispatch();
  const displayedReviewsCount = useAppSelector(getDisplayedReviewsCount);


  const handleShowMoreRewiewsClick = ()=> {
    dispatch(showMoreReviews());

  };

  const lastReviewRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!lastReviewRef.current) {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          timeoutId = setTimeout(() => {
            dispatch(showMoreReviews());
          }, 1000);
          observer.disconnect();
        }
      },
      {
        threshold: 1,
      }
    );

    observer.observe(lastReviewRef.current);

    return () => {
      observer.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [displayedReviewsCount, dispatch]);


  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>

            <button
              className="btn"
              type="button"
              style={{ display: 'none' }}
            >
              Оставить свой отзы
            </button>
          </div>

          <ul className="review-block__list">

            {displayedReviews.map((review, index) => {
              const isLast = index === displayedReviews.length - 1;

              return (
                <li
                  key={review.id}
                  className="review-card"
                  ref={isLast ? lastReviewRef : null}
                >
                  <div className="review-card__head">
                    <p className="title title--h4">{review.userName}</p>
                    <time className="review-card__data" dateTime={review.createAt}>{formatReviewDate(review.createAt)}</time>
                  </div>

                  <StarsRating
                    rating={review.rating}
                    className='review-card__rate'
                  />

                  <ul className="review-card__list">
                    <li className="item-list"><span className="item-list__title">Достоинства:</span>
                      <p className="item-list__text">{review.advantage}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Недостатки:</span>
                      <p className="item-list__text">{review.disadvantage}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Комментарий:</span>
                      <p className="item-list__text">{review.review}</p>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>


          <div className="review-block__buttons">
            {hasMoreReviews && (
              <button
                className="btn btn--purple"
                type="button"
                onClick={handleShowMoreRewiewsClick}
              >Показать больше отзывов
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewsList;
