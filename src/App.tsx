import React from 'react';
import Routes from './routes';
import AppProvider from './contexts';

import {ThemeProvider} from 'styled-components';
import StyleGuide from './styles/StyleGuide';

const App: React.FC = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={StyleGuide}>
        <Routes />
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
