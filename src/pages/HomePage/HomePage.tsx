import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div>
      Home Page <br />
      <Link to={'/i/1'}>Detail page link</Link>
    </div>
  );
}
