import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Post } from '../../components/Post/Post';
import { Comment } from '../../components/Comment/Comment';
import { Api } from '../../services/api';
import { CommentType } from '../../types/Comment';
import { PostType } from '../../types/Post';

import './DetailPage.css';
import { UserType } from '../../types/User';
import { Skeleton } from '../../components/Skeleton/Skeleton';

export function DetailPage() {
  const { id } = useParams();

  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  const [errorPost, setErrorPost] = useState(false);
  const [errorComments, setErrorComments] = useState(false);

  const [post, setPost] = useState<PostType | undefined>(undefined);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    Api.getPostById(+id!)
      .then((post) => {
        Api.getUserById(post.userId).then((user) => {
          setUser(user);
        });

        setPost(post);
        setLoadingPost(false);
      })
      .catch(() => {
        setErrorPost(true);
        setLoadingPost(false);
      });

    Api.getCommentsByPostId(+id!)
      .then((comments) => {
        setComments(comments);
        setLoadingComments(false);
      })
      .catch(() => {
        setErrorComments(true);
        setLoadingComments(false);
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

      {!loadingPost && errorPost && <div>Error while fetching post</div>}

      {loadingPost && <Skeleton width="100%" height="70px" marginBottom={'10px'} />}

      {post && <Post post={post} user={user} />}

      <h2>Comments</h2>

      {!loadingComments && !errorComments && comments.length === 0 && <div>No comments found</div>}
      {!loadingComments && errorComments && <div>Error while fetching comments</div>}

      {loadingComments
        ? Array.from(new Array(10)).map((_, i) => <Skeleton key={i} width="100%" height="70px" marginLeft={'20px'} marginBottom={'10px'} />)
        : comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}
