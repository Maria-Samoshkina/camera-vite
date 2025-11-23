import { useAppSelector } from '../../../hooks';
import { getSimilarCameras } from '../../../store/similar-cameras/similar-cameras-selectors';
import CameraCard from '../../catalog-page/camera-card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './similar-cameras.css';
import useAddToCartModal from '../../../hooks/use-add-to-cart-modal';

function SimilarCameras(): JSX.Element | null {
  const similarCameras = useAppSelector(getSimilarCameras);

  const{handleBuyButtonClick} = useAddToCartModal();

  if (!similarCameras || similarCameras.length === 0) {
    return null;
  }


  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            slidesPerGroup={3}
            spaceBetween={16}
            allowTouchMove={false}
            speed={800}
            effect="slide"
            cssMode={false}
            resistance
            resistanceRatio={0.85}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}

            breakpoints={{
              0: { slidesPerView: 1, slidesPerGroup: 1 },
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
          >
            {similarCameras.map((camera) => (
              <SwiperSlide key={camera.id}>
                <CameraCard
                  className="is-active"
                  camera={camera}
                  onAddToCartClick = {()=> handleBuyButtonClick((camera.id).toString())}

                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-button-prev "></div>
          <div className="swiper-button-next"></div>


        </div>
      </div>
    </section>
  );
}

export default SimilarCameras;
