import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { API_URL } from '../../util/constants';
import { fetchMock } from '../../util/fetch-mock';

import { AuthorPage } from './AuthorPage';

describe('<AuthorPage />', () => {
  it('should render AuthorPage', () => {
    render(
      <MemoryRouter initialEntries={['/a/1']}>
        <Routes>
          <Route path="/a/:id" element={<AuthorPage />} />
        </Routes>
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/Author/i);
    expect(linkElement).toBeInTheDocument();
  });

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

    fetchMock({ [`${API_URL}/users/1/posts`]: MOCK_DATA });

    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={['/a/1']}>
        <Routes>
          <Route path="/a/:id" element={<AuthorPage />} />
        </Routes>
      </MemoryRouter>
    );

    const postsTitle = screen.getByText('Author');
    expect(postsTitle).toBeInTheDocument();

    const posts = await waitFor(() => getAllByText(/Post body/i));
    expect(posts).toHaveLength(2);

    const post = await waitFor(() => getByText(/Post title 1/i));
    expect(post).toBeInTheDocument();
  });
});
