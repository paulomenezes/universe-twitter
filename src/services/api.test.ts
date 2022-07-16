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
});
