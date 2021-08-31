import React, {useState, createContext, useContext} from 'react';

import Geolocation from '@react-native-community/geolocation';

interface GeolocationProvider {
  getGeolocation: any;
  currentLatitude: string;
  currentLongitude: string;
  watchId: number;
  error: string | null;
}

const GeolocationContext = createContext<GeolocationProvider>(
  {} as GeolocationProvider,
);

export const GeolocationProvider: React.FC = ({children}) => {
  const [currentLatitude, setCurrentLatitude] = useState<string>('');
  const [currentLongitude, setCurrentLongitude] = useState<string>('');
  const [watchId, setWatchId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  async function getGeolocation() {
    Geolocation.getCurrentPosition(
      position => {
        const currentLat = JSON.stringify(position.coords.latitude);
        const currentLon = JSON.stringify(position.coords.longitude);

        setCurrentLatitude(currentLat);
        setCurrentLongitude(currentLon);

        setError(null);
      },
      resError => {
        setError(resError.message);
      },
      {enableHighAccuracy: true, maximumAge: 1000},
    );

    const watchID = Geolocation.watchPosition(position => {
      const currentLat = JSON.stringify(position.coords.latitude);
      const currentLon = JSON.stringify(position.coords.longitude);

      setCurrentLatitude(currentLat);
      setCurrentLongitude(currentLon);

      setError(null);
    });

    setWatchId(watchID);
  }

  return (
    <GeolocationContext.Provider
      value={{
        getGeolocation,
        currentLatitude,
        currentLongitude,
        watchId,
        error,
      }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = (): GeolocationProvider => {
  const context = useContext(GeolocationContext);

  if (!context) {
    throw new Error('useGeolocation must be used within a GeolocationProvider');
  }

  return context;
};
