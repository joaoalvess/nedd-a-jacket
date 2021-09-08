import React from 'react';
import {SimpleText} from '../../interfaces/simpleText';

import {BaseText} from './styles';

const CommonText = (text: SimpleText) => {
  return (
    <BaseText weight={text.weight} margin={text.margin} size={text.size}>
      {text.name}
    </BaseText>
  );
};

export default CommonText;
