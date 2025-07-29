import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Aerospace Explorer</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/missions" 
            className={`nav-link ${location.pathname === '/missions' ? 'active' : ''}`}
          >
            Missions
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 