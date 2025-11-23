import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';

describe('Component: Footer', () => {
  const renderComponent = () => render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  it('should render footer component correctly', () => {
    renderComponent();

    expect(screen.getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render logo with correct link', () => {
    renderComponent();

    const logoLink = screen.getByLabelText('Переход на главную');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render all navigation sections', () => {
    renderComponent();

    expect(screen.getByText('Навигация')).toBeInTheDocument();
    expect(screen.getByText('Ресурсы')).toBeInTheDocument();
    expect(screen.getByText('Поддержка')).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    renderComponent();

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();

    expect(screen.getByText('Курсы операторов')).toBeInTheDocument();
    expect(screen.getByText('Блог')).toBeInTheDocument();
    expect(screen.getByText('Сообщество')).toBeInTheDocument();


    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Задать вопрос')).toBeInTheDocument();
  });

  it('should render social media links', () => {
    renderComponent();

    expect(screen.getByLabelText('Переход на страницу вконтатке')).toBeInTheDocument();
    expect(screen.getByLabelText('Переход на страницу pinterest')).toBeInTheDocument();
    expect(screen.getByLabelText('Переход на страницу reddit')).toBeInTheDocument();
  });

});
