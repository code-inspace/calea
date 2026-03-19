import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Bungalows from './pages/Bungalows';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Story from './pages/Story';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bungalows" element={<Bungalows />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/histoire" element={<Story />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
