import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { fetchMock } from '../../util/fetch-mock';

import { HomePage } from './HomePage';

describe('<HomePage />', () => {
  it('should render HomePage', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const linkElement = screen.getByText(/Posts/i);
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

    fetchMock(MOCK_DATA);

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
