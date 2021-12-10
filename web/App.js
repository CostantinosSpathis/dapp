import React from 'react';
import Header from './shared/components/Header';

const WebAppTitle = () => {
  return (
    <div>
      <h2 style={{ color: '#9400d3', fontSize: '32' }}>
        I'm a React app component.
      </h2>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <WebAppTitle />
    </>
  );
};

export default App;