import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { withHistory } from '../../utils-mocks/mock-components';
import Header from './header';

describe('Component: Header', () => {
  const renderComponent = () => {
    const componentWithHistory = withHistory(<Header />);
    return render(componentWithHistory);
  };

  it('should render header component correctly', () => {
    renderComponent();

    const header = document.querySelector('.header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('id', 'header');
  });

  it('should render logo with correct link', () => {
    renderComponent();

    const logoLink = screen.getByLabelText('Переход на главную');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveClass('header__logo');
  });

  it('should render main navigation with all links', () => {
    renderComponent();

    const nav = document.querySelector('.main-nav');
    expect(nav).toBeInTheDocument();

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });

  it('should render search form', () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText('Поиск по сайту');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveClass('form-search__input');
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveAttribute('autoComplete', 'off');
  });


  it('should render search reset button', () => {
    renderComponent();

    const resetButton = screen.getByText('Сбросить поиск');
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveClass('visually-hidden');

    const resetButtonElement = resetButton.closest('button');
    expect(resetButtonElement).toHaveClass('form-search__reset');
    expect(resetButtonElement).toHaveAttribute('type', 'reset');
  });

});
