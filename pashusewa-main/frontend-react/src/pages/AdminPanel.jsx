import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusModal from '../components/StatusModal';
import { useGeolocation, calculateDistance } from '../utils/hooks';
import { fetchReports, updateReportStatus } from '../services/api';

const AdminPanel = () => {
  const [allReports, setAllReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [radius, setRadius] = useState(10);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  
  const { latitude, longitude, loading: locationLoading, error: locationError, refetch } = useGeolocation();

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    if (latitude && longitude && allReports.length > 0) {
      filterReportsByDistance();
    }
  }, [latitude, longitude, allReports, currentFilter, radius]);

  const loadReports = async () => {
    try {
      setLoading(true);
      const reports = await fetchReports();
      setAllReports(reports);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReportsByDistance = () => {
    if (!latitude || !longitude) {
      return;
    }

    // Calculate distance for each report
    const reportsWithDistance = allReports.map(report => ({
      ...report,
      distance: calculateDistance(latitude, longitude, report.latitude, report.longitude)
    }));

    // Filter by radius and status
    let filtered = reportsWithDistance.filter(report => {
      const withinRadius = report.distance <= radius;
      const matchesStatus = currentFilter === 'all' || report.status === currentFilter;
      return withinRadius && matchesStatus;
    });

    // Sort by distance
    filtered.sort((a, b) => a.distance - b.distance);

    setFilteredReports(filtered);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleRadiusChange = (e) => {
    setRadius(parseInt(e.target.value, 10));
  };

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus);
      handleCloseModal();
      loadReports();
    } catch (error) {
      alert('Failed to update status. Please try again later.');
    }
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const getLocationDisplay = () => {
    if (locationLoading) return 'Fetching your location...';
    if (locationError) return locationError;
    if (latitude && longitude) return `Your location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    return 'Location unavailable';
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status.toLowerCase().replace(' ', '-')}`;
  };

  return (
    <div className="container admin-container">
      <Header 
        title="PashuSewa - NGO Panel" 
        description="Showing animal reports in your vicinity"
        linkTo="/"
        linkText="Back to User Interface"
      />

      <main>
        <section className="filter-section">
          <h2>Nearby Animal Reports</h2>
          <div className="location-settings">
            <button onClick={refetch} className="btn small-btn">
              Update My Location
            </button>
            <span>{getLocationDisplay()}</span>
            <input 
              type="number" 
              id="radiusInput" 
              min="1" 
              max="50" 
              value={radius}
              onChange={handleRadiusChange}
              className="radius-input"
            />
            <label htmlFor="radiusInput">km radius</label>
          </div>
          <div className="filters">
            <button 
              className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All Reports
            </button>
            <button 
              className={`filter-btn ${currentFilter === 'Pending' ? 'active' : ''}`}
              onClick={() => handleFilterChange('Pending')}
            >
              Pending
            </button>
            <button 
              className={`filter-btn ${currentFilter === 'In Progress' ? 'active' : ''}`}
              onClick={() => handleFilterChange('In Progress')}
            >
              In Progress
            </button>
            <button 
              className={`filter-btn ${currentFilter === 'Resolved' ? 'active' : ''}`}
              onClick={() => handleFilterChange('Resolved')}
            >
              Resolved
            </button>
          </div>
        </section>

        <section className="reports-table-section">
          <div className="table-responsive">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Location</th>
                  <th>Distance</th>
                  <th>Note</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="loading-cell">Loading reports...</td>
                  </tr>
                ) : !latitude || !longitude ? (
                  <tr>
                    <td colSpan="8" className="loading-cell">
                      Please update your location to see nearby reports
                    </td>
                  </tr>
                ) : filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="loading-cell">
                      No reports found within {radius} km of your location
                    </td>
                  </tr>
                ) : (
                  filteredReports.map(report => {
                    const reportDate = new Date(report.created_at);
                    const formattedDate = reportDate.toLocaleString();
                    
                    return (
                      <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>
                          <img 
                            src={report.image} 
                            alt="Injured Animal" 
                            onClick={() => openImageInNewTab(report.image)}
                          />
                        </td>
                        <td>
                          <a 
                            href={`https://maps.google.com/?q=${report.latitude},${report.longitude}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
                          </a>
                        </td>
                        <td>{report.distance ? `${report.distance.toFixed(2)} km` : 'N/A'}</td>
                        <td>{report.note || 'No notes provided'}</td>
                        <td>{formattedDate}</td>
                        <td>
                          <span className={getStatusClass(report.status)}>
                            {report.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="action-btn"
                            onClick={() => handleOpenModal(report)}
                          >
                            Update Status
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer text="© 2025 PashuSewa | NGO Panel" />

      <StatusModal 
        isOpen={modalOpen}
        onClose={handleCloseModal}
        reportId={selectedReport?.id}
        currentStatus={selectedReport?.status}
        onSubmit={handleStatusUpdate}
      />
    </div>
  );
};

export default AdminPanel;
