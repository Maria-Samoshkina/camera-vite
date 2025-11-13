import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getIsPromoCamerasDataLoading, getPromoCameras } from '../../store/promo-cameras/promo-cameras-selectors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function PromoBlock (): JSX.Element {

  const promoCameras = useAppSelector(getPromoCameras);
  const isPromoCamerasLoading = useAppSelector(getIsPromoCamerasDataLoading);

  if (isPromoCamerasLoading){
    return <div>Loading...</div>;
  }

  if (!promoCameras || promoCameras.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay = {{delay: 3000, disableOnInteraction: false}}
      pagination={{ clickable: true }}
      loop
      className="slider"
    >
      {
        promoCameras.map((promoCamera) => (
          <SwiperSlide key = {promoCamera.id}>

            <div className="banner">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${promoCamera.previewImgWebp}, ${promoCamera.previewImgWebp2x} 2x`}
                />
                <img
                  src={promoCamera.previewImg}
                  srcSet={`${promoCamera.previewImg2x} 2x`}
                  width="1280" height="280"
                  alt={promoCamera.name}
                />
              </picture>
              <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{promoCamera.name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
                <Link
                  className="btn"
                  to={`/camera/${promoCamera.id}`}
                >Подробнее
                </Link>
              </p>
            </div>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

export default PromoBlock;
