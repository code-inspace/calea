import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bungalows from './pages/Bungalows';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bungalows" element={<Bungalows />} />
      </Routes>
    </Router>
  );
}

export default App;
