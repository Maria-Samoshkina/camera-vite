import { useState } from 'react';
import { DetailedCamera } from '../../types/camera';

type DetailedCameraTabsProps = {
  detailedCamera: DetailedCamera;
}

type Tab = 'characteristics' | 'description';

function DetailedCameraTabs (props: DetailedCameraTabsProps): JSX.Element {

  const {detailedCamera} = props;
  const { vendorCode, category, type, level, description } = detailedCamera;

  const [active, setActive] = useState<Tab>('description');

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls" role="tablist" aria-label="Характеристики и описание">
        <button
          type="button"
          role="tab"
          aria-selected={active === 'characteristics'}
          aria-controls="tab-specs"
          id="tab-specs-btn"
          className={`tabs__control ${active === 'characteristics' ? 'is-active' : ''}`}
          onClick={() => setActive('characteristics')}
        >
          Характеристики
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={active === 'description'}
          aria-controls="tab-desc"
          id="tab-desc-btn"
          className={`tabs__control ${active === 'description' ? 'is-active' : ''}`}
          onClick={() => setActive('description')}
        >
          Описание
        </button>
      </div>

      <div className="tabs__content">

        <div
          id="tab-specs"
          role="tabpanel"
          aria-labelledby="tab-specs-btn"
          className={`tabs__element ${active === 'characteristics' ? 'is-active' : ''}`}
          hidden={active !== 'characteristics'}
        >
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>


        <div
          id="tab-desc"
          role="tabpanel"
          aria-labelledby="tab-desc-btn"
          className={`tabs__element ${active === 'description' ? 'is-active' : ''}`}
          hidden={active !== 'description'}
        >
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedCameraTabs;
