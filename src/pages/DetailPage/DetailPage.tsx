import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import { Api } from '../../services/api';
import { PostType } from '../../types/Post';

export function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | undefined>(undefined);

  useEffect(() => {
    Api.getPostById(+id!).then((post) => {
      setPost(post);
    });
  }, [id]);

  return (
    <div>
      <h1>Post</h1>

      {post && <Post post={post} />}
    </div>
  );
}
