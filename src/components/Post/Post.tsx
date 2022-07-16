import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PostType } from '../../types/Post';
import { UserType } from '../../types/User';
import './Post.css';

export interface PostProps {
  post: PostType;
  user?: UserType;
}

export function Post(props: PostProps) {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (props.user) {
      const name = props.user.name.split(' ');

      if (name.length > 1) {
        setUsername(`${name[0][0]}${name[1][0]}`);
      } else {
        setUsername(name[0][0]);
      }
    }
  }, [props.user]);

  return (
    <Link to={`/i/${props.post.id}`}>
      <article className="post">
        <div>
          <div className="picture">{username}</div>
        </div>
        <div>
          <div className="title">{props.post.title}</div>
          <div>{props.post.body}</div>
        </div>
      </article>
    </Link>
  );
}
