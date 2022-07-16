import { CommentType } from '../../types/Comment';
import './Comment.css';

export interface CommentProps {
  comment: CommentType;
}

export function Comment(props: CommentProps) {
  return (
    <div className="comment" role={'article'}>
      <div className="title">
        <span className="name">{props.comment.name}</span>
        <span className="email">{props.comment.email}</span>
      </div>
      <div>{props.comment.body}</div>
    </div>
  );
}
