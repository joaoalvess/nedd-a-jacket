import {WeatherDaily} from './weatherDaily';

export interface Weather {
  current: {
    name: string;
    main: {
      temp: number;
    };
    weather: [
      {
        description: string;
      },
    ];
  };
  daily: [WeatherDaily];
}
