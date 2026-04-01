import React from 'react';
import { Home } from './pages/Home';

function App() {
  return (
    // Fragment (<>...</>) kullanarak gereksiz div kirliliğinden kaçınıyoruz
    <>
      <Home />
    </>
  );
}

export default App;