import { API_URL } from '../config';

/**
 * Fetch all reports from the API
 */
export const fetchReports = async () => {
  try {
    const response = await fetch(`${API_URL}/api/reports`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch reports: ${response.status}`);
    }
    
    const reports = await response.json();
    return reports;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

/**
 * Create a new report
 */
export const createReport = async (reportData) => {
  try {
    const response = await fetch(`${API_URL}/api/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit report');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

/**
 * Update report status
 */
export const updateReportStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/api/update-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      try {
        const error = JSON.parse(errorText);
        throw new Error(error.message || 'Failed to update status');
      } catch (parseError) {
        throw new Error(`HTTP ${response.status} - ${errorText || 'Failed to update status'}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};
