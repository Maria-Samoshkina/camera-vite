import NotFoundPage from './not-fonund-page';
import { screen, render } from '@testing-library/react';
import { withHistory } from '../../utils-mocks/mock-components';

describe('NotFoundScreen', ()=> {

  it('should render correctly', ()=> {

    const expectedHeaderText = '404 Not Found';
    const preparedComponent = withHistory(<NotFoundPage/>);

    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Вернуться на главную');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
