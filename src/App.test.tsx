import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

describe('<App />', () => {
  it('should render home page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkElement = screen.getByText(/Home Page/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should navigate to detail page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const detailPageLink = screen.getByText(/Detail page link/i);
    expect(detailPageLink).toBeInTheDocument();

    fireEvent.click(detailPageLink);

    const titlePage = screen.getByText(/Detail Page/i);
    expect(titlePage).toBeInTheDocument();
  });
});
