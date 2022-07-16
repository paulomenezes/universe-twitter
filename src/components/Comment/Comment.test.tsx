import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Comment } from './Comment';

describe('<Comment />', () => {
  it('should render a comment', () => {
    render(
      <BrowserRouter>
        <Comment
          comment={{
            postId: 1,
            id: 1,
            name: 'id labore ex et quam laborum',
            email: 'Eliseo@gardner.biz',
            body: 'laudantium enim',
          }}
        />
      </BrowserRouter>
    );

    const article = screen.getByRole('article');
    const title = screen.getByText('id labore ex et quam laborum');
    const body = screen.getByText('laudantium enim');

    expect(article).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });
});
