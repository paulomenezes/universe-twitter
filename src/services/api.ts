import { CommentType } from '../types/Comment';
import { PostType } from '../types/Post';
import { UserType } from '../types/User';
import { API_URL } from '../util/constants';

export class Api {
  private static userCache: Map<number, UserType> = new Map();

  static async getPosts(): Promise<PostType[]> {
    const response = await fetch(`${API_URL}/posts`);

    return response.json();
  }

  static async getPostById(id: number): Promise<PostType> {
    const response = await fetch(`${API_URL}/posts/${id}`);

    return response.json();
  }

  static async getPostByUserId(userId: number): Promise<PostType[]> {
    const response = await fetch(`${API_URL}/users/${userId}/posts`);

    return response.json();
  }

  static async getCommentsByPostId(postId: number): Promise<CommentType[]> {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`);

    return response.json();
  }

  static async getUserById(userId: number): Promise<UserType> {
    if (Api.userCache.has(userId)) {
      return Api.userCache.get(userId)!;
    }

    const response = await fetch(`${API_URL}/users/${userId}`);
    const user = await response.json();

    Api.userCache.set(userId, user);

    return user;
  }
}
