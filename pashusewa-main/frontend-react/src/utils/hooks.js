import { useState, useEffect } from 'react';

/**
 * Custom hook to get user's current location
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    loading: true,
    error: null
  });

  const fetchLocation = () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
            error: null
          });
        },
        (error) => {
          setLocation(prev => ({
            ...prev,
            loading: false,
            error: 'Location unavailable. Please try again.'
          }));
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser.'
      }));
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return { ...location, refetch: fetchLocation };
};

/**
 * Calculate distance between two points using the Haversine formula
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const EARTH_RADIUS_KM = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = EARTH_RADIUS_KM * c;
  
  return distance;
};

/**
 * Convert image file to base64 string
 */
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
