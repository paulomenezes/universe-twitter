import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { API_URL } from '../../util/constants';
import { fetchMock } from '../../util/fetch-mock';

import { HomePage } from './HomePage';

describe('<HomePage />', () => {
  it('should render a list of posts', async () => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'Post title 1',
        body: 'Post body',
      },
      {
        userId: 2,
        id: 2,
        title: 'Post title 2',
        body: 'Post body',
      },
    ];

    fetchMock({
      [`${API_URL}/posts`]: MOCK_DATA,
      [`${API_URL}/users/1`]: {
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
      },
      [`${API_URL}/users/2`]: {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
    });

    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const postsTitle = screen.getByText('Posts');
    expect(postsTitle).toBeInTheDocument();

    const posts = await waitFor(() => getAllByText(/Post body/i));
    expect(posts).toHaveLength(2);

    const post = await waitFor(() => getByText(/Post title 1/i));
    expect(post).toBeInTheDocument();
  });

  it('should render a message when no posts is found', async () => {
    const MOCK_DATA: any[] = [];

    fetchMock({ [`${API_URL}/posts`]: MOCK_DATA });

    const { getByText } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const postsTitle = screen.getByText('Posts');
    expect(postsTitle).toBeInTheDocument();

    const posts = await waitFor(() => getByText('No posts found'));
    expect(posts).toBeInTheDocument;
  });

  it('should render a message when no posts request fail', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    const { getByText } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const postsTitle = screen.getByText('Posts');
    expect(postsTitle).toBeInTheDocument();

    const posts = await waitFor(() => getByText('Error while fetching posts'));
    expect(posts).toBeInTheDocument;
  });

  it('should render a list of posts if user request fails', async () => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'Post title 1',
        body: 'Post body',
      },
      {
        userId: 20,
        id: 2,
        title: 'Post title 2',
        body: 'Post body',
      },
    ];

    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn((url: string) => {
        if (url.includes('/users/')) {
          return Promise.reject();
        }

        return Promise.resolve({ json: () => MOCK_DATA });
      }) as jest.Mock
    );

    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const postsTitle = screen.getByText('Posts');
    expect(postsTitle).toBeInTheDocument();

    const posts = await waitFor(() => getAllByText(/Post body/i));
    expect(posts).toHaveLength(2);

    const post = await waitFor(() => getByText(/Post title 1/i));
    expect(post).toBeInTheDocument();
  });
});
