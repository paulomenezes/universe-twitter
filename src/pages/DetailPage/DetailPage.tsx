import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import { Comment } from '../../components/Comment/Comment';
import { Api } from '../../services/api';
import { CommentType } from '../../types/Comment';
import { PostType } from '../../types/Post';

export function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | undefined>(undefined);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    Promise.all([Api.getPostById(+id!), Api.getCommentsByPostId(+id!)]).then(([post, comments]) => {
      setPost(post);
      setComments(comments);
    });
  }, [id]);

  return (
    <div>
      <h1>Post</h1>

      {post && <Post post={post} />}

      <h2>Comments</h2>

      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
