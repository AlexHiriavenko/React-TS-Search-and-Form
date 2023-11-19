import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="app-loading alert">
      <p>Page Not Found</p>
      <Link to="/">switch to Home</Link>
    </div>
  );
}

export default NotFound;
