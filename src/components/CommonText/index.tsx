import React from 'react';

import {SimpleText} from './styles';

interface SimpleText {
  name: string;
  size?: string;
  margin?: string;
  weight?: string;
}

const CommonText = (props: SimpleText) => {
  return (
    <SimpleText weight={props.weight} margin={props.margin} size={props.size}>
      {props.name}
    </SimpleText>
  );
};

export default CommonText;
