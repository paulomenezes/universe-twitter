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

    fetchMock(MOCK_DATA);

    const response = await Api.getPosts();

    expect(response).toEqual(MOCK_DATA);
  });

  it('should request empty posts', async () => {
    fetchMock([]);

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

    fetchMock(MOCK_DATA);

    const response = await Api.getPostById(1);

    expect(response).toEqual(MOCK_DATA);
  });
});
