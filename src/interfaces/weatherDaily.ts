export interface WeatherDaily {
  dt: number;
  temp: {
    max: number;
    min: number;
  };
  weather: [
    {
      main: string;
    },
  ];
}
