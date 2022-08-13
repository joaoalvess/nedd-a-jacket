import React, {createContext, useContext, useState} from 'react';
import {OneCall} from '../../interfaces/oneCall';
import {Weather} from '../../interfaces/weather';

import api from '../../service/api';

interface GetWeatherByGps {
  (latitude: string, longitude: string): void;
}
interface WeatherProvider {
  getWeatherByGps: GetWeatherByGps;
  weatherByGps: Weather | null;
}

const WeatherContext = createContext<WeatherProvider>({} as WeatherProvider);

export const WeatherProvider: React.FC = ({children}) => {
  const [weatherByGps, setWeatherByGps] = useState<Weather | null>(null);

  async function getWeatherByGps(latitude: string, longitude: string) {
    if (latitude === '' || longitude === '') {
      return;
    }

    await api
      .get(`onecall?lat=${latitude}&lon=${longitude}`)
      .then(async (res: OneCall) => {
        const {data} = await api.get(
          `weather?lat=${latitude}&lon=${longitude}`,
        );

        const Location: Weather = {
          current: data,
          daily: res?.data?.daily,
        };

        console.group('foi');

        setWeatherByGps(Location);
      })
      .catch(error => {
        throw new error();
      });
  }

  return (
    <WeatherContext.Provider
      value={{
        getWeatherByGps,
        weatherByGps,
      }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherProvider => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }

  return context;
};
