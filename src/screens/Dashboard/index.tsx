import React, {useEffect, useContext} from 'react';
import {WeatherDaily} from '../../interfaces/weatherDaily';

import {useGeolocation} from '../../contexts/geolocation';
import {useWeather} from '../../contexts/weather';
import {ThemeContext} from 'styled-components';

import Icon from 'react-native-vector-icons/Ionicons';
import CommonText from '../../components/CommonText';
import ForecastWeather from '../../components/ForecastWeather';
import {Container, TempView, ViewText} from './styles';

const Dashboard: React.FC = () => {
  const {currentLatitude, currentLongitude} = useGeolocation();
  const {getWeatherByGps, weatherByGps} = useWeather();
  const {font} = useContext(ThemeContext);

  useEffect(() => {
    getWeatherByGps(currentLatitude, currentLongitude);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLatitude, currentLongitude]);

  if (weatherByGps === null) {
    return null;
  }

  return (
    <Container>
      <ViewText>
        <Icon
          onPress={() => {
            getWeatherByGps(currentLatitude, currentLongitude);
          }}
          name="ios-reload"
          size={font.reload}
          color="black"
        />
      </ViewText>
      <CommonText size={font.title} name={weatherByGps?.current?.name} />
      <CommonText
        size={font.smallText}
        name={weatherByGps?.current?.weather[0]?.description}
      />
      <CommonText
        margin="0 0 0 14px"
        size={font.temp}
        name={`${Math.round(weatherByGps?.current?.main.temp)}°`}
      />
      <TempView>
        <CommonText
          margin="0 7px 0 0"
          size={font.smallText}
          name={`Mín:${Math.round(weatherByGps?.daily[0]?.temp?.min)}°`}
        />
        <CommonText
          size={font.smallText}
          name={`Max:${Math.round(weatherByGps?.daily[0]?.temp?.max)}°`}
        />
      </TempView>
      <CommonText
        size={font.text}
        name={
          weatherByGps?.current?.main.temp <= 18
            ? 'You need a jacket!'
            : "You don't need a jacket!"
        }
      />
      {weatherByGps?.daily.map((weather: WeatherDaily, index: number) => {
        return (
          <ForecastWeather
            key={index}
            dt={weather?.dt}
            weather={weather?.weather[0].main}
            min={`${Math.round(weather?.temp.min)}`}
            max={`${Math.round(weather?.temp.max)}`}
          />
        );
      })}
    </Container>
  );
};

export default Dashboard;
