import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { fetchMock } from './util/fetch-mock';

describe('<App />', () => {
  beforeEach(() => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'Post title 1',
        body: 'Post body',
      },
    ];

    fetchMock(MOCK_DATA);
  });

  it('should render home page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const linkElement = await waitFor(() => screen.getByText(/Posts/i));
    expect(linkElement).toBeInTheDocument();

    const detailPageLink = await waitFor(() => screen.getByText(/Post title/i));
    expect(detailPageLink).toBeInTheDocument();
  });

  it('should navigate to detail page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const detailPageLink = await waitFor(() => screen.getByText(/Post title/i));
    expect(detailPageLink).toBeInTheDocument();

    fireEvent.click(detailPageLink);

    const titlePage = await waitFor(() => screen.getByText(/Detail Page/i));
    expect(titlePage).toBeInTheDocument();
  });

  it('should have a fixed header', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const header = await waitFor(() => screen.getByRole('navigation'));

    expect(header).toBeInTheDocument();
  });

  it('should navigate to home when click on logo', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const header = await waitFor(() => screen.getByText('Twitter'));

    expect(header).toBeInTheDocument();
  });
});
