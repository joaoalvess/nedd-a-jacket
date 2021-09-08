import React, {useContext} from 'react';
import {getDay, fromUnixTime} from 'date-fns';

import {DAY, WEATHER_ICON} from '../../constants';
import {WeatherToImg} from '../../utils/WeatherToImg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from 'styled-components';
import {Container, Views} from './styles';
import CommonText from '../CommonText';
import {WeatherMap} from '../../interfaces/weatherMap';

const ForecastWeather = (weather: WeatherMap) => {
  const {font} = useContext(ThemeContext);

  const getDate = fromUnixTime(weather.dt);

  const weekDay = getDay(new Date(getDate));

  return (
    <Container>
      <Views>
        <CommonText size={font.smallText} name={DAY[weekDay]} />
      </Views>
      <Views>
        <Icon
          name={`${WEATHER_ICON[WeatherToImg(weather.weather)]}`}
          size={30}
          color="black"
          style={{marginLeft: 21}}
        />
      </Views>
      <Views>
        <CommonText size={font.smallText} name={weather.min} />
        <CommonText
          margin="0 0 0 21px"
          size={font.smallText}
          name={weather.max}
        />
      </Views>
    </Container>
  );
};

export default ForecastWeather;
