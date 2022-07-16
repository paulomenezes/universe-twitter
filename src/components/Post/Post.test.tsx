import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Post } from './Post';

describe('<Post />', () => {
  it('should render a post', () => {
    render(
      <BrowserRouter>
        <Post post={{ id: 1, userId: 1, title: 'Post', body: 'Post body' }} />
      </BrowserRouter>
    );

    const article = screen.getByRole('article');
    const title = screen.getByText('Post');
    const body = screen.getByText('Post body');

    expect(article).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });
});
