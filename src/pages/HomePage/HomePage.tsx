import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import { Api } from '../../services/api';
import { PostType } from '../../types/Post';

export function HomePage() {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    Api.getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <div>
      <h1>Posts</h1>

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
