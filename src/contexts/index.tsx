import React from 'react';

import {GeolocationProvider} from './geolocation';
import {WeatherProvider} from './weather';

const AppProvider: React.FC = ({children}) => {
  return (
    <GeolocationProvider>
      <WeatherProvider>{children}</WeatherProvider>
    </GeolocationProvider>
  );
};

export default AppProvider;
