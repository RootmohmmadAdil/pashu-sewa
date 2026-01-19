import React from 'react';

const ReportCard = ({ report }) => {
  const reportDate = new Date(report.created_at);
  const formattedDate = reportDate.toLocaleString();
  const statusClass = `report-card-status status-${report.status.toLowerCase().replace(' ', '-')}`;

  return (
    <div className="report-card">
      <div className="report-card-image">
        <img src={report.image} alt="Injured Animal" />
      </div>
      <div className="report-card-content">
        <span className={statusClass}>{report.status}</span>
        <div className="report-card-location">
          <strong>Location:</strong> {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
        </div>
        {report.note && <div className="report-card-note">{report.note}</div>}
        <div className="report-card-time">{formattedDate}</div>
      </div>
    </div>
  );
};

export default ReportCard;
