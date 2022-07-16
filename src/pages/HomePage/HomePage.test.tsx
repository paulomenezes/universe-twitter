import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { HomePage } from './HomePage';

describe('<HomePage />', () => {
  it('should render HomePage', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const linkElement = screen.getByText(/Home Page/i);
    expect(linkElement).toBeInTheDocument();
  });
});
