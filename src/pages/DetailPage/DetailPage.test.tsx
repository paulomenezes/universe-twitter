import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { API_URL } from '../../util/constants';
import { fetchMock } from '../../util/fetch-mock';
import { AuthorPage } from '../AuthorPage/AuthorPage';

import { DetailPage } from './DetailPage';

describe('<DetailPage />', () => {
  it('should render DetailPage', async () => {
    const MOCK_DATA_POSTS = {
      userId: 1,
      id: 1,
      title: 'Post title',
      body: 'Post body',
    };

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

    fetchMock({ [`${API_URL}/posts/1`]: MOCK_DATA_POSTS, [`${API_URL}/posts/1/comments`]: MOCK_DATA_COMMENTS });

    render(
      <MemoryRouter initialEntries={['/i/1']}>
        <Routes>
          <Route path="/i/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const titleElement = await waitFor(() => screen.getByText('Post'));
    expect(titleElement).toBeInTheDocument();

    const post = await waitFor(() => screen.getByText('Post title'));
    expect(post).toBeInTheDocument();
  });

  it('should render a button to more posts from same author', async () => {
    const MOCK_DATA_POSTS = [
      {
        userId: 1,
        id: 1,
        title: 'Post title',
        body: 'Post body',
      },
    ];

    const MOCK_DATA_POST = {
      userId: 1,
      id: 1,
      title: 'Post title',
      body: 'Post body',
    };

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
      [`${API_URL}/posts/1`]: MOCK_DATA_POST,
      [`${API_URL}/posts/1/comments`]: MOCK_DATA_COMMENTS,
      [`${API_URL}/users/1/posts`]: MOCK_DATA_POSTS,
    });

    render(
      <MemoryRouter initialEntries={['/i/1']}>
        <Routes>
          <Route path="/i/:id" element={<DetailPage />} />
          <Route path="/a/:id" element={<AuthorPage />} />
        </Routes>
      </MemoryRouter>
    );

    const titleElement = await waitFor(() => screen.getByText('Post'));
    expect(titleElement).toBeInTheDocument();

    const post = await waitFor(() => screen.getByText('Post title'));
    expect(post).toBeInTheDocument();

    const button = await waitFor(() => screen.getByText('More posts by same author'));
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const titleAuthor = await waitFor(() => screen.getByText('Author'));
    expect(titleAuthor).toBeInTheDocument();

    const authorPost = await waitFor(() => screen.getByText('Post body'));
    expect(authorPost).toBeInTheDocument();
  });

  it('should render a message when no comments is found', async () => {
    const MOCK_DATA_POST = {
      userId: 1,
      id: 1,
      title: 'Post title',
      body: 'Post body',
    };

    fetchMock({
      [`${API_URL}/posts/1`]: MOCK_DATA_POST,
      [`${API_URL}/posts/1/comments`]: [],
    });

    const { getByText } = render(
      <MemoryRouter initialEntries={['/i/1']}>
        <Routes>
          <Route path="/i/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const postsTitle = screen.getByText('Post');
    expect(postsTitle).toBeInTheDocument();

    const posts = await waitFor(() => getByText('No comments found'));
    expect(posts).toBeInTheDocument;
  });

  it('should render a message when post and comments request fail', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(jest.fn(() => Promise.reject()) as jest.Mock);

    const { getByText } = render(
      <MemoryRouter initialEntries={['/i/1']}>
        <Routes>
          <Route path="/i/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    const postsTitle = screen.getByText('Post');
    expect(postsTitle).toBeInTheDocument();

    const posts = await waitFor(() => getByText('Error while fetching post'));
    expect(posts).toBeInTheDocument;

    const comments = await waitFor(() => getByText('Error while fetching comments'));
    expect(comments).toBeInTheDocument;
  });
});
