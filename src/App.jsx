import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';

const Home = lazy(() => import('./Pages/Home/Home'));
const Event = lazy(() => import('./Pages/Event/Event'));
const AboutUs = lazy(() => import('./Pages/AboutUs/AboutUs'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageTransition />
    </BrowserRouter>
  );
}

function PageTransition() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="page-transition">
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-slate-200">Memuat halaman...</div>}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
