import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch('/api/nasa')
      .then(res => res.json())
      .then(setMissions)
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Aerospace Missions</h1>
      <div className="missions-container">
        {missions.map((mission) => (
          <div key={mission._id} className="mission-card">
            <h2>{mission.name}</h2>
            <p><b>Mission:</b> {mission.mission}</p>
            <p><b>Agency:</b> {mission.agency}</p>
            <p><b>Launch Date:</b> {new Date(mission.launchDate).toLocaleDateString()}</p>
            <p><b>Status:</b> {mission.status}</p>
            {mission.description && <p className="desc">{mission.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
