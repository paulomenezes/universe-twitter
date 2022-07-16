import { PostType } from '../types/Post';
import { API_URL } from '../util/constants';

export class Api {
  static async getPosts(): Promise<PostType[]> {
    const response = await fetch(`${API_URL}/posts`);

    return response.json();
  }

  static async getPostById(id: number): Promise<PostType> {
    const response = await fetch(`${API_URL}/posts/${id}`);

    return response.json();
  }
}
