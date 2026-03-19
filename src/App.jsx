import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Bungalows from './pages/Bungalows';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Story from './pages/Story';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bungalows" element={<Bungalows />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/histoire" element={<Story />} />
      </Routes>
    </Router>
  );
}

export default App;
