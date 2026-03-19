import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';

const Home      = lazy(() => import('./pages/Home'));
const Bungalows = lazy(() => import('./pages/Bungalows'));
const Contact   = lazy(() => import('./pages/Contact'));
const Legal     = lazy(() => import('./pages/Legal'));
const Story     = lazy(() => import('./pages/Story'));
const NotFound  = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bungalows" element={<Bungalows />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/histoire" element={<Story />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
