import { Post } from '../types/Post';
import { API_URL } from '../util/constants';

export class Api {
  static async getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts`);

    return response.json();
  }
}
