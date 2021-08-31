import React, {useEffect} from 'react';

import {useGeolocation} from '../../contexts/geolocation';
import {useWeather} from '../../contexts/weather';

import {Container, Title} from './styles';

const Dashboard: React.FC = () => {
  const {currentLatitude, currentLongitude} = useGeolocation();

  const {getWeatherByGps, weatherByGps} = useWeather();

  useEffect(() => {
    getWeatherByGps(currentLatitude, currentLongitude);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLatitude, currentLongitude]);

  if (weatherByGps === null) {
    return null;
  }

  return (
    <Container>
      <Title>{weatherByGps?.current?.name}</Title>
      <Title>{weatherByGps?.current?.weather[0]?.description}</Title>
      <Title>{Math.round(weatherByGps?.current?.main.temp)}</Title>
      <Title>{Math.round(weatherByGps?.daily[0]?.temp?.min)}</Title>
      <Title>{Math.round(weatherByGps?.daily[0]?.temp?.max)}</Title>
      <Title>
        {weatherByGps?.current?.main.temp <= 18
          ? 'vc precisa de uma jacket'
          : 'nao precisa'}
      </Title>
    </Container>
  );
};

export default Dashboard;
