import { Link } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  return (
    <nav role={'navigation'}>
      <div className="container">
        <span className="logo">
          <Link to={'/'}>Twitter</Link>
        </span>
      </div>
    </nav>
  );
}
