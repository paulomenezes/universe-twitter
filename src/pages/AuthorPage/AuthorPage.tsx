import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import { Api } from '../../services/api';
import { PostType } from '../../types/Post';
import { UserType } from '../../types/User';

export function AuthorPage() {
  const { id } = useParams();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    Api.getPostByUserId(+id!).then((posts) => {
      setPosts(posts);

      Api.getUserById(+id!).then((user) => {
        setUser(user);
      });
    });
  }, [id]);

  return (
    <div>
      <h1>Author {user?.name}</h1>

      {posts && posts.map((post) => <Post key={post.id} post={post} user={user} />)}
    </div>
  );
}
