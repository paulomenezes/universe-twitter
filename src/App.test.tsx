import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App } from './App';
import { fetchMock } from './util/fetch-mock';

describe('<App />', () => {
  it('should render home page', async () => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'Post title 1',
        body: 'Post body',
      },
    ];

    fetchMock(MOCK_DATA);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const linkElement = await waitFor(() => screen.getByText(/Posts/i));
    expect(linkElement).toBeInTheDocument();

    const detailPageLink = await waitFor(() => screen.getByText(/Post title/i));
    expect(detailPageLink).toBeInTheDocument();
  });

  it('should navigate to detail page', async () => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'Post title 1',
        body: 'Post body',
      },
    ];

    fetchMock(MOCK_DATA);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const detailPageLink = await waitFor(() => screen.getByText(/Post title/i));
    expect(detailPageLink).toBeInTheDocument();

    fetchMock(MOCK_DATA[0]);

    fireEvent.click(detailPageLink);

    const titlePage = await waitFor(() => screen.getByText('Post'));
    expect(titlePage).toBeInTheDocument();

    const post = await waitFor(() => screen.getByText('Post title 1'));
    expect(post).toBeInTheDocument();
  });

  it('should have a fixed header', async () => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'Post title 1',
        body: 'Post body',
      },
    ];

    fetchMock(MOCK_DATA);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const header = await waitFor(() => screen.getByRole('navigation'));
    expect(header).toBeInTheDocument();

    const detailPageLink = await waitFor(() => screen.getByText(/Post title/i));
    expect(detailPageLink).toBeInTheDocument();
  });

  it('should navigate to home when click on logo', async () => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'Post title 1',
        body: 'Post body',
      },
    ];

    fetchMock(MOCK_DATA);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const detailPageLink = await waitFor(() => screen.getByText(/Post title/i));
    expect(detailPageLink).toBeInTheDocument();

    fetchMock(MOCK_DATA[0]);

    fireEvent.click(detailPageLink);

    const pageTitle = await waitFor(() => screen.getByText('Post'));
    expect(pageTitle).toBeInTheDocument();

    const postTitle = await waitFor(() => screen.getByText('Post title 1'));
    expect(postTitle).toBeInTheDocument();

    const header = await waitFor(() => screen.getByText('Twitter'));
    expect(header).toBeInTheDocument();
  });
});
