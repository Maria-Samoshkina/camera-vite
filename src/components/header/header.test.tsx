import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { withHistory, withStore } from '../../utils-mocks/mock-components';
import { makeFakeStore } from '../../utils-mocks/mocks';
import Header from './header';

describe('Component: Header', () => {
  const renderComponent = () => {
    const componentWithHistory = withHistory(<Header />);
    const { withStoreComponent } = withStore(componentWithHistory, makeFakeStore());
    return render(withStoreComponent);
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

  it('should render basket link', () => {
    renderComponent();

    const basketLinks = screen.getAllByRole('link');
    const cartLink = basketLinks.find((link) => link.getAttribute('href') === '/card');

    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveClass('header__basket-link');
  });

  it('should not render basket count when cart is empty', () => {
    renderComponent();

    const basketCount = document.querySelector('.header__basket-count');
    expect(basketCount).not.toBeInTheDocument();
  });

});
