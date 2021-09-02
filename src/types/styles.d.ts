import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      title: string;
      text: string;
      smallText: string;
      temp: string;
      family: string;
    };

    color: {
      primary: string;
      text: string;
    };
  }
}
