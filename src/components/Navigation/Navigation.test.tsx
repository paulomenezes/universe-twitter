import { fireEvent, render, screen } from '@testing-library/react';
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

  it('should link to home on logo', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const header = screen.getByRole('navigation');
    const logo = screen.getByRole('link');

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();

    fireEvent.click(logo);

    expect(logo).toHaveAttribute('href', '/');
  });
});
