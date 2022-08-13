import React, {useEffect} from 'react';
import {NativeRouter, Route} from 'react-router-native';

import Dashboard from '../screens/Dashboard';
import AddLocation from '../screens/AddLocation';

import {useGeolocation} from '../contexts/geolocation';

const Routes = () => {
  const {error, callGeolocation} = useGeolocation();

  useEffect(() => {
    callGeolocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NativeRouter>
      <Route
        exact
        path="/"
        component={error === null ? Dashboard : AddLocation}
      />
    </NativeRouter>
  );
};

export default Routes;
