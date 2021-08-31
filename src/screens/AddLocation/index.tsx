import React, {useEffect} from 'react';
import {useGeolocation} from '../../contexts/geolocation';

import {Container, Title} from './styles';

const AddLocation: React.FC = () => {
  const {error} = useGeolocation();

  useEffect(() => {
    console.log({error});
  }, [error]);

  return (
    <Container>
      <Title>testando</Title>
    </Container>
  );
};

export default AddLocation;
