import React from 'react';
import {NativeRouter, Route} from 'react-router-native';
import Dashboard from '../screens/Dashboard';

const Routes = () => {
  return (
    <NativeRouter>
      <Route exact path="/" component={Dashboard} />
    </NativeRouter>
  );
};

export default Routes;
