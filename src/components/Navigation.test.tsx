import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Navigation } from './Navigation';

describe('<Navigation />', () => {
  it('should have a fixed header', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const header = screen.getByRole('navigation');
    const logo = screen.getByText(/Twitter/i);

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
