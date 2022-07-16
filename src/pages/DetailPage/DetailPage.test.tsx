import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { API_URL } from '../../util/constants';
import { fetchMock } from '../../util/fetch-mock';

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

    const titleElement = await waitFor(() => screen.getByText(/Post/i));
    expect(titleElement).toBeInTheDocument();

    const post = await waitFor(() => screen.getByText('Post title'));
    expect(post).toBeInTheDocument();
  });
});
