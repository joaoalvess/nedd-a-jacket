import React, {createContext, useContext, useState} from 'react';

import api from '../../service/api';

interface WeatherProvider {
  getWeatherByGps: any;
  weatherByGps: any;
}

const WeatherContext = createContext<WeatherProvider>({} as WeatherProvider);

export const WeatherProvider: React.FC = ({children}) => {
  const [weatherByGps, setWeatherByGps] = useState(null);

  async function getWeatherByGps(latitude: string, longitude: string) {
    if (latitude === '' || longitude === '') {
      return;
    }

    await api
      .get(`onecall?lat=${latitude}&lon=${longitude}`)
      .then(async (res: any) => {
        const {data} = await api.get(
          `weather?lat=${latitude}&lon=${longitude}`,
        );

        const Location: any = {
          current: data,
          daily: res?.data?.daily,
        };

        setWeatherByGps(Location);
      })
      .catch((error: any) => {
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
