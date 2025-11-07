import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';

type CameraCardProps = {
  camera: Camera;
  onCameraMouseEnter?: (cameraId: string)=> void;
}


function CameraCard (props: CameraCardProps): JSX.Element {

  const {camera, onCameraMouseEnter} = props;

  const handleCameraMouseEnter = (cameraId: string) => {
    if (onCameraMouseEnter) {
      onCameraMouseEnter(cameraId);
    }
  };


  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${camera.previewImg}`}
            srcSet={`/${camera.previewImg2x} 2x`}
            width="280"
            height="240"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">


        <div className="rate product-card__rate">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={`star-${camera.id}-${i}`} width="17" height="16" aria-hidden="true">
              <use xlinkHref={i < camera.rating ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>


        <p className="product-card__title">{camera.name}</p>


        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {camera.price.toLocaleString('ru-RU')} ₽
        </p>
      </div>


      <div className="product-card__buttons">
        <a className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          В корзине
        </a>

        <Link
          className="btn btn--transparent"
          to={`/camera/${camera.id}`}
          onMouseEnter={() => handleCameraMouseEnter(camera.id.toString())}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CameraCard;
