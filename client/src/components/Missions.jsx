import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Missions.css';

function Missions() {
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

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
        setFilteredMissions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching missions:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter missions based on search and filter criteria
  useEffect(() => {
    let filtered = missions;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(mission => 
        mission.name.toLowerCase().includes(searchLower) ||
        mission.mission.toLowerCase().includes(searchLower) ||
        (mission.description && mission.description.toLowerCase().includes(searchLower))
      );
    }

    // Agency filter
    if (selectedAgency !== 'all') {
      filtered = filtered.filter(mission => mission.agency === selectedAgency);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(mission => mission.status === selectedStatus);
    }

    // Date range filter
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(mission => {
        const missionDate = new Date(mission.launchDate);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;

        if (startDate && endDate) {
          return missionDate >= startDate && missionDate <= endDate;
        } else if (startDate) {
          return missionDate >= startDate;
        } else if (endDate) {
          return missionDate <= endDate;
        }
        return true;
      });
    }

    setFilteredMissions(filtered);
  }, [missions, searchTerm, selectedAgency, selectedStatus, dateRange]);

  // Get unique agencies and statuses for filter options
  const agencies = [...new Set(missions.map(mission => mission.agency))];
  const statuses = [...new Set(missions.map(mission => mission.status))];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAgency('all');
    setSelectedStatus('all');
    setDateRange({ start: '', end: '' });
  };

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

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search missions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="agency-filter">Agency:</label>
            <select
              id="agency-filter"
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Agencies</option>
              {agencies.map(agency => (
                <option key={agency} value={agency}>{agency}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="start-date">From:</label>
            <input
              type="date"
              id="start-date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="date-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="end-date">To:</label>
            <input
              type="date"
              id="end-date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="date-input"
            />
          </div>

          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>

        <div className="results-info">
          <p>Showing {filteredMissions.length} of {missions.length} missions</p>
        </div>
      </div>
      
      <div className="missions-container">
        {filteredMissions.length === 0 ? (
          <div className="no-missions">
            <h2>No Missions Found</h2>
            <p>Try adjusting your search criteria or filters.</p>
            <button onClick={clearFilters} className="back-button">Clear All Filters</button>
          </div>
        ) : (
          filteredMissions.map((mission) => (
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