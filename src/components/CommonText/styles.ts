import styled from 'styled-components/native';

interface SimpleText {
  size: string;
  margin: string;
  weight: string;
}

export const SimpleText = styled.Text.attrs((props: SimpleText) => ({
  size: props.size || '18px',
  margin: props.margin || '0',
  weight: props.weight || '400',
}))`
  font-size: ${props => props.size};
  font-family: ${props => props.theme.font.family};
  margin: ${props => props.margin};
  font-weight: ${props => props.weight};
`;
