import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CameraCard from './camera-card';
import { makeFakeCamera } from '../../utils-mocks/mocks';
import { withHistory, withStore } from '../../utils-mocks/mock-components';

describe('Component: CameraCard', () => {
  const mockCamera = makeFakeCamera();
  const mockOnCameraMouseEnter = vi.fn();
  const mockOnAddToCartClick = vi.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      className: 'test-class',
      camera: mockCamera,
      onCameraMouseEnter: mockOnCameraMouseEnter,
      onAddToCartClick: mockOnAddToCartClick,
      ...props,
    };

    const { withStoreComponent } = withStore(<CameraCard {...defaultProps} />, {
      CART: { camerasInCart: [] },
    });
    const componentWithHistory = withHistory(withStoreComponent);
    return render(componentWithHistory);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render camera card correctly', () => {
    renderComponent();

    const productCard = document.querySelector('.product-card');
    expect(productCard).toBeInTheDocument();
    expect(productCard).toHaveClass('test-class');
  });

  it('should display camera image with correct attributes', () => {
    renderComponent();

    const cameraImage = screen.getByAltText(mockCamera.name);
    expect(cameraImage).toBeInTheDocument();
    expect(cameraImage).toHaveAttribute('src', `/${mockCamera.previewImg}`);
    expect(cameraImage).toHaveAttribute('srcSet', `/${mockCamera.previewImg2x} 2x`);
    expect(cameraImage).toHaveAttribute('width', '280');
    expect(cameraImage).toHaveAttribute('height', '240');
  });

  it('should display review count', () => {
    renderComponent();

    expect(screen.getByText('Всего оценок:')).toBeInTheDocument();
    expect(screen.getByText(mockCamera.reviewCount.toString())).toBeInTheDocument();
  });

  it('should display camera name', () => {
    renderComponent();

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toHaveClass('product-card__title');
  });

  it('should display camera price in correct format', () => {
    const cameraWithPrice = { ...mockCamera, price: 50000 };
    renderComponent({ camera: cameraWithPrice });

    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('50 000 ₽')).toBeInTheDocument();
  });

  it('should render buy button and call onAddToCartClick when clicked', () => {
    renderComponent();

    const buyButton = screen.getByText('Купить');
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).toHaveClass('btn', 'btn--purple', 'product-card__btn');

    fireEvent.click(buyButton);
    expect(mockOnAddToCartClick).toHaveBeenCalledTimes(1);
  });


  it('should call onCameraMouseEnter when hovering over details link', () => {
    renderComponent();

    const detailsLink = screen.getByText('Подробнее');
    fireEvent.mouseEnter(detailsLink);

    expect(mockOnCameraMouseEnter).toHaveBeenCalledTimes(1);
    expect(mockOnCameraMouseEnter).toHaveBeenCalledWith(mockCamera.id.toString());
  });

});
