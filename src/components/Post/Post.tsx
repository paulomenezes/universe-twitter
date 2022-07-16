import { Link } from 'react-router-dom';
import { PostType } from '../../types/Post';
import './Post.css';

export interface PostProps {
  post: PostType;
}

export function Post(props: PostProps) {
  return (
    <Link to={`/i/${props.post.id}`}>
      <article>
        <div className="title">{props.post.title}</div>
        <div>{props.post.body}</div>
      </article>
    </Link>
  );
}
