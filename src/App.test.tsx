import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { App } from './App';
import { API_URL } from './util/constants';
import { fetchMock } from './util/fetch-mock';

const MOCK_DATA_USER = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

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

    fetchMock({
      [`${API_URL}/posts`]: MOCK_DATA,
      [`${API_URL}/users/1`]: MOCK_DATA_USER,
    });

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

    const MOCK_DATA_COMMENTS = [
      {
        postId: 1,
        id: 1,
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
      },
      {
        postId: 1,
        id: 2,
        name: 'quo vero reiciendis velit similique earum',
        email: 'Jayne_Kuhic@sydney.com',
        body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
      },
    ];

    fetchMock({
      [`${API_URL}/posts`]: MOCK_DATA,
      [`${API_URL}/posts/1`]: MOCK_DATA[0],
      [`${API_URL}/posts/1/comments`]: MOCK_DATA_COMMENTS,
      [`${API_URL}/users/1`]: MOCK_DATA_USER,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const detailPageLink = await waitFor(() => screen.getByText(/Post title/i));
    expect(detailPageLink).toBeInTheDocument();

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

    fetchMock({
      [`${API_URL}/posts`]: MOCK_DATA,
    });

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

    const MOCK_DATA_COMMENTS = [
      {
        postId: 1,
        id: 1,
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
      },
      {
        postId: 1,
        id: 2,
        name: 'quo vero reiciendis velit similique earum',
        email: 'Jayne_Kuhic@sydney.com',
        body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
      },
    ];

    fetchMock({
      [`${API_URL}/posts`]: MOCK_DATA,
      [`${API_URL}/posts/1`]: MOCK_DATA[0],
      [`${API_URL}/posts/1/comments`]: MOCK_DATA_COMMENTS,
      [`${API_URL}/users/1`]: MOCK_DATA_USER,
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const detailPageLink = await waitFor(() => screen.getByText(/Post title/i));
    expect(detailPageLink).toBeInTheDocument();

    fireEvent.click(detailPageLink);

    const pageTitle = await waitFor(() => screen.getByText('Post'));
    expect(pageTitle).toBeInTheDocument();

    const postTitle = await waitFor(() => screen.getByText('Post title 1'));
    expect(postTitle).toBeInTheDocument();

    const header = await waitFor(() => screen.getByText('Twitter'));
    expect(header).toBeInTheDocument();
  });
});
