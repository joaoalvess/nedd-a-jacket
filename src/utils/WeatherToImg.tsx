export const WeatherToImg = (weather: string) => {
  switch (weather) {
    case 'Clear':
      return 0;
    case 'Clouds':
      return 1;
    case 'Rain':
      return 2;
    case 'Drizzle':
      return 2;
    case 'Thunderstorm':
      return 3;
    default:
      return 1;
  }
};
