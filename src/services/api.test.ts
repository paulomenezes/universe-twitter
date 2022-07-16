import { API_URL } from '../util/constants';
import { fetchMock } from '../util/fetch-mock';
import { Api } from './api';

describe('Api', () => {
  it('should request posts', async () => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
    ];

    fetchMock({ [`${API_URL}/posts`]: MOCK_DATA });

    const response = await Api.getPosts();

    expect(response).toEqual(MOCK_DATA);
  });

  it('should request empty posts', async () => {
    fetchMock({ [`${API_URL}/posts`]: [] });

    const response = await Api.getPosts();

    expect(response).toEqual([]);
  });

  it('should request post by id', async () => {
    const MOCK_DATA = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };

    fetchMock({ [`${API_URL}/posts/1`]: MOCK_DATA });

    const response = await Api.getPostById(1);

    expect(response).toEqual(MOCK_DATA);
  });

  it('should request post by user id', async () => {
    const MOCK_DATA = [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
    ];

    fetchMock({ [`${API_URL}/users/1/posts`]: MOCK_DATA });

    const response = await Api.getPostByUserId(1);

    expect(response).toEqual(MOCK_DATA);
  });

  it('should request comments by post id', async () => {
    const MOCK_DATA = {
      postId: 1,
      id: 1,
      name: 'id labore ex et quam laborum',
      email: 'Eliseo@gardner.biz',
      body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
    };

    fetchMock({ [`${API_URL}/posts/1/comments`]: MOCK_DATA });

    const response = await Api.getCommentsByPostId(1);

    expect(response).toEqual(MOCK_DATA);
  });

  it('should request user by id', async () => {
    const MOCK_DATA = {
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

    fetchMock({ [`${API_URL}/users/1`]: MOCK_DATA });

    const response = await Api.getUserById(1);

    expect(response).toEqual(MOCK_DATA);
  });
});
