import {WeatherDaily} from './weatherDaily';

export interface OneCall {
  data: {daily: [WeatherDaily]};
}
