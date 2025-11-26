import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryHistory } from 'history';
import { withHistory } from '../../utils-mocks/mock-components';
import DetailedCameraTabs from './detailed-camera-tabs';
import { makeFakeCamera } from '../../utils-mocks/mocks';


describe('Component: DetailedCameraTabs', () => {
  const mockCamera = {
    ...makeFakeCamera(),
    vendorCode: 'TEST-001',
    category: 'Фотокамера',
    type: 'Цифровая',
    level: 'Профессиональный',
    description: 'Test camera description for testing purposes'
  };

  const renderComponent = (tab = '') => {
    const initialEntries = [`/camera/1${tab ? `?tab=${tab}` : ''}`];
    const mockHistory = createMemoryHistory({ initialEntries });

    const componentWithHistory = withHistory(
      <DetailedCameraTabs detailedCamera={mockCamera} />,
      mockHistory
    );

    return render(componentWithHistory);
  };

  it('should render both tab buttons', () => {
    renderComponent();

    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
  });

  it('should render description tab as active by default', () => {
    renderComponent();

    const descriptionButton = screen.getByText('Описание');
    const characteristicsButton = screen.getByText('Характеристики');

    // По умолчанию активна вкладка "Описание"
    expect(descriptionButton).toHaveClass('is-active');
    expect(characteristicsButton).not.toHaveClass('is-active');
  });

  it('should show description content by default', () => {
    renderComponent();

    expect(screen.getByText('Test camera description for testing purposes')).toBeInTheDocument();

    const characteristicsPanel = document.getElementById('tab-specs');
    expect(characteristicsPanel).toHaveAttribute('hidden');
  });

  it('should render characteristics content correctly', () => {
    renderComponent('characteristics');

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('TEST-001')).toBeInTheDocument();
    expect(screen.getByText('Категория:')).toBeInTheDocument();
    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
    expect(screen.getByText('Тип камеры:')).toBeInTheDocument();
    expect(screen.getByText('Цифровая')).toBeInTheDocument();
    expect(screen.getByText('Уровень:')).toBeInTheDocument();
    expect(screen.getByText('Профессиональный')).toBeInTheDocument();
  });


  it('should show characteristics tab as active when tab=characteristics in URL', () => {
    renderComponent('characteristics');

    const characteristicsButton = screen.getByText('Характеристики');
    const descriptionButton = screen.getByText('Описание');

    expect(characteristicsButton).toHaveClass('is-active');
    expect(descriptionButton).not.toHaveClass('is-active');
  });


  it('should switch tabs on click characteristics', () => {
    renderComponent();

    const characteristicsButton = screen.getByText('Характеристики');
    const descriptionButton = screen.getByText('Описание');


    fireEvent.click(characteristicsButton);

    expect(characteristicsButton).toHaveClass('is-active');
    expect(descriptionButton).not.toHaveClass('is-active');

  });

});
