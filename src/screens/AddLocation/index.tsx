import React, {useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import {useGeolocation} from '../../contexts/geolocation';

import {Container, Title} from './styles';

const AddLocation: React.FC = () => {
  const {callGeolocation, error} = useGeolocation();

  useEffect(() => {
    console.log({error});
  });

  return (
    <Container>
      {Platform.OS === 'ios' ? (
        <Title
          title="ios"
          onPress={() => {
            Linking.openURL('app-settings:');
          }}
        />
      ) : (
        <Title
          title="android"
          onPress={() => {
            callGeolocation();
          }}
        />
      )}
    </Container>
  );
};

export default AddLocation;
