import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import { Comment } from '../../components/Comment/Comment';
import { Api } from '../../services/api';
import { CommentType } from '../../types/Comment';
import { PostType } from '../../types/Post';

import './DetailPage.css';
import { UserType } from '../../types/User';

export function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | undefined>(undefined);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    Promise.all([Api.getPostById(+id!), Api.getCommentsByPostId(+id!)]).then(([post, comments]) => {
      Api.getUserById(post.userId).then((user) => {
        setUser(user);
      });

      setPost(post);
      setComments(comments);
    });
  }, [id]);

  return (
    <div>
      <div className="detail-header">
        <h1>Post</h1>

        <Link to={`/a/${post?.userId}`}>
          <button type="button">More posts by same author</button>
        </Link>
      </div>

      {post && <Post post={post} user={user} />}

      <h2>Comments</h2>

      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
