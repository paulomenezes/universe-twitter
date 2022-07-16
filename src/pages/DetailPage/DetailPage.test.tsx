import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fetchMock } from '../../util/fetch-mock';

import { DetailPage } from './DetailPage';

describe('<DetailPage />', () => {
  it('should render DetailPage', async () => {
    const MOCK_DATA = {
      userId: 1,
      id: 1,
      title: 'Post title',
      body: 'Post body',
    };

    fetchMock(MOCK_DATA);

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
