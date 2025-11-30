import { Link } from 'react-router-dom';
import { Camera } from '../../types/camera';
import StarsRaiting from '../../components/stars-rating/stars-rating';

type CameraCardProps = {
  className: string;
  camera: Camera;
  onCameraMouseEnter?: (cameraId: string)=> void;
  onAddToCartClick?:() => void;

}


function CameraCard (props: CameraCardProps): JSX.Element {

  const {camera, onCameraMouseEnter, onAddToCartClick, className} = props;

  const handleCameraMouseEnter = (cameraId: string) => {
    if (onCameraMouseEnter) {
      onCameraMouseEnter(cameraId);
    }
  };


  return (
    <div className={`product-card ${className}`}>
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

        <StarsRaiting rating={camera.rating}
          reviewCount={ camera.reviewCount}
          className='product-card__rate'
        />


        <p className="product-card__title">{camera.name}</p>


        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {camera.price.toLocaleString('ru-RU')} ₽
        </p>
      </div>

      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick = {onAddToCartClick}
        >
          Купить
        </button>

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
