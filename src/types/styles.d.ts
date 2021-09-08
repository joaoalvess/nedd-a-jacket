import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      title: string;
      text: string;
      smallText: string;
      temp: string;
      family: string;
      reload: number;
    };

    color: {
      primary: string;
      text: string;
    };
  }
}
