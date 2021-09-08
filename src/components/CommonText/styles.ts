import styled from 'styled-components/native';

import {SimpleText} from '../../interfaces/simpleText';

export const BaseText = styled.Text.attrs((props: SimpleText) => ({
  size: props.size || '18px',
  margin: props.margin || '0',
  weight: props.weight || '400',
}))`
  font-size: ${props => props.size};
  font-family: ${props => props.theme.font.family};
  margin: ${props => props.margin};
  font-weight: ${props => props.weight};
`;
