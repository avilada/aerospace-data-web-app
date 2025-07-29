import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Missions.css';

function Missions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/nasa')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setMissions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching missions:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="missions-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading missions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="missions-page">
        <div className="error">
          <h2>Error Loading Missions</h2>
          <p>{error}</p>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="missions-page">
      <div className="missions-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Aerospace Missions</h1>
        <p>Explore the incredible missions that have shaped space exploration</p>
      </div>
      
      <div className="missions-container">
        {missions.length === 0 ? (
          <div className="no-missions">
            <h2>No Missions Found</h2>
            <p>No aerospace missions are currently available.</p>
            <Link to="/" className="back-button">Back to Home</Link>
          </div>
        ) : (
          missions.map((mission) => (
            <div key={mission._id} className="mission-card">
              <h2>{mission.name}</h2>
              <p><b>Mission:</b> {mission.mission}</p>
              <p><b>Agency:</b> {mission.agency}</p>
              <p><b>Launch Date:</b> {new Date(mission.launchDate).toLocaleDateString()}</p>
              <p><b>Status:</b> <span className={`status ${mission.status}`}>{mission.status}</span></p>
              {mission.description && <p className="desc">{mission.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Missions; 