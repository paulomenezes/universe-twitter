import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Post } from './Post';

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

describe('<Post />', () => {
  it('should render a post', async () => {
    render(
      <BrowserRouter>
        <Post post={{ id: 1, userId: 1, title: 'Post', body: 'Post body' }} user={MOCK_DATA_USER} />
      </BrowserRouter>
    );

    const article = screen.getByRole('article');
    const title = screen.getByText('Post');
    const body = screen.getByText('Post body');

    const userPicture = screen.getByText('LG');

    expect(article).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();

    expect(userPicture).toBeInTheDocument();
  });

  it('should render a post without user', async () => {
    render(
      <BrowserRouter>
        <Post
          post={{
            id: 1,
            userId: 1,
            title: 'Post',
            body: 'Post body',
          }}
        />
      </BrowserRouter>
    );

    const article = screen.getByRole('article');
    const title = screen.getByText('Post');
    const body = screen.getByText('Post body');

    expect(article).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('should render a post with a only one name user ', async () => {
    render(
      <BrowserRouter>
        <Post
          post={{
            id: 1,
            userId: 1,
            title: 'Post',
            body: 'Post body',
          }}
          user={{
            id: 1,
            name: 'Paulo',
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
          }}
        />
      </BrowserRouter>
    );

    const article = screen.getByRole('article');
    const title = screen.getByText('Post');
    const body = screen.getByText('Post body');

    expect(article).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();

    const userPicture = screen.getByText('P');

    expect(userPicture).toBeInTheDocument();
  });
});
