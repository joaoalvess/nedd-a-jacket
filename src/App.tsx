import React from 'react';
import Routes from './routes';
import AppProvider from './contexts';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
