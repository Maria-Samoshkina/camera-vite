import { useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/similar-cameras/similar-cameras-selectors';
import CameraCard from '../catalog-page/camera-card';

function SimilarCameras (): JSX.Element | null {

  const similarCameras = useAppSelector(getSimilarCameras);

  if (!similarCameras || similarCameras.length === 0) {
    return null;
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">

            {similarCameras.map((similarCamera)=> (
              <CameraCard
                key={similarCamera.id}
                className="is-active"
                camera={similarCamera}
              />
            ))}

          </div>

          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд">
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
  );
}
export default SimilarCameras;
