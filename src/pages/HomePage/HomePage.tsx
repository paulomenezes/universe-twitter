import { useEffect, useState } from 'react';
import { Post } from '../../components/Post/Post';
import { Api } from '../../services/api';
import { PostType } from '../../types/Post';
import { UserType } from '../../types/User';

export function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<Record<number, UserType>>({});

  useEffect(() => {
    Api.getPosts().then((posts) => {
      setPosts(posts);

      const userIds = [...new Set(posts.map((post) => post.userId))];
      const usersPromises = userIds.map((userId) => Api.getUserById(userId));

      Promise.all(usersPromises).then((users) => {
        setUsers(
          users.reduce((acc, user) => {
            acc[user.id] = user;

            return acc;
          }, {} as Record<number, UserType>)
        );
      });
    });
  }, []);

  return (
    <div>
      <h1>Posts</h1>

      {posts.map((post) => (
        <Post key={post.id} post={post} user={users[post.userId]} />
      ))}
    </div>
  );
}
