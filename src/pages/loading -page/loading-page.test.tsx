import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingPage from './loading-page';

describe('Page: LoadingPage', () => {
  it('should render loading text', () => {
    render(<LoadingPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

});
