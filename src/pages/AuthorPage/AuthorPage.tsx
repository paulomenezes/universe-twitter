import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Api } from '../../services/api';
import { PostType } from '../../types/Post';
import { UserType } from '../../types/User';

export function AuthorPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    Api.getPostByUserId(+id!)
      .then((posts) => {
        setPosts(posts);
        setLoading(false);

        Api.getUserById(+id!).then((user) => {
          setUser(user);
        });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <h1>Author {user?.name}</h1>

      {!loading && !error && posts.length === 0 && <div>No posts found</div>}
      {!loading && error && <div>Error while fetching posts</div>}

      {loading
        ? Array.from(new Array(10)).map((_, i) => <Skeleton key={i} width="100%" height="70px" marginBottom={'10px'} />)
        : posts.map((post) => <Post key={post.id} post={post} user={user} />)}
    </div>
  );
}
