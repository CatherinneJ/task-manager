import { Link } from 'react-router-dom';
import './navbar.css';


function Navbar() {
  return (
    <nav>
      <Link to="/" className="navbar">Home</Link>
      <Link to="/dashboard" className="navbar">Dashboard</Link>
      <Link to="/profile" className="navbar">Profile</Link>
    </nav>
  );
}

export default Navbar;