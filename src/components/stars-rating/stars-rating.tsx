type StarsRatingProps = {
  rating: number;
  reviewCount?: number;
  className?: string;
};

function StarsRating({ rating, reviewCount, className = '' }: StarsRatingProps): JSX.Element {
  return (
    <div className={`rate ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="17" height="16" aria-hidden="true">
          <use xlinkHref={i < rating ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}

      <p className="visually-hidden">Рейтинг: {rating}</p>

      {reviewCount !== undefined && (
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>{reviewCount}
        </p>
      )}
    </div>
  );
}

export default StarsRating;
