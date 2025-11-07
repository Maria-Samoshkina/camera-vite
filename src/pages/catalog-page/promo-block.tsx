import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getIsCamerasDataLoading, getIsCamerasFetchingError } from '../../store/catalog/cameras-selectors';
import { getPromoCameras } from '../../store/promo-cameras/promo-cameras-selectors';

function PromoBlock (): JSX.Element {

  const promoCameras = useAppSelector(getPromoCameras);
  const isPromoCamerasLoading = useAppSelector(getIsCamerasDataLoading);
  const isPromoCamerasFetchingError = useAppSelector(getIsCamerasFetchingError);

  const firstPromoCamera = promoCameras[0];

  if (isPromoCamerasLoading){
    return <div>Loading...</div>;
  }

  if (isPromoCamerasFetchingError){
    return <div>Server Error...</div>;
  }

  if (!firstPromoCamera) {
    return <div>Loading...</div>;
  }

  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet={`${firstPromoCamera.previewImgWebp}, ${firstPromoCamera.previewImgWebp2x} 2x`}
        />
        <img
          src={firstPromoCamera.previewImg}
          srcSet={`${firstPromoCamera.previewImg2x} 2x`}
          width="1280" height="280"
          alt={firstPromoCamera.name}
        />
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{firstPromoCamera.name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link
          className="btn"
          to={`/camera/${firstPromoCamera.id}`}
        >Подробнее
        </Link>
      </p>
    </div>
  );
}

export default PromoBlock;
