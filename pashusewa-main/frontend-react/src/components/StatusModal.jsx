import React from 'react';

const StatusModal = ({ isOpen, onClose, reportId, currentStatus, onSubmit }) => {
  const [status, setStatus] = React.useState(currentStatus || 'Pending');

  React.useEffect(() => {
    setStatus(currentStatus || 'Pending');
  }, [currentStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reportId, status);
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h2>Update Report Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="statusSelect">New Status:</label>
            <select 
              id="statusSelect" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary-btn">
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusModal;
