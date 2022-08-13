import React, {useState, createContext, useContext} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

interface GeolocationProvider {
  getGeolocation: () => Promise<void>;
  callGeolocation: () => Promise<void>;
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

  async function callGeolocation() {
    if (Platform.OS === 'ios') {
      return getGeolocation();
    }

    if (PermissionsAndroid.RESULTS.GRANTED === 'granted') {
      return getGeolocation();
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Acesso à Localização',
        message: 'Este aplicativo precisa acessar sua localização.',
        buttonNeutral: 'Pergunte-me depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return getGeolocation();
    } else {
      return setError('Permissão de Localização negada');
    }
  }

  async function getGeolocation() {
    await Geolocation.getCurrentPosition(
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
      {enableHighAccuracy: true, timeout: 300000, maximumAge: 1000},
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
        callGeolocation,
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
