import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportCard from '../components/ReportCard';
import { useGeolocation, convertImageToBase64 } from '../utils/hooks';
import { detectAnimalInImage } from '../utils/animalDetection';
import { createReport, fetchReports } from '../services/api';

const UserReport = () => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [note, setNote] = useState('');
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(true);
  
  const { latitude, longitude, loading: locationLoading, error: locationError, refetch } = useGeolocation();

  useEffect(() => {
    loadRecentReports();
  }, []);

  const loadRecentReports = async () => {
    try {
      setReportsLoading(true);
      const reports = await fetchReports();
      setRecentReports(reports.slice(0, 6));
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setReportsLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    
    setImageFile(file);
    const base64Image = await convertImageToBase64(file);
    setImagePreview(base64Image);
    
    // Detect animal in the image
    setNote('Analyzing image for animal detection...');
    const detectedAnimal = await detectAnimalInImage(base64Image);
    setNote(`Injured ${detectedAnimal}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!imageFile) {
      alert('Please upload an image of the injured animal.');
      return;
    }
    
    if (!latitude || !longitude) {
      alert('Location information is required. Please refresh your location.');
      return;
    }
    
    try {
      setLoading(true);
      const base64Image = await convertImageToBase64(imageFile);
      
      const reportData = {
        image: base64Image,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        note: note,
        created_at: new Date().toISOString()
      };
      
      await createReport(reportData);
      
      setShowForm(false);
      setShowConfirmation(true);
      resetForm();
      loadRecentReports();
    } catch (error) {
      alert('Failed to submit report. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImageFile(null);
    setImagePreview('');
    setNote('');
  };

  const handleReportClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const handleNewReport = () => {
    setShowConfirmation(false);
  };

  const getLocationDisplay = () => {
    if (locationLoading) return 'Fetching your location...';
    if (locationError) return locationError;
    if (latitude && longitude) return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    return '';
  };

  return (
    <div className="container">
      <Header 
        title="PashuSewa" 
        description="Help injured animals by reporting them to nearby rescue services"
        linkTo="/admin"
        linkText="NGO Panel"
      />

      <main>
        {!showForm && !showConfirmation && (
          <section className="report-section">
            <button onClick={handleReportClick} className="btn primary-btn">
              Report Injured Animal
            </button>
          </section>
        )}

        {showForm && (
          <section className="form-section">
            <h2>Report Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="imageUpload">Upload or Take Photo:</label>
                <div className="image-upload-container">
                  <input 
                    type="file" 
                    id="imageUpload" 
                    accept="image/*" 
                    capture="environment"
                    onChange={handleImageUpload}
                  />
                  <div className="image-preview">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <div className="location-container">
                  <input 
                    type="text" 
                    id="locationDisplay" 
                    readOnly 
                    value={getLocationDisplay()}
                    placeholder="Fetching your location..."
                  />
                  <button type="button" onClick={refetch} className="btn small-btn">
                    Refresh
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="note">Additional Notes (Optional):</label>
                <textarea 
                  id="note" 
                  rows="3" 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Describe the animal's condition, exact location details, etc."
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCancel} className="btn secondary-btn">
                  Cancel
                </button>
                <button type="submit" className="btn primary-btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </section>
        )}

        {showConfirmation && (
          <section className="confirmation">
            <div className="success-icon">✓</div>
            <h2>Report Submitted Successfully!</h2>
            <p>Thank you for helping an animal in need. Local rescue teams have been notified.</p>
            <button onClick={handleNewReport} className="btn primary-btn">
              Report Another Animal
            </button>
          </section>
        )}

        <section className="past-reports">
          <h2>Recent Reports</h2>
          <div className="reports-container">
            {reportsLoading ? (
              <div className="loading">Loading recent reports...</div>
            ) : recentReports.length === 0 ? (
              <p>No reports found.</p>
            ) : (
              recentReports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UserReport;
