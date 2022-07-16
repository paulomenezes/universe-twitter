import { useEffect, useState } from 'react';
import { Post } from '../../components/Post/Post';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Api } from '../../services/api';
import { PostType } from '../../types/Post';
import { UserType } from '../../types/User';

export function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<Record<number, UserType>>({});

  useEffect(() => {
    Api.getPosts()
      .then((posts) => {
        setPosts(posts);

        const userIds = [...new Set(posts.map((post) => post.userId))];

        if (userIds.length > 0) {
          const usersPromises = userIds.map((userId) => Api.getUserById(userId));

          Promise.all(usersPromises)
            .then((users) => {
              setUsers(
                users.reduce((acc, user) => {
                  acc[user.id] = user;

                  return acc;
                }, {} as Record<number, UserType>)
              );

              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>

      {!loading && !error && posts.length === 0 && <div>No posts found</div>}
      {!loading && error && <div>Error while fetching posts</div>}

      {loading
        ? Array.from(new Array(10)).map((_, i) => <Skeleton key={i} width="100%" height="70px" marginBottom={'10px'} />)
        : posts.map((post) => <Post key={post.id} post={post} user={users[post.userId]} />)}
    </div>
  );
}
