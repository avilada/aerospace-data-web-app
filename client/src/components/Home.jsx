import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Aerospace Explorer</h1>
        <p className="hero-subtitle">Discover the fascinating world of space missions and exploration</p>
        
        <div className="hero-content">
          <div className="hero-text">
            <h2>Explore Space Missions</h2>
            <p>
              Discover the incredible achievements of 
              NASA, SpaceX, and other space agencies pushing the boundaries of human exploration.
            </p>
            
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🚀</span>
                <h3>Mission History</h3>
                <p>Explore historic and current space missions</p>
              </div>
              <div className="feature">
                <span className="feature-icon">🌌</span>
                <h3>Space Agencies</h3>
                <p>Learn about NASA, SpaceX, and other organizations</p>
              </div>
              <div className="feature">
                <span className="feature-icon">📡</span>
                <h3>Real-time Data</h3>
                <p>Access up-to-date mission information</p>
              </div>
            </div>
            
            <Link to="/missions" className="cta-button">
              Explore Missions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 